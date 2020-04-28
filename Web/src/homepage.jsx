import React, { Component } from "react";
// import Header from './header.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "./posts.jsx";
import SearchBar from "react-search-bar-semantic-ui";
import { Search, Grid, Segment } from 'semantic-ui-react'
import Autosuggest from 'react-autosuggest';
import { debounce } from 'throttle-debounce'
import Request from './request.jsx';
import { Navbar, Nav } from 'react-bootstrap';
import fav from './images/fav.jpg'
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ViewProfile from "./ViewProfile.js"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import 'abortcontroller-polyfill';
import Logout from './logout.jsx';




class Homepage extends Component {
  _isMounted = false;
  controller = new window.AbortController();

  state = {
    value: '',
    suggestions: [],
    cacheAPISugesstions: [],
    isOpen: false,
    filterResults: [],
    posts: [],
    filterRequests: []
  };

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div>
        <span>{suggestion.course}</span>
      </div>
    );
  }

  onChange = (event, { newValue }) => {

    if (newValue.length != 0) {
      this.setState({
        value: newValue
      });
    }
    else {
      this.setState({
        value: newValue,
        filterResults: this.state.posts
      });
    }
  };

 
  componentDidMount() {
    
    this._isMounted = true;
    console.log(localStorage.getItem('token'))

    fetch('https://api-suggest-dot-studybuddy-5828.appspot.com/suggest', {
      method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
      signal: this.controller.signal
    })
      .then(response => response.json())
      .then(res => this.setState({ cacheAPISugesstions: res, filterResults: res, posts: res }));
    this.eventSource_a = new EventSource('https://34.71.199.201:8081/api/posts');
    this.eventSource_a.onmessage = e =>
      this.updateData(JSON.parse(e.data), e);

    this.eventSource_b = new EventSource('https://34.71.199.201:8081/api/updated/posts');
    this.eventSource_b.onmessage = e =>
      this.updatePost(JSON.parse(e.data), e);
  }



  updateData(data, e) {
    let res = this.state.filterResults
    let res_sort = [data].concat(res)
    this.setState({ cacheAPISugesstions: res_sort, filterResults: res_sort, posts: res_sort});
  }

  updatePost(data, e) {
    let post = this.state.filterResults
    let post_id = data['_id']['$oid']
    var i;
    for (i = 0; i < post.length; i++) {
      if (post_id == post[i]['_id']['$oid']) {
        post[i]['interested_count'] = data['interested_count'];
        post[i]['interested_people'] = data['interested_people'];

      }
    }

    this.setState({ filterResults: post });
  }


  componentWillUnmount() {
    this._isMounted = false;
    this.controller.abort();

    if (this.eventSource_a)
      this.eventSource_a.close();

    if (this.eventSource_b)
      this.eventSource_b.close();
  }


  handleMyRequest = () => {

    var filterMyReq = this.state.filterResults;
    filterMyReq = filterMyReq.filter(
      (item) => item.username == localStorage.getItem('username'));
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

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    var filterRes = this.state.filterResults;
    filterRes = filterRes.filter(
      (item) => item.course == suggestionValue)

    if (filterRes != 0) {
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

   const posts = allPosts.filter(s => s.course.toLowerCase().includes(inputValue))
   const result = [];
   const map = new Map();
   for (const item of posts) {
      if(!map.has(item.course)){
          map.set(item.course, true); 
          result.push({
              course: item.course
          });
      }
    }
    return inputLength === 0 ? [] : result
  };

 
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {

    const value = this.state.value;
    const suggestions = this.state.suggestions;

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
              src={fav}
              width="70"
              height="70"
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

          <Link to="/myRequests" onClick={this.handleMyRequest}>My Requests</Link>
          <Logout/>

          <ViewProfile user_name={localStorage.getItem('username')}/>
        </Navbar>

        <Grid padded >
          <Grid.Row columns={3} padded>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={9}>

              <div className='postsDivision'>
                <Posts filterRes={this.state.filterResults} value={false}/>
              </div>

            </Grid.Column>
            <Grid.Column width={6}>
              <div className='newPostDivision' >

                <IconButton id="newPost" onClick={this.toggleModal} >

                  <AddCircleIcon style={{ fontSize: 40, color: 'black' }} ></AddCircleIcon>
                </IconButton>
                {"Create New Buddy Request"}

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
