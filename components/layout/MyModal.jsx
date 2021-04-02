/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-extra-parens */
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';

const MyModal = ({ ariaD, ariaL, children, modalCloseHandler, openState }) => (
    <Modal
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500
        }}
        aria-describedby={ariaD}
        aria-labelledby={ariaL}
        closeAfterTransition
        disableScrollLock
        onClose={modalCloseHandler}
        open={openState}
        // eslint-disable-next-line react/forbid-component-props
        style={{ overflowY: 'scroll' }}
    >
        <Slide
            in={openState}
            transition={750}
        >
            <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                margin: '30px auto',
                maxWidth: '800px',
                outline: 0,
                width: '80%'
            }}
            >
                {children}
            </div>
        </Slide>
    </Modal>
);

MyModal.propTypes = {
    ariaD: PropTypes.string,
    ariaL: PropTypes.string,
    children: PropTypes.array.isRequired,
    modalCloseHandler: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired
};

MyModal.defaultProps = {
    ariaD: '',
    ariaL: ''
};

export default MyModal;
