import React, { Component } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

import {Dropdown} from 'semantic-ui-react';




class DropdownPlugin extends Component {

   
    render() { 
        console.log(this.props.menu);
       return (  
            <Dropdown
                onChange={this.props.onSelect}
                placeholder={this.props.title}
                options={this.props.menu}
            />
                                   
        );
    }
}
 
export default DropdownPlugin;