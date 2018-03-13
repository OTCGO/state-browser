let host = 'http://future.otcgo.cn:5001'
let network = 'testnet'

// window.GetUrlParam = function (paraName) {
// 　　　　var url = document.location.toString();
// 　　　　var arrObj = url.split("?");

// 　　　　if (arrObj.length > 1) {
// 　　　　　　var arrPara = arrObj[1].split("&");
// 　　　　　　var arr;

// 　　　　　　for (var i = 0; i < arrPara.length; i++) {
// 　　　　　　　　arr = arrPara[i].split("=");

// 　　　　　　　　if (arr != null && arr[0] == paraName) {
// 　　　　　　　　　　return arr[1];
// 　　　　　　　　}
// 　　　　　　}
// 　　　　　　return "";
// 　　　　}
// 　　　　else {
// 　　　　　　return "";
// 　　　　}
// }

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