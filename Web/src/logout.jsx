import React, { Component } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import {
    Link
  } from 'react-router-dom';


class Logout extends Component {

    handleLogout= () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    render() { 
        const styles = {
            tooltip: {
              backgroundColor: "black",
              color: "gainsboro",
              fontSize: 14
            }
          };
      
        const CustomTooltip = withStyles(styles)(Tooltip);
        return (  
            <div>
                <Link to="/" onClick={this.handleLogout}>
                    <CustomTooltip title="Logout" placement="left">
                        <ExitToAppIcon 
                            style={{ fontSize: 30, color: 'gainsboro' }}>
                        </ExitToAppIcon>
                    </CustomTooltip>
                </Link>
            </div>  
                
        )
    }
}
 
export default Logout;