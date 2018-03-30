const i18n = new VueI18n({
    locale: localStorage.locale || 'zhCHS', // 语言标识
    messages:{
        en: en,
        zhCHS: zhCHS
    }
})

var app = new Vue({
    el: '#app',
    i18n: i18n,
    computed: {
        index: function() {
            return GetUrlParam('index');
        }
    },
    data: {
        tintColor: '#F9C400',
        currentPage: 1,
        pageCount: 15,
        totalCount: 0,
        scripts: undefined,
        block:undefined,
        trsns: [
            []
        ]
    },
    methods: {
        appevent: function() {
            this.$refs.header.hideSelect();
        },
        init: function() {
            // this.$refs.neochart.init();
            // this.$refs.wallet.init();
            this.$refs.tran.init()

            var that = this;
            axios({
                url:  host+'/api/v1/'+network+'/public/graphql',
                method: 'post', 
                data: {
                    query: 
                        '{'+
                            'BlockQuery (index:'+this.index+') {'+
                            ' count ' +
                            ' rows {'+
                                ' _id '+
                                ' hash '+
                                ' size '+
                                ' version '+
                                ' previousblockhash '+
                                ' merkleroot '+
                                ' time '+
                                ' index '+
                                ' nonce '+
                                ' nextconsensus '+
                                ' confirmations '+
                                ' nextblockhash '+
                                ' transactions '+
                                ' script { '+
                                    ' invocation '+
                                    ' verification '+
                                ' } '+
                            '}'+
                          '}'+
                        '}'
                }
            })
            .then(function (resp) {
                var count = resp.data.data.BlockQuery.count;
                if(count > 0){
                    that.scripts = [];
                    var item = resp.data.data.BlockQuery.rows[0];
                    if(item.script.invocation){
                        that.scripts.push({
                            title: that.$t('block.invocationScript'),
                            desc: item.script.invocation
                        })
                    }
                    if(item.script.verification) {
                        that.scripts.push({
                            title: that.$t('block.verificationScript'),
                            desc: item.script.verification
                        })
                    }

                    // block detail info
                    that.block = [
                        {title: that.$t('block.index'), desc: item.index, url: 'blockinfo.html?index='+item.index},
                        {title: that.$t('block.transactions'), desc: item.transactions},
                        {title: that.$t('block.hash'), desc: item.hash},
                        {title: that.$t('block.time'), desc: moment(item.time*1000).format("YYYY-MM-DD | HH:mm:ss")},
                        {title: that.$t('block.version'), desc: item.version},
                        {title: that.$t('block.merkleroot'), desc: item.merkleroot},
                        {title: that.$t('block.size'), desc: item.size},
                    ]
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        loaded: function(data) {
            console.log('loaded: ', data)
            this.totalCount = data.count;
        },
        changePaging: function(args) {
            this.currentPage = args.currentPage;
            this.pageCount = args.pageCount;
            this.totalCount = args.totalCount;
            this.$refs.tran.setCurrentPage(this.currentPage)
            this.$refs.tran.init()
        },
        changePaginate: function(page) {
            this.currentPage = page
            this.$refs.tran.setCurrentPage(this.currentPage)
            this.$refs.tran.init()
        }
    }
})

app.init();