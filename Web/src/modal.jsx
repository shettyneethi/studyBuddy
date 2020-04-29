import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { Grid } from "@material-ui/core";
import './modal.css';


class Modal extends React.Component {
  state = {
    tags: ['name1', 'name2','name3', 'name4']
  };

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return ( 
      <Segment className="mod">
        <Grid item xs={2}> 
          { 
            this.props.interested_people.map((c, idx) => (
              <div key={idx}>
                {
                  c.split(",").map(item => (
                    <span>
                      {item}
                      <br/>
                    </span>
                  ))
                }
              </div>
            ))
          }
        </Grid>
      </Segment>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;