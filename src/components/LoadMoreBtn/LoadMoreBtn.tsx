import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps): JSX.Element => {
  return (
    <div className={styles.buttonWrap}>
      <button
        onClick={onClick}
        className={styles.button}
        aria-label="Load more items"
      >
        <span>Load More</span>
      </button>
    </div>
  );
};

export default LoadMoreBtn;
