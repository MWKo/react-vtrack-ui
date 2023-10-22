import React from 'react'
import { useState } from 'react';
import FileSelection from './FileSelection';
import './FileSelection.css';

const VideoSelection = ({ onVideoLoaded }) => {
    const [videoName, setVideoName] = useState("")

    const onFileSelected = e => {
        const file = e.target.files[0];
        if (!file) return;
        

        let reader = new FileReader();
        reader.onload = e => onVideoLoaded(e.target.result);
        reader.readAsDataURL(file);
        setVideoName(file.name);
    };

    const onFileSelected2 = () => alert("F");

    return (
        <div className="file-selection-menu-element">
            <h2><strong>Video-Filename:</strong><br/>{videoName}</h2>
            <FileSelection labelName="Load Video" onFileSelected={onFileSelected} />
        </div>
    )
}

export default VideoSelection
