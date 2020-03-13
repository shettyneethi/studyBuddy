import React from 'react';
import './login.css'
import { Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';


const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

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
              <h1 align="center">Let's get you started</h1>

              <TextField required id="standard-required" type="text" label="Username" name="username" onChange={this.handleChange} value={this.state.usrName} ></TextField><br /><br />

              <TextField required id="standard-required" type="password" name="password" label="Password" ></TextField ><br /><br />
              <MyButton onClick={this.handleSubmit}>Submit</MyButton>
            </form>
          </div>
        }
      </div>

    )
  }

}

export default Login;