import React from "react";
import {Link} from "react-router-dom";

const Encounter = ({title, date, removeEncounter, user, id}) => { 
    const monstersLink = `/users/${user}/encounters/${id}/monsters`;

    return(
        <div>
        <h3>{title}</h3>
        <div>{date}</div>
        <Link to={monstersLink}>
                View Encounter    
        </Link>
        <button onClick = {removeEncounter}>
            Delete
        </button>
        </div>
    )
}

export default Encounter;
 