# combinerjs
> Combinerjs can combine video and image
## Usage
### HTML
```html
<div id="combiner"></div>
```
### JavaScript
Setup
```js
combiner = new Combiner('./assets/img/mask.png');

// connect your device cameras
const callBack = combiner.connect(isFrontCamera);
callBack
  .then(function () {
    _update();
  })
  .catch(function (err) {
    alert(err.message);
  });

/**
 * update canvas
 */
function _update() {
  combiner.update();
  requestAnimationFrame(_update);
}
```
Create a composite image
```js
 combiner.combine();
```

## DEMO
 [GitHub Pages](https://suhrr.github.io/combinerjs/)
