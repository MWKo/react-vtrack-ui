import { createDrawSettingsStandard } from "./drawsettings_standard";
import dps from '../uialgorithms/draw_trackpoints_circles';
import dpm from '../uialgorithms/draw_trackpoints_movement';
import dpd from '../uialgorithms/draw_trackpoints_deviation';
import { createDrawSettingsMovement } from "./drawsettings_movement";
import { createDrawSettingsDeviation } from "./drawsettings_deviation";


export const createDrawSettingsManager = (selected = "Standard") => {
    return {
        selected: selected,
        settingsList: [
            //{ name: "Standard", settings: createDrawSettingsStandard(), drawfunc: dps },
            { name: "Movement", settings: createDrawSettingsMovement(), drawfunc: dpm },
            { name: "Deviation", settings: createDrawSettingsDeviation(), drawfunc: dpd },
        ]
    };
}

const setSelected = (dsm, selected) => { return { ...dsm, selected: selected }; }
const setSettingsList = (dsm, settingsList) => { return { ...dsm, settingsList: settingsList }; }

export const getSettingsList = dsm => dsm.settingsList;
export const getSelectedSettingsName = dsm => dsm.selected;
export const getNamedSettings = (dsm, name) => dsm.settingsList.find(s => s.name == name);
export const getSelectedNamedSettings = dsm => getNamedSettings(dsm, dsm.selected);

export const changeSettings = (dsm, name, changedSettings) => setSettingsList(dsm, dsm.settingsList.map(s => s.name == name ? { ...s, settings: changedSettings } : s));
export const changeSelectedSettings = (dsm, changedSettings) => changeSettings(dsm, dsm.selected, changedSettings);

export const selectSettings = setSelected;

export const getDrawFunction = (dsm, name) => getNamedSettings(dsm, name).drawfunc;
export const getSelectedDrawFunction = dsm => getDrawFunction(dsm, dsm.selected);
export const executeSelectedDrawFunction = (dsm, context, currentFrame, featureTrackManager) => getSelectedDrawFunction(dsm)(context, getSelectedNamedSettings(dsm).settings, currentFrame, featureTrackManager);
