import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";
import "./Navbar.css";

class Navbar extends Component{

    logout = e =>{
        e.preventDefault();
        this.props.logout();
    }

    render(){
        return(
            <nav className="navbar">
                <div className="nav-item">
                    <Link to="/" className="home">
                    Home
                    </Link>
                </div>
                {this.props.currentUser.isAuthenticated ? (
                    <ul className="nav-item" style={{margin: 0}}>
                        <li className="nav-user">
                            {this.props.currentUser.user.username}
                        </li>
                        <li>
                            <span> | </span>
                            <button className="nav-btn" onClick={this.logout}>
                                <Link to="/">Log Out</Link>
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav-item" style={{margin: 0}}>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <span> | </span>
                            <Link to="/signin">Sign In</Link>
                        </li>
                    </ul>
                )}
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, {logout})(Navbar);