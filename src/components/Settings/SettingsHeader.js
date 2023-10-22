import React from 'react'
import { useState } from 'react';
import './Settings.css';

const SettingsHeader = ({ heading = "", body }) => {
    const [showBody, setShowBody] = useState(false);
    const invertShowBody = () => setShowBody(!showBody);

    const showButtonText = showBody ? "Hide" : "Show";
    const buttonAdditionalClass = showBody ? "btn-red" : "btn-green";

    return (
        <div className="settings">
            <div className="settings-header">
                <h1>{heading}</h1>
                <button className={`btn ${buttonAdditionalClass}`} onClick={invertShowBody}>{showButtonText}</button>
            </div>
            {showBody ? body : null}
        </div>
    )
}

export default SettingsHeader
