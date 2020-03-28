import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = ({currentUser}) => {
    const encounterLink = `/users/${currentUser.user.id}/encounters`
    if(!currentUser.isAuthenticated){
        return(
            <div className="homepage">
                <h1>DnD Encounter</h1>
                <div className="homepage-links">
                    <Link to="/signup">
                        Sign up
                    </Link>
                    <Link to="/signin">
                        Sign In
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="homepage">
            <h1>DnD Encounter</h1>
            <div>
                <Link to={encounterLink}>
                    Encounters    
                </Link>
            </div>
        </div>
    )
}

export default Homepage;