import React from "react";
import {Link} from "react-router-dom";

const Encounter = ({title, date }) => (
    <div>
        <h3>{title}</h3>
        <div>{date}</div>
    </div>
)

export default Encounter;
 