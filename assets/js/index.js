window.onload = function () {
  const actionBtn = document.getElementById('actionBtn');
  const changeBtn = document.getElementById('changeBtn');
  let isLoaded = false;
  var isFrontCamera = false;

  combiner = new Combiner('./assets/img/mask.png');
  init();

  function init() {
    const callBack = combiner.connect(isFrontCamera);
    callBack
      .then(function () {
        isLoaded = true;
        _update();
      })
      .catch(function (err) {
        alert(err.message);
      });
  }

  function _update() {
    if (!isLoaded) return;
    combiner.update();
    requestAnimationFrame(_update);
  }

  actionBtn.addEventListener('click', function () {
    if (!isLoaded) return;
    if (actionBtn.getAttribute('data-isShoot') == '0') {
      combiner.combine();

      changeBtn.style.display = 'none';
      actionBtn.setAttribute('data-isShoot', 1);
      actionBtn.textContent = 'prev';
    } else {
      combiner.cancel();

      changeBtn.style.display = 'inline-block';
      actionBtn.setAttribute('data-isShoot', 0);
      actionBtn.textContent = 'shot';
    }
  });

  changeBtn.addEventListener('click', () => {
    if (!isLoaded) return;
    isLoaded = false;
    isFrontCamera = !isFrontCamera;
    init();
  });
};
