import React, {Component} from "react";
import "./MonsterOverview.css";

class MonsterOverview extends Component{
    constructor(props){
        super(props);
        this.state = {
            hp: this.props.info.hit_points,
            roll: "Roll"
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleRoll = () => {
        const score = (Math.ceil(Math.random() * 20));
        this.setState({
            roll: score
        });
    }

    render(){
        const {hp, roll} = this.state
        const {name} = this.props.info
        const pipe = (<span style={{color: "#e40611", fontWeight: "bold"}}> | </span>)
        let isDead
        (hp === "0") ? (isDead = {backgroundColor: "rgba(49, 54, 57, 0.75)"}) : (isDead= {});
        
        return(
            <div className ="ov-monster" style={isDead}>
                <div className="ov-monster-title">{name.substring(0,10)}{pipe}</div>
                <form  onSubmit={e => { e.preventDefault(); }}>
                    <label htmlFor="id">HP: </label>
                    <input 
                        id="hp"
                        type="number"
                        min="0" 
                        name="hp"
                        value={hp}
                        onChange={this.handleChange}
                    />
                </form>
                {pipe}
                <button className="roll" onClick={this.handleRoll}>
                    {roll}
                </button>
            </div>
        )
    }


}

export default MonsterOverview; 
