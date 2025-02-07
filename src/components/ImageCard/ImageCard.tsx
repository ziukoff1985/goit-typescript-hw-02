import styles from './ImageCard.module.css';
import { URL } from '../../services/types';

// interface URL {
//   small: string;
//   regular: string;
// }

interface ImageCardProps {
  urls: URL;
  alt_description?: string;
  likes: number;
  description?: string;
  onImageClick: (regular: string) => void;
}

const ImageCard = ({
  urls,
  alt_description,
  likes,
  description,
  onImageClick,
}: ImageCardProps): JSX.Element => {
  const { small, regular } = urls;

  const handleClick = () => onImageClick(regular);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          onClick={handleClick}
          className={styles.image}
          src={small}
          alt={alt_description}
        />
      </div>
      <p className={styles.imageDescription}>
        <span className={styles.descriptionText}>
          {description || 'No description available'}
        </span>
        <span className={styles.likesText}>Likes: {likes}</span>
      </p>
    </div>
  );
};

export default ImageCard;
