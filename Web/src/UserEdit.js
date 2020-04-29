import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from "@material-ui/core";
import LoadingIcon from "./loading.gif"
import { Button } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Navbar, Nav } from 'react-bootstrap';
import fav from './images/fav.jpg'
import Tooltip from '@material-ui/core/Tooltip';
import Logout from './logout';

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

        fetch("https://api-suggest-dot-studybuddy-5828.appspot.com/api/profile", {
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
        fetch('https://api-suggest-dot-studybuddy-5828.appspot.com/api/profile', {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
            body: JSON.stringify(data)
        })

            // .then(this.props.history.push('/home'))
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

        const styles = {
            tooltip: {
              backgroundColor: "black",
              color: "gainsboro",
              fontSize: 14
            }
        };
      
        const CustomTooltip = withStyles(styles)(Tooltip);
        
        const { classes } = this.props;

        if (this.state.name) {
            return (
                <div>
                    <Navbar bg="dark" expand="lg" variant="light">
                        <Navbar.Brand>
                            <img
                            alt=""
                            src={fav}
                            width="70"
                            height="70"
                            background="transparent"
                            />{'  '}
                        </Navbar.Brand>
                        <Nav className="h1-nav">Study Buddy</Nav>

                        <Nav className="navbar-collapse justify-content-end">
                            <IconButton aria-label="back" onClick={() => this.props.history.push('/home')}>
                                <CustomTooltip title="Home" placement="left">
                                    <HomeIcon 
                                    style={{ fontSize: 30, color: 'gainsboro' }}>
                                    </HomeIcon>
                                </CustomTooltip>
                            </IconButton>
                        </Nav>

                        <IconButton disableTouchRipple>
                            <Logout/>
                        </IconButton>
                    </Navbar>
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
                                    <Button variant="outline-dark" onClick={(e) => this.handleSubmit(e)}>Save</Button>
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