import React from "react";
import {Link} from "react-router-dom";

const Monster = ({ info, removeMonster, saveMonster, removeError }) => { 

    const handleSave = () => {
        saveMonster()
        removeError()
    }

    const actionList = info.actions.map(a => (
        <ul>
            <li>Name : {a.name}</li>
            <li>Attack Bonus : {a.attack_bonus}</li>
            <li>Damage Dice : {a.damage_dice}</li>
            <li>Damage Bonus : {a.damage_bonus}</li>
        </ul>
    ))

    return(
        <div className="monster-card">
            <h3>{info.name}</h3>
            <div>AC: {info.armor_class} HP: {info.hit_points}</div>
            
            {removeMonster && (<div>
                <h5>Skills</h5>
                <ul>
                    <li>Strength: {info.strength}</li>
                    <li>Dex: {info.dexterity}</li>
                    <li>Constitution: {info.constitution}</li>
                    <li>Intelligence: {info.intelligence}</li>
                    <li>Wisdom: {info.wisdom}</li>
                    <li>Charisma: {info.charisma}</li>
                </ul>
                <h5>Attacks</h5>
                {actionList}
                    <button onClick={removeMonster}>
                        Delete
                    </button>
                </div>
                )
            }
            
            {saveMonster && (
                <button onClick={handleSave}>
                    Save
                </button>
                )
            }
            
        </div>
    )
}

export default Monster;
 