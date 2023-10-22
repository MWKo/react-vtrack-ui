export const createDrawSettingsMovement = (historyLength = 100,
                                            colorPrevFrame = { red: 255, green: 0, blue: 0 }, colorCurrentFrame = { red: 255, green: 255, blue: 255 }, 
                                            colorFutureFrame= { red: 0, green: 0, blue: 255 }, 
                                            interpolateMovColors = false,
                                            colorPrevFrameMov = { red: 255, green: 0, blue: 0 }, colorCurrentFrameMov = { red: 255, green: 255, blue: 255 }, 
                                            colorFutureFrameMov= { red: 0, green: 0, blue: 255 }, 
                                            alphaFading = true,
                                            cricleRadius = 2, rectangleSize = 30, rectangleWidth = 1, connectionWidth = 1,
                                            maxMovementValue = 1, movementAlphaProp = 0) => { 
    return {
        historyLength: historyLength,

        colorPrevFrame: colorPrevFrame,
        colorCurrentFrame: colorCurrentFrame,
        colorFutureFrame: colorFutureFrame,

        interpolateMovColors: interpolateMovColors,
        colorPrevFrameMov: colorPrevFrameMov,
        colorCurrentFrameMov: colorCurrentFrameMov,
        colorFutureFrameMov: colorFutureFrameMov,

        alphaFading: alphaFading,

        cricleRadius: cricleRadius,
        rectangleSize: rectangleSize,
        rectangleWidth: rectangleWidth,
        connectionWidth: connectionWidth,
        maxMovementValue: maxMovementValue,
        movementAlphaProp: movementAlphaProp
    };
};
export const setHistoryLength = (ds, historyLength) => { return {...ds, historyLength: historyLength} };

export const setColorPrevFrame = (ds, colorPrevFrame) => { return {...ds, colorPrevFrame: colorPrevFrame} };
export const setColorCurrentFrame = (ds, colorCurrentFrame) => { return {...ds, colorCurrentFrame: colorCurrentFrame} };
export const setColorFutureFrame = (ds, colorFutureFrame) => { return {...ds, colorFutureFrame: colorFutureFrame} };

export const setInterpolateMovColors = (ds, interpolateMovColors) => { return {...ds, interpolateMovColors: interpolateMovColors} };
export const setColorPrevFrameMov = (ds, colorPrevFrameMov) => { return {...ds, colorPrevFrameMov: colorPrevFrameMov} };
export const setColorCurrentFrameMov = (ds, colorCurrentFrameMov) => { return {...ds, colorCurrentFrameMov: colorCurrentFrameMov} };
export const setColorFutureFrameMov = (ds, colorFutureFrameMov) => { return {...ds, colorFutureFrameMov: colorFutureFrameMov} };

export const setAlphaFading = (ds, alphaFading) => { return {...ds, alphaFading: alphaFading} };
export const setCircleRadius = (ds, cricleRadius) => { return {...ds, cricleRadius: cricleRadius} };
export const setRectangleSize = (ds, rectangleSize) => { return {...ds, rectangleSize: rectangleSize} };
export const setRectangleWidth = (ds, rectangleWidth) => { return {...ds, rectangleWidth: rectangleWidth} };
export const setConnectionWidth = (ds, connectionWidth) => { return {...ds, connectionWidth: connectionWidth} };
export const setMaxMovementValue = (ds, maxMovementValue) => { return {...ds, maxMovementValue: maxMovementValue} };
export const setMovementAlphaProp = (ds, movementAlphaProp) => { return {...ds, movementAlphaProp: movementAlphaProp} };