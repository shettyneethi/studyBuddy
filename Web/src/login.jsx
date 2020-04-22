import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import "./login.css";
import logo from './logo.jpg'
import { Navbar, Nav } from 'react-bootstrap';
import {  Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Grid, Segment,Label} from 'semantic-ui-react';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const cookies = new Cookies();

class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      usrName: "",
      password: "",
      isLoggedIn: false,
      message: "",
      isSuccess: false,
      username: "" ,
      token: ""
    }

  }

  handleUserNameChange = (evt) => {
    this.setState({ usrName: evt.target.value });
  }

  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }


  handleSubmit = () => {

    const data = {
      user_name: this.state.usrName, 
      password : this.state.password
    };

    fetch('https://api-suggest-dot-studybuddy-5828.appspot.com/api/login', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => res["status"]==="SUCCESS" ? (this.setState({token: res["token"], isLoggedIn: true}) , localStorage.setItem('token', res["token"]))  : alert("Login Failed!"));
    
    // const { token } = this.state;
    
    
  }
   
  render() {
    const res = this.state.token
    
    return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
            <img
            alt=""
            src={logo}
            width="60"
            height="60"
            />{' '}
        StudyBuddy
        </Navbar.Brand>
      </Navbar>      

      
      {this.state.isLoggedIn ? <Redirect to={{pathname: '/home', state:{token:res}}}/> :
      <div>
        <div id="login-form" align="center">

          <form className="loginForm">
            <br></br>
            <br></br>
            <br></br>
            <h1 align="center">Let's get you started</h1>

            <TextField required className="standard-required" type="text" label="Username" name="username" onChange={this.handleUserNameChange} value={this.state.usrName} ></TextField><br /><br />

            <TextField required className="standard-required" type="password" name="password" label="Password" onChange={this.handlePasswordChange}></TextField ><br /><br />
            <MyButton onClick={this.handleSubmit}>Submit</MyButton>
          </form>
          <br></br>
          <br></br>
          <br></br>
          <div>
            <h2>Don't have an account yet? <Link to="/signup">Sign up here!</Link></h2>
          </div>
        </div>
        }
      </div>
      }
  </div> 
    )
  }
}

export default Login;