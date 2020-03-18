import React from "react";
import {Link} from "react-router-dom";

const Encounter = ({title, date }) => (
    <div>
        <h3>{title}</h3>
        <div>{date}</div>
        <button>View Encounter</button>
    </div>
)

export default Encounter;
 