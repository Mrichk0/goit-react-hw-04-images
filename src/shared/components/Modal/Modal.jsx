import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from '../Modal/modal.module.css';

const modalRoot = document.getElementById('modal-root')

class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.closeModal)
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal)
    }

    closeModal = (e) => {
        const { close } = this.props;
        if (e.code === 'Escape') {
            close();
            return;
        }
        if (e.target === e.currentTarget) {
            close();
        }
    }

    render() {
        const { children } = this.props;
        const { closeModal } = this;
    return createPortal (
        <div className={styles.Overlay} onClick={closeModal}>
            <div className={styles.Modal}>
                <span onClick={closeModal} className={styles.Close}>X</span>
                {children}
            </div>
        </div>,
        modalRoot
)}
}
    
Modal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Modal;