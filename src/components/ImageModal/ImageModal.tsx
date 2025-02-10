// Імпорт бібліотеки Modal для створення модальних вікон
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

// Встановлення кореневого елементу для accessibility (застосовується для коректного фокусу на елементах модального вікна)
// Цей виклик встановлює елемент, до якого буде прив'язаний фокус модального вікна, для доступності (як правило, це корінь DOM).
Modal.setAppElement('#root');

// Інтерфейс пропсів для компонента ImageModal
interface ImageModalProps {
  isOpen: boolean; // Вказує, чи відкрите модальне вікно (true/false)
  onRequestClose: () => void; // Функція, що закриває модальне вікно
  image: string; // URL зображення для відображення у модальному вікні
}

// Компонент ImageModal
// Відповідає за відображення модального вікна з великим зображенням
// Приймає пропси:
// - isOpen: Boolean, що вказує, чи модальне вікно відкрите (true/false), приходить з компонента Арр
// - onRequestClose: функція, що викликається для закриття модального вікна, вбудована функція бібліотеки, реагує на клік поза зображенням та Escape (приходить з компонента Арр, встановлює setIsModalOpen(false))
// - image: URL зображення (regular з АРІ) для відображення у модальному вікні, приходить з компонента Арр
const ImageModal = ({
  isOpen,
  onRequestClose,
  image,
}: ImageModalProps): JSX.Element => {
  return (
    <Modal
      // Відкриває або закриває модальне вікно залежно від isOpen (true/false)
      isOpen={isOpen}
      // Функція закриття модального вікна (клік поза image або Escape)
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      // Клас для накладеного фону (overlay)
      overlayClassName={styles.modalOverlay}
    >
      {image && (
        // Якщо image існує (не порожній рядок), відображаємо його у модальному вікні
        <img src={image} alt="Large preview" className={styles.modalImage} />
      )}
    </Modal>
  );
};

export default ImageModal;
