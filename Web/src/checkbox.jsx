import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react'

class CheckboxCustom extends Component {
    
    render() { 
        console.log(this.props.menu);
        return ( 
            <div>
            {this.props.menu.map(c => <Checkbox label={c} key={c} >{c}</Checkbox>)}
            
            </div>
         );
    }
}
 
export default CheckboxCustom;

