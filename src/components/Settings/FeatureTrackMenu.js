import React from 'react'
import { getID, getName } from '../../data/featuretrack';
import { addNewFeatureTrack, changeFeatureTrack, deleteSelectedFeatureTrack, getSelectedFeatureTrack, hasSeletedFeatureTrack, mapFeatureTrack, selectFeatureTrack } from '../../data/featuretrack_manager'

import FeatureTrackControl from './FeatureTrackControl';
import SettingsHeader from './SettingsHeader';
//import * as tpm from '../../data/featuretrack_manager';

const FeatureTrackMenu = ({ featureTrackManager, setFeatureTrackManager }) => {
    const modifyFTM = (func, ...args) => setFeatureTrackManager(func(featureTrackManager, ...args));

    const onChangeSelectedFT = (newFTID) => modifyFTM(selectFeatureTrack, newFTID);
    const onNewFeatureTrack = () => modifyFTM(addNewFeatureTrack);
    const onDeleteFeatureTrack = () => modifyFTM(deleteSelectedFeatureTrack);

    const hasSeletedFT = hasSeletedFeatureTrack(featureTrackManager);
    const selectedFT = hasSeletedFT ? getSelectedFeatureTrack(featureTrackManager) : null;
    const modifySelectedFt = (changedFT) => modifyFTM(changeFeatureTrack, changedFT);

    const ftSelectOptions = mapFeatureTrack(featureTrackManager, (ft, ftSelected) => {
        if (ftSelected) return  (<option value={getID(ft)} selected> {getName(ft)}</option>);
        else            return  (<option value={getID(ft)}>          {getName(ft)}</option>);
    });

    const featureTrackMenuBody = (
        <>
            <label>Selected Feature Track</label>
            <select onChange={e => onChangeSelectedFT(+e.target.value)}>{ftSelectOptions}</select>

            <FeatureTrackControl featureTrack={selectedFT} setFeatureTrack={modifySelectedFt} />

            <div className="new-delete">
                <button className="btn" onClick={onNewFeatureTrack}>New</button>
                <button className="btn" onClick={onDeleteFeatureTrack}>Delete</button>
            </div>
        </>
    );

    return (
        <SettingsHeader heading="Feature Tracks" body={featureTrackMenuBody} />
    )
}

FeatureTrackMenu.defaultProps = {
    onChangeFeaturePoints: () => {}
}

export default FeatureTrackMenu
