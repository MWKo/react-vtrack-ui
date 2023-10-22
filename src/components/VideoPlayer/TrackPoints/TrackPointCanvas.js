import React, { useEffect } from 'react'
import './TrackPointCanvas.css';

const TrackPointCanvas = ({ draw, onClick, onDoubleClick}) => {
    const canvasRef = React.createRef();
    const divRef = React.createRef();

    const onClickHandler = (event) => {
        const bounds = canvasRef.current.getBoundingClientRect();
        const x = Math.floor(event.clientX - bounds.left);
        const y = Math.floor(event.clientY - bounds.top);
        if (event.detail === 1) onClick(x, y);
        else if (event.detail === 2) onDoubleClick(x, y);
    };

    const updateSize = () => {
        const canvas = canvasRef.current;
        const pdiv = divRef.current;
        canvas.width = pdiv.clientWidth;
        canvas.height = pdiv.clientHeight;
    };

    useEffect(() => {
        updateSize();
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw(context);
    }, [draw]);

    return (
        <div class="track-point-canvas" ref={divRef}>
            <canvas className="track-point-canvas" ref={canvasRef} onClick={onClickHandler} />
        </div>
    )
}

TrackPointCanvas.defaultProps = {
    onClick: () => {},
    onDoubleClick: () => {},
}

export default TrackPointCanvas
