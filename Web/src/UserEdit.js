import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from "@material-ui/core";
import LoadingIcon from "./loading.gif"
import Button from '@material-ui/core/Button';
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
        department: null,
        _id: null
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
                this.setState({ _id: response._id.$oid });

            });

    }
    handleSubmit() {
        // event.preventDefault();
        const data = {
            name: this.state.name,
            skills: this.state.skills,
            courses: this.state.courses,
            department: this.state.department,
            _id: this.state._id
        };
        fetch('http://127.0.0.1:8080/api/profile', {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

            .then(this.props.history.push('/'))
            .then(() => {
                console.log(data._id)
                alert("Hey " + data.name + ", your profile updated successfully");
            })

    };



    onNameChange = (e) => {
        this.setState({ name: e.target.value });
    }
    onSkillsChange = (e) => {
        this.setState({ skills: e.target.value });
    }
    onCoursesChange = (e) => {
        this.setState({ courses: e.target.value });
    }
    onDepartmentChange = (e) => {
        this.setState({ department: e.target.value });
    }

    render() {
        const { classes } = this.props;

        if (this.state.name && this.state.skills && this.state.courses && this.state.department) {
            return (
                <div>
                    <Container width="lg">
                        <form className={classes.root} noValidate autoComplete="on" onSubmit={this.handleSubmit}>
                            <div>
                                <TextField id="name" label="Name" defaultValue={this.state.name} onChange={this.onNameChange} />
                                <br /><br />
                                <TextField id="skills" label="Skills" defaultValue={this.state.skills} onChange={this.onSkillsChange} />
                                <br /><br />

                                <TextField id="courses" label="Courses" defaultValue={this.state.courses} onChange={this.onCoursesChange} />
                                <br /><br />

                                <TextField id="department" label="Department" defaultValue={this.state.department} onChange={this.onDepartmentChange} />
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={(e) => this.handleSubmit(e)}>
                                    Save
      </Button>
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