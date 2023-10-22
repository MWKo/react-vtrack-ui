import { assert } from "../utils/debug";

const isValidColor = (color) => {
    if(color.red < 0 ||color.red >= 256) return false;
    if(color.green < 0 ||color.green >= 256) return false;
    if(color.blue < 0 ||color.blue >= 256) return false;
    if(color.alpha < 0 ||color.red > 1) return false;
    return true;
}

const getColorStr = (color) => {
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
};
const getLinearGradStyle = (context, x1, y1, x2, y2, colors) => {
    if (colors.length == 0) return "black";
    if (colors.length == 1) return getColorStr(colors[0]);

    const grd = context.createLinearGradient(x1, y1, x2, y2);
    for(let i = 0; i < colors.length; i++) {
        //assert(isValidColor(colors[i]), "Invalid color: " + JSON.stringify(colors[i]));
        console.log(getColorStr(colors[i]));
        grd.addColorStop(i / (colors.length - 1), getColorStr(colors[i]));
    }

    return grd;
};

const setFillStyleColor = (context, color) => context.fillStyle = getColorStr(color);
const setStrokeStyleColor = (context, color) => context.strokeStyle = getColorStr(color);
const setFillStyleLinearGrad = (context, x1, y1, x2, y2, colors) => context.fillStyle = getLinearGradStyle(context, x1, y1, x2, y2, colors);
const setStrokeStyleLinearGrad = (context, x1, y1, x2, y2, colors) => context.strokeStyle = getLinearGradStyle(context, x1, y1, x2, y2, colors);


export const drawCircle = (context, x, y, radius, color) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    setFillStyleColor(context, color);
    context.fill();
};

export const drawRectangle = (context, x, y, width, height, lineWidth, color) => {
    setStrokeStyleColor(context, color);
    context.lineWidth = lineWidth;
    context.strokeRect(x, y, width, height);
};

export const drawLine = (context, x1, y1, x2, y2, lineWidth, color) => {
    setStrokeStyleColor(context, color);
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
};

export const drawLineLinearGrad = (context, x1, y1, x2, y2, colors, lineWidth) => {
    setStrokeStyleLinearGrad(context, x1, y1, x2, y2, colors);
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
};