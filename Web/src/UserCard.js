import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },

}));



export default function UserCard() {

    const classes = useStyles();



    return (

        <Card className={classes.root}>

            <CardMedia
                className={classes.media}
                image="https://source.unsplash.com/user/sethdoylee/R5tHd-aYmPs"
                title="Paella dish"
            />
            <CardContent>
                <Typography id="name" variant="h5" color="textSecondary" component="p">
                    John Doe
        </Typography>
                <Typography id="skills" variant="caption" color="textSecondary" component="p">
                    Data Structures, Software Engineering
        </Typography>
                <Typography id="courses" variant="caption" color="textSecondary" component="p">
                    Big Data Architecture, NLP
        </Typography>
                <Typography id="department" variant="caption" color="textSecondary" component="p">
                    Computer Science
        </Typography>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="home">
                    <HomeIcon />
                </IconButton>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>


            </CardActions>



        </Card>
    );
}