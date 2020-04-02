import React, {Component} from "react";
import "./MagicItem.css";

class MagicItem extends Component { 

    constructor(props){
        super(props);
        this.state ={show: false}
    }
    
    handleSave = async () => {
        await this.props.saveItem();
        this.props.removeError()
    }

    toggleShow = () => {
        this.setState({show: !this.state.show});
    }

    render(){
        const {
            name,
            rarity,
            desc,
            type,
            requires_attunement
        } = this.props.info;

        const {show} = this.state;
        
        return  (
            <div className="magic-item">
                <div className="magic-item-title">
                    <h3>{name}</h3>
                    <div><em>{type}</em></div>
                </div>

                <div className="magic-item-content">
                    <div><strong>{rarity}</strong></div>
                    <div><em>{requires_attunement}</em></div> 

                    {/* Partial Description */}
                    {!show && (
                        <div>
                            {desc.substring(0,100)}...
                        </div>
                    )}

                    {/* Show full item */}
                    {show && (
                        <div>{desc}</div>
                    )}
                </div>
                
                <div className="magic-item-buttons">
                    {this.props.saveItem && (
                        <button className="magic-item-btn" onClick={this.handleSave}>
                            Save
                        </button>
                        )
                    }
                    <button className="magic-item-btn" onClick={this.toggleShow}>
                        {!this.state.show && ("View")}
                        {this.state.show && ("Close")}
                    </button>
                </div>
            </div>
        )
    }
    
    
        
    }

export default MagicItem;