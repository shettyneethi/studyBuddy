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
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import './post.css'
import AccountCircle from '@material-ui/icons/AccountCircle';
import ViewProfile from "./ViewProfile.js"

class Post extends Component {

  state = {
    count: 0,
    people: [],
    link : 'mailto:?subject=Mail from Study Buddy',
    isOpen: false,
    isInterested: false,
    isCompleted : false
  };

  componentDidMount() {
    if(this.props.value ){
      this.setState({isCompleted: this.props.request["isCompleted"]});

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
     
    const url = "https://api-suggest-dot-studybuddy-5828.appspot.com"
    
    fetch(`${url}/requests/delete/${id}`, deleteMethod)
      .then(res => res.json())

  };

  handleFinalize(id) {
    id = this.props.request['_id']['$oid']
    const data = {"id" : id}

    URL = "https://api-suggest-dot-studybuddy-5828.appspot.com/api/finalizeGroup/"+id
    fetch(URL, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then((res) => {
            this.setState({isCompleted: res["success"]});
          });

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
        .then(res => console.log(res))
  };

  
  render() {
    const { username, interested_count, interested_people, msg, tag, course, skill, _id, isCompleted, post_time} = this.props.request
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

    const post_date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(post_time['$date']);
    
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
          <Label tag color="gainsboro" color="grey">{tag}</Label>
        </Grid>
        <Grid item xs={3}>
          {this.props.value ?
            <CustomTooltip title="Delete post" placement="left">
              <IconButton disableTouchRipple>
                <DeleteIcon
                  onClick={() => { if (window.confirm('Do you want to delete this item?')) this.handleDone(id) }}
                  style={{ fontSize:25, color: "d80000" }} >
                </DeleteIcon>
              </IconButton>
            </CustomTooltip>
          : null}
        </Grid>

        <Grid item xs={3}>    
          <p> {post_date} </p>
        </Grid>
        
        <Grid item xs={2}>  
            <p> {course} </p>
        </Grid>     

        <Grid item xs={3}>  
            <p> {skill} </p>
        </Grid>

        <Grid item xs={4}>
            <p> {msg} </p>
        </Grid>      
            
        <Grid item xs={3}>
          {current_user!==username ?
            <IconButton disableTouchRipple>
              <CustomTooltip title="Interested" placement="left">
                <ThumbUpOutlinedIcon 
                  style={{ fontSize: 30, color: "#3498DB" }} 
                  onClick={() => {this.handleInterested(id, current_user, interested_count, interested_people)}}
                  disabled={this.props.value}>
                </ThumbUpOutlinedIcon>
              </CustomTooltip>
            </IconButton>
          : null}
        </Grid>

        <Grid item xs={3}>
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
            interested_people= {interested_people}>
          </Modal>
        </Grid>

        <Grid item xs={3}>
          {this.props.value ?
            <CustomTooltip title="Contact interested people" placement="left">
              <IconButton disableTouchRipple>
                <a
                  href={this.state.link}>
                  <EmailIcon style={{ fontSize:30, color: "#3498DB" }}/>
                </a>
              </IconButton>
            </CustomTooltip>
            : 
            null
          }
        </Grid>

        {this.props.value ?
          <Grid item xs={3}>
            {this.state.isCompleted ?
              <CustomTooltip title="Finalized contacts" placement="left">
                <IconButton disableTouchRipple>
                  <CheckCircleIcon disabled
                    style={{ fontSize:25, color: "darkgrey" }} >
                  </CheckCircleIcon>
                </IconButton>
              </CustomTooltip>
              :
              <CustomTooltip title="Click to finalize contacts" placement="left">
                <IconButton disableTouchRipple>
                  <CheckCircleIcon
                    onClick={() => {this.handleFinalize(_id)}}
                    style={{ fontSize:25, color: "009d00" }} >
                  </CheckCircleIcon>
                </IconButton>
              </CustomTooltip>
            }
            </Grid>
          : 
          null
        }

        <Grid item xs={9}/>

        </Grid> 
      </Segment>   
    );
  }
}

export default Post;
