import React, { Component } from "react";
// import Header from './header.jsx';
import Icon from "@material-ui/core/Icon";
import PersonIcon from "@material-ui/icons/Person";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownPlugin from "./dropdown.jsx";
import Posts from "./posts.jsx";
import SearchBar from "react-search-bar-semantic-ui";
import {Search, Grid, Segment} from 'semantic-ui-react';
import css from './homepage.css'
import Request from './request.jsx';

class Homepage extends Component {
  state = {
    courses: ["CS", "MS", "FRCS"],
    skills: ["C", "C++"],
    isOpen: false
    
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="gridContainer">
        <Grid padded >
            <Grid.Row centered  columns={4}  className="searchbar">
                <Grid.Column centered verticalAlign='middle' width={10}>
                  <div className='searchDivison'>
                    <Search  size="huge" input={{ fluid: true }}/>
                    </div>
                </Grid.Column >

                <Grid.Column  verticalAlign='middle' width={2}>
              <div className="filterCourseDivision">
            <DropdownPlugin
                menu={this.state.courses}
                title="Choose Course"
              ></DropdownPlugin>
              </div>
              </Grid.Column >
              <Grid.Column  verticalAlign='middle' width={2}>
                <div className='filterSkillDivision'>
            <DropdownPlugin
              menu={this.state.skills}
              title="Choose Skill"
            ></DropdownPlugin>
            </div>

            </Grid.Column >

                <Grid.Column centered verticalAlign='middle' width={2}>
                <div className='personDivison'>
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  />
                
                  <button>
                    {" "}
                    <PersonIcon style={{ fontSize: 40 }}>person</PersonIcon>
                  </button>
                </div>
                </Grid.Column>

            </Grid.Row>

          <Grid.Row centered  columns={1}  className="searchbar">
            <Grid.Column width={16}></Grid.Column>
            
              </Grid.Row>
              
          <Grid.Row columns={3} padded>
          <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={9}>
    
                <div className='postsDivision'>
            <Posts />
            </div>

            </Grid.Column>
            <Grid.Column  width={6}>
                <div className='newPostDivision' >

                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                  />
                  <button onClick={this.toggleModal} >
                    {" "}
                    <Icon style={{ fontSize: 40}}>add_circle</Icon>
                  </button>

                <Request show={this.state.isOpen}
                  onClose={this.toggleModal}>
                  Here's some content for the modal
                </Request>
                  </div>

              </Grid.Column >
          </Grid.Row>

    </Grid></div>
      
    );
  }
}

export default Homepage;
