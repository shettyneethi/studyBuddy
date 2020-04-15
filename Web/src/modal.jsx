import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment,Label} from 'semantic-ui-react';
import CheckboxCustom from './checkbox'


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
        <div>
      <div className="backdrop" >
        <Segment padded>
          <Grid.Row padded> 
          <Grid.Column padded>

            <div >
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
            </div>

              {/* <CheckboxCustom  
                menu={this.props.interested_people}
                title="Select tag"
                ></CheckboxCustom> */}
            </Grid.Column>
            </Grid.Row>

          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
          </Segment>
        </div>
      </div>
    //   </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;