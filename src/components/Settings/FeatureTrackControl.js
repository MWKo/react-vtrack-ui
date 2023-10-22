import React from 'react'
import { getName, getShow, interpolate, setName, setShow } from '../../data/featuretrack';
import Checkbox from '../Checkbox';
import SubSettingsHeader from './SubSettingsHeader';

const FeatureTrackControl = ({ featureTrack, setFeatureTrack }) => {
    if (featureTrack === null) return null;

    const modifyFT = (func, ...args) => setFeatureTrack(func(featureTrack, ...args));
    const onChangeName = (newName) => modifyFT(setName, newName);
    const onChangeShowVal = (show) => modifyFT(setShow, show);
    const onInterpolate = () => modifyFT(interpolate);

    const propertiesBody = (
        <>
            <label>Name</label>
            <input type="text" placeholder="Name" value={getName(featureTrack)} onChange={(e) => onChangeName(e.target.value)} />
            <Checkbox labelName="Show Featuretrack" checked={getShow(featureTrack)} onChangeChecked={onChangeShowVal} />
        </>
    );

    return (
        <SubSettingsHeader heading="Properties" body={propertiesBody} />
    )
}

export default FeatureTrackControl
