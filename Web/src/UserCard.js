import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router';
import Homepage from './homepage';
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


// const classes = useStyles();

class UserCard extends Component {


    state = {
        name: 'Your name comes here',
        skills: 'Your skills comes here',
        courses: 'Your courses comes here',
        department: 'Your department comes here'
    }
    componentDidMount() {
        fetch("http://127.0.0.1:8080/api/profile", {
            method: 'GET'
        },
        ).then((response) => response.json())
            .then(response => {
                this.setState({ name: response.name });
                this.setState({ skills: response.skills });
                this.setState({ courses: response.courses });
                this.setState({ department: response.department });
            });

    }
    handleOnClick = () => {

        this.context.router.push('/profile/new');
    }
    render() {
        const { classes } = this.props;



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

                            <a href="http://localhost:3000/profile/edit" >
                                <EditIcon />
                            </a>
                        </IconButton>


                    </CardActions>



                </Card>
            </div>
        );
    }
}

// export default  withStyles(styles)(UserCard) withRouter(UserCard);
export default withStyles(styles)(UserCard);