import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from "@material-ui/core";
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


class UserEdit extends Component {


    state = {
        name: null,
        skills: null,
        courses: null,
        department: null
    }

    componentWillMount() {
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
    _handleChangeEvent(val) {
        return val;
    }
    render() {
        const { classes } = this.props;
        if (this.state.name && this.state.skills && this.state.courses && this.state.department) {
            return (
                <div>
                    <Container maxWidth="lg">
                        <form className={classes.root} noValidate autoComplete="on">
                            <div>
                                <TextField id="name" label="Name" defaultValue={this.state.name} />
                                <br /><br />
                                <TextField required id="skills" label="Skills" defaultValue={this.state.skills} />
                                <br /><br />

                                <TextField required id="courses" label="Courses" defaultValue={this.state.courses} />
                                <br /><br />

                                <TextField required id="department" label="Department" defaultValue={this.state.department} />
                            </div>

                        </form>

                    </Container>


                </div>
            );
        } else {
            return <img src={LoadingIcon} alt="loading..." />
        }

    }
}

export default withStyles(styles)(UserEdit);