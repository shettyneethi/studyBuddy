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
              value_int = {this.props.value_int}
              value_delete = {this.props.value_delete}
            ></Post>
          ))}
        </Segment>
      </div>
    );
  }
}

export default Posts;
