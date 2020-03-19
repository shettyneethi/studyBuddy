import React, { Component } from 'react';
import DropdownPlugin from './dropdown.jsx'
import CheckboxCustom from './checkbox.jsx';
import {Grid, Segment, Form, TextArea} from 'semantic-ui-react';
import css from './request.css';

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

              <Grid.Row centered  columns={3}  className="filtercontainer">
                <Grid.Column >
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
                <Grid.Column>
              <DropdownPlugin  
                menu={this.state.tags}
                title="Select tag"
                ></DropdownPlugin>
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
              <Form>
                <TextArea placeholder='Optional description' />
              </Form>
              </div>
              </Grid.Column>
            </Grid.Row>
            
           <Grid.Row columns={1}  className="heading">
            <Grid.Column >
              <button
                style={{ fontSize: 15 }}
                className="badge badge-secondary btn-sm ">
              Post
              </button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
    </div>
        );
    }
}
 
export default Request;