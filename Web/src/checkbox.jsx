import React, { Component } from 'react';
import { Checkbox, Grid } from 'semantic-ui-react'

class CheckboxCustom extends Component {
    
    render() { 
        console.log(this.props.menu);
        return ( 
            <div>
                <Grid padded>
            {this.props.menu.map(c => <Checkbox label={c} key={c} >{c}</Checkbox>)}
                </Grid> 
            </div>
         );
    }
}
 
export default CheckboxCustom;

