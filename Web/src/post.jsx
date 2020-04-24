import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Grid, Segment,Label} from 'semantic-ui-react';
import Modal from './modal.jsx';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ViewProfile from "./ViewProfile.js"

class Post extends Component {
  state = {
    count: 0,
    people: [],
    isOpen: false,
    isInterested: false
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handlePersonIcon = () => {
    console.log('Open personIcon')
  };

  handleCount = () => {
    console.log("Open members");
  };

  handleDone(id) {
    console.log('In Done')
    console.log(id)
    const deleteMethod = {
      method: 'DELETE', 
      headers: {
       'Content-type': 'application/json'
      },
     }
     
    const url = "https://api-suggest-dot-studybuddy-5828.appspot.com"
    
    fetch(`${url}/requests/delete/${id}`, deleteMethod)
      .then(res => res.json())

  };

   
  handleInterested(id, username, interested_count, interested_people) {

    let people_update = interested_people
    let count_update = interested_count
    
 

    if(!people_update.includes(username)){
    
      people_update = [username].concat(people_update)
      count_update = count_update+1
      
    }
    else{
      const index = people_update.indexOf(username);
      people_update.splice(index, 1);
      count_update = count_update-1
    }
    
      const data = {
        interested_people: people_update,
        interested_count: count_update,
        id: id
      };


      console.log(data)
      
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
    const { username, interested_count, interested_people, msg, tag, course, skill, _id, isCompleted} = this.props.request
    const id = _id['$oid']
    const current_user = localStorage.getItem('username')
    // console.log(this.state.isInterested);
    
    return (
      <React.Fragment>
        <Segment>
        <Grid padded>
          
        <Grid.Row  columns={2}>
        
              <Grid.Column >

        <ViewProfile user_name={username}/>
        
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
          onClick={() => {this.handleInterested(_id, current_user, interested_count, interested_people)}}
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
        </button>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}
          interested_people= {interested_people}>
          Here's some content for the modal
        </Modal>

        </Grid.Column>
        
        <Grid.Column width={2}>
        <button
          onClick= {() => { if (window.confirm('Do you want to delete this item?')) this.handleDone(id) } }
          style={{ fontSize: 15 }}
          className="badge badge-success btn-sm "
          disabled={!this.props.value}
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
