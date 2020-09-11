'use strict';

import adapter from 'webrtc-adapter';

export class CameraAction {
  /**
   * @constructor
   * @param {Camera}
   */
  constructor(camera) {
    this.camera = camera;

    this.stream = null;

    this.videos = [];
    this.isFrontCamera = false;

    this.constraints = {
      video: {
        facingMode: {
          exact: 'environment',
        },
        width: { ideal: 4096 },
        height: { ideal: 2160 },
      },
      audio: false,
    };
  }

  /**
   * set front camera status
   * @param {boolen} falg
   */
  setIsFrontCamera(flag) {
    this.isFrontCamera = flag;
  }

  /**
   * connect device camera
   * @return Promise
   */
  connect() {
    return new Promise((resolve, reject) => {
      const promise = this._connectCamera();
      promise
        .then((stream) => {
          this._successCallback(stream);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * ストリームをCanvasに描画する
   */
  play() {
    this.camera.update(this.isFrontCamera);
  }

  _connectCamera() {
    if (navigator.mediaDevices === undefined) {
      return Promise.reject(new Error('It does not support your browser.'));
    }

    this.constraints.video.facingMode = this.isFrontCamera
      ? 'user'
      : 'environment';

    if (this.stream !== null) {
      this.stream.getVideoTracks().forEach((camera) => {
        camera.stop();
      });
    }
    return navigator.mediaDevices.getUserMedia(this.constraints);
  }

  _successCallback(stream) {
    this.stream = stream;
    this.camera.setStream(this.stream);
  }
}
