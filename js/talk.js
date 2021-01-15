(() => {
  const app = cloudbase.init({
    env: 'twikoo-0g4kq65j533f5df2', //這裏是你的環境id
    region: "ap-guangzhou"
  })

  app.auth({
      persistence: "none" //避免與同實例衝突
  }).anonymousAuthProvider().signIn().then(() => {
    
      const talkWrap = document.getElementById('talk-wrap')
      const collection = app.database().collection('talks')

      var count=0, per = 9,page = 1, hasButton = false
      collection.count().then(function(res){
        count = res.total
        talkWrap.innerHTML = `<p>目前發佈了 <span class="data-count">${count}</span> 條説説</p>`;
        getList()
      }).catch(err => {
        console.log(err)
    });

      function getList(){
        if((page-1)*per >= count){
          return
        }
        var d,date,resCont=''
        collection.limit(per).skip((page-1)*per).orderBy('date','desc').get().then(function(res) {
          res.data.forEach(item => {
            d = item.date,data = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate() +' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
            dataCont = `<p class="data-content">${urlToLink(item.content)}</p>`
            dataFrom = item.from ? `<span class="data-from">${item.from}</span>` : ''
            dataInfo = `<span class="data-info"><small><time>${data}</time>  ·「${dataFrom}」</small></span>`
            resCont += `<li class="item"><div>${dataCont+dataInfo}</div></li>`
          });

          const buttonEle = document.querySelector('#talk-wrap .load-btn')
          const injectEle = buttonEle ? buttonEle : talkWrap
          const injectPos = buttonEle ? 'beforebegin' : 'beforeend'
          injectEle.insertAdjacentHTML(injectPos, `<section class="timeline page-${page}"><ul>${resCont}</ul></section>`);

          if(page*per >= count){
            if (!hasButton) return
            buttonEle.parentNode.removeChild(buttonEle);
            return
          } else {
            if (!hasButton) {
              const ele = document.createElement('button')
              ele.type = 'button'
              ele.className = 'load-btn button--animated'
              ele.textContent = '加載更多'
              ele.addEventListener('click', getList)
              hasButton = true
              talkWrap.appendChild(ele)
            }
          }
          page++
          Lately({ 'target': '#talk-wrap time' });
        });
      }
  }).catch(err => {
      console.log(err)
  });

  function urlToLink(str) {
    var re =/\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/ig;
    var re_forpic =/\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/ig;
    str = str.replace(re,function (website) {
      return `<a href='${website}' rel='noopener' target='_blank'>🚀鏈接</a>`;
    });
    str =str.replace(re_forpic,function (imgurl) {
      return `<a href="${imgurl}" target='_blank'><img loading="lazy" src="${imgurl}" 
      onerror="this.onerror=null;this.src='https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/talk-error-placehold.png'"/></a>`;
    });
    return str;
  };

  /*
  MIT License - http://www.opensource.org/licenses/mit-license.php
  For usage and examples, visit:
  https://tokinx.github.io/lately/
  Copyright (c) 2017, Biji.IO
  */
  var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(b){var g=0;return function(){return g<b.length?{done:!1,value:b[g++]}:{done:!0}}};$jscomp.arrayIterator=function(b){return{next:$jscomp.arrayIteratorImpl(b)}};$jscomp.makeIterator=function(b){var g="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return g?g.call(b):$jscomp.arrayIterator(b)};
  (function(b,g){var p=function(h){var d=h.lang||{second:"\u79d2",minute:"\u5206\u949f",hour:"\u5c0f\u65f6",day:"\u5929",month:"\u4e2a\u6708",year:"\u5e74",ago:"\u524d",error:"NaN"};h=$jscomp.makeIterator(document.querySelectorAll(h.target||".time"));for(var c=h.next();!c.done;c=h.next()){c=c.value;var a=c.dateTime;var e=c.title,f=c.innerHTML;if(!a||isNaN(new Date(a=a.replace(/(.*)[a-z](.*)\+(.*)/gi,"$1 $2").replace(/-/g,"/"))))if(e&&!isNaN(new Date(e=e.replace(/-/g,"/"))))a=e;else if(f&&!isNaN(new Date(f=
  f.replace(/-/g,"/"))))a=f;else break;c.title=a;a=new Date(a);a=((new Date).getTime()-a.getTime())/1E3;e=a/60;f=e/60;var k=f/24,l=k/30,m=l/12;c.innerHTML=(1<=m?Math.floor(m)+d.year:1<=l?Math.floor(l)+d.month:1<=k?Math.floor(k)+d.day:1<=f?Math.floor(f)+d.hour:1<=e?Math.floor(e)+d.minute:1<=a?Math.floor(a)+d.second:d.error)+d.ago}};var n=function(){return this||(0,eval)("this")}();"Lately"in n||(n.Lately=p)})();

})()