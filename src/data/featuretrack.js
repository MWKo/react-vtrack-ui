import { interpolateMissingElements, linearInterpolation } from "../utils/interpolation";
import { pipeWith, bargs } from "../utils/pipe";
import { createTrackpoint, getFrame, getX, getY } from "./trackpoint";

export const createFeatureTrack = (id = 1, name = "") =>        { return { id: id, name: name, tps: [], movement: [], show: true } };

export const getID = (ft) =>                                    ft.id;

export const setName = (ft, name) =>                            { return { ...ft, name: name } };
export const getName = (ft) =>                                  ft.name;

const setTPS = (ft, tps) =>                                     { return { ...ft, tps: tps } };
const setMovement = (ft, movement) =>                           { return { ...ft, movement: movement } };

const calculateMovementBetween = (tp1, tp2) => {
    if (tp1 == null || tp2 == null || tp1.frame === tp2.frame) return null;
    const frameDist = Math.abs(tp1.frame - tp2.frame);
    return { dx: (tp2.x - tp1.x) / frameDist, dy: (tp2.y - tp1.y) / frameDist };
}

const updateMovement = (ft, frame) => {
    let leftFrame = frame - 1;
    while (leftFrame >= 0 && !hasTrackpoint(ft, leftFrame)) leftFrame--;

    let rightFrame = frame + 1;
    while (rightFrame < ft.tps.length && !hasTrackpoint(ft, rightFrame)) rightFrame++;

    const movLeft = calculateMovementBetween(ft.tps[leftFrame], ft.tps[frame]);
    const movRight = calculateMovementBetween(ft.tps[frame], ft.tps[rightFrame]);
    let newMovement = Array(Math.max(ft.movement.length, frame + 1));
    for(let f = 0; f < newMovement.length; f++) {
        if (f < leftFrame || f >= rightFrame) newMovement[f] = ft.movement[f];
        else if (f >= leftFrame && f < frame) newMovement[f] = movLeft;
        else if (f >= frame && f < rightFrame) newMovement[f] = movRight;
    }

    console.log(newMovement);
    console.log(ft.movement);

    return setMovement(ft, newMovement);
}


export const getMovement = (ft, frame) =>                       ft.movement[frame];
export const hasTrackpoint = (ft, frame) =>                     ft.tps[frame] != null;
export const getTrackpoint = (ft, frame) =>                     ft.tps[frame];
export const deleteTrackpoint = (ft, frame) =>                  { return { ...ft, tps: ft.tps.map(tp => tp != null && tp.frame === frame ? null : tp) } };
export const setTrackpoint = (ft, trackpoint) => {
    if (trackpoint == null) return ft;
    return pipeWith(ft, 
                    bargs(setTPS, Object.assign([], ft.tps, { [trackpoint.frame]: trackpoint })), 
                    bargs(updateMovement, trackpoint.frame));
}
export const getLastFrame = (ft) =>                             ft.tps.length;

export const getShow = (ft) =>                                  ft.show;
export const setShow = (ft, show) =>                            { return { ...ft, show: show } };

export const forEachTrackpoint = (ft, callbackFn) =>            ft.tps.filter(tp => tp !== null).forEach(callbackFn);
export const forEachTrackpointSprial = (ft, centerFrame, callbackFn) => {
    const distStart = centerFrame;
    const distEnd = ft.tps.length - centerFrame;
    const maxDist = distEnd > distStart ? distEnd : distStart;
    for (let dist = maxDist; dist >= 0; --dist) {
        const left = ft.tps[centerFrame - dist];
        const right = ft.tps[centerFrame + dist];
        if (left) callbackFn(left);
        if (right) callbackFn(right);
    }
}
export const forEachTrackpointSpiralIndex = (ft, centerFrame, callbackFn) => {
    const distStart = centerFrame;
    const distEnd = ft.tps.length - centerFrame;
    const maxDist = distEnd > distStart ? distEnd : distStart;
    for (let dist = maxDist; dist >= 0; --dist) {
        const left = ft.tps[centerFrame - dist];
        const right = ft.tps[centerFrame + dist];
        if (left) callbackFn(centerFrame - dist);
        if (right) callbackFn(centerFrame + dist);
    }
}
export const getTrackpointList = (ft) => ft.tps.filter(tp => tp !== null);






export const interpolate = (ft) => {
    const interpolFn = (tp1, tp2, weight, frameDiff) => {
        const interpolated = createTrackpoint(getFrame(tp1) + frameDiff, linearInterpolation(getX(tp1), getX(tp2), weight), linearInterpolation(getY(tp1), getY(tp2), weight));
        return interpolated;
    }
    return setTPS(ft, interpolateMissingElements(ft.tps, interpolFn));
}


export const getTrackpointInterpol = (ft, frame) => {
    const storedTrackpoint = getTrackpoint(ft, frame);
    if (storedTrackpoint != null) return storedTrackpoint;

    let leftFrame = frame;
    while (leftFrame >= 0 && !hasTrackpoint(ft, leftFrame)) leftFrame--;

    let rightFrame = frame;
    while (rightFrame < ft.tps.length && !hasTrackpoint(ft, rightFrame)) rightFrame++;

    const weight = (frame - leftFrame) / (rightFrame - leftFrame);
    const leftTp = getTrackpoint(ft, leftFrame);
    const rightTp = getTrackpoint(ft, rightFrame);
    if (leftTp == null || rightTp == null) return null;

    const interpolated = createTrackpoint(frame, linearInterpolation(getX(leftTp), getX(rightTp), weight), linearInterpolation(getY(leftTp), getY(rightTp), weight));
    return interpolated;
};

export const setInterpolatedTrackpoint = (ft, frame) => setTrackpoint(ft, getTrackpointInterpol(ft, frame));

//export default FeatureTrack;