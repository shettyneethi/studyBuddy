import React, { Component } from 'react';
import logo from './logo.jpg';
import './header.css';


class Header extends Component {
  render() {
    return (
        <div className="Page-header">
            <img src={logo} className="App-logo" alt="logo" /><br></br>
            <h2>STUDY BUDDY</h2>
        </div>
    );
  }
}

export default Header;