import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { fetchImages } from './services/api'; // Функція для запиту зображень з API (файл ./services/api.js)
import { Image, FetchImagesResponse } from './services/types'; // Інтерфейси типізації даних (файл ./services/types)

// *** Компоненти ***
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorNotification from './components/NoResultsNotification/NoResultsNotification';
import TypingEffectMessage from './components/TypingEffectMessage/TypingEffectMessage';
import './App.css';

// Головний компонент Арр
function App() {
  // --- Стани додатка ---
  const [query, setQuery] = useState<string>(''); // Стан для ключового запиту (що шукає користувач)
  const [images, setImages] = useState<Image[]>([]); // Стан для масиву зображень, отриманих з API
  const [isLoading, setIsLoading] = useState<boolean>(false); // Стан для лоадера
  const [isError, setIsError] = useState<boolean>(false); // Стан для відображення повідомлення про помилку
  const [page, setPage] = useState<number>(1); // Стан для номера поточної сторінки (пагінація)
  const [modalImage, setModalImage] = useState<string>(''); // Стан для URL зображення, яке відкривається у модальному вікні
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Стан для контролю відкриття/закриття модального вікна
  const [isNoResults, setIsNoResults] = useState<boolean>(false); // Стан для відображення повідомлення "нічого не знайдено"
  const [totalPages, setTotalPages] = useState<number>(0); // Стан для загальної кількості сторінок, отриманих з API
  const [typingMessage, setTypingMessage] = useState<boolean>(true); // Стан для анімованого тексту (з ефектом друку)
  const [totalResults, setTotalResults] = useState<number>(0); // Стан для ззагальної кількості знайдених зображень

  // useEffect для запиту зображень з API при зміні станів `query` або `page`
  useEffect(() => {
    // Асинхронна функція для запиту даних з API
    const fetchImagesData = async (): Promise<void> => {
      setIsLoading(true); // Відображаємо лоадер (стан → з false в true)
      setIsError(false); // Скидаємо помилку, якщо вона була
      setIsNoResults(false); // Скидаємо стан "немає результатів" в false
      setTotalPages(0); // Скидаємо кількість сторінок на початкове значення
      setTypingMessage(false); // Xоваємо анімований текст

      // Блок try...catch для відправки запиту
      try {
        // Отримуємо результати запиту (results), загальну к-ть сторінок (total_pages), загальну к-ть зображень (total)
        const { results, total_pages, total }: FetchImagesResponse =
          await fetchImages(query, page);

        // Якщо запит не дав результатів - повідомлення "нічого не знайдено"
        if (results.length === 0) {
          setIsNoResults(true); // Встановлюємо стан "немає результатів" в true
          setTypingMessage(true); // Показуємо анімований текст з повідомленням
        }

        // Додаємо нові результати до існуючих (під час пагінації) - через prev
        setImages(prevImages => [...prevImages, ...results]);
        setTotalPages(total_pages); // Оновлюємо загальну кількість сторінок
        setTotalResults(total); // Оновлюємо загальну кількість зображень

        // Якщо це остання сторінка - виводимо повідомлення (toast)
        if (page === total_pages) {
          toast.error('Oops, this is the last page 🤷‍♂️');
        }
        // Блок для обробки можливої помилки
      } catch (error: unknown) {
        setIsError(true); // Якщо помилка - змінюємо стан
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false); // у 'finally' - приховуємо лоадер
      }
    };
    // Виконуємо запит тільки якщо є пошуковий запит (query) НЕ ПОРОЖНІЙ!!!
    if (query) {
      // Тільки в цьому разу викликаємо функцію запиту на АРІ (fetchImagesData)
      fetchImagesData();
    }
  }, [query, page]); // Масив злежностей - useEffect слідкує за зміною станів "query" і "page"

  // Функція яка запускається при відправці ключового запиту (Submit форми в файлі SearchBar.jsx)
  const handleSearchSubmit = (newQuery: string): void => {
    if (newQuery.trim().toLowerCase() === query.trim().toLowerCase()) return;
    setQuery(newQuery); // Встановлюємо новий пошуковий запит (запит користувача)
    setImages([]); // Скидаємо стан зображень (очищаємо галерею)
    setPage(1); // Скидаємо значення поточної сторінки на "першу" (починаємо з першої)
    setTotalResults(0); // Скидаємо загальну кількість зображень
  };

  // Функція для завантаження (пагінації) додаткових сторінок (Load More)
  const handleLoadMore = (): void => {
    // Перевіряємо чи номер поточної сторінки менше загальної кількості сторінок в запиті
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1); // Оновлюємо стан поточної сторінки +1
    }
  };

  // Функція для відкриття модального вікна із зображенням
  const handleImageClick = (imageUrl: string): void => {
    setModalImage(imageUrl); // Встановлюємо URL обраного зображення
    setIsModalOpen(true); // Відкриваємо модальне вікно
  };

  return (
    <>
      {/* Форма пошуку для введення запиту */}
      <SearchBar onSubmit={handleSearchSubmit} totalResults={totalResults} />
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
