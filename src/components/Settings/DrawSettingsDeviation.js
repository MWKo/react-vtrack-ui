import React from 'react'
import ColorSettings from './ColorSettings';

import { setAlphaFading, setCircleRadius, setColorCurrentFrame, setColorCurrentFrameDev, setColorFutureFrame, setColorFutureFrameDev, setColorPrevFrame, setColorPrevFrameDev, setConnectionWidth, setDeviationAlphaProp, setHistoryLength, setInterpolateDevColors, setMaxDeviationValue, setMaxMovementValue, setMovementAlphaProp, setRectangleSize, setRectangleWidth } from '../../data/drawsettings_deviation';
import Checkbox from '../Checkbox';
import SubSettingsHeader from './SubSettingsHeader';

const DrawSettingsDeviation = ({ drawSettings, setDrawSettings }) => {
    const modifyDS = (func, ...args) => setDrawSettings(func(drawSettings, ...args));

    const onChangeHistoryLength = (historyLength) => modifyDS(setHistoryLength, historyLength);

    const onChangeColorPrevFrame = (colorPrevFrame) => modifyDS(setColorPrevFrame, colorPrevFrame);
    const onChangeColorCurrentFrame = (colorCurrentFrame) => modifyDS(setColorCurrentFrame, colorCurrentFrame);
    const onChangeColorFutureFrame = (colorFutureFrame) => modifyDS(setColorFutureFrame, colorFutureFrame);

    const onChangeInterpolateDevColors = (interpolateDevColors) => modifyDS(setInterpolateDevColors, interpolateDevColors);
    const onChangeColorPrevFrameDev = (colorPrevFrameDev) => modifyDS(setColorPrevFrameDev, colorPrevFrameDev);
    const onChangeColorCurrentFrameDev = (colorCurrentFrameDev) => modifyDS(setColorCurrentFrameDev, colorCurrentFrameDev);
    const onChangeColorFutureFrameDev = (colorFutureFrameDev) => modifyDS(setColorFutureFrameDev, colorFutureFrameDev);
    const onChangeAlphaFading = (alphaFading) => modifyDS(setAlphaFading, alphaFading);

    const onChangeTrackpointRadius = (circleRadius) => modifyDS(setCircleRadius, circleRadius);
    const onChangeRectangleSize = (rectangleSize) => modifyDS(setRectangleSize, rectangleSize);
    const onChangeLineWidth = (lineWidth) => modifyDS(setConnectionWidth, lineWidth);
    const onChangeRectangleWidth = (rectangleWidth) => modifyDS(setRectangleWidth, rectangleWidth);
    const onChangeMaxDeviationValue = (maxDeviationValue) => modifyDS(setMaxDeviationValue, maxDeviationValue);
    const onChangeDeviationAlphaProp = (deviationAlphaProp) => modifyDS(setDeviationAlphaProp, deviationAlphaProp);

    console.log(drawSettings);

    /*colorPrevFrame: colorPrevFrame,
        colorCurrentFrame: colorCurrentFrame,
        colorFutureFrame: colorFutureFrame,*/

    const generalBlock = (
        <>
            <label>History Length</label>
            <input type="number" placeholder="History Length" value={drawSettings.historyLength} min={0} onChange={(e) => onChangeHistoryLength(+e.target.value)} />
        </>
    );

    const dimentionsBlock = (
        <>
            <label>Trackpoint Radius</label>
            <input type="number" placeholder="Trackpoint Radius" value={drawSettings.cricleRadius} min={0} onChange={(e) => onChangeTrackpointRadius(+e.target.value)} />
            <label>Line Width</label>
            <input type="number" placeholder="Line Width" value={drawSettings.connectionWidth} min={0} onChange={(e) => onChangeLineWidth(+e.target.value)} />
            <label>Rectangle Size</label>
            <input type="number" placeholder="Rectangle Size" value={drawSettings.rectangleSize} min={0} onChange={(e) => onChangeRectangleSize(+e.target.value)} />
            <label>Rectangle Width</label>
            <input type="number" placeholder="Rectangle Width" value={drawSettings.rectangleWidth} min={0} onChange={(e) => onChangeRectangleWidth(+e.target.value)} />
        </>
    );

    const colorBlock = (
        <>
            <ColorSettings name="Color Previous Frame" color={drawSettings.colorPrevFrame} setColor={onChangeColorPrevFrame} />
            <ColorSettings name="Color Current Frame" color={drawSettings.colorCurrentFrame} setColor={onChangeColorCurrentFrame} />
            <ColorSettings name="Color Future Frame" color={drawSettings.colorFutureFrame} setColor={onChangeColorFutureFrame} />
            <Checkbox labelName="Alpha Fading" checked={drawSettings.alphaFading} onChangeChecked={onChangeAlphaFading} />
        </>
    );

    const deviationBlock = (
        <>
            <label>Maximal Deviation</label>
            <input type="number" placeholder="Maximal Deviation" value={drawSettings.maxDeviationValue} min={0} onChange={(e) => onChangeMaxDeviationValue(+e.target.value)} />
            <label>Deviation Alpha Influence</label>
            <input type="number" placeholder="Deviation Alpha Influence" value={drawSettings.deviationAlphaProp} min={0} max={1} onChange={(e) => onChangeDeviationAlphaProp(+e.target.value)} />
        </>
    );

    const deviationColorsBlock = (
        <>
            <Checkbox labelName="Use Deviation Colors" color={drawSettings.interpolateDevColors} onChangeChecked={onChangeInterpolateDevColors} />
            <ColorSettings name="Color Previous Frame Deviation" color={drawSettings.colorPrevFrameDev} setColor={onChangeColorPrevFrameDev} disabled={!drawSettings.interpolateDevColors} />
            <ColorSettings name="Color Current Frame Deviation" color={drawSettings.colorCurrentFrameDev} setColor={onChangeColorCurrentFrameDev} disabled={!drawSettings.interpolateDevColors} />
            <ColorSettings name="Color Future Frame Deviation" color={drawSettings.colorFutureFrameDev} setColor={onChangeColorFutureFrameDev} disabled={!drawSettings.interpolateDevColors} />
        </>
    );

    return (
        <div class="sub-settings">
            <SubSettingsHeader heading="General" body={generalBlock} />
            <SubSettingsHeader heading="Dimentions" body={dimentionsBlock} />
            <SubSettingsHeader heading="Colors" body={colorBlock} />
            <SubSettingsHeader heading="Deviation" body={deviationBlock} />
            <SubSettingsHeader heading="Deviation Colors" body={deviationColorsBlock} />
        </div>
    )
}

export default DrawSettingsDeviation
