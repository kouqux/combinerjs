'use strict';

import {} from 'hammerjs';

export class ImgAction {
  /**
   * @constructor
   * @param {Element} canvas
   * @param {Img} img 画像クラス
   */
  constructor(canvas, img) {
    this.manager = new Hammer(canvas);
    this.img = img;

    this.currentRotation = 0;
    this.startRotation = null;
    this.lastRotation = null;

    this.canPinch = true;
    this.canRotate = false;

    this._init();
    this._registActions();
  }

  _init() {
    this.manager.get('pinch').set({ enable: true });
    this.manager.get('rotate').set({ enable: true });
  }

  _registActions() {
    this._swipeActions();
    this._pincActions();
    this._rotateActions();
  }

  _swipeActions() {
    this.manager.on('panstart', (e) => {
      e.preventDefault();
      this.img.dragStart(e.deltaX, e.deltaY);
    });
    this.manager.on('panmove', (e) => {
      e.preventDefault();
      this.img.drag(e.deltaX, e.deltaY);
    });
    this.manager.on('swipe', (e) => {
      e.preventDefault();
      this.img.dragEnd();
    });
  }

  _pincActions() {
    this.manager.on('pinchstart', (e) => {
      this.canPinch = true;
    });
    this.manager.on('pinchin', (e) => {
      e.preventDefault();
      if (!this.canPinch) return;
      if (this.canRotate) return;
      this.img.scaleDown();
    });
    this.manager.on('pinchout', (e) => {
      if (!this.canPinch) return;
      if (this.canRotate) return;
      this.img.scaleUp();
    });
    this.manager.on('pinchend', (e) => {
      this.canPinch = false;
    });
  }

  _rotateActions() {
    this.manager.on('rotatestart', (e) => {
      this.lastRotation = this.currentRotation;
      this.startRotation = Math.round(e.rotation);
    });

    this.manager.on('rotatemove', (e) => {
      const diff = this.startRotation - Math.round(e.rotation);
      this.currentRotation = this.lastRotation - diff;
      // 負の値なら符号を反転
      const unsingDiff = Math.sign(diff) === -1 ? -diff : diff;
      if (unsingDiff > 10) {
        // ある程度、指を回さないといけない
        this.canRotate = true;
        this.canPinch = false;
      }
      if (!this.canRotate) return;
      this.img.changeAngle(this.currentRotation);
    });

    this.manager.on('rotateend', (e) => {
      this.lastRotation = this.currentRotation;
      this.canRotate = false;
      this.canPinch = true;
    });
  }

  freeze() {
    this.manager.get('pinch').set({ enable: false });
    this.manager.get('rotate').set({ enable: false });
    this.manager.get('swipe').set({ enable: false });
    this.manager.get('pan').set({ enable: false });
  }
  unfreeze() {
    this.manager.get('pinch').set({ enable: true });
    this.manager.get('rotate').set({ enable: true });
    this.manager.get('swipe').set({ enable: true });
    this.manager.get('pan').set({ enable: true });
  }
}
