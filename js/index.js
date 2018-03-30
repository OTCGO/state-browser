var i18n = new VueI18n({
    locale: localStorage.locale || 'zhCHS', // 语言标识
    messages: {
        en: en,
        zhCHS: zhCHS
    }
})

var app = new Vue({
    el: '#app',
    i18n,
    data: {
        sliderIdx: GetUrlParam('idx') == '' ? 0 : GetUrlParam('idx'),
        tintColor: '#F9C400',
        currentPage: 1,
        pageCount: 15,
        totalCount: 0,
        category: 'Any'
    },
    computed: {
        screenSize: function() {
            return window.screenSize;
        }
    },
    methods: {
        appevent: function() {
            this.$refs.header.hideSelect();
            this.$refs.toolbox.hideCategory();
        },
        init: function() {
            console.log("init")
            this.currentPage = 1;
            this.pageCount = 15;
            this.totalCount = 0;
            this.load();
            this.$refs.header.setMenuIdx(3)

            SetUrlParam('idx',this.sliderIdx)
            // history.pushState({},"neo", search === "" ? ("?idx="+this.sliderIdx) : (`${search}&idx=${this.sliderIdx}`)  ); 

            // if(/\?/g.test(document.location.toString())){
            //     history.pushState({},"neo", "?idx="+this.sliderIdx ); 
            // }else{
            //     history.pushState({},"neo", "?idx="+this.sliderIdx ); 
            // }
            
        },
        load: function() {
            var that = this;
            if(that.sliderIdx == 0){
                setTimeout(function (){
                    that.$refs.neodynamic.init();
                }, 500);
            } 
            if(that.sliderIdx == 1){
                // setTimeout(function (){
                //     that.$refs.neochart.init();
                // }, 500);
            } 
            else if(that.sliderIdx == 2){
                setTimeout(function (){
                    that.$refs.tran.setCurrentPage(that.currentPage)
                    that.$refs.tran.init();
                }, 500);
            }
            else if(that.sliderIdx == 3){
                setTimeout(function (){
                    that.$refs.block.setCurrentPage(that.currentPage)
                    that.$refs.block.init();
                }, 500);
            } 
            else if(that.sliderIdx == 4) {
                setTimeout(function (){
                    that.$refs.wallet.setCurrentPage(that.currentPage)
                    that.$refs.wallet.init();
                }, 500);
            }
        },
        loaded: function(resp){
            console.log("loaded", resp)
            this.totalCount = resp.count;
        },
        changeSlider: function(idx){
            if(idx === this.sliderIdx){
                return;
            }
            this.sliderIdx = idx;
            this.init();
        },
        changePaging: function(args) {
            this.currentPage = args.currentPage;
            this.pageCount = args.pageCount;
            this.totalCount = args.totalCount;
            this.load();
        },
        changePaginate: function(page) {
            this.currentPage = page
            this.load()
        },
        changeCategory: function(item) {
            this.currentPage = 1;
            this.pageCount = 15;
            this.totalCount = 0;
            this.$refs.tran.setCategory(item.code);
        }
    }
})

app.init();