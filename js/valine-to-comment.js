$(function () {
    if(window.location.hash){
        var checkExist = setInterval(function() {
           if ($(window.location.hash).length) {
              $('html, body').animate({scrollTop: $(window.location.hash).offset().top-90}, 1000);
              clearInterval(checkExist);
           }
        }, 100);
    }
 })
