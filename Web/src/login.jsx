import React from 'react';
import './login.css'
import { Button, TextField } from '@material-ui/core';
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      usrName: "",
      isLoggedIn: false,
      message: ""
    }

  }


  handleChange = (evt) => {
    this.setState({ usrName: evt.target.value });
  }



  handleSubmit = () => {
    this.setState({
      isLoggedIn: true,
      message: "Welcome to StudyBuddy " + this.state.usrName + "!!!"
    });

  }

  render() {

    return (
      <div>
        {this.state.isLoggedIn ? <h1 align="center"> {this.state.message}</h1> : null}

        {this.state.isLoggedIn ? null :
          <div id="login-form" align="center">

            <form class="loginForm">
              <h1 align="center">LOGIN</h1>

              <TextField required id="standard-required" type="text" label="Username" name="username" onChange={this.handleChange} value={this.state.usrName} ></TextField><br /><br />

              <TextField required id="standard-required" type="password" name="password" label="Password" ></TextField ><br /><br />
              <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Submit</Button>
            </form>
          </div>
        }
      </div>

    )
  }

}

export default Login;