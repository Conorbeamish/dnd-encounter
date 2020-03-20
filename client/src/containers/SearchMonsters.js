import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchSearchMonsters } from "../store/actions/searchMonsters";
import Monster from "../components/Monster";

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
        
        let searchMonstersList = this.props.searchMonsters.results.map(m => (
            <Monster 
                key={m._id}
                info={m.name}
            />
        ))

        return(
            <div>
                <h3>
                    Search Monsters
                </h3>
                {this.props.errors.message && (
                    <div>
                        {this.props.errors.message}
                    </div>
                )}
                <form onSubmit ={this.handleSubmit}>
                    <input 
                        type="text" 
                        value={this.state.search}
                        onChange= {this.handleChange}
                    />
                    <button type="submit">
                        Search
                    </button>
                </form>
                {searchMonstersList}
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

export default connect(mapStateToProps, { fetchSearchMonsters})(SearchMonsters);