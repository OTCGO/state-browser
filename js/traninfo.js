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
    data:function(){
        return {
            records: undefined,
            scripts: undefined,
            transaction:[]
        }
    } ,
    computed: {
        id: function() {
            return GetUrlParam('id');
        }
    },
    methods: {
        appevent: function() {
            this.$refs.header.hideSelect();
        },
        init: function() {
            // this.$refs.neochart.init();
            // this.$refs.wallet.init();
            var that = this;
            axios({
                url: host+'/api/v1/'+network+'/public/graphql',
                method: 'post', 
                data: {
                    query: 
                        '{'+
                            'TransactionQuery (txid:"'+this.id+'") {'+
                            'count,'+
                            'rows {'+
                                ' _id '+
                                ' txid '+
                                ' blockIndex '+
                                ' size '+
                                ' type '+
                                ' sys_fee '+
                                ' time '+
                                ' net_fee '+                                       
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
                var count = resp.data.data.TransactionQuery.count;

                if(count > 0){
                    var item = resp.data.data.TransactionQuery.rows[0];
                    var records = []

                    if(item.vin || item.vout){
                        
                        var vins = item.vin;
                        var vouts = item.vout;
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
                            records.push(record)
                        }  
                    }

                    if(item.nep5 && item.nep5.length > 0){
                        var nep5s = item.nep5;
                        for(var l = 0; l < nep5s.length; l ++){
                            var nep5Item = nep5s[l];
                            records.push({
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

                    if(records && records.length > 0){
                        console.log('left',records[0].left.length)
                        console.log('right',records[0].right.length)
                        if(records[0].left.length > 0){
                            records[0].left[0].title = that.$t('transaction.sentFrom');
                        }
    
                        if(records[0].right.length > 0){
                            records[0].right[0].title = that.$t('transaction.sentTo')
                        } 
                    }
                    

                    // tran records       
                    that.records = records


                    if(item.scripts && item.scripts.length > 0){
                        that.scripts = []
                    }
                    for(var i=0; i<item.scripts.length; i++){
                        var row = item.scripts[i]

                        if(row.invocation){
                            that.scripts.push({
                                title: that.$t('transaction.invocationScript'),
                                desc: row.invocation
                            })
                        }
                        if(row.verification) {
                            that.scripts.push({
                                title: that.$t('transaction.verificationScript'),
                                desc: row.verification
                            })
                        }
                    }

                    // transactionItems
                    that.transaction = [
                        {title: that.$t('transaction.time'), desc: moment(item.time*1000).format("YYYY-MM-DD | HH:mm:ss")},
                        {title: that.$t('transaction.type'), desc: item.type},
                        {title: that.$t('transaction.networkFee'), desc: item.net_fee},
                        {title: that.$t('transaction.systemFee'), desc: item.sys_fee},
                        {title: that.$t('block.index'), desc: item.blockIndex, url: 'blockinfo.html?index='+item.blockIndex},
                        {title: that.$t('transaction.size'), desc: item.size+ ' bytes' }
                    ]
                   
                    // console.log('transaction',that.transaction)

                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})

app.init();