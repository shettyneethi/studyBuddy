import React, { Component } from 'react';
import DropdownPlugin from './dropdown.jsx'
import CheckboxCustom from './checkbox.jsx';
import {Grid, Segment } from 'semantic-ui-react';

class Request extends Component {
    state = {
        courses: ["CS", "MS", "FRCS"],
        skills: ["C", "C++"],
        tags: ['Homework', 'Project','Midterm', 'Quiz']
        
      };
    render() { 
      if(!this.props.show) {
        return null;
      }
        return ( 
        <div className='requestContainer'>
          <Segment>
            <Grid padded >
            <Grid.Row className="heading">
              <Grid.Column>
                <div className="headSection">
                <h2>Raise your buddy request here!</h2>
                </div>
              </Grid.Column>
              </Grid.Row>
              <Grid.Row centered  columns={2}  className="filtercontainer">
                <Grid.Column width={6}>
                  <div className='courseDivision'>
                  <DropdownPlugin
                    menu={this.state.courses}
                    title="Choose Course"
                  ></DropdownPlugin>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className='skillDivision'>
                  <DropdownPlugin
                    menu={this.state.skills}
                    title="Choose Skill"
                  ></DropdownPlugin>
                  </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row  className="messageContainer">
              <Grid.Column>
              <div className='messageDivision'>
                Message
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row  className="textContainer">
              <Grid.Column>
              <div className='textDivision'>
              <input></input>
              </div>
              </Grid.Column>
            </Grid.Row>
            
           <Grid.Row columns={2}  className="heading">
            <Grid.Column width={6}>
              <button
                style={{ fontSize: 15 }}
                className="badge badge-secondary btn-sm ">
              Post
              </button>
            </Grid.Column>
            <Grid.Column>
            <Segment>
              <CheckboxCustom  menu={this.state.tags}>    
              </CheckboxCustom>
            </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
    </div>
        );
    }
}
 
export default Request;