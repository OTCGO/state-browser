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
    data:{
        tintColor: '#F9C400',
        currentPage: 1,
        pageCount: 15,
        totalCount: 0,
    },
    computed: {
        address: function() {
            return GetUrlParam('address');
        }
    },
    methods: {
        appevent: function() {
            this.$refs.header.hideSelect();
        },
        init: function() {
            // this.$refs.neochart.init();
            // this.$refs.wallet.init();
            this.$refs.addrinfo.init(this.address);
            this.$refs.tran.init()
            this.$refs.bonus.init(this.address);
        },
        loaded: function(data) {
            console.log('loaded: ', data)
            this.totalCount = data.count;
        },
        changePaging: function(args) {
            this.currentPage = args.currentPage;
            this.pageCount = args.pageCount;
            this.totalCount = args.totalCount;
            this.$refs.tran.setCurrentPage(args.currentPage);
            this.$refs.tran.init()
        },
        changePaginate: function(page) {
            this.currentPage = page
            this.$refs.tran.setCurrentPage(this.currentPage);
            this.$refs.tran.init()
        }
    }
})


app.init();