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


// const classes = useStyles();

class UserCard extends Component {


    state = {
        name: null,
        skills: null,
        courses: null,
        department: null
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

                                <a href="http://localhost:3000/profile/edit" >
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