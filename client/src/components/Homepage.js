import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import Encounters from "../containers/Encounters";

const Homepage = ({currentUser}) => {
    const encounterLink = `/users/${currentUser.user.id}/encounters`
    if(!currentUser.isAuthenticated){
        return(
            <div className="homepage">
                <h1>DnD Encounter</h1>
                <Link to="/signup">
                    Sign up Here
                </Link>
            </div>
        )
    }
    return (
        <div className="mainMenu">
            <Link to={encounterLink}>
                Encounters    
            </Link>
        </div>
    )
}

export default Homepage;