import React, { Component } from 'react';
import Header from './header.js';
import Login from './login.jsx';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div id="app">
          <Header />
        </div>    
        <div id="login">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;