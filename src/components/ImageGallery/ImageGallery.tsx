import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../../services/types';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (imageUrl: string) => void;
}

const ImageGallery = ({
  images,
  onImageClick,
}: ImageGalleryProps): JSX.Element => {
  return (
    <ul className={styles.galleryList}>
      {images.map((image, index) => (
        <li key={`${image.id}-${index}`} className={styles.galleryItem}>
          <ImageCard {...image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
