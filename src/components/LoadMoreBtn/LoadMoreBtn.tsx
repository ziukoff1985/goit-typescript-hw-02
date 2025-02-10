import styles from './LoadMoreBtn.module.css';

// Інтерфейс пропсів для компонента ImageModal
interface LoadMoreBtnProps {
  onClick: () => void; // Функція - викликається при натисканні кнопки (пагінація)
}

// Компонент LoadMoreBtn
// Відповідає за відображення кнопки "Load More" для завантаження додаткових даних
// Приймає пропс:
// - onClick: функція-обробник, яка викликається при натисканні кнопки
// При кліку викликається ф-я handleLoadMore в компоненті App:
// - handleLoadMore перевіряє, чи поточна сторінка менша за загальну кількість сторінок
// - Якщо умова виконується, стан сторінки оновлюється: setPage(prevPage => prevPage + 1)
const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps): JSX.Element => {
  return (
    // Контейнер для кнопки
    <div className={styles.buttonWrap}>
      {/* Кнопка, яка викликає функцію onClick при кліку */}
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

// Умовний рендер у компоненті App:
// Перевіряє, чи є зображення у списку та чи ще залишилися сторінки для завантаження
// Якщо так – рендерить кнопку LoadMoreBtn
// {images.length > 0 && page < totalPages && (
//   <LoadMoreBtn onClick={handleLoadMore} />
// )}
