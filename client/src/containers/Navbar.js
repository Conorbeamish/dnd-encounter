import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "./Navbar.css";

class Navbar extends Component{
    render(){
        return(
            <nav className="navbar">
                <div className="nav-item">
                    <Link to="/" className="home">
                    Home
                    </Link>
                </div>
                <ul className="nav-item" style={{margin: 0}}>
                    <li>
                        <Link to="/signup">Sign up</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, null)(Navbar);