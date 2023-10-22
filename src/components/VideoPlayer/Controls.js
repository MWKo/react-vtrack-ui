import React from 'react'
import Button from '../Button';

const Controls = ({ progress, videoPaused, onPreviousSecound, onPreviousFrame, onPlayPause, onNextFrame, onNextSecound, onProgressBar, disabled = false }) => {
    const progressBar = React.createRef();

    const onClickProgressBar = (event) => {
        const bounds = progressBar.current.getBoundingClientRect();
        const x = Math.floor(event.clientX - bounds.left);
        if (onProgressBar != null) onProgressBar(x / bounds.width);
        console.log("Click");
    };

    return (
        <div className="controls">
            <div className="progress-bar" onClick={onClickProgressBar} ref={progressBar}>
                <div className="progress" style={{ width: (progress * 100) + '%'}}></div>
            </div>
            <div className="button-bar">
                <button className="btn" onClick={onPreviousSecound} disabled={disabled}>{"<| -1 sec"}</button>
                <button className="btn" onClick={onPreviousFrame} disabled={disabled}>{"<| -1 frame"}</button>
                <button className="btn" onClick={onPlayPause} disabled={disabled}>{videoPaused ? "Play" : "Pause"}</button>
                <button className="btn" onClick={onNextFrame} disabled={disabled}>{"|> +1 frame"}</button>
                <button className="btn" onClick={onNextSecound} disabled={disabled}>{"|> +1 sec"}</button>
            </div>
        </div>
    )
}

export default Controls
