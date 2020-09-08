'use strict';
/**
 * 座標を管理するためのクラス
 */
export class Position {
  /**
   * @constructor
   * @param {number} x X 座標
   * @param {number} y Y 座標
   */
  constructor(x, y) {
    /**
     * X 座標
     * @type {number}
     */
    this.x = x;
    /**
     * Y 座標
     * @type {number}
     */
    this.y = y;
  }

  /**
   * 値を設定する
   * @param {number} [x] - 設定する X 座標
   * @param {number} [y] - 設定する Y 座標
   */
  set(x, y) {
    if (x != null) {
      this.x = x;
    }
    if (y != null) {
      this.y = y;
    }
  }
}
