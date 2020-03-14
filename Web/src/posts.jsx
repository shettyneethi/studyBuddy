import React, { Component } from "react";
import Post from "./post.jsx";
import { Segment } from "semantic-ui-react";

const data = [
  {
    id: 100,
    name: "name1",
    interested_count: 1,
    interested_peers: ["peer1","peer2","peer3"]
  },

  {
    id: 200,
    name: "name2",
    interested_count: 2,
    interested_peers: ["peer4","peer5","peer6"]
  },
  {
    id: 101,
    name: "name1",
    interested_count: 1,
    interested_peers: ["peer1","peer2","peer3"]
  
  },
  {
    id: 102,
    name: "name1",
    interested_count: 1,
    interested_peers: ["peer1","peer2","peer3"]
  
  },
  {
    id: 103,
    name: "name1",
    interested_count: 1,
    interested_peers: ["peer1","peer2","peer3"]
  
  },
  {
    id: 104,
    name: "name1",
    interested_count: 1,
    interested_peers: ["peer1","peer2","peer3"]
  
  }
];
class Posts extends Component {
  state = {
    posts: data
  };

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
          {this.state.posts.map(c => (
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
