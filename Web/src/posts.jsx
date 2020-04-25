import React, { Component } from "react";
import Post from "./post.jsx";
import { Segment } from "semantic-ui-react";
import './posts.css';

class Posts extends Component {
  render() {
    return (
      <div>
        <Segment>
          {this.props.filterRes.map(c => (
            <Post
              request={c}
              key={c.id}
              value = {this.props.value}
              className="bg-post"
            ></Post>
          ))}
        </Segment>
      </div>
    );
  }
}

export default Posts;
