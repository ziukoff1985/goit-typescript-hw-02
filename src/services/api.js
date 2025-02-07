import axios from 'axios'; // Імпорт бібліотеки axios для HTTP запитів

// Оголошуємо базову URL-адресу для запиту до API Unsplash
const BASE_URL = 'https://api.unsplash.com/search/photos';

// Оголошуємо ключ API, який буде використовуватися для аутентифікації запиту
// Це особистий ключ доступу до API Unsplash
const API_KEY = 'WEdozSbeL3sXHgKKf2QSFIABrvu5qfELDXJLSJNUh8Q';

// Створюємо асинхронну функцію для отримання зображень з API Unsplash
// Приймає три параметри:
// - query: рядок пошукового запиту, який ввів користувач
// - page: номер сторінки для пагінації
// - perPage: кількість зображень на одну сторінку, за замовчуванням 12
export const fetchImages = async (query, page, perPage = 12) => {
  // Виконуємо GET-запит до API Unsplash
  const response = await axios.get(BASE_URL, {
    // Параметри запиту: пошуковий запит, номер сторінки, кількість зображень на сторінці
    params: { query, page, per_page: perPage },
    // Заголовки для авторизації через API-ключ
    headers: {
      // API-ключ для авторизації запиту
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  console.log(response);

  // Повертаємо дані, отримані від API
  return response.data;
};
