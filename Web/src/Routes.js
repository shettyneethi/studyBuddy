import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./homepage.jsx";
import MyRequests from './myRequests.jsx';



export default class Routes extends Component {
    state = {
        filterMyRequests: []
    }
    getMyRequests = (data) => {
        this.setState({filterMyRequests: data})
    }
    render() {
        return (
            <Router>
                <Switch>

                <Route exact path="/" render={props => 
                (<Homepage {...props} filterReq={this.getMyRequests}/>)
                }/>/>
                    
                <Route exact path="/myRequests" render={props => 
                (<MyRequests {...props} filterRes={this.state.filterMyRequests}/>)
            }/>
                </Switch>
            </Router>
        )
    }
}
