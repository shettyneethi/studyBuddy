import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Segment,Label} from 'semantic-ui-react';
import Modal from './modal.jsx';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import GroupIcon from '@material-ui/icons/Group';
import ViewProfile from "./ViewProfile.js";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";
import './post.css'

class Post extends Component {

  state = {
    count: 0,
    people: [],
    link : 'mailto:?subject=Mail from Study Buddy',
    isOpen: false,
    isInterested: false
  };

  componentDidMount() {
    if(this.props.value ){
    const id = this.props.request['_id']['$oid']
    URL = "https://api-suggest-dot-studybuddy-5828.appspot.com/api/getContactDetails/"+id

    fetch(URL, {
        headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
      })
      .then(response => response.json())
      .then((data) => {
          this.setState({link: 'mailto:'+data.join()+'?subject=Mail from Study Buddy'});
        }); 
    }

  }

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
     
    const url = "http://127.0.0.1:8080"
    
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
      
      const url = "http://127.0.0.1:8080"

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

    const styles = {
      tooltip: {
        backgroundColor: "black",
        color: "gainsboro",
        fontSize: 14
      }
    };

    const CustomTooltip = withStyles(styles)(Tooltip);

    return (
      <Segment>
      <Grid container spacing={3} className="post-border">
        <Grid item xs={1} className="bg-post">
          <ViewProfile user_name={username}/>
        </Grid>
        <Grid item xs={3}>
          {username} 
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <Label tag color="gainsboro" color="grey">{tag}</Label>
        </Grid>
            

        <Grid item xs={4}>  
            <p> {course} </p>
        </Grid>     

        <Grid item xs={4}>  
            <p> {skill} </p>
        </Grid>

        <Grid item xs={4}>
            <p> {msg} </p>
        </Grid>      
            
        <Grid item xs={4}>
          {current_user!==username ?
            <IconButton disableTouchRipple>
              <CustomTooltip title="Interested" placement="left">
                <ThumbUpOutlinedIcon 
                  style={{ fontSize: 30, color: "#3498DB" }} 
                  onClick={() => {this.handleInterested(_id, current_user, interested_count, interested_people)}, <ThumbUpIcon />}
                  disabled={this.props.value}>
                </ThumbUpOutlinedIcon>
              </CustomTooltip>
            </IconButton>
          : null}
        </Grid>

        <Grid item xs={4}>
          <CustomTooltip title="Click to see interested people" placement="left">
            <Button
              onClick={this.toggleModal}
              style={{ fontSize: 15 }}
              variant="contained"
              startIcon={<GroupIcon />}
            >
            {interested_count}
            </Button>
          </CustomTooltip>


          <Modal show={this.state.isOpen}
            onClose={this.toggleModal}
            interested_people= {interested_people}>
            Here's some content for the modal
          </Modal>
        </Grid>

        <Grid item xs={4}>
          {this.props.value ?
            <button
              onClick={() => { if (window.confirm('Do you want to delete this item?')) this.handleDone(id) }}
              style={{ fontSize: 15 }}
              className="badge badge-secondary btn-sm "
              >
              Delete
            </button>
          : null}
        
          {this.props.value ?
            <button style={{ fontSize: 15 }}
                className="btn-md"> <a href={this.state.link}>MAIL</a>
            </button>
            : 
            null
          }
        </Grid>
        
      </Grid> 
      </Segment>   
    );
  }
}

export default Post;
