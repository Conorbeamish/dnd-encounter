import React, {Component} from "react";
import Monster from "../components/Monster";
import "./MonsterList.css";


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
    
        let monsterList = monsters.map(m => (
            <Monster
                key={m._id}
                info={m.info[0]}
                id={m._id}
                removeMonster={removeItem.bind(this, m.user, m.encounter, "monsters", m._id)}
            />
        ));
        
        return(
        <div className="monsters"> 
            <h3>Monsters</h3>
            <div className="item-list">{monsterList}</div>
            {monsters.length === 0 && (<div className="no-monsters-msg">You have no monsters saved, try searching for some below...</div>)}
        </div>
        )
    }

}

export default MonsterList;