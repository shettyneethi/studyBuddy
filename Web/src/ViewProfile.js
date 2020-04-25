import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import UserCard from "./UserCard";
import grey from '@material-ui/core/colors/grey';

function SimpleDialog(props) {
    const { onClose, open, username } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <UserCard user_name={username}/>
        </Dialog>

    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function ViewProfile(props) {
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    console.log(props.user_name);

    return (
        <div>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleClickOpen}
                style= {{ color: grey[100] }}
            >
            <AccountCircleIcon fontSize="large"/>
            </IconButton>

            <SimpleDialog open={open} onClose={handleClose} username={props.user_name}/>
        </div>
    );
}
