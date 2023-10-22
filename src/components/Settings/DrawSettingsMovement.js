import React from 'react'
import ColorSettings from './ColorSettings';

import { setAlphaFading, setCircleRadius, setColorCurrentFrame, setColorCurrentFrameMov, setColorFutureFrame, setColorFutureFrameMov, setColorPrevFrame, setColorPrevFrameMov, setConnectionWidth, setHistoryLength, setInterpolateMovColors, setMaxMovementValue, setMovementAlphaProp, setRectangleSize, setRectangleWidth } from '../../data/drawsettings_movement';
import Checkbox from '../Checkbox';
import SubSettingsHeader from './SubSettingsHeader';

const DrawSettingsMovement = ({ drawSettings, setDrawSettings }) => {
    const modifyDS = (func, ...args) => setDrawSettings(func(drawSettings, ...args));

    const onChangeHistoryLength = (historyLength) => modifyDS(setHistoryLength, historyLength);

    const onChangeColorPrevFrame = (colorPrevFrame) => modifyDS(setColorPrevFrame, colorPrevFrame);
    const onChangeColorCurrentFrame = (colorCurrentFrame) => modifyDS(setColorCurrentFrame, colorCurrentFrame);
    const onChangeColorFutureFrame = (colorFutureFrame) => modifyDS(setColorFutureFrame, colorFutureFrame);

    const onChangeInterpolateMovColors = (interpolateMovColors) => modifyDS(setInterpolateMovColors, interpolateMovColors);
    const onChangeColorPrevFrameMov = (colorPrevFrameMov) => modifyDS(setColorPrevFrameMov, colorPrevFrameMov);
    const onChangeColorCurrentFrameMov = (colorCurrentFrameMov) => modifyDS(setColorCurrentFrameMov, colorCurrentFrameMov);
    const onChangeColorFutureFrameMov = (colorFutureFrameMov) => modifyDS(setColorFutureFrameMov, colorFutureFrameMov);
    const onChangeAlphaFading = (alphaFading) => modifyDS(setAlphaFading, alphaFading);

    const onChangeTrackpointRadius = (circleRadius) => modifyDS(setCircleRadius, circleRadius);
    const onChangeRectangleSize = (rectangleSize) => modifyDS(setRectangleSize, rectangleSize);
    const onChangeLineWidth = (lineWidth) => modifyDS(setConnectionWidth, lineWidth);
    const onChangeRectangleWidth = (rectangleWidth) => modifyDS(setRectangleWidth, rectangleWidth);
    const onChangeMaxMovementValue = (maxMovementValue) => modifyDS(setMaxMovementValue, maxMovementValue);
    const onChangeMovementAlphaProp = (movementAlphaProp) => modifyDS(setMovementAlphaProp, movementAlphaProp);

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

    const movementBlock = (
        <>
            <label>Maximal Movement</label>
            <input type="number" placeholder="Maximal Movement" value={drawSettings.maxMovementValue} min={0} onChange={(e) => onChangeMaxMovementValue(+e.target.value)} />
            <label>Movement Alpha Influence</label>
            <input type="number" placeholder="Movement Alpha Influence" value={drawSettings.movementAlphaProp} min={0} max={1} onChange={(e) => onChangeMovementAlphaProp(+e.target.value)} />
        </>
    );

    const movementColorsBlock = (
        <>
            <Checkbox labelName="Use Movement Colors" color={drawSettings.interpolateMovColors} onChangeChecked={onChangeInterpolateMovColors} />
            <ColorSettings name="Color Previous Frame Movement" color={drawSettings.colorPrevFrameMov} setColor={onChangeColorPrevFrameMov} disabled={!drawSettings.interpolateMovColors} />
            <ColorSettings name="Color Current Frame Movement" color={drawSettings.colorCurrentFrameMov} setColor={onChangeColorCurrentFrameMov} disabled={!drawSettings.interpolateMovColors} />
            <ColorSettings name="Color Future Frame Movement" color={drawSettings.colorFutureFrameMov} setColor={onChangeColorFutureFrameMov} disabled={!drawSettings.interpolateMovColors} />
        </>
    );

    return (
        <div class="sub-settings">
            <SubSettingsHeader heading="General" body={generalBlock} />
            <SubSettingsHeader heading="Dimentions" body={dimentionsBlock} />
            <SubSettingsHeader heading="Colors" body={colorBlock} />
            <SubSettingsHeader heading="Movement" body={movementBlock} />
            <SubSettingsHeader heading="Movement Colors" body={movementColorsBlock} />
        </div>
    )
}

export default DrawSettingsMovement
