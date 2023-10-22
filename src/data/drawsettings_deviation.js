export const createDrawSettingsDeviation = (historyLength = 100,
                                            colorPrevFrame = { red: 255, green: 0, blue: 0 }, colorCurrentFrame = { red: 255, green: 255, blue: 255 }, 
                                            colorFutureFrame= { red: 0, green: 0, blue: 255 }, 
                                            interpolateDevColors = false,
                                            colorPrevFrameDev = { red: 255, green: 0, blue: 0 }, colorCurrentFrameDev = { red: 255, green: 255, blue: 255 }, 
                                            colorFutureFrameDev= { red: 0, green: 0, blue: 255 }, 
                                            alphaFading = true,
                                            cricleRadius = 2, rectangleSize = 30, rectangleWidth = 1, connectionWidth = 1,
                                            maxDeviationValue = 1, deviationAlphaProp = 0) => { 
    return {
        historyLength: historyLength,

        colorPrevFrame: colorPrevFrame,
        colorCurrentFrame: colorCurrentFrame,
        colorFutureFrame: colorFutureFrame,

        interpolateDevColors: interpolateDevColors,
        colorPrevFrameDev: colorPrevFrameDev,
        colorCurrentFrameDev: colorCurrentFrameDev,
        colorFutureFrameDev: colorFutureFrameDev,

        alphaFading: alphaFading,

        cricleRadius: cricleRadius,
        rectangleSize: rectangleSize,
        rectangleWidth: rectangleWidth,
        connectionWidth: connectionWidth,
        maxDeviationValue: maxDeviationValue,
        deviationAlphaProp: deviationAlphaProp
    };
};
export const setHistoryLength = (ds, historyLength) => { return {...ds, historyLength: historyLength} };

export const setColorPrevFrame = (ds, colorPrevFrame) => { return {...ds, colorPrevFrame: colorPrevFrame} };
export const setColorCurrentFrame = (ds, colorCurrentFrame) => { return {...ds, colorCurrentFrame: colorCurrentFrame} };
export const setColorFutureFrame = (ds, colorFutureFrame) => { return {...ds, colorFutureFrame: colorFutureFrame} };

export const setInterpolateDevColors = (ds, interpolateDevColors) => { return {...ds, interpolateDevColors: interpolateDevColors} };
export const setColorPrevFrameDev = (ds, colorPrevFrameDev) => { return {...ds, colorPrevFrameDev: colorPrevFrameDev} };
export const setColorCurrentFrameDev = (ds, colorCurrentFrameDev) => { return {...ds, colorCurrentFrameDev: colorCurrentFrameDev} };
export const setColorFutureFrameDev = (ds, colorFutureFrameDev) => { return {...ds, colorFutureFrameDev: colorFutureFrameDev} };

export const setAlphaFading = (ds, alphaFading) => { return {...ds, alphaFading: alphaFading} };
export const setCircleRadius = (ds, cricleRadius) => { return {...ds, cricleRadius: cricleRadius} };
export const setRectangleSize = (ds, rectangleSize) => { return {...ds, rectangleSize: rectangleSize} };
export const setRectangleWidth = (ds, rectangleWidth) => { return {...ds, rectangleWidth: rectangleWidth} };
export const setConnectionWidth = (ds, connectionWidth) => { return {...ds, connectionWidth: connectionWidth} };
export const setMaxDeviationValue = (ds, maxDeviationValue) => { return {...ds, maxDeviationValue: maxDeviationValue} };
export const setDeviationAlphaProp = (ds, deviationAlphaProp) => { return {...ds, deviationAlphaProp: deviationAlphaProp} };