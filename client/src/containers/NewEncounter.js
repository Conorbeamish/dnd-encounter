import React, {Component} from "react";
import {connect} from "react-redux";
import {postEncounter} from "../store/actions/encounters";
import {removeError} from "../store/actions/errors";
import "./NewEncounter.css"


class NewEncounter extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            title:""
        };
    }

    handleNewEncounter = event => {
        const {removeError} = this.props;
        removeError();
        event.preventDefault();
        //Post request must contain "title: $sometext "
        this.props.postEncounter(this.state);
        this.setState({title:""});
    }

    handleChange(e) {
        this.setState({ title: e.target.value})
    }

    render(){

        const {history, removeError} = this.props;

        history.listen(() => {
            removeError();
        });

        return(
            <div className="new-encounter">
                <form onSubmit={this.handleNewEncounter}>
                    {this.props.errors.message && (
                        <div className="encounter-err">
                            {this.props.errors.message}
                        </div>
                    )}
                    <div>
                        <input 
                            type="text" 
                            value={this.state.title}
                            onChange= {this.handleChange}
                            placeholder="Start a new encounter"
                        />
                        <button type="submit">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors,
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, { postEncounter, removeError })(NewEncounter);