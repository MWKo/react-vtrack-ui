import React, { useState, useEffect } from 'react'
import TrackPointCanvas from './TrackPoints/TrackPointCanvas';
import Controls from './Controls'
import './VideoPlayer.css'
import PropTypes from 'prop-types'

const VideoPlayer = ({ src, framerate, width, height, onFrameChange, onClick, onDoubleClick, drawFrameOverlay }) => {
    const [paused, setPaused] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [displayWidth, setDisplayWidth] = useState(0);
    const [displayHeight, setDisplayHeight] = useState(0);

    const video = React.createRef();
    
    const videoContainerStyle = {
        width: width,
        height: height,
    };

    const updateCurrentFrame = () => {
        const newFrame = Math.round(video.current.currentTime * framerate);
        setCurrentFrame(newFrame);
        if (onFrameChange != null) onFrameChange(newFrame);
    }

    const playPauseVideo = () => {
        if (video.current.paused) {
            video.current.play();
        } else {
            video.current.pause();
        }
        setPaused(video.current.paused);
    };

    const seekFrame = (diff) => {
        const oldFrame = video.current.currentTime * framerate;
        const newFrame = oldFrame + diff;
        video.current.currentTime = newFrame / framerate;
        updateCurrentFrame();
    };
    const setCurrentTime = (newTime) => {
        video.current.currentTime = newTime;
        updateCurrentFrame();
    }

    const showPreviousSecound = () => setCurrentTime(video.current.currentTime - 1);
    const showPreviousFrame = () => seekFrame(-1);
    const showNextFrame = () => seekFrame(+1);
    const showNextSecound = () => setCurrentTime(video.current.currentTime + 1);
    const onTimeUpdate = () => setProgress(video.current.currentTime / video.current.duration);

    const onProgressBarClick = (percentage) => {
        const newTime = percentage * video.current.duration;
        video.current.currentTime = newTime;
        updateCurrentFrame();
    };

    useEffect(() => {
        let cF = currentFrame;
        
        function tick() {
            if (video.current !== null) {
                const newFrame = Math.round(video.current.currentTime * framerate);
                if (newFrame !== cF) {
                    cF = newFrame;
                    updateCurrentFrame(newFrame);
                }
            }
        };

        if (!paused) {
            let id = setInterval(tick, framerate);
            return () => clearInterval(id);
        }
    }, [paused, video, framerate]);

    const updateDisplaySize = () => {
        const bounds = video.current.getBoundingClientRect();
        setDisplayWidth(Math.round(bounds.width));
        setDisplayHeight(Math.round(bounds.height));
        console.log(bounds.width + " " + bounds.height);
    };

    useEffect(updateDisplaySize, []);

    const draw = (context) => drawFrameOverlay(context, currentFrame);

    //alert(drawFrameOverlay);

    //useEffect(() => alert("HALLO"), [drawFrameOverlay]);

    return (
        <div className="video-container" style={videoContainerStyle}>
            <div class="video-display">
                <video className="video-player" src={src} ref={video} res={updateDisplaySize} onTimeUpdate={onTimeUpdate} />
                <div className="tps-div">
                    <TrackPointCanvas 
                        width={displayWidth}
                        height={displayHeight}
                        draw={draw}
                        onClick={(x, y) => onClick(currentFrame, x, y)} 
                        onDoubleClick={(x, y) => onDoubleClick(currentFrame, x, y)}
                        />
                </div>
            </div>
            <Controls 
                progress={progress} 
                videoPaused={paused} 
                onPlayPause={playPauseVideo}
                onPreviousSecound={showPreviousSecound}
                onPreviousFrame={showPreviousFrame} 
                onNextFrame={showNextFrame} 
                onNextSecound={showNextSecound}
                onProgressBar={onProgressBarClick}
                disabled={src === ""} />
            <h1>Current Frame: {currentFrame}</h1>
        </div>
    )
}

VideoPlayer.defaultProps = {
    framerate: 29.97,
    drawFrameOverlay: () => {},
    onClick: () => {},
    onDoubleClick: () => {},
};

VideoPlayer.propTypes = {
    src: PropTypes.string
}

export default VideoPlayer
