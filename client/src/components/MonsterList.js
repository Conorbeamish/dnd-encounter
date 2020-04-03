import React, {Component} from "react";
import Monster from "../components/Monster";
import MonsterOverview from "../components/MonsterOverview";
import "./MonsterList.css"


class MonsterList extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: true
        }
    }

    toggleShow = () => {
        this.setState({show: !this.state.show});
    }

    render(){
        const {monsters, removeItem} = this.props;
        const {show} = this.state;

        let isHidden, buttonName
        (!show) ? (isHidden = {display: "none"}) : (isHidden = {});
        (show) ? (buttonName = "Hide"): (buttonName="Show");

        let monsterList = monsters.map(m => (
            <Monster
                key={m._id}
                info={m.info[0]}
                id={m._id}
                removeMonster={removeItem.bind(this, m.user, m.encounter, "monsters", m._id)}
            />
        ));
        
        let monsterOverviewList = monsters.map(m => (
            <MonsterOverview
                key={m._id}
                info={m.info[0]}
                id={m._id}
            />
        ));

        return(
        <div className="monsters">
            <div className="monster-overview">
                <div className="monster-overview-list" style={isHidden}> {monsterOverviewList} </div>
                {!show && (<h4>Monster Quick List</h4>)}
                {(show && monsterList.length === 0 ) && (<div>Monster list empty</div>)}
                <button className="monster-ov-btn" name="show" onClick={this.toggleShow}>{buttonName}</button>
            </div>

            <div className="item-list">{monsterList}</div>
            {monsters.length === 0 && (<div className="no-monsters-msg">You have no monsters saved, try searching for some below...</div>)}
        </div>
        )
    }

}

export default MonsterList;