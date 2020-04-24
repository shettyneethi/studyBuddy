import React from 'react';
import { TextField } from '@material-ui/core';
import { Grid } from 'semantic-ui-react';
import "./login.css";
import './homepage.css';
import { Button } from 'react-bootstrap';
import NavBar from './navbar';
import {  Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

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
      username: "" 
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


    fetch('http://127.0.0.1:8080/api/login', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => res["status"]==="SUCCESS" ? (localStorage.setItem('token', res["token"]), localStorage.setItem('username', res["user_name"]), this.setState({isLoggedIn: true}) ) : alert("Login Failed!"));
    
  }
   
  render() {
    return (
    <div className="bg-color">
      <NavBar />

      {this.state.isLoggedIn ? <Redirect to={{pathname: '/home'}}/> :
      <div>
        <div id="login-form" align="center">

          <form>
            <br/><br/><br/>
            <h1 align="center">Let's get you started!</h1>
            <br/><br/>
            <TextField required className="standard-required" type="text" label="Username" name="username" onChange={this.handleUserNameChange} value={this.state.usrName} ></TextField><br/><br/><br/>
            <TextField required className="standard-required" type="password" name="password" label="Password" onChange={this.handlePasswordChange}></TextField ><br/><br/><br/>
            <Button variant="outline-dark" onClick={this.handleSubmit}>Submit</Button>
          </form>
          <br/><br/><br/>
          <div>
            <h1 align="center">Don't have an account yet? <Link to="/signup">Sign up here!</Link></h1>
          </div>
        </div>
      </div>
      }
    </div> 
    )
  }
}

export default Login;