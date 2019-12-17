'use strict';
var cheerio = require('cheerio');

function sw(source) {
  var $ = cheerio.load(source, {
    decodeEntities: false
  });

  var $a = $('<script>"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(e=>{e.addEventListener("updatefound",()=>{newWorker=e.installing,newWorker.addEventListener("statechange",()=>{if("installed"===newWorker.state&&navigator.serviceWorker.controller){var e="light"===document.documentElement.getAttribute("data-theme")?GLOBAL_CONFIG.Snackbar.bgLight:GLOBAL_CONFIG.Snackbar.bgDark,t=GLOBAL_CONFIG.Snackbar.position;Snackbar.show({text:"已更新最新版本",backgroundColor:e,duration:3e3,pos:t,actionText:"點擊刷新",actionTextColor:"#fff",onActionClick:function(e){location.reload()}})}})})});</script>')
  $('body').append($a)

  var $post_ad = $('<div class="post-ad"><ins class="adsbygoogle" style="display:block " data-ad-format="fluid" data-ad-layout-key="-fb+5w+4e-db+86" data-ad-client="ca-pub-8919908724705274" data-ad-slot="5978969231"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script></div>')
  var $aside = $('<div class="card_widget card-ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8919908724705274" data-ad-slot="8108145410" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script></div>')
  var $index_ad = $.html($('<div class="recent-post-item article-container ad_height"><ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-fb+5w+4e-db+86" data-ad-client="ca-pub-8919908724705274" data-ad-slot="1538867630"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script></div>'))
  var $css = $('<style type="text/css">.post-ad{margin: 2rem 0!important}.ad_height{height: auto !important;display: block !important}</style>')
  var $douban = $('<meta name="referrer" content="no-referrer">')

  $('head').append($css)



  $('.post-reward').after($post_ad)
  $('.card_widget.card-recent-post').after($aside)

  $('.recent-post-item').each((i, o) => {
    if ( i !== 0 && i % 3 == 0) {
      $(o).after($index_ad)
    }
  })

  if( $('.hexo-douban-tabs').length > 0){
    $('head').append($douban)
  }

  return $.html();
}


//在渲染之前，更改 img 标签
hexo.extend.filter.register('after_render:html', sw);