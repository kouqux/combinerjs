$(function () {
  let isMobile = false;

  init();

  function init() {
    if (isSmartphone()) {
      isMobile = true;
    }
    if (!isMobile) {
      $('#modal').fadeIn();
    }
  }

  function isSmartphone() {
    const ua = navigator.userAgentData;
    if (typeof ua !== 'undefined') {
      if (ua.mobile) {
        return true;
      } else {
        return false;
      }
    }
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return true;
    } else {
      return false;
    }
  }

  $(document).on('click touchend', function (event) {
    if (!$(event.target).closest('#modalContent').length) {
      $('#modal').fadeOut();
    }
  });
});
