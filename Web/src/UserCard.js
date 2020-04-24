import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import LoadingIcon from "./loading.gif"

const styles = theme => ({
    root: {
        width: 410,
        height: 460
    },
    media: {
        height: 250,
        paddingTop: '56.25%', // 16:9
    },

});


class UserCard extends Component {

    controller = new window.AbortController();

    state = {
        name: null,
        skills: null,
        courses: null,
        department: null
    }
    componentDidMount() {

       
        
        console.log('In didmount')
        const user_name = this.props.user_name;
        console.log(user_name)

        const url = 'http://127.0.0.1:8080'
        fetch(`${url}/api/profile/${user_name}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              signal: this.controller.signal
        }).then(response => response.json())
        .then(res => {
            this.setState({ name: res[0].user_name, skills: res[0].skills, courses: res[0].courses, department: res[0].department });
       });
    
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.controller.abort();
    
        // this.signal.cancel('Api is being canceled');
        
        if (this.eventSource_a)
          this.eventSource_a.close();
    
        if (this.eventSource_b)
          this.eventSource_b.close();
      }
    

    render() {
        const { classes } = this.props;

        console.log(this.state.name);

        if (this.state.name) {
            return (
                <div>
                    <Card className={classes.root} >

                        <CardMedia
                            className={classes.media}
                            image="https://source.unsplash.com/user/sethdoylee/R5tHd-aYmPs"
                            title="User Profile"
                        />
                        <CardContent>
                            <Typography id="name" variant="h4" color="textSecondary" component="p">
                                {this.state.name}
                            </Typography>
                            <Typography id="skills" variant="h6" color="textSecondary" component="p">
                                Skills: {this.state.skills}
                            </Typography>
                            <Typography id="courses" variant="h6" color="textSecondary" component="p">
                                Courses: {this.state.courses}
                            </Typography>
                            <Typography id="department" variant="h6" color="textSecondary" component="p">
                                Department: {this.state.department}
                            </Typography>

                        </CardContent>
                        {this.props.user_name==localStorage.getItem('username') ? <CardActions disableSpacing>
                            <IconButton aria-label="edit">

                                <a href="/profile/edit" >
                                    <EditIcon />
                                </a>
                            </IconButton>


                        </CardActions> : null}



                    </Card>
                </div>
            );
        } else {
            return <img src={LoadingIcon} alt="loading..." />
        }
    }
}

// export default  withStyles(styles)(UserCard) withRouter(UserCard);
export default withStyles(styles)(UserCard);