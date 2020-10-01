'use strict';

class Config {
  constructor() {
    /**
     * suport the high resolution display
     * @param {boolaen}
     */
    this.isHighResolution = false;
  }

  /** @param {boolaen} */
  setIsHighResolution(flag) {
    this.isHighResolution = flag;
  }
}

export default new Config();
