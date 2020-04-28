import React, { Component } from 'react';
import {Dropdown} from 'semantic-ui-react';


class DropdownPlugin extends Component {

   
    render() { 
        console.log(this.props.menu);
       return (  
            <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='world'
                onChange={this.props.onSelect}
                placeholder={this.props.title}
                options={this.props.menu}
                search
            />
                                   
        );
    }
}
 
export default DropdownPlugin;