import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

// Інтерфейс для Image (з файлу /services/types)
import { Image } from '../../services/types';

// 'interface' для опису типу пропсів, які очікує компонент ImageGallery
interface ImageGalleryProps {
  images: Image[]; // Масив об'єктів типу Image
  onImageClick: (imageUrl: string) => void; // Функція-обробник кліку на зображення
}

// Компонент ImageGallery
// Відповідає за відображення списку зображень і передачу даних дочірньому компоненту ImageCard
// Перебирає масив зображень [images] і рендерить картки зображень
// Приймає пропси:
// - images: масив об'єктів з зображеннями і інформацією
// - onImageClick: колбек-функція, яку викликається при кліку на зображення (передається далі як пропс дочірньому компоненту ImageCard)
const ImageGallery = ({
  images,
  onImageClick,
}: ImageGalleryProps): JSX.Element => {
  return (
    // Список галереї
    <ul className={styles.galleryList}>
      {/* метод map для перебору масиву об'єктів з зображеннями */}
      {images.map((image, index) => (
        // Кожен елемент списку відповідає окремому зображенню
        <li key={`${image.id}-${index}`} className={styles.galleryItem}>
          {/* Відображає окрему картку зображення. Передаємо пропсами об'єкт з зображенням та функцію обробки кліку */}
          <ImageCard {...image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
