import React, {Component} from "react";
import { connect } from "react-redux";
import {fetchEncounters, removeEncounter} from "../store/actions/encounters";
import EncounterTitle from "../components/EncounterTitle";
import NewEncounter from "../containers/NewEncounter";
import Loader from "../components/Loader";
import "./Encounters.css";

class Encounters extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }

    loadEncounters = async () => {
        const userId = this.props.currentUser.user.id;
        await this.props.fetchEncounters(userId)
        this.setState({
            loading: false
        })
    }

    componentDidMount(){
        this.loadEncounters()
    }

    render(){
        const {encounters, removeEncounter} = this.props
        let encounterList = encounters.map(e => (
            <EncounterTitle
                key={e._id}
                id={e._id}
                title={e.title}
                date={e.createdAt}
                user={e.user._id}
                removeEncounter={removeEncounter.bind(this, e.user._id, e._id)}
            />
        ));
        return (
            <div className="encounters">
                <div className="encounters-jumbotron">
                    <h2>
                        My Encounters
                    </h2>
                </div>

                {!this.state.loading && (
                    <div className="encounters-container">
                    <NewEncounter className="new-encounter"
                        history={this.props.history}
                    />
                    {encounterList.length === 0 && (<div>You have no encounters, enter a name for a new encounter above</div>)}
                    {encounterList}
                    </div>
                )}

                {this.state.loading && (
                    <Loader/>
                )}
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

export default connect(mapStateToProps, { fetchEncounters, removeEncounter})(Encounters);