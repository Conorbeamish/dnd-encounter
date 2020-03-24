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
            <div key={m._id}>
                <Monster
                    info={m.info[0]}
                    id={m._id}
                    removeMonster={removeMonster.bind(this, m.user, m.encounter, m._id)}
                />
            </div>
        ));
        
        return(
            <div>
                <h1>Monsters</h1>
                {monsterList}
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