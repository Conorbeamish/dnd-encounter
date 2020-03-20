import React from "react";
import {Link} from "react-router-dom";

const Monster = ({ info, removeMonster }) => { 

    return(
        <div>
            <h3>{info}</h3>
            <button onClick={removeMonster}>
                Delete
            </button>
        </div>
    )
}

export default Monster;
 