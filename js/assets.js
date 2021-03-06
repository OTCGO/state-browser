const i18n = new VueI18n({
    locale: localStorage.locale || 'zhCHS', // 语言标识
    messages:{
        en:en,
        zhCHS: zhCHS
    }
})
var app = new Vue({
    el: '#app',
    i18n: i18n,
    data: {
        tintColor: '#F9C400',
        currentPage: 1,
        pageCount: 15,
        totalCount: 0
    },
    computed: {
        screenSize: function() {
            return window.screenSize;
        }
    },
    methods: {
        appevent: function() {
            this.$refs.header.hideSelect();
        },
        init: function() {
            this.currentPage = 1;
            this.pageCount = 15;
            this.totalCount = 0;
            this.load();
            this.$refs.header.setMenuIdx(2)
        },
        load: function() {
            var that = this;
            setTimeout(function (){
                that.$refs.asset.setCurrentPage(that.currentPage)
                that.$refs.asset.init();
            }, 500);
        },
        loaded: function(resp){
            console.log("loaded", resp)
            this.totalCount = resp.count;
        },
        changePaging: function(args) {
            this.currentPage = args.currentPage;
            this.pageCount = args.pageCount;
            this.totalCount = args.totalCount;
            this.load();
        },
        changePaginate: function(page) {
            this.currentPage = page
            this.load();
        },
        search: function(keyword) {
            this.$refs.asset.setSearchKeyword(keyword);
            this.$refs.asset.setCurrentPage(1);
            this.currentPage = 1;
            this.$refs.asset.init();
        }
    }
})

app.init();