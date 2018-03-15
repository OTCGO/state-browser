



window.GetUrlParam = function(name){
    var url = document.location.toString();
    if(!name){
        return '';
    }
    url = url || location.search;
    name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
    var reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
    var match = url.match(reg);
    return !match ? '' : match[1];
}


let network = GetUrlParam('network') || 'mainnet'
let host = 'http://114.215.30.71:5001'

if(network === 'testnet'){
    host = 'http://future.otcgo.cn:5001'
}
