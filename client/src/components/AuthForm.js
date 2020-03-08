import React, { Component } from "react";

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

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signup ? "signup" : "signin";
        this.props.onAuth(authType, this.state).then(() => {
            console.log("logged in")
        });
    };

    render() {
        const { email, username, password} = this.state;
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>{heading}</h2>
                    {errors.message && <div>{errors.message}</div>}
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email" 
                        name="email" 
                        onChange = {this.handleChange}
                        value={email}
                        type="text"
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
                            <label htmlFor="username">Username:</label>
                            <input 
                                id="username"
                                name="username" 
                                onChange = {this.handleChange}
                                type="text"
                                autoComplete="off"
                                value={username}
                            />
                        </div>
                    )}
                    <button type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        )
    }
}

export default AuthForm;