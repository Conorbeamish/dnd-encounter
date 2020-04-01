import React from "react";
import {Link} from "react-router-dom";
import "./Encounter.css"
import Moment from 'react-moment';

const Encounter = ({title, date, removeEncounter, user, id}) => { 
    const monstersLink = `/users/${user}/encounters/${id}`;

    return(
        <div className="encounter">
            <h3>{title}</h3>
            <div>
                <Moment className="encounter-date" format="DD/MM/YYYY">{date}</Moment>
                <Link to={monstersLink}>
                        View
                </Link>
                <button onClick = {removeEncounter}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Encounter;
 