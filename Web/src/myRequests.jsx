import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Segment} from 'semantic-ui-react';
import Posts from "./posts.jsx";
import css from './homepage.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch 
  } from 'react-router-dom';

class MyRequests extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
            <Segment padded>
        <Grid padded>
        <Grid.Row padded>
        <Link to="/" >Home</Link>
        </Grid.Row>
 
        <Grid.Row padded>
        <div className='postsDivision'>
            <Posts filterRes={this.props.filterRes} value={true}/>
            </div>
        </Grid.Row>
        </Grid>

        </Segment>
        </React.Fragment>
         );
    }
}
 
export default MyRequests;