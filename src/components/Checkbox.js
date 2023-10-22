import React from 'react'
import '../App.css';

const Checkbox = ({ labelName, checked, onChangeChecked }) => {
    return (
        <div className="checkbox-div">
            <label>{labelName}</label>
            <input type="checkbox" value={checked} checked={checked} onChange={(e) => onChangeChecked(e.currentTarget.checked)} />
        </div>
    )
}

export default Checkbox
