import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');
interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: string;
}

const ImageModal = ({
  isOpen,
  onRequestClose,
  image,
}: ImageModalProps): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      {image && (
        <img src={image} alt="Large preview" className={styles.modalImage} />
      )}
    </Modal>
  );
};

export default ImageModal;
