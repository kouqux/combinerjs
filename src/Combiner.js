import { Img } from './elements/Img';
import { Camera } from './elements/Camera';
import { ImgAction } from './actions/ImgAction';
import { CameraAction } from './actions/CameraAction';
import { createElement } from './utils/elementCreator';
import { PARENT_ID } from './config/define';

export class Combiner {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx 2D コンテキスト
   * @param {number} x X 座標
   * @param {number} y Y 座標
   * @param {string} imagePath 画像パス
   */
  constructor(imagePath) {
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

    this._init(imagePath);
  }

  _init(imagePath) {
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
    this.img = new Img(this.ctx, this.width / 2, this.height / 2, imagePath);
    this.imgAction = new ImgAction(this.canvasEle, this.img);

    // camera
    this.camera = new Camera(this.ctx, this.width, this.height, this.videoEle);
    this.cameraAction = new CameraAction(this.camera, this.width, this.height);
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
