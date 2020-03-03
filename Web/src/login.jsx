import React from 'react';
import './login.css'

class Login extends React.Component {
  constructor(){
    super();

    this.state = {
        isLoggedIn : false,
        message : ""
    }

  }
  handleClick1 = () => {
  if(this.state.class1 == "available"){
    this.setState({
        class1: "selected",
        start_time : "5:00 AM"
      });
      }else{
      this.setState({
        class1: "available"
      });
      }
  
  }
  handleSubmit= () => {
  this.setState({
        isLoggedIn : true,
        message : "WELCOME TO STUDY BUDDY!!!"
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

                <input type="text" name="username" placeholder="Username" required></input><br/><br/>
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