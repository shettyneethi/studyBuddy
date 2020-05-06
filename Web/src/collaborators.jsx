import React, { Component } from "react";
import DropdownPlugin from "./dropdown.jsx";
import { Segment } from 'semantic-ui-react';
import {Pie} from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import './collaborators.css';

class Collaborator extends Component {
    state = { 
        skills: [],
        selectedSkill: "",
        res_skills: [
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ],
        color: [],
        value: [],
        labels: []
    }

    controller = new window.AbortController();

    componentDidMount(){
        var skills = []
        const user_name = localStorage.getItem('username')

        const url = 'https://api-suggest-dot-studybuddy-5828.appspot.com'
        fetch(`${url}/api/profile/${user_name}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              signal: this.controller.signal
        }).then(response => response.json())
        .then(res => { 
            var l = res[0].skills.split(', ')
            for(const item of l) { 
              skills.push({key: item, text: item, value: item}) 
            }
        })
        .then(this.setState({skills:skills
        })
        );
        console.log(skills)
    }

    handleSkillChange = (event, data) => {
        this.setState({
          selectedSkill: data.value
        });
    };

    handleSkill = () => {
        var l = [];
        var color = [];
        var d = [];

        fetch(`http://127.0.0.1:8082/analysis/${this.state.selectedSkill}`,{
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
    })
    .then(response => response.json())
    .then( res => {
        for(var i=0; i<res['skill'].length; i++){
            color.push(res['backgroundColor'][i]);
            d.push(res['data'][i]);
            l.push(res['skill'][i]);
        }
    }).then(this.setState({
        res_skills: [{
            backgroundColor: color,
            data: d
        }],
        labels: l
    }))
    }

    handleSubmit = () => {
        this.handleSkill();
        this.props.onClose();
    }

    render() { 
        console.log(this.state.res_skills)
        
        if (!this.props.show) {
            return null;
        }
        return ( 
            <Segment className="piechart">
                <h3>Popularity of the skills of previous collaborators given the buddy skill requirement</h3>
                <h4>Choose a skill:  </h4>
                <DropdownPlugin
                    menu={this.state.skills}
                    title="Skill"
                    onSelect={this.handleSkillChange}
                ></DropdownPlugin><br/><br/>

                <Button
                    onClick={this.handleSubmit}
                    style={{ fontSize: 15 }}
                    variant="contained"
                    id = "butn"
                    color = "primary"
                >
                Show stats
                </Button>
                
                <Pie
                data={ {
                    labels: this.state.labels,
                    datasets: this.state.res_skills
                }}
                />
                
            </Segment>
        );
    }
}
 
export default Collaborator;