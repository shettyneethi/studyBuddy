import React, { Component } from 'react';
import DropdownPlugin from './dropdown.jsx'
import CheckboxCustom from './checkbox.jsx';

class Request extends Component {
    state = {
        courses: ["CS", "MS", "FRCS"],
        skills: ["C", "C++"],
        tags: ['Homework', 'Project','Midterm', 'Quiz']
        
      };
    render() { 
        return (  
            <React.Fragment>
                <h2>Raise your buddy request here!</h2>
                <DropdownPlugin
                menu={this.state.courses}
                title="Choose Course"
              ></DropdownPlugin>
              <DropdownPlugin
              menu={this.state.skills}
              title="Choose Skill"
            ></DropdownPlugin>
            Message
            <input></input>
            <button
          style={{ fontSize: 15 }}
          className="badge badge-secondary btn-sm "
        >
          Post
        </button>
        <CheckboxCustom  menu={this.state.tags}>    
        </CheckboxCustom>

            </React.Fragment>
        );
    }
}
 
export default Request;