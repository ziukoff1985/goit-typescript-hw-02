import Modal from 'react-modal'; // Імпорт бібліотеки Modal для створення модальних вікон
import styles from './ImageModal.module.css'; // Імпорт стилів

// Встановлення кореневого елементу для accessibility (застосовується для коректного фокусу на елементах модального вікна)
// Цей виклик встановлює елемент, до якого буде прив'язаний фокус модального вікна, для доступності (як правило, це корінь DOM).
Modal.setAppElement('#root');

// Компонент ImageModal
// Відповідає за відображення модального вікна з великим зображенням
// Приймає пропси:
// - isOpen: Boolean, що вказує, чи модальне вікно відкрите (true/false), приходить з компонента Арр
// - onRequestClose: функція, що викликається для закриття модального вікна, вбудована функція бібліотеки, реагує на клік поза зображенням та Escape (приходить з компонента Арр, встановлює setIsModalOpen(false))
// - image: URL зображення (regular з АРІ) для відображення у модальному вікні, приходить з компонента Арр
const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      // Відкриває або закриває модальне вікно залежно від isOpen (true/false)
      isOpen={isOpen}
      // Функція закриття модального вікна (клік поза image або Escape)
      onRequestClose={onRequestClose}
      // Клас для вмісту модального вікна
      className={styles.modalContent}
      // Клас для накладеного фону
      overlayClassName={styles.modalOverlay}
    >
      {image && (
        // Якщо зображення існує, відображаємо його у модальному вікні
        <img src={image} alt="Large preview" className={styles.modalImage} />
      )}
    </Modal>
  );
};

export default ImageModal; // Експорт компонента
