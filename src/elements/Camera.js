'use strict';

import { CanvasObject } from '../core/CanvasObject';

export class Camera extends CanvasObject {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx 2D コンテキスト
   * @param {number} w
   * @param {number} h
   * @param {HTMLElement} video
   */
  constructor(ctx, w, h, video) {
    super(ctx, 0, 0, w, h);
    this.video = video;
    /**
     * 読み込み済みフラグ
     * @type {boolean}
     */
    this.isLoaded = false;
  }

  /**
   * set width
   * @param {number} width
   */
  setWidth(width) {
    this.width = width;
  }
  /**
   * set height
   * @param {number} height
   */
  setHeight(height) {
    this.height = height;
  }

  /**
   * カメラストリームをセットする
   * @param {*} stream
   */
  setStream(stream) {
    this.isLoaded = true;
    // カメラストリームをプレイヤーのデータに設定
    this.video.srcObject = stream;
  }

  _draw() {
    this.ctx.save();
    this.ctx.drawImage(
      this.video,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.ctx.restore();
  }

  _mirrorDraw() {
    this.ctx.save();
    this.ctx.translate(this.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(
      this.video,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.ctx.restore();
  }

  /**
   * 更新
   * @type {boolean} 鏡像で描画するか
   */
  update(isMirror) {
    if (!this.isLoaded) return;
    if (isMirror) {
      this._mirrorDraw();
    } else {
      this._draw();
    }
  }
}
