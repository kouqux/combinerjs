import { PREFIX, PARENT_ID, TOP_ID } from '../config/define';

export function createElement() {
  return {
    areaEle: createDivArea(),
    videoEle: createVideo(),
    canvasEle: createCanvas(),
    imgEle: createImg(),
  };
}

function createDivArea() {
  let ele = document.createElement('div');
  ele.setAttribute('id', PARENT_ID);
  ele.classList.add(`${PREFIX}-area`);

  ele.style.width = '100%';
  ele.style.height = '100%';
  ele.style.position = 'relative';
  return document.getElementById(TOP_ID).appendChild(ele);
}

function createVideo() {
  let ele = document.createElement('video');
  ele.setAttribute('id', `${PREFIX}-video`);
  ele.classList.add(`${PREFIX}-video`);
  ele.playsinline = true;
  ele.setAttribute('playsinline', true);
  ele.autoplay = true;

  ele = addCommonStyle(ele);
  ele.style.zIndex = 1;
  return document.getElementById(PARENT_ID).appendChild(ele);
}

function createCanvas() {
  let ele = document.createElement('canvas');
  ele.setAttribute('id', `${PREFIX}-canvas`);
  ele.classList.add(`${PREFIX}-canvas`);

  ele = addCommonStyle(ele);
  ele.style.zIndex = 2;
  return document.getElementById(PARENT_ID).appendChild(ele);
}

function createImg() {
  let ele = document.createElement('img');
  ele.setAttribute('id', `${PREFIX}-img`);
  ele.classList.add(`${PREFIX}-img`);

  ele = addCommonStyle(ele);
  ele.src = '';
  ele.style.zIndex = 3;
  ele.style.display = 'none';
  return document.getElementById(PARENT_ID).appendChild(ele);
}

function addCommonStyle(ele) {
  ele.style.width = '100%';
  ele.style.height = '100%';
  ele.style.position = 'absolute';
  return ele;
}
