import React, { Component } from 'react';
import HomePage from './homepage.jsx'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserEdit from './UserEdit'
import Homepage from './homepage';
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Homepage} />
            <Route path='/profile/edit' component={UserEdit} />
          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;
