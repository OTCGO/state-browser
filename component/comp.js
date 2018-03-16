Vue.component('neo-title', {
    template:
    '<div class="neo-title">'+
        '<div class="neo-title__main"><span>NEO</span></div>' + 
        '<div class="neo-title__sub"><span>NEP5</span></div>'+
        '<div class="neo-title__sub"><span>OTCGO</span></div>'+
    '</div>',
});

Vue.component('neo-info-title', {
    template:
    '<div class="neo-info-title">'+
        '<div class="title">{{title}}</div>'+
        '<div class="subtitle">{{subtitle}} {{id}} </div>'+
        '<div class="goback"></div>'+
    '</div>',
    props: {
        title: String,
        id: String,
        subtitle: String
    },
})

Vue.component('neo-menu', {
    template: 
    '<div class="neo-menu" v-cloak>'+
        '<div class="neo-menu__item" v-for="(item,itemIdx) in menu" v-on:click="changeMenuItem(itemIdx)">'+
            '<span>'+
                '{{item.name}}'+
                '<i class="icon iconfont icon-arrow-down" v-if="item.items"></i>'+
            '</span>'+
            '<div class="underline" v-bind:style="{left: positions[idx]}" v-if="itemIdx == idx && idx > 1"></div>'+
        '</div>'+
    '</div>',
    props: {
        idx: Number
    },
    data: function(){
        return {
            menu:[
                {name: this.$t("menu.language"), items:[]},
                {name: this.$t("menu.api")},
                {name: this.$t("menu.assets"), href:"assets.html" },
                {name: this.$t("menu.home"), href:"index.html"}
            ],
            positions: ['', '', '0.23', '0.25rem']
        }
    },
    methods: {
        changeMenuItem: function(idx) {
            console.log(idx);
            this.idx = idx;
            var menuItem = this.menu[idx];
            console.log(menuItem)
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
        '<neo-menu v-bind:idx="menuIdx"></neo-menu>'+
    '</div>',
    data: function() {
        return {
            menuIdx: 1
        }
    },
    methods: {
        setMenuIdx: function(idx) {
            this.menuIdx = idx;
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
        '<input type="text" v-on:keyup="handleKeyup" v-model="search" v-bind:placeholder="$t('+`'slider.dynamic.search'`+')" />'+
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
        '<div class="category">'+
            '<span>Any <i class="icon iconfont icon-arrow-down"></i></span>'+
        '</div>'+
    '</div>'+
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
            '<div class="item"><span>NEW WALLET</span></div>'+
            '<div class="item middle"><span>OPEN WALLET</span></div>'+
            '<div class="item"><span>MENU</span></div>'+
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
        }
    },
    props: {
        itemidx: Number,
        total: Number
    },
    data: function() {
        return {
            toolboxPositions: [0.2, 1.8, -4.5, 2.8, 0.2],
            search: undefined
        }
    },
    methods: {
        // search
        handleSearch: function() {
            console.log('search',this.search.length)
            // address start 'A'
            if(this.search.replace(/\s+/g,"").substring(0,1) === 'A'){
                window.location.href = 'addrinfo.html?address=' + this.search
                return
            }
            //txid lenght  64 or 66
            if(this.search.length === 64 || this.search.length === 66) {
                //console.log('/traninfo.html?id=' + (this.search.length === 66 ? this.search : `0x${this.search}`))
                window.location.href = 'traninfo.html?id=' + (this.search.length === 66 ? this.search : `0x${this.search}`)
                return
            }

            //block height only contains number
            if(/^\d+$/.test(this.search)) {
                window.location.href = 'blockinfo.html?index=' + this.search
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
            
        }
    }
});

Vue.component('neo-footer', {
    template: 
    '<div class="neo-footer">'+
        '<div class="folder">'+
            '<div class="wrapper">'+
                '<a href="#top"><i class="icon iconfont icon-arrow-up"></i></a>'+
            '</div>'+
        '</div>'+
        '<div class="sns">'+
            // '<i class="icon iconfont icon-qq"></i>'+
            // '<i class="icon iconfont icon-wechat"></i>'+
        '</div>'+
        '<div class="info">'+
            // '<div>{{$t("footer.link")}}: <a href="https://otcgo.cn">OTCGO</a> </div>'+
            // '<div>Switch block chain: The test chain is not open temporarily</div>'+
            '<div>{{$t("footer.version")}}: v2.7.2</div>'+
        '</div>'+
        '<div class="recnum">'+
            // 'Record number: 湘ICP备16019051号-1'+
        '</div>'+
    '</div>'
});

Vue.component('neo-paging', {
    template:
    '<div class="neo-paging">'+
    '<div class="info" v-bind:style="{color: TintColor}">'+
        '{{$t("pagination.current")}}'+
        ' {{(CurrentPage-1)*PageCount+1}} '+ 
        ' {{$t("pagination.to")}} '+ 
        ' {{CurrentPage*PageCount>TotalCount ? TotalCount : CurrentPage*PageCount}} '+ 
        ' {{$t("pagination.total")}} '+ 
        ' {{TotalCount}} '+ 
    '</div>'+
    '<div class="page">'+
        '<i class="icon iconfont icon-arrow-left prev" v-bind:class="{\'disable\': CurrentPage==1}" v-if="CurrentPage==1"></i>'+
        '<i class="icon iconfont icon-arrow-left prev" v-on:click="prevPage" v-bind:style="{background: TintColor}" v-if="CurrentPage!=1"></i>'+
        '<i class="icon iconfont icon-arrow-right2 next" v-on:click="nextPage" v-bind:style="{background: TintColor}" v-if="CurrentPage<TotalPage"></i>'+
        '<i class="icon iconfont icon-arrow-right2 next" v-bind:class="{\'disable\': CurrentPage>=TotalPage}" v-if="CurrentPage>=TotalPage"></i>'+
    '</div>'+
    '</div>',
    props: {
        tint: String,
        page: Number,
        count: Number,
        total: Number
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
        '<div class="neo-dynamic-list__item" v-for="(item, itemIdx) in items">'+
            '<h1>{{item.value}} <i>{{item.unit}}</i></h1>'+
            '<h2>{{item.desc}}</h2>'+
            '<div class="neo-dynamic-list__item-underlayer"></div>'+
        '</div>'+
    '</div>',
    data: function() {
        return {
            items: undefined
        }
    },
    methods: {
        init: function() {
            let that = this 
            axios({
                url: `${host}/api/v1/${network}/public/graphql`,
                method: 'post', 
                data: {
                    query: `{
                        SystemQuery{
                          rows {
                            startTime
                            curretTime
                            blockNum
                            assetNum
                            addressNum
                            transactionNum
                          }
                        }
                      }
                    `
                }
            })
            .then(function (resp) {
                // console.log(resp)
                console.log(resp.data.data.SystemQuery.rows)
                result = resp.data.data.SystemQuery.rows
                that.items = [
                    {value: moment(result.startTime*1000).format("YYYY-MM-DD"), unit: '', desc: that.$t('dynamic.startTime')},
                    {value: moment(result.curretTime*1000).diff(moment(result.startTime*1000), "days"), unit: that.$t('dynamic.day'), desc:  that.$t('dynamic.runTime')},
                    {value: result.assetNum.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','), unit: '', desc: that.$t('dynamic.assetNum')},
                    {value: result.blockNum.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','), unit: '', desc: that.$t('dynamic.blockNum') },
                    {value: result.transactionNum.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','), unit: '', desc: that.$t('dynamic.transactionNum') },
                    {value: result.addressNum.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','), unit: '', desc:that.$t('dynamic.addressNum')}
                ]
            })
            .catch(function (error) {
                console.log(error);
            });

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
        }
    },
    methods: {
        init: function() {
            var that = this;
            that.walletItems = [];
            axios({
                url: `${host}/api/v1/${network}/public/graphql`,
                method: 'post', 
                data: {
                    query: 
                    '{'+
                        'AddressQuery (skip:'+(this.page-1)*this.count+', limit:'+ this.count +' ) {'+
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
            window.location.href = 'addrinfo.html?address=' + address
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
            window.location.href = "addrinfo.html?address="+address
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
            items: []
        }
    },
    computed: {
        QueryFilter: function() {
            var filter = '';
            if(this.page && this.count){
                filter += 'skip:'+(this.page-1)*this.count+', limit:'+ this.count;
            }
            
            if(this.block) {
                filter += ' ,blockIndex:'+this.block;
            }

            if(this.address) {
                filter += ' ,address: "' + this.address +'"';
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
        init: function() {
            var that = this;
            that.items = [];
            axios({
                url: `${host}/api/v1/${network}/public/graphql`,
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
                    if(row.vin && row.vout && row.vin.length > 0 
                        && row.vout.length > 0){
                        var vins = row.vin;
                        var vouts = row.vout;
                        var record = { left: [], right: []}

                        for(var j = 0; j < vins.length; j++){
                            var vinItem = vins[j];
                            record.left.push({
                                // title: "Sent From",
                                symbol: vinItem.utxo.name,
                                value: vinItem.utxo.value,
                                address: vinItem.utxo.address
                            })
                        }

                        for(var k=0; k < vouts.length; k++){
                            var voutItem = vouts[k];
                            record.right.push({
                                // title: "Sent To",
                                symbol: voutItem.name,
                                value: voutItem.value,
                                address: voutItem.address
                            })
                        }

                        item.records.push(record)
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
                        item.records[0].left[0].title = that.$t('transaction.sentFrom');
                        item.records[0].right[0].title = that.$t('transaction.sentTo')
                    }
                }

                console.log('items',that.items)
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        goto: function(idx) {
            console.log(idx)
            var item = this.items[idx];
            window.location.href = 'traninfo.html?id='+item.tranid
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
        }
    },
    methods:{
        init: function() {
            var that = this;
            that.walletItems = [];
            axios({
                url: `${host}/api/v1/${network}/public/graphql`,
                method: 'post', 
                data: {
                    query: 
                    '{'+
                        'BlockQuery (skip:'+(this.page-1)*this.count+', limit:'+ this.count +' ) {'+
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
                        size: row.size.toString().replace(/(?=((?!\b)\d{3})+$)/g, ',')+'bytes',
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

            window.location.href = 'blockinfo.html?index=' + index.toString().replace(/,/g, '')
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

            '<div class="clear"></div>'+

        '</div>'+
        // '<div class="chart">'+
        //     '<div class="title">Last 25 Transactions for NEO</div>'+
        //      '<neo-market-neochart ref="chart"></neo-market-neochart>'+
        //     '<div class="date">2018.1.Jan</div>'+
        // '</div>'+
        '<div class="underlayer"></div>'+
        ''+
    '</div>',
    data: function() {
        return {
            items: []
        }
    },
    methods: {
        init: function(address) {
            // this.$refs.chart.init();
            var that = this;
            axios({
                url: `${host}/api/v1/${network}/address/balances/${address}`,
                method: 'get'
            })
            .then(function (resp) {
                // console.log('resp',resp);
                that.items = resp.data.data
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
            '<div class="col col-3"><span>{{item.id}}</span></div>'+
            '<div class="col col-4"><span>{{item.amount}}</span></div>'+

            '<div class="underlayer"></div>'+
        '</div>'+
    '</div>',
    props: {
        page: Number,
        count: Number
    },
    data: function() {
        return {
            items: []
        }
    },
    methods: {
        init: function() {
            var that = this;
            that.items = [];
            axios({
                url: `${host}/api/v1/${network}/public/graphql`,
                method: 'post', 
                data: {
                    query:`{
                            AssetQuery(skip:${(this.page-1) * this.count } , limit:${this.count}) {
                            count
                            rows {
                                _id
                                assetId
                                symbol
                                type
                                amount
                                name {
                                lang
                                name
                                }
                            }
                            
                            }
                        }
                    `
                }
            })
            .then(function (resp) {
                console.log(resp)
                that.$emit('loaded', resp.data.data.AssetQuery)
                that.items = [];
                for(var i=0; i<resp.data.data.AssetQuery.rows.length; i++){
                    var row = resp.data.data.AssetQuery.rows[i];
                    that.items.push({
                        id: row.assetId == null ? 'N/A' : row.assetId,
                        // symbol: row.symbol == null ? 'N/A' : row.symbol,
                        amount: row.amount == null ? 'N/A' : row.amount,
                        name: row.name == null ? 'N/A' : (row.name[0].name || 'N/A'),
                        type: row.type == null ? 'N/A' : row.type
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})


