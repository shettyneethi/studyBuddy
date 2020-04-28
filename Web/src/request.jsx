import React, { Component } from "react";
import DropdownPlugin from "./dropdown.jsx";
import { Grid, Segment, Form, TextArea } from "semantic-ui-react";
import "./request.css";

class Request extends Component {
  state = {
    courses: [
      { key: "CS", text: "CS", value: "CS" },
      { key: "MS", text: "MS", value: "MS" },
      { key: "BS", text: "BS", value: "BS" }
    ],
    skills: [
      { key: "C", text: "C", value: "C" },
      { key: "C++", text: "C++", value: "C++" },
      { key: "Python", text: "Python", value: "Python" }
    ],

    tags: [
      { key: "Homework", text: "Homework", value: "Homework" },
      { key: "Project", text: "Project", value: "Project" },
      { key: "Midterm", text: "Midterm", value: "Midterm" }
    ],
    selectedCourse: "",
    selectedSkill: "",
    selectedTag: "",
    message: "",
    result: ""
  };
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
    fetch("http://127.0.0.1:8080/requests/create", {
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
    return (
        <div className="requestContainer">
          <div className="headSection">
            <h2>Raise your buddy request here!</h2>
          </div>

            <div className='courseDivision'>
            <DropdownPlugin
              menu={this.state.courses}
              title="Course"
              onSelect={this.handleCourseChange}
            ></DropdownPlugin>
            </div>
          
            <div className='skillDivision'>
            <DropdownPlugin
              menu={this.state.skills}
              title="Skill"
              onSelect={this.handleSkillChange}
            ></DropdownPlugin>
            </div>
          
        <DropdownPlugin
          menu={this.state.tags}
          title="Tag"
          onSelect={this.handleTagChange}
          ></DropdownPlugin>
      
        <div className='messageDivision'>
          Message
          </div>
        
        <div className='textDivision'>
        <Form>
          <TextArea placeholder='Optional description' onChange={this.handleMessageChange} />
        </Form>
        </div>
        
        <button
          style={{ fontSize: 15 }}
          className="badge badge-secondary btn-sm "

          onClick={this.handlePost}>
        Post
        </button>
      </div>
    );
  }
}

export default Request;