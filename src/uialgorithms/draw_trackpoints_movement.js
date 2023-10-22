import { forEachTrackpoint, forEachTrackpointSprial, getTrackpoint, getTrackpointInterpol, getTrackpointList, setInterpolatedTrackpoint } from "../data/featuretrack";
import { forEachFeatureTrack, isFeatureTrackSelected } from "../data/featuretrack_manager";
import { getX } from "../data/trackpoint";
import { interpolateObj } from "../utils/interpolation";
import { mapWithBothNeighboursInc, mapWithOneNeighbourExc } from "../utils/list_operations";
import { drawCircle, drawLine, drawLineLinearGrad, drawRectangle} from "./draw_canvas";


const getAlphaValue = (drawSettings, currentFrame, trackpointFrame, movement) => {
    const frameAlpha = 1 - ( drawSettings.historyLength > 0 ? (Math.abs(trackpointFrame - currentFrame) / drawSettings.historyLength) : 0 );
    //console.log(frameAlpha);
    return frameAlpha * (1 - drawSettings.movementAlphaProp * (1 - movement));
};



const getFrameColorCircleNormal = (drawSettings, currentFrame, trackpointFrame) => {
    if (trackpointFrame === currentFrame) return drawSettings.colorCurrentFrame;
    else if (trackpointFrame < currentFrame) return drawSettings.colorPrevFrame;
    else return drawSettings.colorFutureFrame;
}

const getFrameColorCircleMov = (drawSettings, currentFrame, trackpointFrame) => {
    if (trackpointFrame === currentFrame) return drawSettings.colorCurrentFrameMov;
    else if (trackpointFrame < currentFrame) return drawSettings.colorPrevFrameMov;
    else return drawSettings.colorFutureFrameMov;
}

const getFrameColorCircle = (drawSettings, currentFrame, trackpointFrame, alpha, movement) => {
    let color = null;
    if (drawSettings.interpolateMovColors) {
        color = interpolateObj( getFrameColorCircleNormal(drawSettings, currentFrame, trackpointFrame), 
                                getFrameColorCircleMov(drawSettings, currentFrame, trackpointFrame), movement);
    } else {
        color = getFrameColorCircleNormal(drawSettings, currentFrame, trackpointFrame);
    }
    return { ...color, alpha: alpha };
};


const getTrackpointCircleColor = (drawSettings, currentFrame, trackpointFrame, movement) => {
    const alpha = drawSettings.alphaFading ? getAlphaValue(drawSettings, currentFrame, trackpointFrame, movement) : 1;
    return getFrameColorCircle(drawSettings, currentFrame, trackpointFrame, alpha, movement);
}



const getFrameColorLineNormal = (drawSettings, currentFrame, trackpointFrame, formPrev) => {
    if (trackpointFrame < currentFrame || (currentFrame === trackpointFrame && formPrev)) return drawSettings.colorPrevFrame;
    else return drawSettings.colorFutureFrame;
}

const getFrameColorLineMov = (drawSettings, currentFrame, trackpointFrame, fromPrev) => {
    if (trackpointFrame < currentFrame || (currentFrame === trackpointFrame && fromPrev)) return drawSettings.colorPrevFrameMov;
    else return drawSettings.colorFutureFrameMov;
}

const getFrameColorLine = (drawSettings, currentFrame, trackpointFrame, fromPrev, alpha, movement) => {
    let color = null;
    if (drawSettings.interpolateMovColors) {
        color = interpolateObj( getFrameColorLineNormal(drawSettings, currentFrame, trackpointFrame, fromPrev), 
                                getFrameColorLineMov(drawSettings, currentFrame, trackpointFrame, fromPrev), movement);
    } else {
        color = getFrameColorLineNormal(drawSettings, currentFrame, trackpointFrame, fromPrev);
    }
    return { ...color, alpha: alpha };
};

const getTrackpointConnectionColor = (drawSettings, currentFrame, trackpoint1, trackpoint2) => {
    const movement = getMovementValueConnection(drawSettings, trackpoint1, trackpoint2);

    const alpha1 = drawSettings.alphaFading ? getAlphaValue(drawSettings, currentFrame, trackpoint1.frame, movement) : 1;
    const alpha2 = drawSettings.alphaFading ? getAlphaValue(drawSettings, currentFrame, trackpoint2.frame, movement) : 1;

    const color1 = getFrameColorLine(drawSettings, currentFrame, trackpoint1.frame, trackpoint1.frame < currentFrame, alpha1, movement);
    const color2 = getFrameColorLine(drawSettings, currentFrame, trackpoint2.frame, trackpoint1.frame < currentFrame, alpha2, movement);

    return [color1, color2];
};



const getDist = (x1, y1, x2, y2) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};


const getMovementValueConnection = (drawSettings, tp1, tp2) => {
    if (drawSettings.maxMovementValue == 0) return 0;
    const dist = getDist(tp1.x, tp1.y, tp2.x, tp2.y);
    const frameDiff = Math.abs(tp1.frame - tp2.frame);
    return Math.min(dist / frameDiff, drawSettings.maxMovementValue) / drawSettings.maxMovementValue;
};

const getMovementValueTrackpoint = (drawSettings, prev, curr, next) => {
    //alert(prev + " " + curr + " " + next);
    const distPrev = prev == undefined ? 0 : getMovementValueConnection(drawSettings, prev, curr);
    const distNext = next == undefined ? 0 : getMovementValueConnection(drawSettings, next, curr);
    //alert("end")
    return Math.max(distNext, distPrev);
};

const createCircleMovementArray = (drawSettings, currentFrame, featureTrack) => {
    let loopStart = Math.max(0, currentFrame - drawSettings.historyLength);
    let loopEnd = currentFrame + drawSettings.historyLength;

    let circleMovement = [];
    let prevTrackpoint = null;
    let currTrackpoint = null;
    let nextTrackpoint = null;
    for (let frame = loopStart; frame <= loopEnd; frame++) {
        const trackpoint = getTrackpoint(featureTrack, frame);
        if (trackpoint != null) {
            prevTrackpoint = currTrackpoint;
            currTrackpoint = nextTrackpoint;
            nextTrackpoint = trackpoint;

            if (currTrackpoint != null) circleMovement[currTrackpoint.frame] = getMovementValueTrackpoint(drawSettings, prevTrackpoint, currTrackpoint, nextTrackpoint);
        }
    }
    if (nextTrackpoint != null) circleMovement[nextTrackpoint.frame] = getMovementValueTrackpoint(drawSettings, currTrackpoint, nextTrackpoint, null);

    return circleMovement;
};

const getDrawInformation = (drawSettings, currentFrame, featureTrack) => {
    const loopStart = Math.max(0, currentFrame - drawSettings.historyLength);
    const loopEnd = currentFrame + drawSettings.historyLength;

    let circles = Array(drawSettings.historyLength * 2 + 1).fill(null);
    let lines = [];
    let rectangles = [];
    let prevTrackpoint = getTrackpointInterpol(featureTrack, loopStart);

    const circleMovement = createCircleMovementArray(drawSettings, currentFrame, featureTrack);
    const currentTrackpoint = getTrackpointInterpol(featureTrack, currentFrame);

    for (let frame = loopStart; frame <= loopEnd; frame++) {
        const trackpoint = getTrackpoint(featureTrack, frame);
        if (trackpoint != null) {

            if (prevTrackpoint != null && prevTrackpoint != trackpoint) {
                const [color1, color2] = getTrackpointConnectionColor(drawSettings, currentFrame, prevTrackpoint, trackpoint);
                lines.push({ x1: prevTrackpoint.x, y1: prevTrackpoint.y, color1: color1, x2: trackpoint.x, y2: trackpoint.y, color2: color2, width: drawSettings.connectionWidth });
            }

            const circlesIndex = frame <= currentFrame ? ((currentFrame - frame) * 2) : ((frame - currentFrame) * 2 - 1);
            circles[circlesIndex] = { x: trackpoint.x, y: trackpoint.y, radius: drawSettings.cricleRadius, color: getTrackpointCircleColor(drawSettings, currentFrame, frame, circleMovement[frame]) };
        
            prevTrackpoint = trackpoint;

        } else if (frame == currentFrame && currentTrackpoint != null) {
            if (prevTrackpoint != null && prevTrackpoint != currentTrackpoint) {
                const [color1, color2] = getTrackpointConnectionColor(drawSettings, currentFrame, prevTrackpoint, currentTrackpoint);
                lines.push({ x1: prevTrackpoint.x, y1: prevTrackpoint.y, color1: color1, x2: currentTrackpoint.x, y2: currentTrackpoint.y, color2: color2, width: drawSettings.connectionWidth });
                prevTrackpoint = currentTrackpoint;
            }
        }
    }

    if (prevTrackpoint != null && prevTrackpoint.frame != loopEnd) {
        const trackpoint = getTrackpointInterpol(featureTrack, loopEnd);
        if (trackpoint != null) {
            const [color1, color2] = getTrackpointConnectionColor(drawSettings, currentFrame, prevTrackpoint, trackpoint);
            lines.push({ x1: prevTrackpoint.x, y1: prevTrackpoint.y, color1: color1, x2: trackpoint.x, y2: trackpoint.y, color2: color2, width: drawSettings.connectionWidth });
        }
    }

    if (currentTrackpoint != null) {
        circles[0] = { x: currentTrackpoint.x, y: currentTrackpoint.y, radius: drawSettings.cricleRadius, color: getTrackpointCircleColor(drawSettings, currentFrame, currentTrackpoint.frame, 1) };
        rectangles.push({ x: currentTrackpoint.x - drawSettings.rectangleSize / 2, y: currentTrackpoint.y - drawSettings.rectangleSize / 2,
                        width: drawSettings.rectangleSize, height: drawSettings.rectangleSize, lineWidth: drawSettings.rectangleWidth, 
                        color: { red: 0, green: 0, blue: 0, alpha: 1 } });
    }

    return { circles: circles.filter(x => x != null), lines: lines, rectangles: rectangles };
};


const drawFromInfo = (context, drawInfo) => {
    for(let i = drawInfo.lines.length - 1; i >= 0; i--) {
        const { x1, y1, color1, x2, y2, color2, width } = drawInfo.lines[i];
        drawLineLinearGrad(context, x1, y1, x2, y2, [color1, color2], width);
    }

    for(let i = drawInfo.circles.length - 1; i >= 0; i--) {
        const { x, y, radius, color } = drawInfo.circles[i];
        drawCircle(context, x, y, radius, color)
    }

    for(let i = drawInfo.rectangles.length - 1; i >= 0; i--) {
        const { x, y, width, height, lineWidth, color } = drawInfo.rectangles[i];
        drawRectangle(context, x, y, width, height, lineWidth, color)
    }
};



const drawFeatureTracks = (context, drawSettings, currentFrame, featureTrackManager) => {
    forEachFeatureTrack(featureTrackManager, (ft, selected) => {
        const drawInfo = getDrawInformation(drawSettings, currentFrame, ft);
        drawFromInfo(context, drawInfo);
    })
}

export default drawFeatureTracks;