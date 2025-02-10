import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

// Компонент ErrorMessage
// Відображає повідомлення про помилку за допомогою бібліотеки react-hot-toast
const ErrorMessage: React.FC = () => {
  // useRef для збереження стану, чи вже було показане повідомлення (toast)
  // Ініціалізуємо значення false, бо повідомлення ще не показувалось
  const hasToastShown = useRef<boolean>(false);

  // 'useEffect' для виконання ефекту - відображення повідомлення з помилкою
  // Перевіряємо, чи повідомлення вже було показано
  // Якщо повідомлення ще не показано, викликаємо toast з текстом помилки
  // Встановлюємо прапорець у true, щоб повідомлення більше не показувалось
  useEffect(() => {
    if (!hasToastShown.current) {
      toast.error('Something went wrong 🤦‍♂️, try again...');
      hasToastShown.current = true; // Встановлюємо прапорець
    }
  }, []); // Порожній масив залежностей означає, що ефект виконується тільки після першого рендеру

  return null; // Компонент не рендерить жодного HTML-елемента
};

export default ErrorMessage;
