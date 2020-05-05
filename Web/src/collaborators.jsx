import React, { Component } from "react";
import DropdownPlugin from "./dropdown.jsx";
import PieChart from 'react-simple-pie-chart';

class Collaborator extends Component {
    state = { 
        skills: [],
        selectedSkill: "",
        res_skills: []
    }

    // controller = new window.AbortController();

    


    componentDidMount(){
        var skills = []
        console.log(localStorage.getItem('skills'))
        for(const item of localStorage.getItem('skills')) { 
            skills.push({key: item, text: item, value: item}) 
          }
          this.setState({skills: skills})
}

    // componentWillUnmount() {
    //     this.controller.abort();
    //   }

    handleSkillChange = (event, data) => {
        this.setState({
          selectedSkill: data.value
        })
        .then(
            fetch('https://0.0.0.0:8082/analysis/'+this.state.selectedSkill ,{
            method: 'GET',
            headers: {
                "Content-type": "application/json"
              },
    })
    .then(response => response.json())
    .then(res => this.setState({ res_skills : res }))
        );
        this.props.onClose();
      };

    render() { 
        
        if (!this.props.show) {
            return null;
        }
        return ( 
            <div> 
                <div className='selectSkill'>
                <DropdownPlugin
                    menu={localStorage.getItem('skills')}
                    title="Skill"
                    onSelect={this.handleSkillChange}
                ></DropdownPlugin>
                </div>

                <div>
                <PieChart
                slices={[
                    {
                        color: '#f00',
                        value: 10,
                    },
                    {
                        color: '#0f0',
                        value: 20,
                    },
                    ]}
                />
                </div>
            </div>
        );
    }
}
 
export default Collaborator;