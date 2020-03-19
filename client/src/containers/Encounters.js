import React, {Component} from "react";
import { connect } from "react-redux";
import {fetchEncounters} from "../store/actions/encounters";
import Encounter from "../components/Encounter";
import NewEncounter from "../containers/NewEncounter";
import "./Encounters.css";

class Encounters extends Component {

    componentDidMount(){
        const userId = this.props.currentUser.user.id;
        this.props.fetchEncounters(userId);
    }

    render(){
        const {encounters} = this.props
        let encounterList = encounters.map(e => (
            <Encounter
                key={e._id}
                title={e.title}
                date={e.createdAt}
            />
        ));
        return (
            <div className="encounters">
                <NewEncounter 
                    history={this.props.history}
                    removeError={this.props.removeError}/>
                {encounterList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        encounters: state.encounters,
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, { fetchEncounters})(Encounters);