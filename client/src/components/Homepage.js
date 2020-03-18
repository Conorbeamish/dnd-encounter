import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import Encounters from "../containers/Encounters";

const Homepage = ({currentUser}) => {
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
        <Encounters currentUser={currentUser}/>
    )
}

export default Homepage;