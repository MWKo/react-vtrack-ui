import { forEachTrackpoint, forEachTrackpointSprial, getLastFrame, getMovement, getShow, getTrackpoint, getTrackpointInterpol, getTrackpointList, setInterpolatedTrackpoint } from "../data/featuretrack";
import { forEachFeatureTrack, getAverageFeatureTrackMovements, isFeatureTrackSelected } from "../data/featuretrack_manager";
import { getX } from "../data/trackpoint";
import { assert } from "../utils/debug";
import { interpolateObj } from "../utils/interpolation";
import { mapWithBothNeighboursInc, mapWithOneNeighbourExc } from "../utils/list_operations";
import { drawCircle, drawLine, drawLineLinearGrad, drawRectangle} from "./draw_canvas";


const getAlphaValue = (drawSettings, currentFrame, trackpointFrame, deviation) => {
    assert(deviation != null);

    const frameAlpha = 1 - ( drawSettings.historyLength > 0 ? (Math.abs(trackpointFrame - currentFrame) / drawSettings.historyLength) : 0 );
    const alphaWithDeviation = frameAlpha * (1 - drawSettings.deviationAlphaProp * (1 - deviation));
    assert(!isNaN(alphaWithDeviation) && alphaWithDeviation != null);

    return alphaWithDeviation;
};


const getFrameColorCircleNormal = (drawSettings, currentFrame, trackpointFrame) => {
    if (trackpointFrame === currentFrame) return drawSettings.colorCurrentFrame;
    else if (trackpointFrame < currentFrame) return drawSettings.colorPrevFrame;
    else return drawSettings.colorFutureFrame;
}

const getFrameColorCircleDev = (drawSettings, currentFrame, trackpointFrame) => {
    if (trackpointFrame === currentFrame) return drawSettings.colorCurrentFrameDev;
    else if (trackpointFrame < currentFrame) return drawSettings.colorPrevFrameDev;
    else return drawSettings.colorFutureFrameDev;
}

const getFrameColorCircle = (drawSettings, currentFrame, trackpointFrame, alpha, deviation) => {
    let color = null;
    if (drawSettings.interpolateDevColors) {
        color = interpolateObj( getFrameColorCircleNormal(drawSettings, currentFrame, trackpointFrame), 
                                getFrameColorCircleDev(drawSettings, currentFrame, trackpointFrame), deviation);
    } else {
        color = getFrameColorCircleNormal(drawSettings, currentFrame, trackpointFrame);
    }
    return { ...color, alpha: alpha };
};


const getTrackpointCircleColor = (drawSettings, currentFrame, trackpointFrame, deviation) => {
    const alpha = drawSettings.alphaFading ? getAlphaValue(drawSettings, currentFrame, trackpointFrame, deviation) : 1;
    return getFrameColorCircle(drawSettings, currentFrame, trackpointFrame, alpha, deviation);
}



const getFrameColorLineNormal = (drawSettings, currentFrame, trackpointFrame, formPrev) => {
    if (trackpointFrame < currentFrame || (currentFrame === trackpointFrame && formPrev)) return drawSettings.colorPrevFrame;
    else return drawSettings.colorFutureFrame;
}

const getFrameColorLineDev = (drawSettings, currentFrame, trackpointFrame, fromPrev) => {
    if (trackpointFrame < currentFrame || (currentFrame === trackpointFrame && fromPrev)) return drawSettings.colorPrevFrameDev;
    else return drawSettings.colorFutureFrameDev;
}

const getFrameColorLine = (drawSettings, currentFrame, trackpointFrame, fromPrev, alpha, deviation) => {
    let color = null;
    if (drawSettings.interpolateDevColors) {
        color = interpolateObj( getFrameColorLineNormal(drawSettings, currentFrame, trackpointFrame, fromPrev), 
                                getFrameColorLineDev(drawSettings, currentFrame, trackpointFrame, fromPrev), deviation);
    } else {
        color = getFrameColorLineNormal(drawSettings, currentFrame, trackpointFrame, fromPrev);
    }
    return { ...color, alpha: alpha };
};

const getTrackpointConnectionColors = (drawSettings, deviations, currentFrame, trackpoint1, trackpoint2) => {
    let colors = [];
    for(let frame = trackpoint1.frame; frame <= trackpoint2.frame; frame++) {
        const alpha = drawSettings.alphaFading ? getAlphaValue(drawSettings, currentFrame, trackpoint1.frame, deviations[frame]) : 1;
        colors.push(getFrameColorLine(drawSettings, currentFrame, frame, trackpoint1.frame < currentFrame, alpha, deviations[frame]));
        assert(!isNaN(alpha) && alpha !== null);
    }
    console.log("Colors:");
    console.log(colors);
    return colors;
};



const getMovementDeviations = (drawSettings, movementAverages, featureTrack) => {
    const lastFrame = getLastFrame(featureTrack);
    let deviations = Array(lastFrame + 1).fill(0);

    if (drawSettings.maxDeviationValue == 0) return deviations;

    for(let frame = 0; frame <= lastFrame; frame++) {
        const movement = getMovement(featureTrack, frame);
        if(movement != null) {
            const rawDeviation = Math.sqrt((movement.dx - movementAverages[frame].dx)**2 + (movement.dy - movementAverages[frame].dy)**2);
            /*console.log(movement.dx);
            console.log(movement.dy);
            console.log(movementAverages[frame]);
            console.log(movementAverages[frame].dx);
            console.log(movementAverages[frame].dy);*/
            deviations[frame] = Math.min(rawDeviation, drawSettings.maxDeviationValue) / drawSettings.maxDeviationValue;
            assert(!isNaN(deviations[frame]));
        }
    }

    return deviations;
};

const getDrawInformation = (drawSettings, movementAverages, currentFrame, featureTrack) => {
    const loopStart = Math.max(0, currentFrame - drawSettings.historyLength);
    const loopEnd = currentFrame + drawSettings.historyLength;

    let circles = Array(drawSettings.historyLength * 2 + 1).fill(null);
    let lines = [];
    let rectangles = [];
    let prevTrackpoint = getTrackpointInterpol(featureTrack, loopStart);

    const deviations = getMovementDeviations(drawSettings, movementAverages, featureTrack);
    const currentTrackpoint = getTrackpointInterpol(featureTrack, currentFrame);

    for (let frame = loopStart; frame <= loopEnd; frame++) {
        const trackpoint = getTrackpoint(featureTrack, frame);
        if (trackpoint != null) {

            if (prevTrackpoint != null && prevTrackpoint != trackpoint) {
                const colors = getTrackpointConnectionColors(drawSettings, deviations, currentFrame, prevTrackpoint, trackpoint);
                lines.push({ x1: prevTrackpoint.x, y1: prevTrackpoint.y, x2: trackpoint.x, y2: trackpoint.y, colors: colors, width: drawSettings.connectionWidth });
            }

            const circlesIndex = frame <= currentFrame ? ((currentFrame - frame) * 2) : ((frame - currentFrame) * 2 - 1);
            const color = getTrackpointCircleColor(drawSettings, currentFrame, frame, deviations[frame]);
            circles[circlesIndex] = { x: trackpoint.x, y: trackpoint.y, radius: drawSettings.cricleRadius, color: color };
        
            prevTrackpoint = trackpoint;

        } else if (frame == currentFrame && currentTrackpoint != null) {
            if (prevTrackpoint != null && prevTrackpoint != currentTrackpoint) {
                const colors = getTrackpointConnectionColors(drawSettings, deviations, currentFrame, prevTrackpoint, currentTrackpoint);
                lines.push({ x1: prevTrackpoint.x, y1: prevTrackpoint.y, x2: currentTrackpoint.x, y2: currentTrackpoint.y, colors: colors, width: drawSettings.connectionWidth });
                prevTrackpoint = currentTrackpoint;
            }
        }
    }

    if (prevTrackpoint != null && prevTrackpoint.frame != loopEnd) {
        const trackpoint = getTrackpointInterpol(featureTrack, loopEnd);
        if (trackpoint != null) {
            const colors = getTrackpointConnectionColors(drawSettings, deviations, currentFrame, prevTrackpoint, trackpoint);
            lines.push({ x1: prevTrackpoint.x, y1: prevTrackpoint.y, x2: trackpoint.x, y2: trackpoint.y, colors: colors, width: drawSettings.connectionWidth });
        }
    }

    if (currentTrackpoint != null) {
        const color = getTrackpointCircleColor(drawSettings, currentFrame, currentTrackpoint.frame, deviations[currentFrame]);
        circles[0] = { x: currentTrackpoint.x, y: currentTrackpoint.y, radius: drawSettings.cricleRadius, color: color };
        rectangles.push({ x: currentTrackpoint.x - drawSettings.rectangleSize / 2, y: currentTrackpoint.y - drawSettings.rectangleSize / 2,
                        width: drawSettings.rectangleSize, height: drawSettings.rectangleSize, lineWidth: drawSettings.rectangleWidth, 
                        color: { red: 0, green: 0, blue: 0, alpha: 1 } });
    }

    return { circles: circles.filter(x => x != null), lines: lines, rectangles: rectangles };
};


const drawFromInfo = (context, drawInfo) => {
    for(let i = drawInfo.lines.length - 1; i >= 0; i--) {
        const { x1, y1, x2, y2, colors, width } = drawInfo.lines[i];
        drawLineLinearGrad(context, x1, y1, x2, y2, colors, width);
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
    const movementAverages = getAverageFeatureTrackMovements(featureTrackManager);
    forEachFeatureTrack(featureTrackManager, (ft, selected) => {
        if (getShow(ft)) {
            const drawInfo = getDrawInformation(drawSettings, movementAverages, currentFrame, ft);
            drawFromInfo(context, drawInfo);
        }
    })
}

export default drawFeatureTracks;