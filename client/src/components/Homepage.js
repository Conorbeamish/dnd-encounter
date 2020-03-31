import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = ({currentUser}) => {
    const encounterLink = `/users/${currentUser.user.id}/encounters`
    if(!currentUser.isAuthenticated){
        return(
            <div className="homepage">
                <h1>D&D Encounter</h1>
                <div className="homepage-links">
                    <Link className = "homepage-link" to="/signup">
                        Sign up
                    </Link>
                    <span style={{color: "#e40611", fontSize:"2rem"}}> | </span>
                    <Link className = "homepage-link" to="/signin">
                        Sign In
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="homepage">
            <h1>D&D Encounter</h1>
            <div className="homepage-links">
                <Link  className = "homepage-link"  to={encounterLink}>
                    Enter  
                </Link>
            </div>
        </div>
    )
}

export default Homepage;