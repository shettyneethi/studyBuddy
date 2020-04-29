import React, { Component } from "react";
import DropdownPlugin from "./dropdown.jsx";
import { Segment, Form, TextArea } from "semantic-ui-react";
import { Grid } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import "./request.css";

class Request extends Component {
  state = {
    courses:[],
    skills:[],
    tags: [
      { key: "Homework", text: "Homework", value: "Homework" },
      { key: "Project", text: "Project", value: "Project" },
      { key: "Midterm", text: "Midterm", value: "Midterm" },
      { key: "Assignment", text: "Assignment", value: "Assignment"},
      {key: "Final", text: "Final", value: "Final"},
      {key: "Quiz", text: "Quiz", value: "Quiz"},
      {key: "Lab", text: "Lab", value: "Lab"}
    ],
    selectedCourse: "",
    selectedSkill: "",
    selectedTag: "",
    message: "",
    result: ""
  };


  componentWillMount() {
    console.log('In request willmount')
    var courses = []
    var skills = []
    fetch('https://api-suggest-dot-studybuddy-5828.appspot.com/api/userDetails', {
      method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
    })
      .then(response => response.json())
      .then(res => { 
        for(const item of res['courses']) { 
          courses.push({key: item, text: item, value: item}) 
        }
        for(const item of res['skills']) { 
          skills.push({key: item, text: item, value: item}) 
        }
      })
      .then(this.setState({
        courses:courses, skills:skills
      })
      );
      
  }
  handleCourseChange = (event, data) => {
    this.setState({
      selectedCourse: data.value
    });
  };

  handleSkillChange = (event, data) => {
    this.setState({
      selectedSkill: data.value
    });
  };

  handleTagChange = (event, data) => {
    this.setState({
      selectedTag: data.value
    });
  };

  handleSubmit = event => {
    const data = {
      msg: this.state.message,
      course: this.state.selectedCourse,
      skill: this.state.selectedSkill,
      tag: this.state.selectedTag
    };
    fetch("https://api-suggest-dot-studybuddy-5828.appspot.com/requests/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => this.setState({result:data}));
  };

  handleMessageChange = event => {
    this.setState({ message: event.target.value });
  };

  handlePost = () =>{
    this.handleSubmit();
    this.props.onClose();
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    const styles = {
      tooltip: {
        backgroundColor: "black",
        color: "gainsboro",
        fontSize: 14
      }
    };

    const CustomTooltip = withStyles(styles)(Tooltip);

    return (
      <Segment className="mainContainer">
        <Grid  container spacing={2} className="requestContainer">
          <Grid item xs={12}>
            <h2>Raise your buddy request here!</h2>
          </Grid>

          <Grid item xs={4}>
            <DropdownPlugin
              menu={this.state.courses}
              title="Course"
              onSelect={this.handleCourseChange}
            ></DropdownPlugin>
          </Grid>
        
          <Grid item xs={4}>
            <DropdownPlugin
              menu={this.state.skills}
              title="Skill"
              onSelect={this.handleSkillChange}
            ></DropdownPlugin>
          </Grid>
          
          <Grid item xs={4}>
            <DropdownPlugin
              menu={this.state.tags}
              title="Tag"
              onSelect={this.handleTagChange}
            ></DropdownPlugin>
          </Grid>
      
          <Grid item xs={12}>
            <h4> Message: </h4>
          </Grid>
        
          <Grid item xs={12}>
            <Form>
              <TextArea placeholder='Optional description' onChange={this.handleMessageChange} />
            </Form>
          </Grid>
          
          <Grid item xs={3}>  
            <CustomTooltip title="Send request" placement="left">
              <Button
                onClick={this.handlePost}
                style={{ fontSize: 15 }}
                variant="contained"
                id = "butn"
                color = "primary"
                startIcon={<SendIcon />}
              >
              Post
              </Button>
            </CustomTooltip>
          </Grid>
        </Grid>
      </Segment>
    );
  }
}

export default Request;