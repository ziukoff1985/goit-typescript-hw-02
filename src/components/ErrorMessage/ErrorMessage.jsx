import { useEffect, useRef } from 'react'; // React-хуки для керування
import toast from 'react-hot-toast'; // Бібліотека для відображення повідомлень

// Компонент ErrorMessage
// Відображає повідомлення про помилку за допомогою бібліотеки react-hot-toast
const ErrorMessage = () => {
  // Використовуємо useRef для збереження стану, чи вже було показане повідомлення (toast)
  const hasToastShown = useRef(false); // Ініціалізуємо значення false, бо повідомлення ще не показувалось

  // Використовуємо хук useEffect для виконання ефекту - відображення повідомлення з помилкою
  useEffect(() => {
    // Перевіряємо, чи повідомлення вже було показано
    if (!hasToastShown.current) {
      // Якщо повідомлення ще не показано, викликаємо toast з текстом помилки
      toast.error('Something went wrong 🤦‍♂️, try again...');
      // Встановлюємо прапорець у true, щоб повідомлення більше не показувалось
      hasToastShown.current = true; // Встановлюємо прапорець
    }
  }, []); // Порожній масив залежностей означає, що ефект виконується тільки після першого рендеру

  return null; // Компонент не рендерить жодного HTML-елемента
};

export default ErrorMessage;
