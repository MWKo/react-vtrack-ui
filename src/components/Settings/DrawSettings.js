import React from 'react'
import { setAlphaFading, setCircleRadius, setHistoryLength, setRectangleSize } from '../../data/drawsettings_standard';
import { getSettingsList, getSelectedSettingsName, getSelectedNamedSettings, selectSettings, changeSelectedSettings } from '../../data/drawsettings_manager';
import DrawSettingsStandard from './DrawSettingsStandard';
import DrawSettingsMovement from './DrawSettingsMovement';
import DrawSettingsDeviation from './DrawSettingsDeviation.js';
import './Settings.css';
import SettingsHeader from './SettingsHeader';

const DrawSettings = ({ drawSettingsManager, setDrawSettingsManager }) => {
    const modifyDSM = (func, ...args) => setDrawSettingsManager(func(drawSettingsManager, ...args));

    const onChangeSelectedDS = newName => modifyDSM(selectSettings, newName);
    const modifySelectedDS = changedDS => modifyDSM(changeSelectedSettings, changedDS);

    const settingsList = getSettingsList(drawSettingsManager);
    const dsSetectOptions = settingsList.map(set => {
        if (set.name == getSelectedSettingsName(drawSettingsManager)) return (<option value={set.name} selected> {set.name}</option>);
        else return (<option value={set.name}> {set.name}</option>);
    });

    const getDSComponent = () => {
        const selectedSettings = getSelectedNamedSettings(drawSettingsManager);
        //alert(drawSettingsManager.selected + " " + selectedSettings);
        if (selectedSettings.name == "Standard") return (<DrawSettingsStandard drawSettings={selectedSettings.settings} setDrawSettings={modifySelectedDS} />);
        if (selectedSettings.name == "Movement") return (<DrawSettingsMovement drawSettings={selectedSettings.settings} setDrawSettings={modifySelectedDS} />);
        if (selectedSettings.name == "Deviation") return (<DrawSettingsDeviation drawSettings={selectedSettings.settings} setDrawSettings={modifySelectedDS} />);
        return null;
    };

    const drawSettingsBody = (
        <>
            <label>Select Draw Settings</label>
            <select onChange={e => onChangeSelectedDS(e.target.value)}>{dsSetectOptions}</select>
            {getDSComponent()}
        </>
    );
    
    return (
        <SettingsHeader heading="Draw Settings" body={drawSettingsBody} />
    )
}

export default DrawSettings
