import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchSearchResults, clearSearchResults } from "../store/actions/searchResults";
import { saveItem } from "../store/actions/encounterItems"
import Monster from "../components/Monster";
import Weapon from "../components/Weapon";
import MagicItem from "../components/MagicItem";
import Loader from "../components/Loader";
import "./Search.css";

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            search: "",
            type: "monsters",
            loading: false
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    loadSearchResults = async () => {
        const {search, type} = this.state
        await this.props.fetchSearchResults(search, type);
        this.setState({
            loading: false
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({
            loading: true
        })
        this.loadSearchResults()
    }

    getMonsters = () => {
        const {
            saveItem, 
            userID, 
            encounterID, 
            removeError,
            searchResults
        } = this.props

        let searchMonstersList = searchResults.results.map(m => (
            <Monster 
                key={m.name}
                info={m}
                removeError={removeError}
                saveItem = {saveItem.bind(this, userID, encounterID, "monsters", {"info": m})}

            />
        ))
        return(searchMonstersList);
    }

    getMagicItems = () => {
        const {
            saveItem, 
            userID, 
            encounterID, 
            removeError,
            searchResults
        } = this.props

        let searchMagicItemList = searchResults.results.map(m => (
            <MagicItem
                key={m.name}
                info={m}
                removeError={removeError}
                saveItem = {saveItem.bind(this, userID, encounterID, "magicitems", {"info": m})}
            />
        ))
        return searchMagicItemList
    }

    getWeapons = () => {
        const {
            searchResults, 
            saveItem,
            removeError,
            userID, 
            encounterID, 
        } = this.props;
        let searchWeaponsList = searchResults.results.map(w => (
            <Weapon
                key={w.name}
                info={w}
                saveItem = {saveItem.bind(this, userID, encounterID, "weapons", {"info": w})}
                removeError={removeError}
            />
        ))
        return searchWeaponsList
    }

    renderSearchResult = (type) => {
        switch(type){
            case "monsters":
                return this.getMonsters();
            case "weapons":
                return this.getWeapons();
            case "magicitems":
                return this.getMagicItems();
            default:
                return "";
        }
    }

    render(){
        const {
            errors,
            searchResults,
            clearSearchResults,
            history
        } = this.props;

        //Clear search on page change
        history.listen(() => {
            clearSearchResults();
        });

        
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

                {this.state.loading ? (
                    <Loader />
                ) : (
                    <div className="search-list">
                        {this.renderSearchResult(searchResults.searchType)} 
                    </div> 
                )}
                
                {/* No Results */}
                {searchResults.count === 0  && (
                    <div className="search-no-result">No results, try searching something else</div>
                )}

                <form onSubmit ={this.handleSubmit}>
                    <select 
                        className="search-item"
                        value={this.state.value} 
                        name="type" 
                        onChange={this.handleChange}
                    >
                        <option value="monsters">Monsters</option>
                        <option value="weapons">Weapons</option>
                        <option value="magicitems">Magic Items</option>
                    </select>

                    <input
                        className="search-item" 
                        type="text" 
                        placeholder={`Search for ${this.state.type}...`}
                        value={this.state.search}
                        onChange= {this.handleChange}
                        name="search"
                        autoComplete="off"
                    />

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

export default connect(mapStateToProps, { fetchSearchResults, clearSearchResults, saveItem})(SearchResults);