import styles from './ImageCard.module.css'; // Імпорт стилів

// Компонент ImageCard
// Відповідає за відображення окремої картки зображення
const ImageCard = ({
  urls, // Містить об'єкт із URL-адресами різних розмірів зображень (small, regular).
  alt_description, // Текст для атрибуту alt
  likes, // Кількість вподобань
  description, // Опис зображення
  onImageClick, // Колбек-функція для обробки кліків по зображенню.
}) => {
  // Деструктуризація URL-адрес для зображень
  const { small, regular } = urls;

  // Обробник кліку, який викликає onImageClick, передаючи URL великої версії зображення (regular), що відкривається в модальному вікні
  // Результат виклику handleClick передається в Арр (ф-я handleImageClick), змінює стан setModalImage іsetIsModalOpen, і далі передається в компонент ImageModal
  const handleClick = () => onImageClick(regular);

  return (
    // Контейнер картки
    <div className={styles.card}>
      {/* Контейнер для зображення */}
      <div className={styles.imageWrap}>
        <img
          onClick={handleClick} // Виклик обробника кліку
          className={styles.image}
          src={small} // URL маленької версії зображення
          alt={alt_description}
        />
      </div>
      {/* Опис під зображенням */}
      <p className={styles.imageDescription}>
        <span className={styles.descriptionText}>
          {/* Опис або стандартний текст, якщо опис відсутній */}
          {description || 'No description available'}
        </span>
        {/* Відображення кількості вподобань */}
        <span className={styles.likesText}>Likes: {likes}</span>
      </p>
    </div>
  );
};

export default ImageCard;
