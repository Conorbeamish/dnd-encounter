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

        const {removeItem} = this.props;
        
        return  (
            <div className="magic-item">
                <div className="magic-item-title">
                    <h3>{name}</h3>
                    <div><em>{type}</em></div>
                </div>

                <div className="magic-item-content">
                    <div><strong>{rarity}</strong></div>
                     

                    {/* Partial Description */}
                    {!show && (
                        <div>
                            {desc.substring(0,100)}...
                        </div>
                    )}

                    {/* Show full item */}
                    {show && (
                        <div>
                            <div>{desc}</div>
                            <div><em>{requires_attunement}</em></div>
                        </div>
                    )}
                </div>
                
                <div className="magic-item-buttons">
                    {this.props.saveItem && (
                        <button className="magic-item-btn" onClick={this.handleSave}>
                            Save
                        </button>
                        )
                    }
                    {removeItem && (
                        <button className="magic-item-btn-delete" onClick={removeItem}>
                            Delete
                        </button>
                    )}
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