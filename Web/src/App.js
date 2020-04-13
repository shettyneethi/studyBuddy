import React, { Component } from 'react';
import Header from './header.jsx';
import Login from './login.jsx';
import HomePage from './homepage.jsx'
import './App.css';
import Request from './request.jsx'
import CheckboxCustom from './checkbox.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch 
} from 'react-router-dom';
import Routes from './Routes.js';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Routes />
      </div>
    );
  }
}


export default App;
