import { Img } from './elements/Img';
import { Camera } from './elements/Camera';
import { ImgAction } from './actions/ImgAction';
import { CameraAction } from './actions/CameraAction';
import { createElement } from './utils/elementCreator';
import { PARENT_ID } from './config/define';

export class Combiner {
  /**
   * @constructor
   * @param {string} imagePath 画像パス
   * @param {number | null} imageX image x
   * @param {number | null} imageY image y
   * @param {number | null} imageW image width
   * @param {number | null} imageH image height
   */
  constructor(
    imagePath,
    imageX = null,
    imageY = null,
    imageW = null,
    imageH = null
  ) {
    /** @param {HTMLVideoElement} */
    this.videoEle;
    /** @param {HTMLCanvasElement} */
    this.canvasEle;
    /** @param {HTMLImageElement} */
    this.imgEle;

    this.ctx;
    /** @param {Img} */
    this.img;
    /** @param {ImgAction} */
    this.imgAction;
    /** @param {Camera} */
    this.camera;
    /** @param {CameraAction} */
    this.cameraAction;

    /** @param {number} */
    this.width;
    /** @param {number} */
    this.height;

    /** @param {boolen} */
    this.isCombine = false;

    this._init(imagePath, imageX, imageY, imageW, imageH);
  }

  _init(imagePath, imageX, imageY, imageW, imageH) {
    const eles = createElement();
    this.videoEle = eles.videoEle;
    this.canvasEle = eles.canvasEle;
    this.imgEle = eles.imgEle;

    this.ctx = this.canvasEle.getContext('2d');

    // 親要素の横縦幅をセット
    const parentEle = document.getElementById(PARENT_ID);
    this.width = parentEle.clientWidth;
    this.height = parentEle.clientHeight;
    this.canvasEle.width = this.width;
    this.canvasEle.height = this.height;

    // image
    imageX = imageX ? imageX : this.width / 2;
    imageY = imageY ? imageY : this.height / 2;
    this.img = new Img(this.ctx, imageX, imageY, imageW, imageH, imagePath);
    this.imgAction = new ImgAction(this.canvasEle, this.img);

    // camera
    this.camera = new Camera(this.ctx, this.width, this.height, this.videoEle);
    this.cameraAction = new CameraAction(this.camera);
  }

  /**
   * connect device cameras
   * @param {boolean} isFrontCamera
   * @return {Promise}
   */
  connect(isFrontCamera = false) {
    this.cameraAction.setIsFrontCamera(isFrontCamera);
    return this.cameraAction.connect();
  }

  /**
   * update canvas
   */
  update() {
    if (this.isCombine) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.cameraAction.play();
    this.img.update();
  }

  /**
   * combine image and video
   */
  combine() {
    const base64 = this.canvasEle.toDataURL('image/jpeg');
    this.imgEle.src = base64;
    this.imgEle.style.display = 'block';
    this.isCombine = true;
    this.imgAction.freeze();
  }

  /**
   * cancel combine
   */
  cancel() {
    this.imgEle.style.display = 'none';
    this.isCombine = false;
    this.imgAction.unfreeze();
  }
}
