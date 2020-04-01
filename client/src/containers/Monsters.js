import React, {Component} from "react";
import { connect } from "react-redux";
import {fetchMonsters, removeMonster} from "../store/actions/monsters";
import { fetchEncounter } from "../store/actions/encounters";
import { removeError } from "../store/actions/errors";
import Monster from "../components/Monster";
import MonsterOverview from "../components/MonsterOverview";
import Search from "./Search.js";
import "./Monsters.css";

class Monsters extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: true
        }
    }

    componentDidMount(){
        const userID = this.props.match.params.id;
        const encounterID = this.props.match.params.encounter_id;
        this.props.fetchMonsters(userID, encounterID);
        this.props.fetchEncounter(userID, encounterID);
    }

    toggleShow = () => {
        this.setState({show: !this.state.show});
    }

    render(){
        const {monsters, removeMonster, currentEncounter} = this.props;
        const {show} = this.state;
        let isHidden, buttonName
        (!show) ? (isHidden = {display: "none"}) : (isHidden = {});
        (show) ? (buttonName = "Hide"): (buttonName="Show");

        let monsterList = monsters.map(m => (
            <Monster
                key={m._id}
                info={m.info[0]}
                id={m._id}
                removeMonster={removeMonster.bind(this, m.user, m.encounter, m._id)}
            />
        ));
        
        let monsterOverviewList = monsters.map(m => (
            <MonsterOverview
                key={m._id}
                info={m.info[0]}
                id={m._id}
            />
        ));

        return(
            <div className="monsters">
                {currentEncounter.encounter && (<h2>{currentEncounter.encounter.title}</h2>)}

                <div className="monster-overview">
                    <div className="monster-overview-list" style={isHidden}> {monsterOverviewList} </div>
                    {!show && (<h4>Monster Quick List</h4>)}
                    {(show && monsterList.length === 0 ) && (<div>Monster list empty</div>)}
                    <button className="monster-ov-btn" name="show" onClick={this.toggleShow}>{buttonName}</button>
                </div>

                <div className="monster-list">{monsterList}</div>
                {monsters.length === 0 && (<div className="no-monsters-msg">You have no monsters saved, try searching for some below...</div>)}

                <Search
                    userID = {this.props.match.params.id}
                    encounterID = {this.props.match.params.encounter_id}
                    removeError = {this.props.removeError}
                    history = {this.props.history}
                    
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        monsters: state.monsters,
        currentEncounter: state.currentEncounter
    };
}

export default connect(mapStateToProps, { fetchMonsters, fetchEncounter, removeMonster, removeError})(Monsters);