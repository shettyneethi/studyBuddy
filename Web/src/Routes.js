import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserEdit from './UserEdit'
import Homepage from "./homepage.jsx";
import MyRequests from './myRequests.jsx';
import Signup from './signup.jsx'
import Login from './login.jsx';


export default class Routes extends Component {
    _isMounted = false;
    state = {
        filterMyRequests: []
    }
    getMyRequests = (data) => {
        this.setState({ filterMyRequests: data })
    }
    
    render() {
        
        return (
            <Router>
                <Switch>
                    <Route exact path="/"  component={Login}/>

                    <Route exact path='/signup' component={Signup} />

                    <Route exact path="/home" render={props =>
                            (<Homepage {...props} filterReq={this.getMyRequests} />)
                        } />

                    <Route exact path="/myRequests" render={props =>
                            (<MyRequests {...props} filterRes={this.state.filterMyRequests} />)
                        } />

                    <Route exact path='/profile/edit' component={UserEdit} />
                </Switch>
            </Router>
        )
    }
}
