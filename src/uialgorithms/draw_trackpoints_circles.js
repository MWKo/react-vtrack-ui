import { forEachTrackpoint, forEachTrackpointSprial, getShow, getTrackpoint, getTrackpointList } from "../data/featuretrack";
import { forEachFeatureTrack, isFeatureTrackSelected } from "../data/featuretrack_manager";
import { getX } from "../data/trackpoint";
import { mapWithOneNeighbourExc } from "../utils/list_operations";
import { drawCircle, drawLine, drawRectangle} from "./draw_canvas";


const getAlphaValue = (drawSettings, currentFrame, trackpointFrame) => {
    return 1 - Math.abs(trackpointFrame - currentFrame) / drawSettings.historyLength;
};

const getTrackpointCircleColor = (drawSettings, currentFrame, trackpointFrame) => {
    const alpha = drawSettings.alphaFading ? getAlphaValue(drawSettings, currentFrame, trackpointFrame) : 1;
    //console.log(alpha)
    if (trackpointFrame === currentFrame) {
        return { red: 255, green: 255, blue: 255, alpha: alpha };
    } else {
        if(trackpointFrame < currentFrame) {
            return { red: 255, green: 0, blue: 0, alpha: alpha };
        } else {
            return { red: 0, green: 0, blue: 255, alpha: alpha };
        }
    }
}

const getTrackpointConnectionColor = (drawSettings, currentFrame, trackpoint1Frame, trackpoint2Frame) => {
    const frameDist1 = Math.abs(trackpoint1Frame - currentFrame);
    const frameDist2 = Math.abs(trackpoint2Frame - currentFrame);
    if (frameDist1 >= frameDist2) return getTrackpointCircleColor(drawSettings, currentFrame, trackpoint1Frame);
    else return getTrackpointCircleColor(drawSettings, currentFrame, trackpoint2Frame);
};

const getDrawInformation = (drawSettings, currentFrame, featureTrack) => {
    const filteredTrackpointList = getTrackpointList(featureTrack).filter(tp => Math.abs(tp.frame - currentFrame) <= drawSettings.historyLength);
    const trackpointDrawInfo = filteredTrackpointList.map(tp => 
        { return { x: tp.x, y: tp.y, radius: drawSettings.cricleRadius, color: getTrackpointCircleColor(drawSettings, currentFrame, tp.frame) } }
    );
    const trackpointConnectionInfo = mapWithOneNeighbourExc(filteredTrackpointList, (tp1, tp2) => 
        { return { x1: tp1.x, y1: tp1.y, x2: tp2.x, y2: tp2.y, width: drawSettings.connectionWidth, color: getTrackpointConnectionColor(drawSettings, currentFrame, tp1.frame, tp2.frame) } }
    );

    let rectangles = [];
    const currentTrackpoint = getTrackpoint(featureTrack, currentFrame);
    if (currentTrackpoint != null)  rectangles.push({ x: currentTrackpoint.x - drawSettings.rectangleSize / 2, y: currentTrackpoint.y - drawSettings.rectangleSize / 2,
                                                     width: drawSettings.rectangleSize, height: drawSettings.rectangleSize, lineWidth: drawSettings.rectangleWidth, 
                                                     color: { red: 0, green: 0, blue: 0, alpha: 1 } });

    return { circles: trackpointDrawInfo, lines: trackpointConnectionInfo, rectangles: rectangles };
};


const drawFromInfo = (context, drawInfo) => {
    drawInfo.lines.forEach(({ x1, y1, x2, y2, width, color }) => drawLine(context, x1, y1, x2, y2, width, color));
    drawInfo.circles.forEach(({ x, y, radius, color }) => drawCircle(context, x, y, radius, color));
    drawInfo.rectangles.forEach(({ x, y, width, height, lineWidth, color }) => drawRectangle(context, x, y, width, height, lineWidth, color));
};



const drawFeatureTracks = (context, drawSettings, currentFrame, featureTrackManager) => {
    forEachFeatureTrack(featureTrackManager, (ft, selected) => {
        if (getShow(ft)) {
            const drawInfo = getDrawInformation(drawSettings, currentFrame, ft);
            drawFromInfo(context, drawInfo);
        }
    })
}

export default drawFeatureTracks;