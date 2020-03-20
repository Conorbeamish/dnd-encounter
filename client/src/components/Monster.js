import React from "react";
import {Link} from "react-router-dom";

const Monster = ({ info, removeMonster, saveMonster, removeError }) => { 

    const handleSave = () => {
        saveMonster()
        removeError()
    }

    return(
        <div>
            <h3>{info.name}</h3>
            {removeMonster && ( 
                <button onClick={removeMonster}>
                    Delete
                </button>
                )
            }
            {saveMonster && (
                <button onClick={handleSave}>
                    Save
                </button>
                )
            }
            
        </div>
    )
}

export default Monster;
 