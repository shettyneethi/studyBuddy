import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Grid, Segment,Label} from 'semantic-ui-react';
import Modal from './modal.jsx';

class Post extends Component {
  state = {
    count: 0,
    isOpen: false
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {
    const { name, interested_count } = this.props.request
    return (
      <React.Fragment>
        <Segment>
        <Grid padded>
          
        <Grid.Row  columns={2}>
        
              <Grid.Column >
                <div className="personDivision">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        
        <button onClick={this.props.handlePersonIcon}>
          {" "}
          <PersonIcon style={{ fontSize: 40 }}>person</PersonIcon>
        </button>
        </div>
        </Grid.Column>
        <Grid.Column >
            <div>
              <Label tag color="teal">Assignment</Label>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row  columns={1}>
              <Grid.Column >
        <p> {name} </p>
        </Grid.Column>

          
        </Grid.Row>

        <Grid.Row  columns={1}>
          <Grid.Column >
        <p> Message</p>
        </Grid.Column>
        </Grid.Row>

        <Grid.Row  columns={3}>
        <Grid.Column width={3}>
        <button
          onClick={this.props.handleInterested}
          style={{ fontSize: 15 }}
          className="badge badge-secondary btn-sm "
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
          onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>

        </Grid.Column>
        
        <Grid.Column width={2}>
        <button
          onClick={this.props.handleDone}
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
