import React, { Component } from "react";
// import Header from './header.jsx';
import Icon from "@material-ui/core/Icon";
import PersonIcon from "@material-ui/icons/Person";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownPlugin from "./dropdown.jsx";
import Posts from "./posts.jsx";
import SearchBar from "react-search-bar-semantic-ui";
import { Search, Grid, Segment } from 'semantic-ui-react';
import css from './homepage.css'
import Autosuggest from 'react-autosuggest';
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import Request from './request.jsx';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './logo.jpg'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ViewProfile from "./ViewProfile.js"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch 
} from 'react-router-dom';
import 'abortcontroller-polyfill';



class Homepage extends Component {
  _isMounted = false;
  controller = new window.AbortController();

  state = {
    courses: ["CS", "MS", "FRCS"],
    skills: ["C", "C++"],
    value: '',
    suggestions: [],
    cacheAPISugesstions: [],
    isOpen: false,
    filterResults: [],
    posts: [],
    filterRequests: []
  };
  
    
  // SUGGEST_URL = 'https://api-suggest-dot-studybuddy-5828.appspot.com/suggest'

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div>
        <span>{suggestion.msg}</span>
        <span>{suggestion.course}</span>
      </div>


    );
  }

  onChange = (event, { newValue }) => {

    if(newValue.length != 0){
      this.setState({
        value: newValue
      }); 
    }
    else{
      this.setState({
        value: newValue,
        filterResults: this.state.posts
      });
    }
    
  };

  

  // componentDidMount() {
  //   axios
  //   .get(this.SUGGEST_URL, {})
  //   .then(res => {
  //     this.setState({ cacheAPISugesstions: res.data});
  //   })
  // }
  componentDidMount() {

    this._isMounted = true;
    console.log('In didmount');
    console.log(this._isMounted);
    fetch('http://127.0.0.1:8080/suggest', {
      signal: this.controller.signal
    })
        .then(response => response.json())
        .then(res => this.setState({ cacheAPISugesstions: res, filterResults: res, posts: res}));

    console.log(this._isMounted);

    this.eventSource = new EventSource('http://127.0.0.1:8081/api/posts');
    this.eventSource.onmessage = e =>
    this.updateData(JSON.parse(e.data), e);

  }


  updateData(data, e) {
    console.log(e)
    console.log(data)
    let res = this.state.filterResults
    let res_sort = [data].concat(res)
    this.setState({cacheAPISugesstions: res_sort, filterResults: res_sort, posts: res_sort});
  }

  componentWillUnmount() {
    console.log('In unmount');
    this._isMounted = false;
    console.log(this._isMounted);
    this.controller.abort();
    if(this.eventSource)
      this.eventSource.close();

  }


  handleMyRequest = () => {

    var filterMyReq = this.state.filterResults;
    filterMyReq = filterMyReq.filter(
        (item) =>  item.username == 'reshma');
    this.props.filterReq(filterMyReq);

  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: this.getSuggestions(this.state.cacheAPISugesstions, value) });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
    var filterRes = this.state.filterResults;
    console.log('Before filter' + filterRes)
    console.log(suggestionValue)
      filterRes = filterRes.filter(
        (item) =>  item.course == suggestionValue)
      console.log('FilterRes' +filterRes );
      
      if(filterRes != 0) {
        this.setState({ 
          filterResults: filterRes
          });
      }
      else {
        this.setState({ 
          filterResults: this.state.posts
          });
      }
};
  getSuggestions = (allPosts, searchValue) => {
    const inputValue = searchValue.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : allPosts.filter(s =>
      s.course.toLowerCase().includes(inputValue)
    );
  };


  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  
  render() {
    const value = this.state.value;
    const suggestions = this.state.suggestions;

    console.log(this.state.filterResults)

    // Autosuggest will pass through all these props to the input.
    const autoSuggestInputProps = {
      placeholder: 'Search..',
      value,
      onChange: this.onChange
    };

    const renderInputComponent = inputProps => (
      <div className="inputContainer">
        <img className="icon" src="https://img.icons8.com/ios-filled/50/000000/search.png" />
        <input {...inputProps} />
      </div>
    );


    return (

      <div className="gridContainer">

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="60"
              height="60"
            />{' '}
          StudyBuddy
        </Navbar.Brand>

          <Nav class="collapse navbar-collapse justify-content-center" padded>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={suggestion => suggestion.course}
              renderSuggestion={this.renderSuggestion}
              onSuggestionSelected={this.onSuggestionSelected}
              inputProps={autoSuggestInputProps}
              renderInputComponent={renderInputComponent}
            />
          </Nav>
          
          <Link to="/myRequests" onClick = {this.handleMyRequest}>My Requests</Link>
                 
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon fontSize='large' />
            </Badge>
          </IconButton>

          <ViewProfile />

        </Navbar>

        <Grid padded >
          <Grid.Row columns={3} padded>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={9}>

              <div className='postsDivision'>
                <Posts filterRes={this.state.filterResults} />
              </div>

            </Grid.Column>
            <Grid.Column width={6}>
              <div className='newPostDivision' >

                <IconButton onClick={this.toggleModal} >
                  {" "}
                  <AddCircleIcon style={{ fontSize: 40, color: 'black' }} ></AddCircleIcon>
                </IconButton>

                <Request show={this.state.isOpen}
                  onClose={this.toggleModal}
                  >
                  Here's some content for the modal
                </Request>
              </div>

            </Grid.Column >
          </Grid.Row>
        </Grid>
      </div>

    );
  }
}

export default Homepage;
