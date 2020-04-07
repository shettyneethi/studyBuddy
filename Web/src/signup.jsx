import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import './signup.css';

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

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
          result: "",
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
                isSignedUp: true,
                didPwdMatch: true,
                message: "Your profile created successfully " + this.state.usrName + "!!!"
            });
        //     const data = {
        //         user_name: this.state.usrName,
        //         password: this.state.password,
        //         email: this.state.email,
        //     };
        //     fetch("http://127.0.0.1:5000/api/signup", {
        //         method: "POST",
        //         headers: {
        //           "Content-type": "application/json"
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     .then(res => res.json())
        //     .then(data => this.setState({result:data}));
        // }
        // else {
        //     this.setState({
        //         isSignedUp: false,
        //         didPwdMatch: false,
        //         message: "Passwords do not match!"
        //     })
        }
    }

    render(){
        return(
            <div>
                {this.state.isSignedUp ? <h1 align="center"> {this.state.message} </h1> : null}

                {this.state.didPwdMatch? null : <h3 align="center"> {this.state.message} </h3>}

                {this.state.isSignedUp ? null :

                    <div id="signup-form" align="center">
                        <form className="signupForm">
                            <h1 align="center">Create your account here!</h1>
                            <TextField required className="standard-required" type="text" label="Username" name="username" value={this.state.usrName} onChange={this.handleUserNameChange}></TextField><br /><br />
                            <TextField required className="standard-required" type="email" name="Email" label="Email" onchange={this.handleEmailChange}></TextField ><br /><br />
                            <TextField required className="standard-required" type="password" name="password" label="Password" onChange={this.handlePasswordChange}></TextField ><br /><br />
                            <TextField required className="standard-required" type="password" name="Confirm password" label="Confirm Password" onChange={this.handleConfirmPassword}></TextField ><br /><br />
                            <MyButton onClick={this.handleSubmit}>Submit</MyButton>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

export default Signup;