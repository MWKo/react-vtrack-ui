export const createTrackpoint = (frame, x, y) => { return { frame: frame, x: x, y: y } };
export const getX = (tp) => tp.x;
export const getY = (tp) => tp.y;
export const getFrame = (tp) => tp.frame;
//export default Trackpoint;