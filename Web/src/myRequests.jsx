import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Segment} from 'semantic-ui-react';
import Posts from "./posts.jsx";
import css from './homepage.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';

class MyRequests extends Component {
    _isMounted = false;
    state = {
        posts: []
    };

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
        return ( 
            <React.Fragment>
            <Segment padded>
        <Grid padded>
        <Grid.Row padded>
        <Link  to='/home'>Home</Link>
        </Grid.Row>
 
        <Grid.Row padded>
        <div className='postsDivision'>
            <Posts filterRes={this.state.posts} value={true} />
            </div>
        </Grid.Row>
        </Grid>

        </Segment>
        </React.Fragment>
         );
    }
}
 
export default MyRequests;