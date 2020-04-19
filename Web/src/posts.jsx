import React, { Component } from "react";
import Post from "./post.jsx";
import { Segment } from "semantic-ui-react";


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
            ></Post>
          ))}
        </Segment>
      </div>
    );
  }
}

export default Posts;
