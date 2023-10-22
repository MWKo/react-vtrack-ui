export const createDrawSettingsStandard = (historyLength = 20, cricleRadius = 1, alphaFading = true, rectangleSize = 30, rectangleWidth = 1, connectionWidth = 1) => { 
    return {
        historyLength: historyLength,
        cricleRadius: cricleRadius,
        alphaFading: alphaFading,
        rectangleSize: rectangleSize,
        rectangleWidth: rectangleWidth,
        rectangleWidth: rectangleWidth,
        connectionWidth: connectionWidth,
    };
};
export const setHistoryLength = (ds, historyLength) => { return {...ds, historyLength: historyLength} };
export const setCircleRadius = (ds, cricleRadius) => { return {...ds, cricleRadius: cricleRadius} };
export const setAlphaFading = (ds, alphaFading) => { return {...ds, alphaFading: alphaFading} };
export const setRectangleSize = (ds, rectangleSize) => { return {...ds, rectangleSize: rectangleSize} };
export const setRectangleWidth = (ds, rectangleWidth) => { return {...ds, rectangleWidth: rectangleWidth} };
export const setConnectionWidth = (ds, connectionWidth) => { return {...ds, connectionWidth: connectionWidth} };