import { DNA } from 'react-loader-spinner'; // Імпорт компонента з бібліотеки react-loader-spinner
import styles from './Loader.module.css'; // Імпорт стилів

// Компонент Loader
// Відповідає за відображення анімації завантаження під час очікування даних
const Loader = () => {
  return (
    // Контейнер для анімації завантаження
    <div className={styles.loaderWrap}>
      {/* Компонент DNA з бібліотеки react-loader-spinner */}
      <DNA
        visible={true} // Відображати анімацію (true - завжди видно)
        height="80" // Висота анімації в пікселях
        width="80" // Ширина анімації в пікселях
        ariaLabel="dna-loading" // Атрибут aria-label
        wrapperStyle={{}} // Додаткові стилі (залишено порожнім)
        wrapperClass="dna-wrapper" // Додатковий клас для контейнера анімації
      />
    </div>
  );
};

export default Loader;
