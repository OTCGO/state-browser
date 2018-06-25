
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


// change url Param but not refesh
window.SetUrlParam = function(param,value){
    var query = location.search.substring(1);
    var p = new RegExp("("+param+")=[^&]*");
    if(p.test(query)){
        query = query.replace(p,"$1="+value);
        history.pushState({},"neo", '?'+query );
    }else{
        if(query == ''){
            history.pushState({},"neo", '?'+param+'='+value );
        }else{
            history.pushState({},"neo", '?'+query+'&'+param+'='+value );
        }
    }    
}


var network = GetUrlParam('network') || 'mainnet'
var host = '//state-api.otcgo.cn'
// var rpc = 'http://state-api.otcgo.cn:10332'

if(network === 'testnet'){
    host = 'https://future.otcgo.cn:5002'
}

