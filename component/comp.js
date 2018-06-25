
Vue.component('paginate', VuejsPaginate)
Vue.component('qrcode', VueQrcode)

Vue.component('neo-title', {
    template:
    '<div class="neo-title" v-on:click="goto()">'+
        '<img class="logo"  :src="$t(\'logo\')" />'+
        // '<div class="neo-title__main"><span>NEO</span></div>' + 
        // '<div class="neo-title__sub"><span>NEP5</span></div>'+
        // '<div class="neo-title__sub"><span>OTCGO</span></div>'+
    '</div>',
    methods:{
        goto: function(){
            // return home
            window.location.href = `/?network=${GetUrlParam('network') || 'mainnet'}`
        }
    }
});

Vue.component('neo-info-title', {
    template:
    '<div class="neo-info-title">'+
        '<div class="title">{{title}}</div>'+
        '<div style="height:1rem">'+
            '<div class="subtitle">{{subtitle}} {{id}} </div>'+
            '<div class="qrcode">'+
                '<qrcode v-if="qrcode" :value="id" :options="{ size: 100 }"></qrcode>'+
            '</div>'+
            '<div class="clearfloat"></div>'+
        '</div>'+
    '</div>',
    props: {
        title: String,
        id: String,
        subtitle: String,
        qrcode:Boolean
    },
    mounted() {
       // console.log('props',this.id)
    }
})

Vue.component('neo-menu', {
    template: 
    '<div class="neo-menu" v-cloak>'+
        '<div class="neo-menu__item" v-for="(item,itemIdx) in menu" v-on:click.prevent="changeMenuItem(itemIdx)">'+
            '<span>'+
                '{{item.name}}'+
                '<i class="icon iconfont icon-arrow-down" v-if="item.items"></i>'+
            '</span>'+
            '<div class="underline" v-bind:style="{left: positions[idx]}" v-if="itemIdx-1 == idx && idx > 1"></div>'+
        '</div>'+
    '</div>',
    props: {
        idx: Number
    },
    mounted() {
        // if(this.$t("language") == 'en'){
        //     this.positions = ['', '', '', '0.20rem', '0.20rem']
        // } else {
        //     this.positions = ['', '', '', '0.20rem', '0.25rem']
        // }
    },
    data: function(){
        return {
            menu:[
                {id: 1, name: this.$t("menu.language"), items:[]},
                {id: 2, name: this.$t("menu.wallet"), href:"https://otcgo.cn/download/"},
                {id: 3, name: this.$t("menu.api"), href:"https://otcgo.github.io/doc/"},
                {id: 4, name: this.$t("menu.assets"), href:`assets.html?network=${GetUrlParam('network') || 'mainnet'}` },
                {id: 5, name: this.$t("menu.home"), href:`index.html?network=${GetUrlParam('network') || 'mainnet'}`}
            ],
            positions: ['', '', '', '0.20rem', '0.20rem']
        }
    },
    computed:{
        positions: function(){
            
        }
    },
    methods: {
        changeMenuItem: function(idx) {
            
            this.$emit('changed', idx)
            console.log(idx)
            // open api window
            if (idx == 1) {
                window.open(this.menu[idx].href)
                return
            }
            if(idx < 2){
                return;
            }

            this.idx = idx;
            var menuItem = this.menu[idx];
            if(menuItem.href){
                window.location.href = menuItem.href;
            }
        }
    }
});

Vue.component('neo-header', {
    template: 
    '<div class=\'neo-header\'>'+
        '<neo-title></neo-title>'+
        '<neo-menu ref="menu" v-bind:idx="menuIdx" v-on:changed="changedMenu"></neo-menu>'+
        '<neo-select ref="tooltip" right="0.15rem" v-bind:data="languages" v-on:selected="changeLanguage" top="0.65rem"></neo-select>'+
    '</div>',
    data: function() {
        return {
            menuIdx: 4,
            languages: [
                {code: 'en', name: 'English'},
                {code: 'zhCHS', name: '中文'}
            ],
            select: false
        }
    },
    methods: {
        setMenuIdx: function(idx) {
            this.menuIdx = idx;
        },
        changedMenu: function(idx) {
            if(idx == 0){
                window.event.cancelBubble = true
                
                if(this.$refs.tooltip.visiable) {
                    this.$refs.tooltip.hide();
                } else {
                    this.select = true
                    this.$refs.tooltip.show();
                }
            }
        },
        changeLanguage: function(option) {
            console.log(option)
            this.$refs.tooltip.hide();
            if(localStorage.locale == option.code){
                return;
            }
            localStorage.locale = option.code;
            window.location.reload();
        },
        hideSelect: function() {
            this.$refs.tooltip.hide()
        }
    }
});

Vue.component('neo-slider',{
    template: 
    '<div class="neo-slider" v-cloak>'+
        '<div class="neo-slider__line"></div>'+
        '<div class="neo-slider__item"'+
            'v-on:click="changeItem(idx)"'+
            'v-bind:style="{left: positions[itemidx][idx]+ \'rem\'}"'+ 
            'v-for="(item, idx) in items"'+
            'v-if="idx < itemidx">'+
            '<div class="neo-slider__item-dot" v-if="itemidx != idx">'+
                '<i></i>'+
            '</div>'+
            '<h1 v-if="itemidx != idx">{{item.title}}</h1>'+
            '<h2 v-if="itemidx != idx">{{item.subtitle}}</h2>'+    
        '</div>'+
        '<div class="neo-slider__item"'+
            'v-on:click="changeItem(idx)"'+
            'v-bind:style="{right: positions[itemidx][idx]+ \'rem\'}"'+ 
            'v-for="(item, idx) in items"'+
            'v-if="idx > itemidx">'+
            '<div class="neo-slider__item-dot" v-if="itemidx != idx">'+
                '<i></i>'+
            '</div>'+
            '<h1 v-if="itemidx != idx">{{item.title}}</h1>'+
            '<h2 v-if="itemidx != idx">{{item.subtitle}}</h2>'+    
        '</div>'+
    '</div>',
    props: {
        itemidx: Number
    },
    data: function() {
        return {
            items:[
                {title: this.$t("slider.dynamic.name") , subtitle: ''},
                {title: this.$t("slider.market.name"), subtitle: ''},
                {title: this.$t("slider.transaction.name"), subtitle: ''},
                {title: this.$t("slider.block.name"), subtitle: ''},
                {title: this.$t("slider.address.name"), subtitle: ''}
            ],
            positions: [
                [0, 5.1, 3.4, 1.7, 0],
                [0, 1.7, 3.4, 1.7, 0],
                [0, 1.7, 3.4, 1.7, 0],
                [0, 1.7, 3.4, 3, 0],
                [0, 1.7, 3.4, 5.1, 0]
            ]
        }
    },
    methods: {
        changeItem: function(idx){
            this.$emit('change', idx)
            this.itemIdx = idx;
            // if(ViewPage) {
            //     ViewPage.idx = idx;
            //     ViewPage.load();
            //     ViewPage.title = this.items[idx].title;
            //     if(idx == 1){
            //         console.log("render chart")
            //         setTimeout(function () {
            //             ViewPage.renderNeoChart();
            //         }, 200);
            //     }
            // }
        }
    }
});

Vue.component('neo-toolbox', {
    template: 
    '<div>'+
    '<div class="neo-toolbox dynamic" v-if="itemidx == 0">'+
        '<input type="text" v-on:keyup="handleKeyup" v-model="search" v-bind:placeholder="$t(\'slider.dynamic.search\')" />'+
        '<i v-on:click="handleSearch" class="icon iconfont icon-search"></i>'+
    '</div>'+
    '<div class="neo-toolbox market" v-if="itemidx == 1">'+
        '<div class="total">'+
            '<h1>$00.00</h1>'+
        '</div>'+
        '<div class="info">'+
            '<div class="item">'+
                '<label>24h Change:</label>'+
                '<span class="highlight">0.00%</span>'+
            '</div>'+
            '<div class="item">'+
                '<label>24h Volume:</label>'+
                '<span>000,000.00</span>'+
            '</div>'+
            '<div class="item">'+
                '<label>Market Cap:</label>'+
                '<span>000,000.00</span>'+
            '</div>'+
        '</div>'+
        '<div class="timestamp">'+
            'Last Updated 5 mintues ago'+
        '</div>'+
    '</div>'+
    '<div class="neo-toolbox tran" v-if="itemidx == 2">'+
        '<div class="total">'+
            '<label>{{$t("dynamic.transactionNum")}}</label>'+
            '<span>{{Total}}</span>'+
        '</div>'+
        '<div class="category" v-on:click="handleCategory">'+
            '<span>{{category.name}} <i class="icon iconfont icon-arrow-down"></i></span>'+
        '</div>'+
    '</div>'+
    '<neo-select ref="tooltip" v-if="itemidx == 2" v-on:selected="changeCategory" v-bind:data="categoryItems" left="6.9rem" top="0.6rem"></neo-select>'+
    '<div class="neo-toolbox block" v-if="itemidx == 3">'+
        '<div class="total">'+
            '<label>{{$t("dynamic.blockNum")}}</label>'+
            '<span>{{Total}}</span>'+
        '</div>'+
    '</div>'+
    '<div class="clear" v-if="itemidx == 3"></div>'+
    '<div class="neo-toolbox wallet" v-if="itemidx == 4">'+
        '<div class="total">'+
            '<label>{{$t("dynamic.addressNum")}}</label>'+
            '<span>{{Total}}</span>'+
        '</div>'+
        '<div class="toolbar">'+
            '<div class="item"><a href="https://otcgo.cn/#/signUp" target="_blank" ><span>{{$t("address.newWallet")}}</span></a></div>'+
            '<div class="item middle"><a href="https://otcgo.cn/#/login" target="_blank" ><span>{{$t("address.openWallet")}}</span></a></div>'+
        '</div>'+
    '</div>'+
    '<div class="clear" v-if="itemidx == 4"></div>'+
    '<div class="neo-toolbox__title" v-if="itemidx < 3" v-bind:style="{left: toolboxPositions[itemidx] + \'rem\', \'text-align\': itemidx > 1 ? \'right\' : \'left\'}">'+
        '<h1>{{title}}</h1>'+
        '<div class="underline" v-bind:class="{\'right\': itemidx > 1}">'+
            '<i></i>'+
        '</div>'+
    '</div>'+
    '<div class="neo-toolbox__title" v-if="itemidx > 2" v-bind:style="{right: toolboxPositions[itemidx] + \'rem\', \'text-align\': itemidx > 1 ? \'right\' : \'left\'}">'+
        '<h1>{{title}}</h1>'+
        '<div class="underline" v-bind:class="{\'right\': itemidx > 1}">'+
            '<i></i>'+
        '</div>'+
    '</div>'+
    '</div>',
    computed: {
        title: function(){
            console.log(this)
            return [this.$t('slider.dynamic.name'),this.$t('slider.market.name'),this.$t('slider.transaction.name'),
                    this.$t('slider.block.name'),this.$t('slider.address.name')][this.itemidx]
        },
        Total: function() {
            return this.total.toString().replace(/(?=((?!\b)\d{3})+$)/g, ',')
        },
        category: function() {
            return this.categoryItems[this.categoryIdx];
        }
    },
    props: {
        itemidx: Number,
        total: Number
    },
    data: function() {
        return {
            toolboxPositions: [0.2, 1.8, -4.5, 2.8, 0.2],
            search: undefined,
            categoryItems: [
                {idx: 0, code: 'Any', name: 'Any'},
                {idx: 1, code: 'Contract', name: 'Contract'},
                {idx: 2, code: 'Miner', name: 'Miner'},
                {idx: 3, code: 'Claim', name: 'Claim'},
                {idx: 4, code: 'Invocation', name: 'Invocation'},
                {idx: 5, code: 'Publish', name: 'Publish'},
                {idx: 6, code: 'Issue', name: 'Issue'},
                {idx: 7, code: 'Register', name: 'Register'},
            ],
            categoryIdx: 0
        }
    },
    methods: {
        // search
        handleSearch: function() {
            console.log('search',this.search)
            
            // if search not exist 
            if(!this.search || this.search === undefined){
                return
            }
            // address start 'A'
            if(this.search.replace(/\s+/g,"").substring(0,1) === 'A'){
                window.location.href = 'addrinfo.html?address=' + this.search + `&network=${GetUrlParam('network') || 'mainnet'}`
                return
            }

            //txid lenght  64 or 66
            if(this.search.length === 64 || this.search.length === 66) {
                //console.log('/traninfo.html?id=' + (this.search.length === 66 ? this.search : `0x${this.search}`))
                window.location.href = 'traninfo.html?id=' + (this.search.length === 66 ? this.search : `0x${this.search}` + `&network=${GetUrlParam('network') || 'mainnet'}`)
                return
            }

            //block height only contains number
            if(/^\d+$/.test(this.search)) {
                window.location.href = 'blockinfo.html?index=' + this.search + `&network=${GetUrlParam('network') || 'mainnet'}`
                return
            }

            console.log('end')

        },
        //handleKeyup
        handleKeyup: function(event) {
            // enter
            if(event.keyCode === 13){
                this.handleSearch()
            }
        },
        handleCategory: function(){
            window.event.cancelBubble = true;
            if(this.$refs.tooltip.visiable){
                this.$refs.tooltip.hide();
            } else {
                this.$refs.tooltip.show();
            }
        },
        hideCategory: function() {
            if(this.$refs.tooltip){
                this.$refs.tooltip.hide();
            }
        },  
        changeCategory: function(item) {
            this.categoryIdx = item.idx;
            this.$refs.tooltip.hide();
            this.$emit('changed', item)
        }
    }
});

Vue.component('neo-footer', {
    template: 
    '<div class="neo-footer">'+
        '<div class="left">'+
            '<ul class="footer__connect">'+
                '<li class="github">'+
                    '<a target="_blank" rel="noreferrer noopener" href="https://github.com/OTCGO/state-browser">'+
                    '<i class="fa fa-github"></i>'+
                    '</a>'+
                '</li>'+
                // '<li class="weibo">'+
                //     '<a target="_blank" rel="noreferrer noopener" href="#">'+
                //         '<i class=" fa fa-weibo"></i>'+
                //     '</a>'+
                // '</li>'+
                '<li class="weixin">'+
                        '<a href="#"><i class="fa fa-weixin"></i></a> <div class="weixin-qr-code">'+
                                '<img  src="/images/weixin-qrcode.jpg" alt="蓝鲸淘智能资产管理平台" width="160">'+
                        '</div>'+
                '</li> '+
                '<li class="qq"><a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=1c63793c5fc8adaf4d6c5c9ee782c1ce8fb14dee9494d69a7372efc5415988d6" alt="SEA第五社群" title="SEA第五社群"><i class="fa fa-qq"></i></a> '+
                ' </li>'+
            '</ul>'+
            
        '</div>'+
        '<div class="center">'+
            '<div class="folder">'+
                '<div class="wrapper">'+
                    '<a href="#top"><i class="icon iconfont icon-arrow-up"></i></a>'+
                '</div>'+
            '</div>'+
            '<div class="info">'+
                '<div>{{$t("footer.version")}}: v2.7.3</div>'+
                '<div class="netwrok"><a href="javascript:void(0)" @click="selectNetwork">{{ network }}</a></div>'+
            '</div>'+
        '</div>'+
        '<div class="right">'+
            // '<v-select :on-change="selectNetwork()" v-model="selected" :options="options"></v-select>'+
        '</div>'+
        '<div class="clear"></div>'+
    '</div>',
    data: function() {
        return {
            network: 'MainNet'
        }
    },
    methods: {
        hoverHandle: function(){
            console.log('hoverHandle')
        },

        selectNetwork: function(){
            // console.log('selectNetwork',this.network)
            // this.network: 'MainNet'

           console.log('network',GetUrlParam('network') === 'mainnet')
            if(GetUrlParam('network') === 'mainnet' ){
                location.href = `index.html?network=testnet`
            }else{
                location.href = `index.html?network=mainnet`
            }

        }

    },
    mounted(){
        this.network = GetUrlParam('network') === 'mainnet' ? 'TestNet' : 'MainNet'
    }

});




Vue.component('neo-paging', {
    template:
    '<div class="neo-paging">'+
    '<div class="info" v-bind:style="{color: TintColor}">'+
        '{{$t("pagination.current")}}'+
        ' {{(CurrentPage-1)*PageCount+1}} '+ 
        ' {{$t("pagination.to")}}'+ 
        ' {{CurrentPage*PageCount>TotalCount ? TotalCount : CurrentPage*PageCount}} '+ 
        ' {{$t("pagination.total")}} '+ 
        ' {{TotalCount}} '+ 
    '</div>'+
    // '<div class="page">'+
    //     '<i class="icon iconfont icon-arrow-left prev" v-bind:class="{\'disable\': CurrentPage==1}" v-if="CurrentPage==1"></i>'+
    //     '<i class="icon iconfont icon-arrow-left prev" v-on:click="prevPage" v-bind:style="{background: TintColor}" v-if="CurrentPage!=1"></i>'+
    //     '<i class="icon iconfont icon-arrow-right2 next" v-on:click="nextPage" v-bind:style="{background: TintColor}" v-if="CurrentPage<TotalPage"></i>'+
    //     '<i class="icon iconfont icon-arrow-right2 next" v-bind:class="{\'disable\': CurrentPage>=TotalPage}" v-if="CurrentPage>=TotalPage"></i>'+
    // '</div>'+
    // '<paginate'+
    //     'v-bind:page-count="Math.ceil(totalCount/pageCount)"'+
    //     'v-bind:click-handler="changePaginate"'+
    //     'prev-text="\'Prev\'"'+
    //     'next-text="\'Next\'"'+
    //     'container-class="\'neo-pagination\'">'+
    //     '</paginate>'+
    '</div>',
    props: {
        tint: String,
        page: Number,
        count: Number,
        total: Number,
        prevText: String,
        nextText: String,
    },
    computed: {
        TotalPage: function() {
            //  Math.ceil 向上取整
            return Math.ceil(parseFloat(this.total/this.count))
        },
        TotalCount: function() {
            return this.total.toString().replace(/(?=((?!\b)\d{3})+$)/g, ',')
        },
        TintColor: function() {
            return this.tint;
        },
        CurrentPage: function() {
            return this.page;
        },
        PageCount: function() {
            return this.count;
        }
    },
    data: function() {
        return {
            // tintColor: '#F9C400',
            // currentPage: 1,
            // pageCount: 15,
            // totalCount: 200
        }
    },
    methods: {
        nextPage: function() {
            if(this.page >= this.TotalPage) {
                return
            }
            this.page += 1;
            this.emitEvent()
        },
        prevPage: function() {
            if(this.page < 2){
                return;
            }
            this.page -= 1;
            this.emitEvent();
        },
        emitEvent: function() {
            var that = this;
            this.$emit('change', {
                currentPage: that.page,
                pageCount: that.count,
                totalCount: that.total,
                totalPage: that.TotalPage
            })
        }
    }
})

Vue.component('neo-dynamic-list',{
    template: 
    '<div class="neo-dynamic-list">'+
        '<div class="neo-dynamic-list__item" v-for="(item, itemIdx) in items" v-on:click="tap(item)">'+
            '<h1 v-bind:class="{\'link\': item.url}">{{item.value}} <i>{{item.unit}}</i></h1>'+
            '<h2>{{item.desc}}</h2>'+
            '<div class="neo-dynamic-list__item-underlayer"></div>'+
        '</div>'+
    '</div>',
    data: function() {
        return {
            items: undefined,
            countdown: 0, // 倒计时,
            blockIndex: 0,
            intervalid1: undefined,
            intervalid2: undefined
        }
    },
    beforeDestroy(){
        // clearInterval 
        clearInterval(this.intervalid1)
        clearInterval(this.intervalid2)
        console.log('beforeDestroy')
    },
    methods: {
        tap: function(item) {
            if(item.url){
                window.location.href = item.url
            }
        },
        init: function() {
            var that = this 
            axios({
                url: host+'/api/v1/'+network+'/public/graphql',
                method: 'post', 
                data: {
                    query: '{'+
                        ' SystemQuery { '+
                            ' rows {'+
                                ' startTime '+
                                ' curretTime '+
                                ' blockNum '+
                                ' assetNum '+
                                ' addressNum '+
                                ' transactionNum '+
                            ' } '+
                        ' } '+
                    ' } '
                }
            })
            .then(function (resp) {
                if(resp){
                    let result = resp.data.data.SystemQuery.rows

                    // update  countdown = 0
                    if(parseInt(result.blockNum - 1) > that.blockIndex){
                        that.countdown = 0
                    }
                    
                    that.blockIndex = result.blockNum - 1
                    that.items = [
                        {value: moment(result.startTime*1000).format("YYYY-MM-DD"), unit: '', desc: that.$t('dynamic.startTime')},
                        {value: moment(result.curretTime*1000).diff(moment(result.startTime*1000), "days"), unit: that.$t('dynamic.day'), desc:  that.$t('dynamic.runTime')},
                        {value: result.assetNum.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','), unit: '', desc: that.$t('dynamic.assetNum'), url:`assets.html?network=${GetUrlParam('network') || 'mainnet'}`},
                        {value: result.blockNum.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','), unit: '', desc: that.$t('dynamic.blockNum') },
                        {value: result.transactionNum.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','), unit: '', desc: that.$t('dynamic.transactionNum') },
                        {value: result.addressNum.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','), unit: '', desc:that.$t('dynamic.addressNum')},
                        {value: that.countdown, unit: that.$t('dynamic.second'), desc:that.$t('dynamic.newBlock')}
                    ]
                    
                    console.log('that.intervalid2',that.intervalid2)
                    if(!that.intervalid2){
                        // 出块时间
                        that.getCountdown()
                    }
                   
                }
            })
            .catch(function (error) {
                console.log(error);
            });

            if(!that.intervalid1){
                // setInterval update
                that.intervalid1 = setInterval(() => {
                    that.init()
                    console.log('init')
                },10000)
            }


        },
        getCountdown(){
            console.log('getCountdown')
            let that = this 
            that.intervalid2 = setInterval(()=>{
                    that.$set(that.items, 6, { value: that.countdown++,unit: that.$t('dynamic.second'), desc:that.$t('dynamic.newBlock') })
                    console.log('getCountdown')
                },1000)
        }

    }
});

Vue.component('neo-market-neochart', {
    template: '<div id="neochart" style="height: 2rem; width: 7.5rem;"></div>',
    data: function() {
        return {
            chart: undefined
        }
    },
    methods: {
        init: function() {
            if(this.chart){
                this.chart = undefined
            }
            
            this.chart = echarts.init(document.getElementById('neochart'));
            
            var data1 = [];

            var data2 = [];

            for(var i = 0; i < 65; i++){
                data1.push({
                    "date": moment('2018-01-12 00:00').add(3*i, 'hours').format('YYYY-MM-DD HH:mm'), 
                    "value": parseInt(Math.random()*10)})
            }

            for(var i = 0; i < 65; i++){
                data2.push({
                    "date": moment('2018-01-12 00:00').add(3*i, 'hours').format('YYYY-MM-DD HH:mm'), 
                    "value": parseInt(Math.random()*10)})
            }

            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        console.log(params)
                        return 'time : '+params[0].name + '<br />' + 'value : '+ params[0].value;
                    },
                    textStyle: {
                        fontSize: 10
                    }
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '3%',
                    top: '3%',
                    containLabel: true,
                    show: true,
                    backgroundColor: '#3683D3'
                },
                xAxis: {
                    type: 'category',
                    data: data1.map(function (item,idx) {
                        return item.date;
                    }),
                    axisLabel: {
                        formatter: function (value, idx) {
                            var hour = moment(value).hour();
                            var date = new Date(value);
                            if(hour == 12){
                                return hour + ':00'
                            } else {
                                return moment(value).format("DD MMM");
                            }
                        },
                        fontSize: 12*screenWidth/1280,
                        interval: 3,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff;'
                        }
                    },
                    boundaryGap: false,
                    axisLine:{
                        lineStyle:{
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    axisLabel: {
                        formatter: function (val) {
                            return '$'+val+'.00  ';
                        },
                        fontSize: '0.2rem',
                        color: '#fff'
                    },
                    splitNumber: 3,
                    boundaryGap: [0, '200%'],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff;'
                        }
                    },
                    nameTextStyle: {
                        fontSize: 14*screenWidth/1280
                    },
                    axisLine:{
                        lineStyle:{
                            color: '#fff;'
                        }
                    }
                },
                series: [
                    {
                        type: 'line',
                        data: data1.map(function (item) {
                            return item.value;
                        }),
                        hoverAnimation: false,
                        symbolSize: 6,
                        itemStyle: {
                            normal: {
                                color: '#c23531'
                            }
                        },
                        showSymbol: false
                    },
                    {
                        type: 'line',
                        data: data2.map(function (item) {
                            return item.value;
                        }),
                        hoverAnimation: false,
                        symbolSize: 6,
                        itemStyle: {
                            normal: {
                                color: '#00cfcf'
                            }
                        },
                        showSymbol: false
                    }
                ]
            };

            this.chart.setOption(option);
        }
    }
});

Vue.component('neo-wallet-list', {
    template: 
    '<div class="neo-wallet-list">'+
        '<div class="row header">'+
                '<div class="row header">'+
                    // '<div class="col col-1">'+
                    //     '<span>Num</span>'+
                    //  '</div>'+
                    '<div class="col col-1">'+
                        '<span>{{$t("address.value") }}</span>'+
                    '</div>'+
                    '<div class="col col-2">'+
                        '<span>{{$t("address.blockIndex") }}</span>'+
                    '</div>'+
                    '<div class="col col-3">'+
                        '<span>{{$t("address.time") }}</span>'+
                    '</div>'+
                    // '<div class="col col-3">'+
                    //     '<span>Transactions</span>'+
                    // '</div>'+
                    // '<div class="col col-4">'+
                    //     '<span>Last Transaction</span>'+
                    // '</div>'+
                    // '<div class="col col-5">'+
                    //     '<span>Tokens</span>'+
                    // '</div>'+
                    '<div class="underlayer"></div>'+
                '</div>'+
        '</div>'+
        '<div class="row item" v-for="(item, idx) in items">'+
            // '<div class="col col-1">'+
            //     '<span>{{item.num}}</span>'+
            // '</div>'+
            '<div class="col col-1">'+
                '<span v-on:click="goto(item.addr)">{{item.addr}}</span>'+
            '</div>'+
            '<div class="col col-2">'+
                '<span>{{item.created}}</span>'+
            '</div>'+
            '<div class="col col-3">'+
                '<span>{{item.time}}</span>'+
            '</div>'+
            // '<div class="col col-4">'+
            //     '<span>{{item.last}}</span>'+
            // '</div>'+
            // '<div class="col col-5">'+
            //     '<span> NEO: {{item.neo}}</span>'+
            //     '<span> GAS: {{item.gas}}</span>'+
            // '</div>'+
            '<div class="underlayer">'+
            '</div>'+
            '<i class="icon iconfont icon-search"></i>'+
        '</div>'+
        '<div class="clear"></div>'+
    '</div>',
    props: {
        page: Number,
        count: Number
    },
    data: function() {
        return {
            items: [],
            currentPage: 1
        }
    },
    methods: {
        init: function() {
            var that = this;
            that.walletItems = [];
            axios({
                url: host+'/api/v1/'+network+'/public/graphql',
                method: 'post', 
                data: {
                    query: 
                    '{'+
                        'AddressQuery (skip:'+(this.currentPage-1)*this.count+', limit:'+ this.count +' ) {'+
                        'count,'+
                        'rows {'+
                          ' _id '+
                          ' address '+
                          ' time '+
                          ' blockIndex '+
                        '}'+
                      '}'+
                    '}'
                }
            })
            .then(function (resp) {
                console.log(resp)
                console.log(resp.data.data.AddressQuery.rows)
                that.items = [];
                var rows = resp.data.data.AddressQuery.rows;
                for(var i=0; i<rows.length; i++){
                    var row = rows[i];
                    that.items.push({
                        num: i,
                        addr: row.address,
                        created: row.blockIndex,
                        time:  moment(row.time*1000).format("YYYY-MM-DD | HH:mm:ss")
                        // trans: '--',
                        // last: '2839bytes'
                    })
                }
                that.$emit('loaded', resp.data.data.AddressQuery)
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        goto: function(address) {
            window.location.href = 'addrinfo.html?address=' + address + `&network=${GetUrlParam('network') || 'mainnet'}`
        },
        setCurrentPage: function(currentPage) {
            this.currentPage = currentPage;
        }
    }
});

Vue.component('neo-address-list', {
    template: 
    '<div class="neo-address-list">'+
        '<h4 class="update">{{$t("address.update")}}</h4>'+
        '<div class="row header">'+
                '<div class="row header">'+
                    '<div class="col col-1">'+
                        '<span>{{$t("address.rank")}}</span>'+
                    '</div>'+
                    '<div class="col col-2">'+
                        '<span>{{$t("address.value")}}</span>'+
                    '</div>'+
                    '<div class="col col-3">'+
                        '<span>{{$t("address.balance") }}</span>'+
                    '</div>'+
                    '<div class="underlayer"></div>'+
                '</div>'+
        '</div>'+
        '<div class="row item" v-for="(item, idx) in items">'+
            '<div class="col col-1">'+
                '<span>{{20 * (currentPage-1) + idx + 1}}</span>'+
            '</div>'+
            '<div class="col col-2">'+
                '<span v-on:click="goto(item.addr)">{{item.addr}}</span>'+
            '</div>'+
            '<div class="col col-3">'+
                '<span>{{item.balance}}</span>'+
            '</div>'+
            '<div class="underlayer">'+
            '</div>'+
        '</div>'+
        '<div class="clear"></div><br>'+

        '<paginate'+
            ' :page-count="Math.ceil(totalCount/pageCount)"'+
            ' :click-handler="changePaginate"'+
            ' :page-range="2"'+
            ' :prev-text="$t(\'pagination.prev\')"'+
            ' :next-text="$t(\'pagination.next\')"'+
            ' container-class="neo-pagination">'+
        ' </paginate>'+

        '<div class="clear"></div><br>'+
    '</div>',
    props: {
        id: String
    },
    data: function() {
        return {
            items: [],
            pageCount: 20,
            currentPage: 1,
            totalCount: 0
        }
    },
    methods: {
        init: function(start = 0 ,end = 19) {
            var that = this;
            that.addressItems = [];
            axios({
                url: host+'/api/v1/'+network+'/asset/transaction/' + that.id.substring(2)+`?start=${start}&end=${end}`,
                method: 'get', 
            })
            .then(function (resp) {
                // console.log(resp)
                console.log(resp.data.data)
                const result = resp.data.data.list
                that.items = [];
                that.totalCount = resp.data.data.count
                for(var i=0; i< result.length; i = i + 2){
                    that.items.push({
                        addr: result[i],
                        balance: result[i+1] || 0,
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        goto: function(address) {
            window.location.href = 'addrinfo.html?address=' + address + `&network=${GetUrlParam('network') || 'mainnet'}`
        },
        changePaginate: function(pageNum) {
            this.currentPage = pageNum
            const start = 20 * (pageNum - 1)
            const end = start + 19
            this.init(start,end)
            // console.log('start',start);
            // console.log('end',end);
        }

    }
});

Vue.component('neo-tran-record', {
    template:
    '<div class="neo-tran-record" v-bind:class="{\'border\': showborder}">'+
        '<div class="neo-tran-record__left">'+
            '<div v-for="(left, leftIdx) in record.left">'+
                '<div class="neo-tran-record__title">{{left.title}}</div>'+
                '<div class="neo-tran-record__address" v-on:click="goto(left.address)"><i class="icon iconfont icon-search"></i> <span>{{left.address}}</span></div>'+
                '<div class="neo-tran-record__amount"><span>{{left.value}} {{left.symbol}}</span></div>'+
            '</div>'+        
        '</div>'+
        '<div class="neo-tran-record__middle">'+
            '<i class="icon iconfont icon-arrow-right"></i>'+
        '</div>'+
        '<div class="neo-tran-record__right">'+
            '<div v-for="(right, rightIdx) in record.right">'+
                '<div class="neo-tran-record__title">{{right.title}}</div>'+
                '<div class="neo-tran-record__address" v-on:click="goto(right.address)"><i class="icon iconfont icon-search"></i><span>{{right.address}}</span></div>'+
                '<div class="neo-tran-record__amount"><span>{{right.value}} {{right.symbol}}</span></div>'+
            '</div>'+   
        '</div>'+
        '<div class="underlayer"></div>'+
        '<div class="clear"></div>'+
    '</div>',
    props: {
        showborder: Boolean,
        record: Object
    },
    methods: {
        goto: function(address) {
            window.location.href = "addrinfo.html?address="+ address + `&network=${GetUrlParam('network') || 'mainnet'}`
        }
    }
});

Vue.component('neo-tran-list', {
    template:
    '<div class="neo-tran-list">'+
        '<div class="title" v-if="title!=\'\'">{{title}}</div>'+
        '<div class="row header">'+
            '<div class="col col-1"><span>{{$t("transaction.type") }}</span></div>'+
            '<div class="col col-2"><span>{{$t("transaction.transactionId") }}</span></div>'+
            '<div class="col col-3"><span>{{$t("transaction.time") }}</span></div>'+
            '<div class="underlayer"></div>'+
        '</div>'+
        '<div class="wrapper" v-for="(item, idx) in items">'+
            '<div class="row item" v-bind:class="{\'expand\': item.expand}">'+
                '<div class="col col-1">'+
                    '<span>{{item.type}}</span>'+
                '</div>'+
                '<div class="col col-2">'+
                    '<span v-on:click="goto(idx)">{{item.tranid}}</span>'+
                '</div>'+
                '<div class="col col-3">'+
                    '<span>{{item.time}}</span>'+
                '</div>'+
                '<div class="col col-4" v-on:click="expandTranItem(idx)">'+
                '</div>'+
                '<i class="icon iconfont icon-arrow-down-1" v-if="item.records.length > 0"></i>'+
                '<div class="underlayer"></div>'+
            '</div>'+
            '<div v-if="item.expand">'+
                '<neo-tran-record v-for="(recordItem, recordIdx) in item.records" v-bind:record="recordItem"></neo-tran-record>'+
            '</div>'+
        '</div>'+
    '</div>',
    props: {
        title: Boolean,
        page: Number,
        count: Number,
        block: Number,
        address: Number
    },
    data: function() {
        return {
            items: [],
            category: 'Any',
            currentPage: 1,
            asset: ''
        }
    },
    computed: {
        QueryFilter: function() {
            var filter = '';
            if(this.currentPage && this.count){
                filter += 'skip:'+(this.currentPage-1)*this.count+', limit:'+ this.count;
            }
            
            if(this.block) {
                filter += ' ,blockIndex:'+this.block;
            }

            if(this.address) {
                filter += ' ,address: "' + this.address +'"';
            }

            if(this.category && this.category != 'Any') {
                filter += ' ,type: "' + this.category +'Transaction"';
            }

            if(this.asset && this.asset != '') {
                filter += ' ,asset: "' + this.asset + '"';
            }

            return filter;
        }
    },
    methods: {
        expandTranItem: function(idx) {
            // if(this.items[idx].type != 'Invocation') {
            //     return;
            // }
            this.items[idx].expand = !this.items[idx].expand;
            this.$set(this.items, idx, this.items[idx]);
        },
        setCategory: function(category) {
            this.category = category
            this.init()
        },
        setCurrentPage: function(currentPage) {
            this.currentPage = currentPage;
        },
        setAsset: function(asset) {
            this.asset = asset
        },  
        init: function() {
            var that = this;
            that.items = [];
            axios({
                url: host+'/api/v1/'+network+'/public/graphql',
                method: 'post', 
                data: {
                    query: 
                    '{'+
                        'TransactionQuery ('+that.QueryFilter+' ) {'+
                        'count,'+
                        'rows {'+
                          ' _id '+
                          ' txid '+
                          ' blockIndex '+
                          ' time '+
                          ' size '+
                          ' type '+
                          ' vin { '+
                            ' vout '+
                            ' txid '+
                            ' utxo { '+
                                ' address '+
                                ' value '+
                                ' asset '+
                                ' name '+
                            ' } '+
                          ' } '+
                          ' vout { '+
                                ' address ' +
                                ' value ' +
                                ' asset ' +
                                ' n ' +
                                ' name ' +
                          ' } '+
                          ' nep5 { '+
                                ' to'+
                                ' from  '+
                                ' symbol '+
                                ' value '+
                                ' operation '+
                                ' assetId '+
                          ' } '+
                          ' scripts { '+
                            ' invocation '+
                            ' verification '+
                          ' } '+
                        '}'+
                      '}'+
                    '}'
                }
            })
            .then(function (resp) {
                
                that.$emit('loaded', resp.data.data.TransactionQuery)
                that.items = [];
                for(var i=0; i<resp.data.data.TransactionQuery.rows.length; i++){
                    var row = resp.data.data.TransactionQuery.rows[i];
                    var item = {
                        type: row.type.replace('Transaction',''),
                        tranid: row.txid,
                        time: moment(row.time*1000).format("YYYY-MM-DD | HH:mm:ss"),
                        records: [],
                        expand: false,
                    }
                    that.items.push(item)
                   
                    if(row.vin || row.vout){
                        
                        var vins = row.vin;
                        var vouts = row.vout;
                        var record = { left: [], right: []}

                        for(var j = 0; j < vins.length; j++){
                            var vinItem = vins[j];
                            record.left.push({
                                title: "",
                                symbol: vinItem.utxo.name,
                                value: vinItem.utxo.value,
                                address: vinItem.utxo.address
                            })
                        }

                        for(var k=0; k < vouts.length; k++){
                            var voutItem = vouts[k];
                            record.right.push({
                                title: "",
                                symbol: voutItem.name,
                                value: voutItem.value,
                                address: voutItem.address
                            })
                        }

                        if(record.left.length  || record.right.length){
                            item.records.push(record)
                        }  
                    }

                    if(row.nep5 && row.nep5.length > 0){
                        var nep5s = row.nep5;
                        for(var l = 0; l < nep5s.length; l ++){
                            var nep5Item = nep5s[l];
                            item.records.push({
                                left: [{
                                    // title: "Sent From",
                                    symbol: nep5Item.symbol == null ? '--' : nep5Item.symbol,
                                    address: nep5Item.from,
                                    value: nep5Item.value
                                }],
                                right: [{
                                    // title: "Sent From",
                                    symbol: nep5Item.symbol == null ? '--' : nep5Item.symbol,
                                    address: nep5Item.to,
                                    value: nep5Item.value
                                }]
                            })
                        }
                    }

                    if(item.records && item.records.length > 0){
                        console.log('left',item.records[0].left.length)
                        console.log('right',item.records[0].right.length)
                        if(item.records[0].left.length > 0){
                            item.records[0].left[0].title = that.$t('transaction.sentFrom');
                        }
    
                        if(item.records[0].right.length > 0){
                            item.records[0].right[0].title = that.$t('transaction.sentTo')
                        } 
                    }
                }


            })
            .catch(function (error) {
                console.log(error);
            });
        },
        goto: function(idx) {
            console.log(idx)
            var item = this.items[idx];
            window.location.href = 'traninfo.html?id='+ item.tranid + `&network=${GetUrlParam('network') || 'mainnet'}`
        }
    }
})

Vue.component('neo-tran-info', {
    template: 
    '<div class="neo-tran-info">'+
        '<div class="warpper" v-for="(item, itemIdx) in transaction">'+
            '<div class="neo-tran-info__item" v-bind:class="{\'first\': itemIdx%3==0}">'+
                '<h1>{{item.title}}</h1>'+
                '<span v-bind:class="{\'link\': item.url}" v-on:click="goto(item.url)">{{item.desc}}</span>'+
                '<div class="underlayer"></div>'+
            '</div>'+
            '<div class="clear" v-if="itemIdx % 3 == 2 || itemIdx == transaction.length - 1"></div>'+
        '</div>'+
    '</div>',
    props: {
        transaction: Array
    },
    data: function() {
        return {
            // items:[]
            // items: [
            //     {title: 'Time', desc: '1 minute ago'},
            //     {title: 'Type', desc: '1 minute ago'},
            //     {title: 'Network Fee', desc: '1 minute ago'},
            //     {title: 'Network Fee', desc: '1 minute ago'},
            //     {title: 'BlockIndex', desc: '1 minute ago'},
            //     {title: 'Size', desc: '1 minute ago'}
            // ]
        }
    },
    methods:{
        goto: function(url){
            if(url){
                window.location.href = url;
            }
        }
    }

});

Vue.component('neo-tran-script',{
    template:
    '<div class="neo-tran-script">'+
        '<div class="neo-tran-script__item" v-for="(item, itemIdx) in scripts">'+
            '<div class="neo-tran-script__item-title">{{item.title}}</div>'+
            '<div class="neo-tran-script__item-desc">{{item.desc}}</div>'+
            '<div class="underlayer"></div>'+
        '</div>'+
    '</div>',
    props: {
        scripts: Array
    }
});

Vue.component('neo-block-list', {
    template: 
    '<div class="neo-block-list">'+
        '<div class="row header">'+
            '<div class="col col-1">'+
                '<span>{{$t("block.height")}} </span>'+
            '</div>'+
            '<div class="col col-2">'+
                '<span>{{$t("block.size")}}</span>'+
            '</div>'+
            '<div class="col col-3">'+
                '<span>{{$t("block.transactions")}}</span>'+
            '</div>'+
            '<div class="col col-4">'+
                '<span>{{$t("block.time")}}</span>'+
            '</div>'+
            '<div class="underlayer"></div>'+
        '</div>'+
        '<div class="row item" v-for="(item, idx) in items">'+
            '<div class="col col-1">'+
                '<span v-on:click="goto(item.height)">{{item.height}}</span>'+
            '</div>'+
            '<div class="col col-2">'+
                '<span>{{item.size}}</span>'+
            '</div>'+
            '<div class="col col-3">'+
                '<span>{{item.trans}}</span>'+
            '</div>'+
            '<div class="col col-4">'+
                '<span>{{item.created}}</span>'+
            '</div>'+
            '<div class="underlayer"></div>'+
            '<i class="icon iconfont icon-sign-five"></i>'+
        '</div>'+
    '</div>',
    props: {
        page: Number,
        count: Number
    },
    data: function() {
        return {
            items: [
            ],
            currentPage: 1
        }
    },
    methods:{
        init: function() {
            var that = this;
            that.walletItems = [];
            axios({
                url: host+'/api/v1/'+network+'/public/graphql',
                method: 'post', 
                data: {
                    query: 
                    '{'+
                        'BlockQuery (skip:'+(this.currentPage-1)*this.count+', limit:'+ this.count +' ) {'+
                        'count,'+
                        'rows {'+
                          ' _id '+
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
                        '}'+
                      '}'+
                    '}'
                }
            })
            .then(function (resp) {
                console.log(resp)
                that.$emit('loaded', resp.data.data.BlockQuery)
                that.items = [];
                for(var i=0; i<resp.data.data.BlockQuery.rows.length; i++){
                    var row = resp.data.data.BlockQuery.rows[i];
                    that.items.push({
                        height: row.index.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','),
                        size: row.size.toString().replace(/(?=((?!\b)\d{3})+$)/g, ',') + ' ' + that.$t('block.byte'),
                        trans: row.transactions,
                        created: row.time == null ? 'N/A' : moment(row.time*1000).format("YYYY-MM-DD | HH:mm:ss")
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        goto: function(index) {

            window.location.href = 'blockinfo.html?index=' + index.toString().replace(/,/g, '') + `&network=${GetUrlParam('network') || 'mainnet'}`
        },
        setCurrentPage: function(currentPage) {
            this.currentPage = currentPage;
        }
    }
})

Vue.component('neo-block-info', {
    template: 
    '<div class="neo-block-info">'+ 
        '<div class="warpper" v-for="(item, itemIdx) in block">'+
            '<div class="neo-block-info__item" v-bind:class="{\'first\': itemIdx%3==0}">'+
                '<h1>{{item.title}}</h1>'+
                '<span v-bind:class="{\'link\': item.url}" v-on:click="goto(item.url)">{{item.desc}}</span>'+
                '<div class="underlayer"></div>'+
            '</div>'+
            '<div class="clear" v-if="itemIdx % 3 == 2 || itemIdx == block.length - 1"></div>'+
        '</div>'+
    '</div>',
    props: {
        block: Array
    },
    data: function() {
        return {
            // block: [
            //     {title: 'BlockIndex', desc: '1 minute ago'},
            //     {title: 'Transactions', desc: '1 minute ago'},
            //     {title: 'Hash', desc: '1 minute ago'},
            //     {title: 'Time', desc: '1 minute ago'},
            //     {title: 'Version', desc: '1 minute ago'},
            //     {title: 'Merkleroot', desc: '1 minute ago'},
            //     {title: 'Size', desc: '1 minute ago'},
            // ]
        }
    },
    methods: {
        goto: function(url){
            if(url){
                window.location.href = url;
            }
        }
    }
});

Vue.component('neo-addr-info', {
    template:
    '<div class="neo-addr-info ">'+
        '<div class="balance">'+

            '<div v-for="item in items" class="col item" v-if="item.balances != '+'0'+' ">'+
                
                '<h3>{{item.name}}</h3>'+
                '<h4>{{item.balances}}</h4>'+
            '</div>'+

            
            '<div class="col item"  v-show = "isZero">'+
                '<h3>{{$t("address.zero")}}</h3>'+
            '</div>'+

            
            '<div class="clear"></div>'+
        '</div>'+
        '<div class="underlayer"></div>'+
        ''+
    '</div>',
    data: function() {
        return {
            items: [],
            isZero: true
        }
    },
    methods: {
        init: function(address) {
            // this.$refs.chart.init();
            var that = this;
            axios({
                url: host+'/api/v1/'+network+'/address/balances/'+address,
                method: 'get'
            })
            .then(function (resp) {
                // console.log('resp',resp);
                that.items = resp.data.data
                for (const item of that.items) {
                    if(item.balances != '0'){
                        that.isZero = false
                        break
                    }
                    // console.log('item',item.balances)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    
    }
});

Vue.component('neo-asset-list', {
    template: 
    '<div class="neo-asset-list" v-cloak>'+
        '<div class="row hd">'+
            '<div class="col col-1"><span>{{$t("asset.name")}}</span></div>'+
            '<div class="col col-2"><span>{{$t("asset.type")}}</span></div>'+
            '<div class="col col-3"><span>{{$t("asset.assetId")}}</span></div>'+
            '<div class="col col-4"><span>{{$t("asset.amount")}}</span></div>'+
            '<div class="underlayer"></div>'+
        '</div>'+
        '<div class="row item" v-for="(item, itemIdx) in items">'+
            '<div class="col col-1" v-bind:title="item.name"><span>{{item.name}}</span></div>'+
            '<div class="col col-2"><span>{{item.type}}</span></div>'+
            '<div class="col col-3 link" v-on:click="detail(itemIdx)"><span>{{item.id}}</span></div>'+
            '<div class="col col-4"><span>{{item.amount}}&nbsp; {{item.symbol}}</span></div>'+
            '<div class="underlayer"></div>'+
        '</div>'+
    '</div>',
    props: {
        page: Number,
        count: Number
    },
    data: function() {
        return {
            items: [],
            currentPage: 1,
            keyword: ''
        }
    },
    methods: {
        init: function() {
            var that = this;
            that.items = [];
            axios({
                url: host+'/api/v1/'+network+'/public/graphql',
                method: 'post', 
                data: {
                    query:'{'+
                            ' AssetQuery(skip: ' + (that.currentPage-1) * that.count +', limit: '+ that.count + (that.keyword == '' ? '' : ', search:"'+that.keyword+'"') +' ){ '+
                                ' count '+
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
                                ' } '+
                            
                            ' } '+
                        ' } '
                }
            })
            .then(function (resp) {
                console.log(resp)
                that.$emit('loaded', resp.data.data.AssetQuery)
                that.items = [];
                for(var i=0; i<resp.data.data.AssetQuery.rows.length; i++){
                    var row = resp.data.data.AssetQuery.rows[i];
                    that.items.push({
                        id: row.assetId == null ? 'N/A' : row.assetId.substring(2),
                        symbol: row.symbol == null ? '' : row.symbol,
                        amount: row.amount == null ? 'N/A' : row.amount.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','),
                        name: row.name == null ? 'N/A' : (row.name[0].name || 'N/A'),
                        type: row.type == null ? 'N/A' : row.type
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        setCurrentPage: function(currentPage) {
            this.currentPage = currentPage;
        },
        setSearchKeyword: function(keyword) {
            this.keyword = keyword
        },
        detail: function(idx) {
            console.log(this.items[idx])
            window.location.href = 'assetinfo.html?index=0x'+this.items[idx].id + `&network=${GetUrlParam('network') || 'mainnet'}`
        }
    }
})

Vue.component('neo-select', {
    template: 
    '<div class="neo-select" v-if="visiable" v-bind:style="{left: left, right: right, top: top}">'+
        '<div class="neo-select-arrow"></div>'+
        '<div class="neo-select-list">'+
            '<div class="neo-select-item" v-bind:class="{\'last\': itemIdx==items.length-1}" v-for="(item,itemIdx) in items" v-on:click="selected(itemIdx)">{{item.name}}</div>'+
        '</div>'+
    '</div>',
    props: {
        data: Array,
        left: Number,
        right: Number,
        top: Number
    },
    data: function() {
        return {
            visiable: false
        }
    },
    computed: {
        items: function() {
            if(this.data && this.data.length > 0) {
                return this.data
            }

            var arr = [];
            for(var i = 0; i < 5; i++) {
                arr.push({
                    code: 'item'+i,
                    name: '选项'+i
                })
            }
            return arr;
        }
    },
    methods: {
        selected: function(idx) {
            this.$emit('selected', this.items[idx])
        },
        show: function() {
            this.visiable = true;
        },
        hide: function() {
            this.visiable = false;
        }
    }
})

Vue.component('neo-search', {
    template: 
    '<div class="neo-search">'+
        '<input type="text" v-on:keyup.enter="search" v-model="keyword"> </input>' +
        '<i class="icon iconfont icon-search" v-on:click="search"></i>'+
    '</div>',
    data: function() {
        return {
            keyword: ''
        }
    },
    methods: {
        search: function () {
            this.$emit('search', this.keyword)
        }
    }
})
