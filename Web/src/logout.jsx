import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';


class Logout extends Component {

    handleLogout= () => {
        localStorage.removeItem('token');
    }

    render() { 
        return (  
            <div>

                <Link to="/" onClick={this.handleLogout}>Logout</Link>

            </div>  
                
        )
    }
}
 
export default Logout;