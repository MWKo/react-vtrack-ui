import React from 'react'
import { useState } from 'react';

const SubSettingsHeader = ({ heading = "", body }) => {
    const [showBody, setShowBody] = useState(false);
    const invertShowBody = () => setShowBody(!showBody);

    const showButtonText = showBody ? "Hide" : "Show";
    const buttonAdditionalClass = showBody ? "btn-red" : "btn-green";

    return (
        <div className="sub-settings-block">
            <div className="settings-header">
                <h2>{heading}</h2>
                <button className={`btn ${buttonAdditionalClass}`} onClick={invertShowBody}>{showButtonText}</button>
            </div>
            {showBody ? body : null}
        </div>
    )
}

export default SubSettingsHeader
