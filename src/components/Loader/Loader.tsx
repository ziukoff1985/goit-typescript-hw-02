import { DNA } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrap}>
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
