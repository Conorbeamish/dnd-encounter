import React from "react";
import "./Weapon.css";

const Weapon = props => {
    const {info} = props
    const {
        name,
        category,
        cost,
        damage_dice,
        damage_type,
        weight,
        properties
    } = info 

    const handleSave = async () => {
        await props.saveItem();
        props.removeError()
    }

    const getPropertyList = () => {
        let propertyList = properties.map(p => (
            <li key={p}>{p}</li>
        ))
        return propertyList
    }

    return(
        <div className="weapon">
            <div className = "weapon-title">
                <h3>{name}</h3>
                <div><em>{category}</em></div>
            </div>
            <div>Cost : {cost}</div>
            <div>Dmg Dice: {damage_dice} <em>{damage_type}</em></div>
            <div>weight : {weight}</div>
            {(properties !== null ) && (<ul>{getPropertyList()}</ul>)}
            {props.saveItem && (
                <button className="weapon-btn" onClick={handleSave}>
                    Save
                </button>
                )
            }
        </div>   
    )
}


export default Weapon;