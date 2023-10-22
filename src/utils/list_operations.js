export const mapWithOneNeighbourExc = (list, callbackFn) => {
    if (list.length == 0) return [];
    let nL = Array(list.length - 1);
    for (let i = 1; i < list.length; ++i) nL[i - 1] = callbackFn(list[i - 1], list[i], i);
    return nL;
};

export const mapWithBothNeighboursInc = (list, callbackFn) => {
    let nL = Array(list.length);
    for (let i = 0; i < list.length; ++i) nL[i] = callbackFn(list[i - 1], list[i], list[i + 1], i);
    return nL;
};