import React from "react";
import {Link} from "react-router-dom";
import "./EncounterTitle.css"
import Moment from 'react-moment';

const EncounterTitle = ({title, date, removeEncounter, user, id}) => { 
    const monstersLink = `/users/${user}/encounters/${id}`;

    return(
        <div className="encounter-title">
            <h3>{title}</h3>
            <div>
                <Moment className="encounter-title-date" format="DD/MM/YYYY">{date}</Moment>
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

export default EncounterTitle;
 