import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';



class DropdownPlugin extends Component {
   
    render() { 
        console.log(this.props.menu);
       return (  
            <Dropdown>
                
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.props.title}
                </Dropdown.Toggle>
                
                <Dropdown.Menu>  
                    {this.props.menu.map(c => <Dropdown.Item key={c}>{c}</Dropdown.Item>)}
                </Dropdown.Menu>
                
            </Dropdown>
        );
    }
}
 
export default DropdownPlugin;