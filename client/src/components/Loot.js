import React, {Component} from "react";
import MagicItem from "./MagicItem";
import Weapon from "./Weapon";
import "./Loot.css";

class Loot extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    toggleShow = () => {
        this.setState({show: !this.state.show});
    }

    render(){
        const {weapons, magicItems, removeItem} = this.props;
        const {show} = this.state;
        
        let weaponList = weapons.map(w => (
            <Weapon
                key={w._id}
                info={w.info[0]}
                id={w._id}
                removeItem={removeItem.bind(this, w.user, w.encounter, "weapons", w._id)}
            />
        ))

        let magicItemsList = magicItems.map(m => (
            <MagicItem
                key={m._id}
                info={m.info[0]}
                id={m._id}
                removeItem={removeItem.bind(this, m.user, m.encounter, "magicitems", m._id )}
            />
        ))

        // hide and show text
        let isHidden, buttonName
        (!show) ? (isHidden = {display: "none"}) : (isHidden = {});
        (show) ? (buttonName = "Hide Loot"): (buttonName="Show Loot");

        return(
            <div className="loot">
                <div className="loot-title">
                    <button type="button" className="loot-btn" onClick={this.toggleShow}>
                    {buttonName}
                    </button>
                </div>
                

                <div style={isHidden}>
                    {/* no loot */}
                    {(magicItems.length == 0 && weapons.length ==0) && (
                        <div>You have no loot save, try searching for some below...</div>
                    )}
                    
                    {weapons.length !==0 && (<h3>Weapons</h3>)}
                    <div className="loot-list">
                        {weaponList}
                    </div>

                    {magicItems.length !==0 && (<h3>Magic Items</h3>)}
                    <div className="loot-list">
                        {magicItemsList}
                    </div>
                </div>
            </div>
        )
    }
}

export default Loot