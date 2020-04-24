import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from "@material-ui/core";
import LoadingIcon from "./loading.gif"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const styles = theme => ({
    textField: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500,

    },
    input: {
        color: 'white'
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
        const user_name = this.props.user_name
        const url = 'http://127.0.0.1:8080/'
        
        fetch(`${url}/api/profile/${user_name}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
        })
        .then((response) => response.json())
            .then(res => {
                this.setState({ name: res[0].user_name, skills: res[0].skills, courses: res[0].courses, department: res[0].department, _id: res[0]._id.$oid });
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
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
            body: JSON.stringify(data)
        })

            .then(this.props.history.push('/home'))
            .then(() => {
                alert("Hey " + data.name.split(" ")[0] + ", your profile updated successfully");
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

        if (this.state.name) {
            return (
                <div>
                    <IconButton aria-label="back" onClick={() => this.props.history.push('/home')}>
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                    <Container width="lg">
                        <center>
                            <form className={classes.root} noValidate autoComplete="on" onSubmit={this.handleSubmit}>
                                <div>
                                    <br /><br /><br />
                                    <Typography variant="h4" align="center" gutterBottom>
                                    Hey, {this.state.name}, Edit your profile here!
                                </Typography>
                                    {/* <TextField id="name" label="Name" className={classes.textField} defaultValue={this.state.name} onChange={this.onNameChange} editable={false}/> */}
                                    <br /><br />
                                    <TextField id="skills" label="Skills" className={classes.textField} defaultValue={this.state.skills} onChange={this.onSkillsChange} />
                                    <br /><br />

                                    <TextField id="courses" label="Courses" className={classes.textField} defaultValue={this.state.courses} onChange={this.onCoursesChange} />
                                    <br /><br />

                                    <TextField id="department" label="Department" className={classes.textField} defaultValue={this.state.department} onChange={this.onDepartmentChange} />
                                    <br /><br />
                                    <Button variant="contained" color="primary" onClick={(e) => this.handleSubmit(e)}>
                                        Save
      </Button>
                                </div>

                            </form>

                        </center>
                    </Container>


                </div>
            );
        } else {
            return (
                <center>
                    <img src={LoadingIcon} alt="loading..." />
                </center>
            );
        }

    }
}

export default withStyles(styles)(UserEdit);