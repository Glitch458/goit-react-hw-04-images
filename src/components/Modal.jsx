import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ url, alt, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => window.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return (
    <div className="Overlay" onClick={closeModal} onKeyDown={closeModal}>
      <div className="Modal">
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
