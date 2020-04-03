import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchEncounter, removeItem } from "../store/actions/encounterItems";
import { removeError } from "../store/actions/errors";
import MonsterList from "../components/MonsterList";
import Loot from "../components/Loot";
import Search from "./Search.js";
import "./Encounter.css";

class Encounter extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const userID = this.props.match.params.id;
        const encounterID = this.props.match.params.encounter_id;
        this.props.fetchEncounter(userID, encounterID);
    }

    render(){
        const {monsters, 
            currentEncounter, 
            removeItem,
            weapons,
            magicItems
        } = this.props;

        return(
            <div className="encounter">
                {currentEncounter.encounter && (<h2>{currentEncounter.encounter.title}</h2>)}

                <MonsterList
                    monsters={monsters}
                    removeItem={removeItem}
                />

                <Loot
                    weapons={weapons}
                    magicItems={magicItems}
                    removeItem={removeItem}
                />

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
        weapons: state.weapons,
        magicItems : state.magicItems,
        currentEncounter: state.currentEncounter
    };
}

export default connect(mapStateToProps, { fetchEncounter, removeError, removeItem})(Encounter);