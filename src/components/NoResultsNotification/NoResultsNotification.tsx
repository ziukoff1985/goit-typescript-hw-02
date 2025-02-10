import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

// Інтерфейс пропсів для компонента ErrorNotification
interface ErrorNotificationProps {
  message?: string; // Опціональне повідомлення про помилку (за замовчуванням буде 'No results found...')
}

// Компонент ErrorNotification
// Відповідає за відображення повідомлення про помилку, якщо зображення за запитом не знайдено
// Приймає пропс:
// - message: потрібен на випадок, якщо потрібно (на майбутнє) відображати різні повідомлення
// - message може бути змінений для відображення різних повідомлень в майбутньому
const ErrorNotification = ({
  message,
}: ErrorNotificationProps): JSX.Element | null => {
  // Використовує useRef для збереження стану, чи вже було показано повідомлення
  // hasToastShown.current ініціалізується як false
  const hasToastShown = useRef<boolean>(false);

  // useEffect для показу повідомлення про помилку "No Results" лише один раз
  useEffect(() => {
    // Перевірка, чи тост уже показувався
    if (!hasToastShown.current) {
      // Відображення повідомлення про помилку "No Results"
      toast.error(
        message || 'No results found. Please try a different query. 🤷‍♂️'
      );
      // Змінюємо стан, щоб уникнути повторного відображення тоста
      hasToastShown.current = true;
    }
  }, [message]); // Залежності:
  // - Якщо масив залежностей порожній "[]", ефект виконується лише один раз після першого рендеру.
  // - Якщо масив містить значення, наприклад, "[message]", ефект буде виконуватися щоразу, коли зміниться це значення.

  return null; // Компонент не відображає жодних елементів у DOM
};

export default ErrorNotification;
