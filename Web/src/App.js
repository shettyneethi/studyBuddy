import React, { Component } from 'react';
import Header from './header.jsx';
import Login from './login.jsx';
import HomePage from './homepage.jsx'
import './App.css';
import Request from './request.jsx'
import CheckboxCustom from './checkbox.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <div id="app">
          <Header />
        </div>    
        <div id="homepage">
          <HomePage />
        </div>
      </div>
    );
  }
}


export default App;
