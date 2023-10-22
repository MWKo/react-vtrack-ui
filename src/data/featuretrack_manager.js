import { bargs, pipeWith } from "../utils/pipe";
import { createFeatureTrack, getID, getLastFrame, getMovement, getTrackpoint, interpolate } from "./featuretrack";
import { getX, getY } from "./trackpoint";

export const createFeatureTrackManager = () =>      { return { fts: [], selectedFTID: -1, usedIDs: [] } };

const setFTS = (ftm, fts) =>                        { return {...ftm, fts: fts}; }
const setSelectedFTID = (ftm, selectedFTID) =>      { return {...ftm, selectedFTID: selectedFTID}; }
const setUsedIDs = (ftm, usedIDs) =>                { return {...ftm, usedIDs: usedIDs}; }
const markID = (ftm, id, used) =>                   setUsedIDs(ftm, Object.assign([], ftm.usedIDs, { [id]: used }))

export const getFeatureTracks = (ftm) =>            ftm.fts;
export const getFeatureTrackByID = (ftm, id) =>     ftm.fts.find(ft => getID(ft) === id);
export const getSelectedFeatureTrack = (ftm) =>     getFeatureTrackByID(ftm, ftm.selectedFTID);
export const hasSeletedFeatureTrack = (ftm) =>      ftm.selectedFTID !== -1;

export const isFeatureTrackSelected = (ftm, ft) => ftm.selectedFTID === getID(ft);
export const selectFeatureTrack = setSelectedFTID;

export const addNewFeatureTrack = (ftm, name="") => {
    const firstFreeID = ftm.usedIDs.indexOf(false);
    const id = firstFreeID !== -1 ? firstFreeID : ftm.usedIDs.length;
    const ftName = name === "" ? ("Track " + (id + 1)) : name;
    const newFeatureTrack = createFeatureTrack(id, ftName);
    return pipeWith(ftm, 
                    bargs(setFTS,           [...ftm.fts, newFeatureTrack]), 
                    bargs(setSelectedFTID,  id), 
                    bargs(markID,           id, true));
};
export const changeFeatureTrack = (ftm, ft) =>      setFTS(ftm, ftm.fts.map(pft => getID(pft) === getID(ft) ? ft : pft))
export const deleteFeatureTrackWithID = (ftm, ftID) => {
    const filteredFTS = ftm.fts.filter(ft => getID(ft) !== ftID);
    const newSelectedFTID = ftm.selectedFTID === ftID ? ftm.usedIDs.map((x, index) => index !== ftID ? x : false).indexOf(true) : ftm.selectedFTID;
    return pipeWith(ftm, 
                    bargs(setFTS,           filteredFTS), 
                    bargs(setSelectedFTID,  newSelectedFTID),
                    bargs(markID,           ftID, false));
}
export const deleteSelectedFeatureTrack = (ftm) => deleteFeatureTrackWithID(ftm, ftm.selectedFTID);

export const mapFeatureTrack = (ftm, callbackFn) => ftm.fts.map(ft => callbackFn(ft, isFeatureTrackSelected(ftm, ft)));
export const forEachFeatureTrack = (ftm, callbackFn) => ftm.fts.forEach(ft => callbackFn(ft, isFeatureTrackSelected(ftm, ft)));

export const getAverageFeatureTrackMovements = (ftm) => {
    let movementAverages = [];

    const lastFrames = ftm.fts.map(getLastFrame);
    const loopEnd = Math.max(...lastFrames);
    for(let frame = 0; frame < loopEnd; frame++) {
        let xMovSum = 0;
        let yMovSum = 0;
        let count = 0;
        for(let i = 0; i < ftm.fts.length; i++) {
            const ft = ftm.fts[i];
            if(ft == null) continue;
            const tpCurrMov = getMovement(ft, frame);
            if(tpCurrMov != null) {
                xMovSum += tpCurrMov.dx;
                yMovSum += tpCurrMov.dy;
                count++;
            }
        }
        if (count != 0) movementAverages.push({ dx: xMovSum / count, dy: yMovSum / count });
        else movementAverages.push({ dx: 0, dy: 0 })
    }

    return movementAverages;
};