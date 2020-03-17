<div class="app-refresh" id="app-refresh">
    <div class="app-refresh-wrap" onclick="location.reload()">
        <label>已更新最新版本</label>
        <span>點擊刷新</span>
    </div>
</div>
<script>
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            reg.addEventListener('updatefound', () => {
                newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            showNotification();
                        }
                    }
                });
            });
        });
    }
    
    function showNotification() {
      var bg = document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f1f1f' : '#49b1f5'
      $('#app-refresh').css('background',bg)
      $('#app-refresh').addClass('app-refresh-show')
    }
</script>

.app-refresh {
    height: 0;
    line-height: 3em;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    padding: 0 1rem;
    transition: all .3s ease;
}
.app-refresh-wrap {
    display: flex;
    color: #fff;
    height: 100%;
    align-items: center;
    cursor: pointer;
}
.app-refresh-wrap label {
    flex: 1;
}
.app-refresh-show {
    height: 2.7rem;
}