import React, {Component} from "react";
import "./Monster.css";

 class Monster extends Component { 

    constructor(props){
        super(props);
        this.state ={show: false}
    }
    
    
    toggleModal = () => {
        this.setState({show: !this.state.show});
    }

    handleSave = () => {
        this.props.saveMonster()
        this.props.removeError()
    }

    getMovement = () => {
        const movement = []
        const {info} = this.props
        for(let [type, dist] of Object.entries(info.speed)){
            movement.push(<span key={type}>{type} - {dist} </span>)
        }   
        return movement
    } 

    abilityModifier = (stat) => {
        return Math.floor((stat - 10) / 2)
    } 

    getSkills = () => {
        const skills = []
        const {info} = this.props
        if(info.skills){
            for(let [skill, stat] of Object.entries(info.skills)){
                skills.push(<span key={skill}>{skill} +{stat}</span>)
            }   
            return skills
        }
    } 

    actionList = () => {
        const {info} = this.props
        return(
            info.actions.map(a => (
                <ul className="monster-atk" key={a.name}>
                    <li><strong>{a.name}</strong> : <em>{a.desc}</em> </li>
                    <div className="monster-atk-dice">
                        <li>Atk Bonus : {a.attack_bonus}</li>
                        <li>Dmg Dice : {a.damage_dice}</li>
                        <li>Dmg Bonus : {a.damage_bonus}</li>
                    </div>
                </ul>
            ))
        ) 
    }

    getAbilities = (type) => {
        return(
            type.map(a => (
                <ul className="monster-atk" key={a.name}>
                    <li><strong>{a.name}</strong> <em>{a.desc}</em></li>
                </ul>
            ))
        )
    }

    render(){
        const {info, saveMonster, removeMonster} = this.props
    
        return(
            <div className="monster">
                <div className="monster-title">
                    <h3 >{info.name}</h3>
                    <div><em>{info.size} {info.type} {info.alignment}</em></div>
                </div>
                <div>AC: {info.armor_class} HP: {info.hit_points}</div>
                <div>Hit dice:  ({info.hit_dice})</div>
                <div>Speed: {this.getMovement()}</div>
                <ul className="monster-stats">
                    <li>Str: {info.strength}  ({this.abilityModifier(info.strength)})  </li>
                    <li>Dex: {info.dexterity}  ({this.abilityModifier(info.dexterity)}) </li>
                    <li>Con: {info.constitution}  ({this.abilityModifier(info.constitution)})  </li>
                    <li>Int: {info.intelligence}  ({this.abilityModifier(info.intelligence)}) </li>
                    <li>Wis: {info.wisdom}  ({this.abilityModifier(info.wisdom)}) </li>
                    <li>Cha: {info.charisma}  ({this.abilityModifier(info.charisma)}) </li>
                </ul>

                {/* Full descitption */}
                {this.state.show && (
                    <div>
                        <div className="monster-saving">Saving Throws: Str({info.strength_save}) Dex({info.dexterity_save}) Con({info.constitution_save}) Int({info.intelligence_save}) Cha({info.charisma_save}) Wis({info.wisdom_save})</div>
                        <div className="monster-skill">Skills: {this.getSkills()}</div>
                        {info.damage_vulnerabilities.length !==0 &&  (<div>Dmg Vulnerabilities: {info.damage_vulnerabilities}</div>)}
                        {info.damage_resistances.length !==0 &&  (<div>Dmg Resistances: {info.damage_resistances}</div>)}
                        {info.damage_immunities.length !==0 &&  (<div>Dmg Immunities: {info.damage_immunities}</div>)}
                        {info.condition_immunities.length !==0 &&  (<div>Condition Immunities: {info.condition_immunities}</div>)}
                        <div>Senses: {info.senses}</div>
                        <div>Languages: <em>{info.languages}</em></div>

                        <h3 className="monster-actions-title">Actions</h3>
                        <div>{this.actionList()}</div>

                        <h3 className="monster-actions-title">Special Abilities</h3>
                        {this.getAbilities(info.special_abilities)}
                        {info.legendary_actions.length !==0 && (
                            <div>
                                <h3 className="monster-actions-title">Legendary Actions</h3>
                                {info.legendary_desc}
                                {this.getAbilities(info.legendary_actions)}
                            </div>
                        )}
                    </div>
                )}
        
                {/* If a saved monster */}
                {removeMonster && (<div className="monster-buttons">
                        <button className="monster-btn" onClick={this.toggleModal}>
                            {!this.state.show && ("View")}
                            {this.state.show && ("Close")}
                        </button>
                        <button className="monster-btn-delete" onClick={removeMonster}>
                            Delete
                        </button>
                    </div>
                    )
                }
                

                {/* If a searched monster */}
                {saveMonster && (
                    <button className="monster-btn" onClick={this.handleSave}>
                        Save
                    </button>
                    )
                }
                
            </div>
        )    
    }
}

export default Monster;
 