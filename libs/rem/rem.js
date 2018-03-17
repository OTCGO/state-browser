(function (script) {
  var document = window.document,
    docEl = document.documentElement,
    psd = script ? ~~script.dataset.psd : 750,
    dpr = 1,
    scale = 0.2 / dpr,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var metaEl = document.createElement('meta')
  metaEl.name = 'viewport'
  metaEl.content = 'width=device-width, user-scalable=yes, initial-scale=' + scale + ', maximum-scale=' + scale*100 + ', minimum-scale=' + scale
  docEl.firstElementChild.appendChild(metaEl)
  var recalc = function () {
    var width = docEl.clientWidth*750/1280;
    window.screenWidth = width / dpr ;
    window.screenSize = 'M'
   
    if ( width / dpr < 1280 && width / dpr > 750){
      width = docEl.clientWidth*750/1280
      window.screenSize = 'P'
    }
    if (width / dpr >= 1280) {
      width = docEl.clientWidth*750/1280 //psd * dpr
      window.screenSize = 'B'
    }
    docEl.dataset.width = width;
    docEl.dataset.persent = 100 * (width / psd)
    docEl.style.fontSize = 100 * (width / psd) + 'px'
    console.log(window.screenWidth) 
    console.log(window.screenSize) 
  }
  recalc()
  if (!document.addEventListener) return
  window.addEventListener(resizeEvt, recalc, false)
})(document.querySelector('script[data-psd]'))