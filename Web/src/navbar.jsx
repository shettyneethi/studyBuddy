import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import fav from './images/fav.jpg';
import './navbar.css';

class NavBar extends React.Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg" variant="light" sticky="top">
                <Navbar.Brand className="center-nav">
                    <img
                    alt=""
                    src={fav}
                    width="70"
                    height="70"
                    background="transparent"
                    />{'  '}
                </Navbar.Brand>
                <Nav className="h1-nav">Study Buddy</Nav>
            </Navbar>
        )
    }
}

export default NavBar;
