import './App.css';
import toast, { Toaster } from 'react-hot-toast'; // Бібліотека для відображення повідомлень
import { useEffect, useState } from 'react'; // React-хуки для керування станом і побічними ефектами
import { fetchImages } from './services/api'; // Функція для запиту зображень з API (файл ./services/api.js)
import Loader from './components/Loader/Loader'; // Компонент індикатора завантаження
import ImageGallery from './components/ImageGallery/ImageGallery'; // Компонент для галереї зображень
import SearchBar from './components/SearchBar/SearchBar'; // Компонент форми пошуку
import ErrorMessage from './components/ErrorMessage/ErrorMessage'; // Компонент для відображення помилок
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'; // Кнопка для завантаження додаткових сторінок
import ImageModal from './components/ImageModal/ImageModal'; // Модальне вікно для перегляду зображень
import ErrorNotification from './components/NoResultsNotification/NoResultsNotification'; // Повідомлення "нічого не знайдено"
import TypingEffectMessage from './components/TypingEffectMessage/TypingEffectMessage'; // Компонент для анімованого (друкованого тексту)

// Головний компонент Арр
function App() {
  // --- Стани додатка ---
  const [query, setQuery] = useState(''); // Стан для ключового запиту (що шукає користувач)
  const [images, setImages] = useState([]); // Стан для масиву зображень, отриманих з API
  const [isLoading, setIsLoading] = useState(false); // Стан для індикатора завантаження (лоадера)
  const [isError, setIsError] = useState(false); // Стан для відображення повідомлення про помилку
  const [page, setPage] = useState(1); // Стан для номера поточної сторінки (пагінація)
  const [modalImage, setModalImage] = useState(''); // Стан для URL зображення, яке відкривається у модальному вікні
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для контролю відкриття/закриття модального вікна
  const [isNoResults, setIsNoResults] = useState(false); // Стан для відображення повідомлення "нічого не знайдено"
  const [totalPages, setTotalPages] = useState(0); // Стан для загальної кількості сторінок, отриманих з API
  const [typingMessage, setTypingMessage] = useState(true); // Стан для анімованого тексту (з ефектом друку)

  // useEffect для запиту зображень з API при зміні станів `query` або `page`
  useEffect(() => {
    // Асинхронна функція для запиту даних з API
    const fetchImagesData = async () => {
      setIsLoading(true); // Відображаємо лоадер (стан → з false в true)
      setIsError(false); // Скидаємо помилку, якщо вона була
      setIsNoResults(false); // Скидаємо стан "немає результатів" в false
      setTotalPages(0); // Скидаємо кількість сторінок на початкове значення
      setTypingMessage(false); // Xоваємо анімований текст

      // Блок try...catch для відправки запиту
      try {
        // Отримуємо результати запиту та загальну кількість сторінок
        const { results, total_pages } = await fetchImages(query, page);
        // Якщо запит не дав результатів, активуємо повідомлення "нічого не знайдено"
        if (results.length === 0) {
          setIsNoResults(true); // Встановлюємо стан "немає результатів" в true
          setTypingMessage(true); // Показуємо анімований текст з повідомленням
        }
        // Додаємо нові результати до існуючих (під час пагінації) - через prev
        setImages(prevImages => [...prevImages, ...results]);
        setTotalPages(total_pages); // Оновлюємо загальну кількість сторінок

        // Якщо досягнуто останньої сторінки, виводимо повідомлення (бібіліотека react-hot-toast)
        if (page === total_pages) {
          toast.error('Oops, this is the last page 🤷‍♂️');
        }
      } catch (error) {
        // Блок для обробки можливої помилки
        setIsError(true); // Якщо сталася помилка, активуємо відповідний стан
        console.log(error);
      } finally {
        // Блок finally
        setIsLoading(false); // Приховуємо лоадер
      }
    };
    // Виконуємо запит тільки якщо є пошуковий запит (query) НЕ ПОРОЖНІЙ!!!
    if (query) {
      fetchImagesData(); // Тільки в цьому разу викликаємо функцію запиту на АРІ (fetchImagesData)
    }
  }, [query, page]); // Масив злежностей - useEffect слідкує за зміною станів "query" і "page"

  // Функція яка запускається при відправці ключового запиту (Submit форми в файлі SearchBar.jsx)
  const handleSearchSubmit = newQuery => {
    setQuery(newQuery); // Встановлюємо новий пошуковий запит (запит користувача)
    setImages([]); // Скидаємо стан зображень (очищаємо галерею)
    setPage(1); // Скидаємо значення поточної сторінки на "першу" (починаємо з першої)
  };

  // Функція для завантаження (пагінації) додаткових сторінок (Load More)
  const handleLoadMore = () => {
    // Перевіряємо чи номер поточної сторінки менше загальної кількості сторінок в запиті
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1); // Оновлюємо стан поточної сторінки +1
    }
  };

  // Функція для відкриття модального вікна із зображенням
  const handleImageClick = imageUrl => {
    setModalImage(imageUrl); // Встановлюємо URL обраного зображення
    setIsModalOpen(true); // Відкриваємо модальне вікно
  };

  return (
    <>
      {/* Форма пошуку для введення запиту */}
      <SearchBar onSubmit={handleSearchSubmit} />
      {/* Компонент для відображення повідомлень (react-hot-toast) */}
      <Toaster position="top-right" reverseOrder={false} />
      {/* Анімований текст (на головній сторінці) */}
      {typingMessage && <TypingEffectMessage />}
      {/* Галерея зображень */}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {/* Індикатор завантаження (лоадер) */}
      {isLoading && <Loader />}
      {/* Повідомлення про помилку */}
      {isError && <ErrorMessage />}
      {/* Повідомлення про відсутність результатів */}
      {isNoResults && <ErrorNotification />}
      {/* Кнопка для завантаження додаткових зображень (Load More) */}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {/* Модальне вікно для перегляду зображення */}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        image={modalImage}
      />
    </>
  );
}

export default App;
