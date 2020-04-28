import React, { Component } from "react";
import Post from "./post.jsx";
import { Segment } from "semantic-ui-react";


class Posts extends Component {
  render() {
    return (
      <div className="post-container">
          {this.props.filterRes.map(c => (
            <Post
              request={c}
              key={c.id}
              value = {this.props.value}
            ><br/>
            <br/>
            </Post>
          ))}
        
      </div>
    );
  }
}

export default Posts;
