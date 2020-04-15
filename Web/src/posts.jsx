import React, { Component } from "react";
import Post from "./post.jsx";
import { Segment } from "semantic-ui-react";


class Posts extends Component {
  // handlePersonIcon = () => {
  //   console.log("Open profile");
  // };

  // handleCount = () => {
  //   console.log("Open members");
  // };

  // handleDone = () => {
  //   console.log("Done");
  // };

  // handleInterested = () => {
  //   const data = {
  //     msg: this.state.message,
  //     course: this.state.selectedCourse,
  //     skill: this.state.selectedSkill,
  //     tag: this.state.selectedTag
  //   };
  //   fetch("http://127.0.0.1:8080/requests/update" + id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(res => res.json())
  //     .then(data => this.setState({result:data}));
  // };

  render() {
    return (
      <div>
        <Segment>
          {this.props.filterRes.map(c => (
            <Post
              request={c}
              key={c.id}
              value = {this.props.value}
              // handleCount={this.handleCount}
              // handlePersonIcon={this.handlePersonIcon}
              // handleInterested={this.handleInterested}
              // handleDone={this.handleDone}
            ></Post>
          ))}
        </Segment>
      </div>
    );
  }
}

export default Posts;
