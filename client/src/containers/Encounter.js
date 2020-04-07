import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchEncounter, removeItem } from "../store/actions/encounterItems";
import { removeError } from "../store/actions/errors";
import MonsterList from "../components/MonsterList";
import MonsterOverview from "../components/MonsterOverview";
import Loot from "../components/Loot";
import Search from "./Search.js";
import "./Encounter.css";

class Encounter extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: true
        }
    }

    toggleShow = () => {
        this.setState({show: !this.state.show});
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

        const {show} = this.state;

        let isHidden, buttonName
        (!show) ? (isHidden = {display: "none"}) : (isHidden = {});
        (show) ? (buttonName = "Hide"): (buttonName="Show");
        
        let monsterOverviewList = monsters.map(m => (
            <MonsterOverview
                key={m._id}
                info={m.info[0]}
                id={m._id}
            />
        ));

        return(
            <div className="encounter">
                <h2 className="encounter-main-title">{currentEncounter.encounter && (<span>{currentEncounter.encounter.title}</span>)}</h2>

                {/* Show monster overview bar if there are montsers */}
                {(monsters.length !== 0 && (
                <div className="monster-overview">
                    <div className="monster-overview-list" style={isHidden}> {monsterOverviewList} </div>
                    {!show && (<h4>Monster Quick List</h4>)}
                    <button className="monster-ov-btn" name="show" onClick={this.toggleShow}>{buttonName}</button>
                 </div>
                ))}

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