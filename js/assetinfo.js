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
            this.$refs.tran.setAsset(this.index)
            this.$refs.tran.init()
            this.$refs.address.init()

            var that = this;
            axios({
                url:  host+'/api/v1/'+network+'/public/graphql',
                method: 'post', 
                data: {
                    query: 
                        '{'+
                            'AssetQuery (assetId: "'+this.index+'") {'+
                            ' count ' +
                            ' rows { '+
                                ' _id '+
                                ' assetId '+
                                ' symbol '+
                                ' type '+
                                ' amount '+
                                ' name { '+
                                    ' lang '+
                                    ' name '+
                                ' } '+
                            '}'+
                          '}'+
                        '}'
                }
            })
            .then(function (resp) {
                var count = resp.data.data.AssetQuery.count;
                if(count > 0){
                    that.scripts = [];
                    var item = resp.data.data.AssetQuery.rows[0];

                    // block detail info
                    that.block = [
                        {title: that.$t('asset.name'), desc:  item.name[0].name ?  item.name[0].name : item.name},
                        {title: that.$t('asset.symbol'), desc: item.symbol ? item.symbol : item.name[0].name },
                        {title: that.$t('asset.type'), desc: item.type},
                        {title: that.$t('asset.assetId'), desc: item.assetId},
                        {title: that.$t('asset.amount'), desc: item.amount},
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