import React, { Component } from 'react';
import Header from './header.jsx';
import Login from './login.jsx';
import HomePage from './homepage.jsx';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Login />
    );
  }
}


export default App;
