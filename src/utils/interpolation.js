export const linearInterpolation = (val1, val2, weight) => val1 * (1 - weight) + val2 * weight;

export const interpolateObj = (obj1, obj2, weight) => {
    let result = {};
    for (let key in obj1) {
        result[key] = linearInterpolation(obj1[key], obj2[key], weight);
    }
    return result;
}

export const interpolateMissingElements = (list, interpolFn) => {
    const findNextNonNull = (startIndex) => {
        let index = startIndex;
        while (index < list.length && !list[index]) index++;
        if (index < list.length) return index;
        else return -1;
    }

    let index = findNextNonNull(0);
    let interpolatedList = new Array(index).fill(null);

    let prevElement = null;
    let nextElement = null;
    let prevElementIndex = index;
    let nextElementIndex = findNextNonNull(0);
    while (index < list.length && nextElementIndex !== -1) {
        if (index === nextElementIndex) {
            prevElementIndex = index;
            nextElementIndex = findNextNonNull(index + 1);
            prevElement = list[prevElementIndex];
            nextElement = list[nextElementIndex];
            interpolatedList.push(prevElement);
        } else {
            console.log("QWERTZU");
            const interpolated = interpolFn(prevElement, nextElement, (index - prevElementIndex) / (nextElementIndex - prevElementIndex), index - prevElementIndex);
            interpolatedList.push(interpolated);
        }
        ++index;
    }
    interpolatedList.push.apply(interpolatedList, new Array(list.length - index).fill(null));

    return interpolatedList;
}