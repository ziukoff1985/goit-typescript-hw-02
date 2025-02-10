import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

// Інтерфейсу пропсів для компонента SearchBar
interface SearchBarProps {
  onSubmit: (newQuery: string) => void; // Функція-обробник пошукового запиту
  totalResults: number; // Загальна кількість знайдених результатів
}

// Компонент SearchBar - форма пошуку
// Приймає пропси:
// onSubmit (в компоненті Арр використовується в функції handleSearchSubmit)
// totalResults - загальна к-ть зображень за запитом
const SearchBar = ({ onSubmit, totalResults }: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState<string>(''); // Стан для зберігання значення пошукового запиту

  // Функція для обробки зміни значення в полі вводу
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value); // Оновлюємо значення запиту при кожній зміні в полі вводу
  };

  // Функція для обробки відправки форми
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Якщо поле вводу порожнє (пошуковий запит не введено)
    if (query.trim() === '') {
      // Виводимо повідомлення про помилку через react-hot-toast
      toast.error('Please enter a search query!');
      return;
    }

    onSubmit(query); // Викликаємо функцію onSubmit, передану як пропс, і передаємо запит
    setQuery(''); // Очищаємо поле вводу після відправки запиту
  };

  return (
    // Контейнер для пошукової форми
    <header className={styles.header}>
      {/* Форма з обробником submit */}
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <input
          onChange={handleInputChange} // Обробник для зміни значення у полі вводу
          value={query} // Прив'язуємо значення запиту до стану
          type="text"
          autoComplete="off" // Вимикаємо автозаповнення браузера
          autoFocus // Фокус при завантаженні сторінки
          placeholder="Search images and photos"
          className={styles.input}
        />
        {/* Кнопка для відправки форми */}
        <button type="submit" className={styles.button}>
          {/* Іконка для кнопки пошуку */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={styles.icon}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
          </svg>
          {/* Текст на кнопці */}
          <span>Search</span>
        </button>
      </form>
      {/* Відображаємо загальну кількість знайдених результатів, якщо вона більше 0 */}
      {totalResults > 0 && (
        <p className={styles.resultsText}>
          Total results found: {totalResults}
        </p>
      )}
    </header>
  );
};

export default SearchBar;
