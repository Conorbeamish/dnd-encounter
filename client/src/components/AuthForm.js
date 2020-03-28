import React, { Component } from "react";
import "./AuthForm.css";
import { Link } from "react-router-dom";

class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state= {
            email: "",
            username: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleEmail = e => {
        this.setState({
            [e.target.name]: e.target.value.toLowerCase()
        });
    }

    handleReset = e => {
        const {userID, token} = this.props.match.params
        e.preventDefault();
        //check if request is for reset or change
        if(this.props.change){
            this.props.newPassword(userID, token, this.state).then(() => {
                this.props.history.push("/signin")
            }).catch(() => {
                return;
            })
        } else {
            this.props.resetPassword(this.state.email).then(() => {
                this.props.history.push("/")
            }).catch(() => {
                return;
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signup ? "signup" : "signin";
        this.props.onAuth(authType, this.state).then(() => {
            this.props.history.push("/")
        }).catch(() => {
            return;
        });
    };

    render() {
        const { email, username} = this.state;
        const { 
            heading, 
            buttonText, 
            signup, 
            signin,
            reset,
            change,
            errors, 
            history,
            removeError
        } = this.props;

        //Get rid of errors on page change
        history.listen(() => {
            removeError();
        });
        
        return(
            <div className="auth-form">
                <form onSubmit={reset ? this.handleReset :this.handleSubmit}>
                    <h3>{heading}</h3>
                    {errors.message && <div className="auth-err">{errors.message}</div>}
                
                    {signin && (
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email" 
                                name="email" 
                                onChange = {this.handleEmail}
                                value={email}
                                type="email"
                                autoComplete="off"
                            />
                            <label htmlFor="password">Password:</label>
                            <input  
                                id="password" 
                                name="password" 
                                onChange = {this.handleChange}
                                type="password"
                            /> 
                            <Link to="/reset">
                                Reset Password
                            </Link>
                        </div>
                    )}
                    
                    {signup && (
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email" 
                                name="email" 
                                onChange = {this.handleEmail}
                                value={email}
                                type="email"
                                autoComplete="off"
                            />
                            <label htmlFor="password">Password:</label>
                            <input  
                                id="password" 
                                name="password" 
                                onChange = {this.handleChange}
                                type="password"
                            /> 
                            <label htmlFor="username">Choose a Username:</label>
                            <input 
                                id="username"
                                name="username" 
                                onChange = {this.handleChange}
                                type="text"
                                autoComplete="off"
                                value={username}
                            />
                            <div className="auth-text">
                                Your email is used to register your account and will not be used for marketing purposes
                            </div>
                        </div>
                    )}

                    {(reset && !change) && ( 
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email" 
                                name="email" 
                                onChange = {this.handleEmail}
                                value={email}
                                type="email"
                                autoComplete="off"
                            />
                            <div className="auth-text">We will email you a link to change or reset your password</div>
                        </div>
                    )}

                    {(reset && change) && (
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input  
                                id="password" 
                                name="password" 
                                onChange = {this.handleChange}
                                type="password"
                             /> 
                         </div>
                    )}
                    
                    <button className="auth-form-btn" type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        )
    }
}

export default AuthForm;