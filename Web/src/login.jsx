import React from 'react';
import './login.css'

class Login extends React.Component {
  constructor(){
    super();

    this.state = {
        usrName : "",
        isLoggedIn : false,
        message : ""
    }

  }


  handleChange = (evt) => {
        this.setState({ usrName: evt.target.value });
  }



  handleSubmit= () => {
  this.setState({
        isLoggedIn : true,
        message : "Welcome to StudyBuddy " + this.state.usrName + "!!!"
      });
  
  }

  render() {

    return(
    <div>
        {this.state.isLoggedIn ? <h1 align="center"> {this.state.message}</h1> : null }
 
        {this.state.isLoggedIn ? null :
          <div id="login-form" align="center">

             <form class="loginForm">
                <h1 align="center">LOGIN</h1>

                <input type="text" name="username" onChange={this.handleChange} value={this.state.usrName} placeholder="Username" required></input><br/><br/>
                <input type="password" name="password" placeholder="Password" required></input><br/><br/>
                <button type="button" onClick={this.handleSubmit}>Submit</button>
            </form>
          </div>
        }
    </div>

    )
  }

}

export default Login;