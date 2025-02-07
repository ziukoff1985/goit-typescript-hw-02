import { useState } from 'react'; // Xук useState
import styles from './SearchBar.module.css'; // Стилі
import toast from 'react-hot-toast'; // Бібліотека для відображення повідомлень

// Компонент SearchBar - форма пошуку
// Приймає пропс: onSubmit (в компоненті Арр використовується в функції handleSearchSubmit)
const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState(''); // Стан для зберігання значення пошукового запиту

  // Функція для обробки зміни значення в полі вводу
  const handleInputChange = event => {
    setQuery(event.target.value); // Оновлюємо значення запиту при кожній зміні в полі вводу
  };

  // Функція для обробки відправки форми
  const handleFormSubmit = event => {
    event.preventDefault(); // Забороняємо перезавантаженню сторінки при відправці форми

    // Якщо поле вводу порожнє (пошуковий запит не введено)
    if (query.trim() === '') {
      // Виводимо повідомлення про помилку через react-hot-toast
      toast.error('Please enter a search query!');
      return; // Завершуємо функцію, не відправляючи запит
    }

    onSubmit(query); // Викликаємо функцію onSubmit, передану як пропс, і передаємо запит
    setQuery(''); // Очищаємо поле вводу після відправки запиту
  };

  return (
    <header className={styles.header}>
      {/* Контейнер для пошукової форми */}
      <form onSubmit={handleFormSubmit} className={styles.form}>
        {/* Форма з обробником submit */}
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
            fill="currentColor" // // Колір іконки відповідно до кольору тексту
            viewBox="0 0 16 16"
            className={styles.icon}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
          </svg>
          {/* Текст на кнопці */}
          <span>Search</span>
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
