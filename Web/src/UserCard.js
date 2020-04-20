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
import Cookies from "universal-cookie"

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

const cookies = new Cookies();
// const classes = useStyles();

class UserCard extends Component {



    state = {
        name: null,
        skills: null,
        courses: null,
        department: null
    }
    componentDidMount() {
        
        console.log('In didmount')
        console.log("Location ",this.props.location)
        console.log("state ",this.props.location.state.token)

        const url = 'https://api-suggest-dot-studybuddy-5828.appspot.com'
        fetch(`${url}/api/profile`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + this.props.location.state.token
              }
        }).then((response) => response.json())
       
            .then(response => {
                this.setState({ name: response.name });
                this.setState({ skills: response.skills });
                this.setState({ courses: response.courses });
                this.setState({ department: response.department });
            });

    }
    render() {
        const { classes } = this.props;

        if (this.state.name && this.state.skills && this.state.courses && this.state.department) {
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
                        <CardActions disableSpacing>
                            <IconButton aria-label="edit">

                                <a href="/profile/edit" >
                                    <EditIcon />
                                </a>
                            </IconButton>


                        </CardActions>



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