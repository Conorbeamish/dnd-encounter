import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";
import Encounters from "./Encounters";
import withAuth from "../hocs/withAuth";

const Main = props => {
    const {authUser, errors, removeError, currentUser} = props;
    return(
        <div className="container">
            <Switch>
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props}/> }/>
                <Route exact path="/signin" render={props => {
                    return(
                        <AuthForm 
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText="Login" 
                            heading="Welcome Back" 
                            {...props}
                        />
                    )
                }}/>
                <Route exact path="/signup" render={props => {
                    return(
                        <AuthForm 
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}   
                            signup
                            buttonText="Signup" 
                            heading="Join Now" 
                            {...props}
                        />
                    )
                }}/>
                <Route 
                    path="/users/:id/encounters" 
                    component={withAuth(Encounters)}
                />
            </Switch>
        </div>
    );
};

function mapStateToProps(state){
    return{
        currentUser: state.currentUser,
        errors: state.errors
    };
}

export default withRouter(
    connect(mapStateToProps, {authUser, removeError})(Main)
);