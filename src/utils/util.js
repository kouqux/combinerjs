export function getOrientation() {
  let angle = screen && screen.orientation && screen.orientation.angle;
  if (angle === undefined) {
    angle = window.orientation; // iOS用
  }
  const isPortrait = angle === 0;
  return {
    value: angle, // 具体的な角度
    isPortrait: isPortrait, // 縦向き
    isLandscape: !isPortrait // 横向き
  };
}
