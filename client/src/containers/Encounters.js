import React, {Component} from "react";
import { connect } from "react-redux";
import {fetchEncounters} from "../store/actions/encounters";
import Encounter from "../components/Encounter";

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
            <div>
                {encounterList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        encounters: state.encounters
    };
}

export default connect(mapStateToProps, { fetchEncounters })(Encounters);