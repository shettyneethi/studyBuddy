import React, { Component } from "react";
// import Header from './header.jsx';
import Icon from "@material-ui/core/Icon";
import PersonIcon from "@material-ui/icons/Person";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownPlugin from "./dropdown.jsx";
import Posts from "./posts.jsx";
import SearchBar from "react-search-bar-semantic-ui";
import {Search, Grid } from 'semantic-ui-react';
import css from './homepage.css'
import Autosuggest from 'react-autosuggest';
import axios from 'axios'
import { debounce } from 'throttle-debounce'

class Homepage extends Component {
  state = {
    courses: ["CS", "MS", "FRCS"],
    skills: ["C", "C++"],
    value: '',
    suggestions: [],
    cacheAPISugesstions: []
    
  };

  SUGGEST_URL = 'https://studybuddy-5828.appspot.com/suggest'

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
        <div>{suggestion.post}</div>
        <div>{suggestion.course}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  componentDidMount() {
    axios
    .get(this.SUGGEST_URL, {})
    .then(res => {
      this.setState({ cacheAPISugesstions: res.data});
    })
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

  getSuggestions = (allPosts, searchValue) => {
    const inputValue = searchValue.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : allPosts.filter(s =>
      s.course.toLowerCase().includes(inputValue)
    );
  };

  render() {
    const value = this.state.value;
    const suggestions = this.state.suggestions;

    // Autosuggest will pass through all these props to the input.
    const autoSuggestInputProps = {
        placeholder: 'Type a programming language',
        value,
        onChange: this.onChange
      };

    return (
        

      <div className="gridContainer">

        <Grid padded >
            <Grid.Row centered  columns={4}  className="searchbar">
                <Grid.Column centered verticalAlign='middle' width={10}>
                    <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion.course}
        renderSuggestion={this.renderSuggestion}
        inputProps={autoSuggestInputProps}
      />
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
                  <button>
                    {" "}
                    <Icon style={{ fontSize: 40}}>add_circle</Icon>
                  </button>
                  </div>

              </Grid.Column >
          </Grid.Row>

    </Grid></div>
      
    );
  }
}

export default Homepage;
