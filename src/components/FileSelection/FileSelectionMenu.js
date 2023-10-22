import React from 'react'
import FeatureTrackFiles from './FeatureTrackFiles'
import VideoSelection from './VideoSelection'

const FileSelectionMenu = ({ onVideoLoaded, featureTrackManager, onFeatureTrackManagerLoaded }) => {
    return (
        <div className="file-selection-menu">
            <VideoSelection onVideoLoaded={onVideoLoaded} />
            <div className="seperation-line-vert" ></div>
            <FeatureTrackFiles featureTrackManager={featureTrackManager} onFeatureTrackManagerLoaded={onFeatureTrackManagerLoaded} />
        </div>
    )
}

export default FileSelectionMenu
