import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchSearchMonsters } from "../store/actions/searchMonsters";
import { saveMonster} from "../store/actions/monsters";
import Monster from "../components/Monster";
import "./Search.css";

class SearchMonsters extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            search: ""
        };
    }

    handleChange(e) {
        this.setState({ search: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.fetchSearchMonsters(this.state.search);
    }

    render(){

        const {saveMonster, userID, encounterID, removeError, searchMonsters} = this.props;
        
        let searchMonstersList = searchMonsters.map( i => i.map(m => (
            <Monster 
                key={m.name}
                info={m}
                removeError={removeError}
                saveMonster = {saveMonster.bind(this, userID, encounterID, {"info": m})}

            />
        )))

        return(
            <div className="search">
                <h2 className="search-title">
                    Search
                </h2>
                {this.props.errors.message && (
                    <div>
                        {this.props.errors.message}
                    </div>
                )}
                
                {searchMonsters[0] == ""  && (
                    <div className="monster-no-result">No results, try searching something else</div>
                )}
                <div className="monster-list">{searchMonstersList} </div>

                <form onSubmit ={this.handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search for a monster..."
                        value={this.state.search}
                        onChange= {this.handleChange}
                    />

                    <button className="search-btn" type="submit">
                        Search
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        errors: state.errors,
        searchMonsters: state.searchMonsters
    };
}

export default connect(mapStateToProps, { fetchSearchMonsters, saveMonster})(SearchMonsters);