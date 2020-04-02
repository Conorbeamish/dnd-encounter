import React from "react";
import "./MagicItem.css";

const MagicItem = props => {
    const {info} = props
    const {
        name,
        rarity,
        desc,
        type,
        requires_attunement
    } = info

    const handleSave = async () => {
        await props.saveItem();
        props.removeError()
    }
    
    return  (
        <div className="magic-item">
            <div className="magic-item-title">
                <h3>{name}</h3>
                <div><em>{type}</em></div>
            </div>
            <div>{desc}</div>
            <div><strong>{rarity}</strong></div>
            <div><em>{requires_attunement}</em></div>
            {props.saveItem && (
                <button className="magic-item-btn" onClick={handleSave}>
                    Save
                </button>
                )
            }
        </div>
    )
}


export default MagicItem;