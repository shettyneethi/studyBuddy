import React, { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import Posts from "./posts.jsx";
import { Navbar, Nav } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import fav from './images/fav.jpg'
import {
    Link,
  } from 'react-router-dom';

class MyRequests extends Component {
    _isMounted = false;
    state = {
        posts: [],
        id: ""
    };

    // getDeletedId = (data) => {
    //     this.setState({
    //         id: data
    //     });
    // }

    componentDidMount() {

        URL = "https://api-suggest-dot-studybuddy-5828.appspot.com/api/getMyRequest/"+localStorage.getItem('username')

        fetch(URL, {
            method: "GET",
            headers: {
                      "Content-type": "application/json",
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            })
            .then(response => response.json())
            .then((data) => {
                this.setState({posts: data});
        }); 
        this._isMounted = true;
    
        this.eventSource= new EventSource('https://34.71.199.201:8081/api/deleted/posts');
        this.eventSource.onmessage = e =>
        this.deletePost(JSON.parse(e.data), e);

    }

    deletePost(data, e) {
        console.log('In delete post')
        let post = this.state.posts
        let post_id = data['_id']
        post = post.filter(item => item['_id']['$oid'] !== post_id)
        console.log(post)
    
        this.setState({ posts: post});
    }

    componentWillUnmount() {
        this._isMounted = false;
    
        if (this.eventSource)
          this.eventSource.close();
    }

    render() { 

        const styles = {
            tooltip: {
              backgroundColor: "black",
              color: "gainsboro",
              fontSize: 14
            }
        };
      
        const CustomTooltip = withStyles(styles)(Tooltip);
      
        return ( 
            <div>
                <Navbar bg="dark" expand="lg" variant="light">
                    <Navbar.Brand>
                        <img
                        alt=""
                        src={fav}
                        width="70"
                        height="70"
                        background="transparent"
                        />{'  '}
                    </Navbar.Brand>
                    <Nav className="h1-nav">Study Buddy</Nav>

                    <Nav className="navbar-collapse justify-content-end">
                        <Link to='/home'>
                            <IconButton disableTouchRipple>
                                <CustomTooltip title="Home" placement="left">
                                    <HomeIcon 
                                    style={{ fontSize: 30, color: 'gainsboro' }}>
                                    </HomeIcon>
                                </CustomTooltip>
                            </IconButton>
                        </Link>
                    </Nav>
                </Navbar>

                   
                <Posts filterRes={this.state.posts} value={true} />

            </div>
        );
    }
}
 
export default MyRequests;