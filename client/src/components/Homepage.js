import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => (
    <div className="homepage">
        <h1>DnD Encounter</h1>
        <Link to="/signup">
            Sign up Here
        </Link>
    </div>
)

export default Homepage;