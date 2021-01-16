(() => {
  const loadTalk = () => {
    const app = cloudbase.init({
      env: 'twikoo-0g4kq65j533f5df2', // 這裏是你的環境id
      region: 'ap-guangzhou'
    })

    app.auth({
      persistence: 'none' // 避免與同實例衝突
    }).anonymousAuthProvider().signIn().then(() => {
      const talkWrap = document.getElementById('talk-wrap')
      const collection = app.database().collection('talks')

      let count = 0; const per = 9; let page = 1; let hasButton = false
      collection.count().then(function (res) {
        count = res.total
        talkWrap.innerHTML = `<p>目前發佈了 <span class="data-count">${count}</span> 條説説</p>`
        getList()
      }).catch(err => {
        console.log(err)
      })

      function getList () {
        if ((page - 1) * per >= count) {
          return
        }
        let formalDate; let date; let resCont = ''
        collection.limit(per).skip((page - 1) * per).orderBy('date', 'desc').get().then(function (res) {
          res.data.forEach(item => {
            date = item.date
            formalDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            const dataCont = `<p class="data-content">${urlToLink(item.content)}</p>`
            const dataFrom = item.from ? `<span class="data-from">${item.from}</span>` : ''
            const dataInfo = `<span class="data-info"><small><time datetime="${formalDate}" title="${formalDate}">${btf.diffDate(date, true)}</time>  ·「${dataFrom}」</small></span>`
            resCont += `<li class="item"><div>${dataCont + dataInfo}</div></li>`
          })

          const buttonEle = document.querySelector('#talk-wrap .load-btn')
          const injectEle = buttonEle || talkWrap
          const injectPos = buttonEle ? 'beforebegin' : 'beforeend'
          injectEle.insertAdjacentHTML(injectPos, `<section class="timeline page-${page}"><ul>${resCont}</ul></section>`)

          // medium zoom
          const zoomEle = talkWrap.querySelectorAll('img')
          addMediumZoom(zoomEle)

          if (page * per >= count) {
            if (!hasButton) return
            buttonEle.parentNode.removeChild(buttonEle)
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
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  function urlToLink (str) {
    const re = /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/ig
    const reForpic = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/ig
    str = str.replace(re, function (website) {
      return `<a href='${website}' rel='noopener' target='_blank'>🚀鏈接</a>`
    })
    str = str.replace(reForpic, function (imgurl) {
      return `<img loading="lazy" src="${imgurl}" 
      onerror="this.onerror=null;this.src='https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/talk-error-placehold.png'"/>`
    })
    return str
  };

  function addMediumZoom (ele) {
    const zoom = mediumZoom(ele)
    zoom.on('open', e => {
      const photoBg = document.documentElement.getAttribute('data-theme') === 'dark' ? '#121212' : '#fff'
      zoom.update({
        background: photoBg
      })
    })
  }

  window.pjax ? loadTalk() : window.addEventListener('DOMContentLoaded', loadTalk)
})()
