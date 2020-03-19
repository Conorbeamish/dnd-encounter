import React, {Component} from "react";
import { connect } from "react-redux";
import {fetchMonsters} from "../store/actions/monsters";
import Monster from "../components/Monster";

class Monsters extends Component {

    componentDidMount(){
        const userID = this.props.match.params.id;
        const encounterID = this.props.match.params.encounter_id;
        this.props.fetchMonsters(userID, encounterID);
    }

    render(){
        const {monsters} = this.props
        let monsterList = monsters.map(e => (
            <Monster
                key={e.id}
                info={e.info}
            />
            
        ));
        return(
            <div>
                <h1>Monsters</h1>
                {monsterList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        monsters: state.monsters,
    };
}

export default connect(mapStateToProps, { fetchMonsters })(Monsters);