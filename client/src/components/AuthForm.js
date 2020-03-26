import React, { Component } from "react";
import "./AuthForm.css";

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
                <form onSubmit={this.handleSubmit}>
                    <h3>{heading}</h3>
                    {errors.message && <div className="auth-err">{errors.message}</div>}
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
                    {signup && (
                        <div>
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
                    <button className="auth-form-btn" type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        )
    }
}

export default AuthForm;