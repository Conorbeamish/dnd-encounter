import React, {Component} from "react";
import { connect } from "react-redux";
import {fetchMonsters, removeMonster} from "../store/actions/monsters";
import { removeError } from "../store/actions/errors";
import Monster from "../components/Monster";
import SearchMonsters from "./SearchMonsters.js";
import "./Monsters.css";

class Monsters extends Component {

    componentDidMount(){
        const userID = this.props.match.params.id;
        const encounterID = this.props.match.params.encounter_id;
        this.props.fetchMonsters(userID, encounterID);
    }

    render(){
        const {monsters, removeMonster} = this.props;
        
        let monsterList = monsters.map(m => (
            <Monster
                key={m._id}
                info={m.info[0]}
                id={m._id}
                removeMonster={removeMonster.bind(this, m.user, m.encounter, m._id)}
            />
        ));
        
        return(
            <div className="monsters">
                <h3>Monsters</h3>
                <div className="monster-list">{monsterList}</div>
                {monsters.length === 0 && (<div>You have no monsters saved, try searching for some below...</div>)}
                <SearchMonsters 
                    userID = {this.props.match.params.id}
                    encounterID = {this.props.match.params.encounter_id}
                    removeError = {this.props.removeError}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        monsters: state.monsters,
        
    };
}

export default connect(mapStateToProps, { fetchMonsters, removeMonster, removeError})(Monsters);