import React from 'react'

import { setAlphaFading, setCircleRadius, setHistoryLength, setRectangleSize } from '../../data/drawsettings_standard';

const DrawSettingsStandard = ({ drawSettings, setDrawSettings }) => {
    const modifyDS = (func, ...args) => setDrawSettings(func(drawSettings, ...args));

    const onChangeHistoryLength = (historyLength) => modifyDS(setHistoryLength, historyLength);
    const onChangeTrackpointRadius = (circleRadius) => modifyDS(setCircleRadius, circleRadius);
    const onChangeRectangleSize = (rectangleSize) => modifyDS(setRectangleSize, rectangleSize);
    const onChangeAlphaFading = (alphaFading) => modifyDS(setAlphaFading, alphaFading);

    console.log(drawSettings);

    return (
        <div class="sub-settings">
            <label>History Length</label>
            <input type="number" placeholder="History Length" value={drawSettings.historyLength} min={0} onChange={(e) => onChangeHistoryLength(+e.target.value)} />
            <label>Trackpoint Radius</label>
            <input type="number" placeholder="Trackpoint Radius" value={drawSettings.cricleRadius} min={0} onChange={(e) => onChangeTrackpointRadius(+e.target.value)} />
            <label>Rectangle Size</label>
            <input type="number" placeholder="Rectangle Size" value={drawSettings.rectangleSize} min={0} onChange={(e) => onChangeRectangleSize(+e.target.value)} />
            <label>Alpha Fading</label>
            <input type="checkbox" value={drawSettings.alphaFading} checked={drawSettings.alphaFading} onChange={(e) => onChangeAlphaFading(e.currentTarget.checked)} />
        </div>
    )
}

export default DrawSettingsStandard
