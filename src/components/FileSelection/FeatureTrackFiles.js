import React from 'react'
import FileSelection from './FileSelection'

const FeatureTrackFiles = ({ featureTrackManager, onFeatureTrackManagerLoaded }) => {
    const saveFilename = "feature_tracks.json";

    const download = (filename, text) => {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    const loadFeatureTracks = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        let reader = new FileReader();
        reader.onload = e => onFeatureTrackManagerLoaded(JSON.parse(e.target.result));
        reader.readAsText(file);
    }

    const saveFeatureTracks = () => download(saveFilename, JSON.stringify(featureTrackManager));


    return (
        <div className="file-selection-menu-element ">
            <button className="btn" onClick={saveFeatureTracks}>Save Feature-Tracks</button>
            <FileSelection labelName="Load Feature-Tracks" onFileSelected={loadFeatureTracks} />
        </div>
    )
}

export default FeatureTrackFiles
