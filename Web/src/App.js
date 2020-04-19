import React, { Component } from 'react';
<<<<<<< HEAD
import Header from './header.jsx';
import Login from './login.jsx';
import HomePage from './homepage.jsx';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
=======
import './App.css';
import Routes from './Routes.js';
>>>>>>> bba4abb769904216afee7a6b35c50180ef7aaebf


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
