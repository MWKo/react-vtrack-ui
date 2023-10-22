import './App.css';
import React, { useState, useEffect } from 'react'
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import * as dsm from './data/drawsettings_manager';
import Header from './components/Header';
import DrawSettings from './components/Settings/DrawSettings';
import FeatureTrackMenu from './components/Settings/FeatureTrackMenu';

import drawFeatureTracks from './uialgorithms/draw_trackpoints_circles';
import { changeFeatureTrack, createFeatureTrackManager, getSelectedFeatureTrack, hasSeletedFeatureTrack, selectFeatureTrack } from './data/featuretrack_manager';
import { createTrackpoint } from './data/trackpoint';
import { deleteTrackpoint, hasTrackpoint, setTrackpoint } from './data/featuretrack';
import { pipeWith } from './utils/pipe';
import VideoSelection from './components/FileSelection/VideoSelection';
import FileSelectionMenu from './components/FileSelection/FileSelectionMenu';


function App() {
  const [videoUrl, setVideoUrl] = useState("");

  const [featureTrackManager, setFeatureTrackManager] = useState(createFeatureTrackManager());
  const [drawFrameOverlay, setDrawFrameOverlay] = useState(() => ((c, f, cf) => {}));

  //const [drawSettings, setDrawSettings] = useState(ds.createDrawSettingsStandard());
  const [drawSettingsManager, setDrawSettingsManager] = useState(dsm.createDrawSettingsManager("Deviation"));

  //console.log(featureTrack.getAllTrackpoints());
  //console.log(featureTrack);

  const init = () => {
    /*pipeWith( featureTrackManager,
              addNewFeatureTrack,
              addNewFeatureTrack,
              addNewFeatureTrack,
              setFeatureTrackManager);*/
  };


  const onClickVideo = (frame, x, y) => {
    console.log(x + " " + y);
    if (hasSeletedFeatureTrack(featureTrackManager)) {
      const selectedFeatureTrack = getSelectedFeatureTrack(featureTrackManager);
      const trackpoint = createTrackpoint(frame, x, y);
      const changedFeatureTrack = setTrackpoint(selectedFeatureTrack, trackpoint);
      pipeWith( featureTrackManager,
        ftm => changeFeatureTrack(ftm, changedFeatureTrack),
        setFeatureTrackManager);
    }
  };


  const onDoubleClickVideo = (frame, x, y) => {
    if (hasSeletedFeatureTrack(featureTrackManager)) {
      const selectedFeatureTrack = getSelectedFeatureTrack(featureTrackManager);
      if (hasTrackpoint(selectedFeatureTrack, frame)) {
        const changedFeatureTrack = deleteTrackpoint(selectedFeatureTrack, frame);
        pipeWith( featureTrackManager,
          ftm => changeFeatureTrack(ftm, changedFeatureTrack),
          setFeatureTrackManager);
      }
    }
  };

  const getDrawTrackpoints = () => ((context, currentFrame) => dsm.executeSelectedDrawFunction(drawSettingsManager, context, currentFrame, featureTrackManager));

  const updateDrawTrackpoints = () => setDrawFrameOverlay(() => getDrawTrackpoints());

  useEffect(updateDrawTrackpoints, [featureTrackManager, drawSettingsManager]);
  useEffect(init, []);

  /*const onFrameChange = newFrame => {
    //setCircles(circles.map((circle) => true ? { ...circle, x: circle.x + 1, } : null));
    featureTrack.setTrackpoint(Math.floor(Math.random() * 10), Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
  };*/

  const onVideoLoaded = (url) => {
    setVideoUrl(url);
    setFeatureTrackManager(createFeatureTrackManager());
  };

  return (
    <div className="App">
      <Header title="Visual Feature Track" />
      <div className="container">

        <FileSelectionMenu onVideoLoaded={onVideoLoaded} featureTrackManager={featureTrackManager} onFeatureTrackManagerLoaded={setFeatureTrackManager} />

        <div className="seperation-line-segment"></div>

        <div className="video-and-settings">
          <div className="video-div">

            <VideoPlayer 
              src={videoUrl}
              framerate={30} 
              //onFrameChange={onFrameChange} 
              onClick={onClickVideo}
              onDoubleClick={onDoubleClickVideo}
              drawFrameOverlay={drawFrameOverlay} />

          </div>

          <div className="seperation-line-vert" ></div>

          <div className="tracker-settings-div">

            <DrawSettings 
              drawSettingsManager={drawSettingsManager}
              setDrawSettingsManager={setDrawSettingsManager} />

            <FeatureTrackMenu
              featureTrackManager={featureTrackManager}
              setFeatureTrackManager={setFeatureTrackManager} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
