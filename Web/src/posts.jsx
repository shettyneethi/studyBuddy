import React, { Component } from "react";
import Post from "./post.jsx";
import { Segment } from "semantic-ui-react";


class Posts extends Component {
  handlePersonIcon = () => {
    console.log("Open profile");
  };

  handleCount = () => {
    console.log("Open members");
  };

  handleDone = () => {
    console.log("Done");
  };

  handleInterested = () => {
    console.log("Increment interested count");
  };

  render() {
    return (
      <div>
        <Segment>
          {this.props.filterRes.map(c => (
            <Post
              request={c}
              key={c.id}
              handleCount={this.handleCount}
              handlePersonIcon={this.handlePersonIcon}
              handleInterested={this.handleInterested}
              handleDone={this.handleDone}
            ></Post>
          ))}
        </Segment>
      </div>
    );
  }
}

export default Posts;
