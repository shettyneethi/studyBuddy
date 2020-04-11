import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { Container } from "@material-ui/core";
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


class UserEdit extends Component {


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

    render() {
        const { classes } = this.props;


        return (
            <div>
                <Container maxWidth="lg">
                    <form className={classes.root} noValidate autoComplete="on">
                        <div>
                            <TextField required id="standard-required" label="Name" value={this.state.name} />
                            <br /><br />
                            <TextField required id="standard-required" label="Skills" value={this.state.skills} />
                            <br /><br />

                            <TextField required id="standard-required" label="Courses" value={this.state.courses} />
                            <br /><br />

                            <TextField required id="standard-required" label="Department" value={this.state.department} />
                        </div>

                    </form>
                </Container>


            </div>
        );
    }
}

export default withStyles(styles)(UserEdit);