var ViewPagerIndicator = new Vue({
    el: '.viewpager .indicator',
    data: {
        items:[
            {title: 'Dynamic', subtitle: ''},
            {title: 'Market', subtitle: '74.00'},
            {title: 'Total Transactions', subtitle: '4,374,385'},
            {title: 'Last block', subtitle: '1,764,548'},
            {title: 'Wallet addresses created', subtitle: '474,479'}
        ],
        itemIdx: 4,
        positions: [
            [0, 6, 4, 2, 0],
            [0, 1, 4, 2, 0],
            [0, 1.3, 4, 3, 1],
            [0, 1.3, 2.6, 3, 0],
            [0, 1.3, 2.9, 4.2, 0]
        ]
    },
    methods: {
        changeItem: function(idx){
            console.log(idx);
            this.itemIdx = idx;
            if(ViewPage) {
                ViewPage.idx = idx;
                ViewPage.load();
                ViewPage.title = this.items[idx].title;
                if(idx == 1){
                    console.log("render chart")
                    setTimeout(function () {
                        ViewPage.renderNeoChart();
                    }, 200);
                }
            }
        }
    }
})

var ViewPage = new Vue({
    el: '.viewpager .viewpage',
    data: {
        title: 'Last Block',
        idx: 4,
        tabs: ['NEO','GAS'],
        tabIdx: 0,
        toolboxPositions: [0, 1.8, 2.8, 2.8, 0.5],
        dynamicItems: [
            {value: '441', unit: 'Day', desc: 'System runing time'},
            {value: '1,764,', unit: '956', desc: 'System block number'},
            {value: '6,142,', unit: '648', desc: 'Transaction quantity'},
            {value: '20', unit: 'pcs', desc: 'Amount of system assets'},
            {value: '1', unit: 'E', desc: 'NEO Circulation'},
            {value: '14,911,', unit: '952', desc: 'GAS Circulation'},
            {value: '22', unit: 'S', desc: 'Block output time'},
            {value: '6,715,', unit: '516', desc: 'Number of valid blocks'},
            {value: '4,377,', unit: '721', desc: 'Real transaction quantity'},
            {value: '474,', unit: '698', desc: 'Number of system addressess'},
            {value: '106,', unit: '869', desc: 'NEO holder'},
            {value: '139,', unit: '942', desc: 'GAS holder'}
        ],
        pagging:{
            show: false,
            tintColor: '',
            currentPage: 1,
            pageCount: 15,
            totalCount: '4,491,171'
        },
        tranItems: [
            {
                type: 'Gas Claim', 
                tranid: '86176541c97940a3b1c752609fdf218c', 
                computedon: '2018-01-01 | 11:22:33', 
                expand: false,
                detail: {
                    fromid: '86176541c97940a3b1c752609fdf218c',
                    fromval: '100NEO',
                    toid: '86176541c97940a3b1c752609fdf218c',
                    toval: '100NEO',
                    nwfee: '0 GAS',
                    sysfee: '0 GAS',
                    datasize: '202 bytes'
                }
            },
            {
                type: 'Contract', 
                tranid: '86176541c97940a3b1c752609fdf218c', 
                computedon: '2018-01-01 | 11:22:33', 
                expend: false,
                detail: {
                    fromid: '86176541c97940a3b1c752609fdf218c',
                    fromval: '100NEO',
                    toid: '86176541c97940a3b1c752609fdf218c',
                    toval: '100NEO',
                    nwfee: '0 GAS',
                    sysfee: '0 GAS',
                    datasize: '202 bytes'
                }
            },
            {
                type: 'Contract', 
                tranid: '86176541c97940a3b1c752609fdf218c', 
                computedon: '2018-01-01 | 11:22:33', 
                expand: false,
                detail: {
                    fromid: '86176541c97940a3b1c752609fdf218c',
                    fromval: '100NEO',
                    toid: '86176541c97940a3b1c752609fdf218c',
                    toval: '100NEO',
                    nwfee: '0 GAS',
                    sysfee: '0 GAS',
                    datasize: '202 bytes'
                }
            }
        ],
        blockItems: [
        ],
        walletItems: [
        ],
        neoChart: undefined
    },
    methods: {
        expandTranItem: function(idx) {
            this.tranItems[idx].expand = !this.tranItems[idx].expand;
            this.$set(this.tranItems, idx, this.tranItems[idx]);
        },
        changeTabItem: function(idx) {
            if(idx == this.tabIdx){
                return;
            }
            this.tabIdx = idx;
        },
        renderNeoChart: function() {
            if(this.neoChart){
                this.neoChart = undefined
            }
            
            this.neoChart = echarts.init(document.getElementById('neochart'));
            
            var data = [];

            for(var i = 0; i < 65; i++){
                data.push({
                    "date": moment('2018-01-12 00:00').add(3*i, 'hours').format('YYYY-MM-DD HH:mm'), 
                    "value": parseInt(Math.random()*10)})
            }

            console.log(data)

            this.neoChart.setOption(option = {
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
                data: data.map(function (item,idx) {
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
            series: [{
                type: 'line',
                data: data.map(function (item) {
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
            }]
            });

            this.neoChart.setOption(option);
            
        },
        load: function() {
            if(this.idx == 3){
                this.loadBlock();
            } else if(this.idx == 4){
                this.loadWallet();
            }
        },
        loadBlock: function(){
            var that = this;
            that.blockItems = [];
            axios.get('/data/block.json')
            .then(function (response) {
                console.log(response.data.data);
                var data = response.data.data;

                for(var i = 1; i < data.length; i++){
                    var elem = data[i];
                    that.blockItems.push({
                        height: elem.index.toString().replace(/(?=((?!\b)\d{3})+$)/g, ','),
                        size: elem.size + 'bytes',
                        trans: elem.tx.length,
                        created: moment(elem.time*1000).format("YYYY-MM-DD | HH:mm:ss")
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        loadWallet: function() {
            var that = this;
            that.walletItems = [];
            axios.get('/data/address.json')
            .then(function (response) {
                console.log(response.data.data);
                var data = response.data.data;

                for(var i = 1; i < data.length; i++){
                    var elem = data[i];
                    that.walletItems.push({
                        addr: elem._id,
                        created: moment(elem.createdAt*1000).format("YYYY-MM-DD | HH:mm:ss"),
                        trans: elem.balance.length,
                        last: '2839bytes', 
                        neo: '18', 
                        gas: '0.456456456456'
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})

//ViewPage.renderNeoChart();

var Assets = new Vue({
    el: '.assets',
    computed: {
        isPad: function(){;
            return window.screenWidth < 1280 && window.screenWidth > 750;
        },
        isPhone: function(){;
            return window.screenWidth < 750;
        }
    },
    data: {
        list: [
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'},
            {id: '0x1232323232323232323232323232323232323', name: 'RHT', type: 'NEP5'}
        ]
    },
    methods: {
        load: function() {
            this.list = [];
            var that = this;
            axios.get('/data/asset.json')
            .then(function (response) {
                console.log(response.data.data);
                var data = response.data.data;
                for(var i = 0; i < data.length; i++){
                    var elem = data[i];
                    that.list.push({
                        id: elem._id,
                        symbol: elem.symbol,
                        name: elem.name,
                        type: elem.type
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})

var Menu = new Vue({
    el: '.menu',
    data: {
        list:[
            {name: 'Explorer', href:"index.html"},
            {name: 'Assets', href:"assets.html"},
            {name: 'API'},
            {name: 'Language', items:[]}
        ],
        itemIdx:1
    },
    methods: {
        changeItem: function(idx){
            console.log(idx)
            var item = this.list[idx];
            if(item.href && this.itemIdx != idx){
                window.location.href = item.href;
            }
        }
    }
})