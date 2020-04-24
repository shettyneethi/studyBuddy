import React from 'react';
import { TextField } from '@material-ui/core';
import './signup.css';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar from './navbar';

class Signup extends React.Component{
    constructor() {
        super();
    
        this.state = {
          usrName: "",
          email: "",
          password: "",
          confirmPwd: "",
          isSignedUp: false,
          didPwdMatch: false,
          result: ""
        }
      }

      handleUserNameChange = (evt) => {
        this.setState({ usrName: evt.target.value });
      }
    
      handlePasswordChange = (evt) => {
        this.setState({ password: evt.target.value });
      }

      handleConfirmPassword = (evt) => {
        this.setState({ confirmPwd: evt.target.value });
      }

      handleEmailChange = (evt) => {
          this.setState({ email: evt.target.value });
      }
    
      handleSubmit = () => {
        if(this.state.password === this.state.confirmPwd){
            this.setState({
                didPwdMatch: true,
                message: "Your profile created successfully " + this.state.usrName + "!!!"
            });
            const data = {
                user_name: this.state.usrName,
                password: this.state.password,
                email: this.state.email
            };

            fetch("http://127.0.0.1:8080/api/signup", {
                method: "POST",
                headers: {
                  "Content-type": "application/json"  
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(res => res["status"]==="SUCCESS" ?  (localStorage.setItem('token', res["token"]), localStorage.setItem('username', res["user_name"]), this.setState({isSignedUp: true}))  : alert(res["message"]))
            }
            else {
                this.setState({
                    isSignedUp: false,
                    didPwdMatch: false,
                    message: "Passwords do not match!"
                })
            }
            
    }

    render(){
        
        return(
            <div className="bg-color">
                <NavBar />

                {this.state.didPwdMatch? null : <h1 align="center"> {this.state.message} </h1>}

                {this.state.isSignedUp ? 
                
                <Redirect to={{
                    pathname: '/profile/edit/'
                }}  /> 
                
                : 
                <div id="signup-form" align="center">
                    <form className="signupForm"><br/><br/><br/>
                        <h1 align="center">Create your account here!</h1>
                        <TextField required className="standard-required" type="text" label="Username" name="username" value={this.state.usrName} onChange={this.handleUserNameChange}></TextField><br /><br />
                        <TextField required className="standard-required" type="email" label="Email" onChange={this.handleEmailChange}></TextField><br /><br />
                        <TextField required className="standard-required" type="password" name="password" label="Password" onChange={this.handlePasswordChange}></TextField ><br /><br />
                        <TextField required className="standard-required" type="password" name="Confirm password" label="Confirm Password" onChange={this.handleConfirmPassword}></TextField ><br /><br /><br/>
                        <Button variant="outline-dark" onClick={this.handleSubmit}>Submit</Button>
                    </form>
                </div>
                }
            </div>
        )
    }
}

export default Signup;