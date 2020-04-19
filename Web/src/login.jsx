import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import "./login.css";
import { Grid } from 'semantic-ui-react';
import Signup from './signup'
import Homepage from './homepage'
import logo from './logo.jpg'
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

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

  // cookies = new Cookies();
  // cookies.set('username', 'Pacman');

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
    // this.setState({
    //   isLoggedIn: true,
    //   // message: "Welcome to StudyBuddy " + this.state.usrName + "!!!"
    // });

    const data = {
      user_name: "user_name", 
      password : "password"
    };

    fetch('http://127.0.0.1:5000/api/login', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => this.setState({ username: cookies.get('user_name:token'), isLoggedIn: true}));
  }

  
   
  render() {

    if(this.state.isLoggedIn === true){
      return <Router><Redirect to="/" /></Router>
    }

    return (
    <div>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
              <img
              alt=""
              src={logo}
              width="60"
              height="60"
              />{' '}
          StudyBuddy
          <Link to="/signup">Sign up here!</Link>
          </Navbar.Brand>
        </Navbar>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          
          <Route path="/login">
            {this.state.isLoggedIn ? null :
            <div>
              <div id="login-form" align="center">

                <form className="loginForm">
                  <h1 align="center">Let's get you started</h1>

                  <TextField required className="standard-required" type="text" label="Username" name="username" onChange={this.handleUserNameChange} value={this.state.usrName} ></TextField><br /><br />

                  <TextField required className="standard-required" type="password" name="password" label="Password" onChange={this.handlePasswordChange}></TextField ><br /><br />
                  <MyButton onClick={this.handleSubmit}>Submit</MyButton>
                </form>
              </div>
              
              <div id="googleButton">
              </div> 
              }
            </div>
            }
            </Route>
          </Switch>
      </Router>
    </div> 
    )
  }
}

export default Login;