import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

const MySnackbar = ({ duration, message, openState, setOpenState, type }) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenState(false);
    };

    const classes = `snackbar ${type}`;

    return (
        <div>
            <Snackbar
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                        size="small"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
                autoHideDuration={duration}
                // eslint-disable-next-line react/forbid-component-props
                className={classes}
                data-testid="snackbar"
                message={message}
                onClose={handleClose}
                open={openState}
            />
        </div>
    );
};

MySnackbar.propTypes = {
    duration: PropTypes.number,
    message: PropTypes.string,
    openState: PropTypes.bool,
    setOpenState: PropTypes.func.isRequired,
    type: PropTypes.string
};

MySnackbar.defaultProps = {
    duration: 6000,
    message: 'default message',
    openState: false,
    type: 'error'
};

export default MySnackbar;
