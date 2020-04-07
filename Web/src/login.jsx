import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import "./login.css";

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const responseGoogle = (response) => {
  console.log(response);
}

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      usrName: "",
      password: "",
      isLoggedIn: false,
      message: "",
      isSuccess: false,
    }

  }

  handleUserNameChange = (evt) => {
    this.setState({ usrName: evt.target.value });
  }

  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }


  handleSubmit = () => {
    this.setState({
      isLoggedIn: true,
      message: "Welcome to StudyBuddy " + this.state.usrName + "!!!"
    });

    const data = {
      user_name: this.state.usrName,
      password: this.state.password,
    }

    // fetch("http://127.0.0.1:5000/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(res => res.json()).then(data => {
    //   if(data.response === 'SUCCESS'){
    //     this.setState.isLoggedIn = true
    //   }
    //   else{
    //     this.setState.isLoggedIn = false
    //   }
    // });
  }

  render() {

    return (
      <div>
        {this.state.isLoggedIn ? <h1 align="center"> {this.state.message}</h1> : null}

        {this.state.isLoggedIn ? null :
        <div>
          <div id="login-form" align="center">

            <form className="loginForm">
              <h1 align="center">Let's get you started</h1>

              <TextField required className="standard-required" type="text" label="Username" name="username" onChange={this.handleUserNameChange} value={this.state.usrName} ></TextField><br /><br />

              <TextField required className="standard-required" type="password" name="password" label="Password" onChange={this.handlePasswordChange}></TextField ><br /><br />
              <MyButton onClick={this.handleSubmit}>Submit</MyButton><label> or </label> 
              <GoogleLogin
                clientId="135947534732-6ju1jmq810rma59imcnd0g0a676je8u6.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            </form>
            <h3>Don't have an account? <a>Sign up here!</a></h3>
          </div>
          
          <div id="googleButton">
            
          </div>
        </div>

        }
      </div>

    )
  }

}

export default Login;