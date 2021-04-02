/* eslint-disable no-extra-parens */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const UserShowRemoveDialog = ({ dialogCloseHandler, dialogConfirmHandler, dialogOpen }) => (
    <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={dialogCloseHandler}
        open={dialogOpen}
    >
        <DialogTitle color="primary">
            Confirm remove show
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                The show will be removed from your shows list. This cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                color="secondary"
                onClick={dialogCloseHandler}
            >
                Cancel
            </Button>
            <Button
                autoFocus
                color="primary"
                onClick={dialogConfirmHandler}
            >
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
);

UserShowRemoveDialog.propTypes = {
    dialogCloseHandler: PropTypes.func.isRequired,
    dialogConfirmHandler: PropTypes.func.isRequired,
    dialogOpen: PropTypes.bool.isRequired
};

export default UserShowRemoveDialog;
