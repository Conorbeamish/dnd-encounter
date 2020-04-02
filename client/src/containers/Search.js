import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchSearchResults, clearSearchResults } from "../store/actions/searchResults";
import { saveMonster} from "../store/actions/monsters";
import Monster from "../components/Monster";
import Weapon from "../components/Weapon";
import MagicItem from "../components/MagicItem";
import "./Search.css";

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            search: "",
            type: "monsters"
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e){
        const {search, type} = this.state
        e.preventDefault();
        this.props.fetchSearchResults(search, type);
    }
    
    render(){

        const {
            saveMonster, 
            userID, 
            encounterID, 
            removeError,
            errors,
            searchResults,
            clearSearchResults,
            history
        } = this.props;

        //Clear search on page change
        history.listen(() => {
            clearSearchResults();
        });

        const getMonsters = () => {
            let searchMonstersList = searchResults.results.map(m => (
                <Monster 
                    key={m.name}
                    info={m}
                    removeError={removeError}
                    saveMonster = {saveMonster.bind(this, userID, encounterID, {"info": m})}
    
                />
            ))
            return(searchMonstersList);
        }

        const getMagicItems = () => {
            let searchMagicItemList = searchResults.results.map(m => (
                <MagicItem
                    key={m.name}
                    info={m}
                />
            ))
            return searchMagicItemList
        }

        const getWeapons = () => {
            let searchWeaponsList = searchResults.results.map(w => (
                <Weapon
                    key={w.name}
                    info={w}
                />
            ))
            return searchWeaponsList
        }

        const renderSearchResult = (type) => {
            switch(type){
                case "monsters":
                    return getMonsters();
                case "weapons":
                    return getWeapons();
                case "magicitems":
                    return getMagicItems();
                default:
                    return "";
            }
        }

        return(
            <div className="search">
                <h2 className="search-title">
                    Search
                </h2>
                {errors.message && (
                    <div>
                        {errors.message}
                    </div>
                )}

                <div className="search-list">
                    {renderSearchResult(searchResults.searchType)} 
                </div>
                
                {/* No Results */}
                {searchResults.count === 0  && (
                    <div className="search-no-result">No results, try searching something else</div>
                )}

                <form onSubmit ={this.handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search for a monster..."
                        value={this.state.search}
                        onChange= {this.handleChange}
                        name="search"
                    />
                    <select 
                        value={this.state.value} 
                        name="type" 
                        onChange={this.handleChange}
                    >
                        <option value="monsters">Monsters</option>
                        <option value="weapons">Weapons</option>
                        <option value="magicitems">Magic Items</option>
                    </select>

                    <button className="search-btn" type="submit">
                        Search
                    </button>
                    <button onClick={clearSearchResults} className="search-btn" type= "button">Clear</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        errors: state.errors,
        searchResults: state.searchResults
    };
}

export default connect(mapStateToProps, { fetchSearchResults, clearSearchResults, saveMonster})(SearchResults);