import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Grid, Segment,Label} from 'semantic-ui-react';
import Modal from './modal.jsx';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

class Post extends Component {
  state = {
    count: 0,
    people: [],
    isOpen: false
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handlePersonIcon = () => {
    console.log("Open profile");
  };

  handleCount = () => {
    console.log("Open members");
  };

  handleDone(id) {
    const url = "https://api-suggest-dot-studybuddy-5828.appspot.com"
    
    fetch(`${url}/requests/delete/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())

  };

   
  handleInterested(id, username, interested_count, interested_people) {
    
    let people_update = [username].concat(interested_people)
    let count_update = interested_count+1

    console.log('In interested')
    console.log(id)

    const data = {
      interested_people: people_update,
      interested_count: count_update,
      id: id 
    };
    
    const url = "https://api-suggest-dot-studybuddy-5828.appspot.com"

    fetch(`${url}/requests/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())

   
  };
  
  render() {
    const { username, interested_count, interested_people, msg, tag, course, skill, _id} = this.props.request
    console.log(this.props.request)
    console.log(this.props.value)
    const id = _id['$oid']
    
    return (
      <React.Fragment>
        <Segment>
        <Grid padded>
          
        <Grid.Row  columns={2}>
        
              <Grid.Column >

         <IconButton onClick={this.handlePersonIcon}
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle style={{ fontSize: 40 }} />
        </IconButton>
        
        </Grid.Column>
        <Grid.Column >
            <div>
              <Label tag color="teal">{tag}</Label>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row  columns={3}>
              <Grid.Column >
        <p> {username} </p>
        </Grid.Column>   
        <Grid.Column >
        <p> {course} </p>
        </Grid.Column>
        <Grid.Column >
        <p> {skill} </p>
        </Grid.Column>

        </Grid.Row>

        <Grid.Row  columns={1}>
          <Grid.Column >
        <p> {msg}</p>
        </Grid.Column>
        </Grid.Row>

        <Grid.Row  columns={3}>
        <Grid.Column width={3}>
        <button
          onClick={() => {this.handleInterested(_id, username, interested_count, interested_people)}}
          style={{ fontSize: 15 }}
          className="badge badge-secondary btn-sm "
          disabled={this.props.value}
        >
          Interested
        </button>
        </Grid.Column>

        <Grid.Column width={3}>
        <button
          onClick={this.toggleModal}
          style={{ fontSize: 15 }}
          className="badge badge-primary m-2"
        >
          {interested_count}
          {console.log(this.state.isOpen)}
        </button>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}
          interested_people= {interested_people}>
          Here's some content for the modal
        </Modal>

        </Grid.Column>
        
        <Grid.Column width={2}>
        <button
          onClick={() => {this.handleDone(id)}}
          style={{ fontSize: 15 }}
          className="badge badge-success btn-sm "
        >
          Done
        </button>
        </Grid.Column>
    
        </Grid.Row>
        
        </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default Post;
