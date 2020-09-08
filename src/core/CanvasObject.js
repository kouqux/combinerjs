'use strict';

import { Position } from './Position';

/**
 * Canvas Object
 */
export class CanvasObject {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx 2D コンテキスト
   * @param {number} x X 座標
   * @param {number} y Y 座標
   * @param {number} w 幅
   * @param {number} h 高さ
   */
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx;
    this.position = new Position(x, y);
    /**
     * 横幅
     * @type {number}
     */
    this.width = w;
    /**
     * 縦幅
     * @type {number}
     */
    this.height = h;
  }
}
