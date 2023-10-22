import React from 'react'

const ColorSettings = ({ name="", color, setColor, disabled=false }) => {
    const onChangeRed = red => setColor({ ...color, red: red });
    const onChangeGreen = green => setColor({ ...color, green: green });
    const onChangeBlue = blue => setColor({ ...color, blue: blue });

    return (
        <div className="color-settings">
            {name === "" ? null : name}
            <div className="color-value-block">
                <div className="color-value">
                    <label>Red: </label>
                    <input type="number" placeholder="Red" value={color.red} min={0} max={255} onChange={(e) => onChangeRed(+e.target.value)} disabled={disabled} />
                </div>
                <div className="color-value">
                    <label>Green: </label>
                    <input type="number" placeholder="Green" value={color.green} min={0} max={255} onChange={(e) => onChangeGreen(+e.target.value)} disabled={disabled} />
                </div>
                <div className="color-value">
                    <label>Blue: </label>
                    <input type="number" placeholder="Blue" value={color.blue} min={0} max={255} onChange={(e) => onChangeBlue(+e.target.value)} disabled={disabled} />
                </div>
            </div>
        </div>
    )
}

export default ColorSettings
