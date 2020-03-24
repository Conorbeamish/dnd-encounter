import React from "react";
import {Link} from "react-router-dom";
import "./Monster.css";

const Monster = ({ info, removeMonster, saveMonster, removeError }) => { 

    const handleSave = () => {
        saveMonster()
        removeError()
    }

    const actionList = info.actions.map(a => (
        <ul key={a.name}>
            <li>Name : {a.name}</li>
            <li>Atk Bonus : {a.attack_bonus}</li>
            <li>Dmg Dice : {a.damage_dice}</li>
            <li>Dmg Bonus : {a.damage_bonus}</li>
        </ul>
    ))

    const getMovement = () => {
        const movement = []
        for(let [type, dist] of Object.entries(info.speed)){
            movement.push(<span>{type} - {dist} </span>)
        }   
        return movement
    } 

    const getSkills = () => {
        const skills = []
        for(let [skill, stat] of Object.entries(info.skills)){
            skills.push(<span>{skill} {stat}, </span>)
        }   
        return skills
    } 

    return(
        <div className="monster">
            <h3>{info.name}</h3>
            <div>AC: {info.armor_class} HP: {info.hit_points}</div>
            <div>Hit dice:  ({info.hit_dice})</div>
            <div>Speed: {getMovement()}</div>
            <ul className="monster-stats">
                <li>Str: {info.strength} </li>
                <li>Dex: {info.dexterity} </li>
                <li>Con: {info.constitution} </li>
                <li>Int: {info.intelligence} </li>
                <li>Wis: {info.wisdom} </li>
                <li>Cha: {info.charisma} </li>
            </ul>
            <div>Saving Throws: Str({info.strength_save}) Dex({info.dexterity_save}) Con({info.constitution_save}) Int({info.intelligence_save}) Cha({info.charisma_save}) Wis({info.wisdom_save})</div>
            <div>Skills: {getSkills()}</div>
        
            {removeMonster && (<div>
                
                <h5>Attacks</h5>
                {actionList}
                    <button className="monster-btn-delete" onClick={removeMonster}>
                        Delete
                    </button>
                </div>
                )
            }
            
            {saveMonster && (
                <button className="monster-btn-save" onClick={handleSave}>
                    Save
                </button>
                )
            }
            
        </div>
    )
}

export default Monster;
 