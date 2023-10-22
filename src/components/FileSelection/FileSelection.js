import React from 'react'
import newID from '../../utils/newID';
import './FileSelection.css';

const FileSelection = ({ labelName, onFileSelected }) => {
    const inputID = newID();

    return (
        <div className="file-selection">
            <label className="btn" for={inputID}>{labelName}</label>
            <input type="file" id={inputID} onChange={onFileSelected} />
        </div>
    )
}

export default FileSelection
