import styles from './TypingEffectMessage.module.css';
import TypingEffect from 'react-typing-effect'; // Імпортуємо компонент TypingEffect з бібліотеки react-typing-effect

// Створюємо функціональний компонент TypingEffectMessage
const TypingEffectMessage = () => {
  return (
    // Обгортаємо компонент у div
    <div className={styles.typingTextWrap}>
      <TypingEffect
        // Масив текстових рядків, які будуть поступово друкуватися
        text={[
          'Find the Perfect Image in a Snap...',
          'Discover. Explore. Inspire.',
          'Endless Possibilities, One Click Away!',
        ]} // Текст для друкування
        cursor="|" // Знак курсора
        speed={100} // Швидкість друкування (в мс)
        eraseSpeed={100} // Швидкість стирання (в мс), якщо потрібно
        typingDelay={0} // Затримка перед друкуванням
        className={styles.typingEffect}
        // Функція для кастомного рендерингу тексту
        displayTextRenderer={text => (
          // Заголовок h1 для виведення тексту
          <h1 className={styles.h1}>
            {/* Розбиваємо текст на окремі символи і рендеримо кожен символ */}
            {text.split('').map((char, index) => (
              <span
                key={index} // Унікальний ключ для кожного символу
                // Задаємо стиль для кожного символу
                // Якщо індекс парний - один колір, непарний - інший
                style={
                  index % 2 === 0 ? { color: 'yellow' } : { color: 'yellow' }
                }
              >
                {/* Виводимо символ */}
                {char}
              </span>
            ))}
          </h1>
        )}
      />
    </div>
  );
};

export default TypingEffectMessage;

// Версія коду без потреби змінювати колір символів залежно від їхнього індексу

// export default TypingEffectMessage;
// const TypingEffectMessage = () => {
//   return (
//     <div className={styles.typingTextWrap}>
//       <TypingEffect
//         text={[
//           'Find the Perfect Image in a Snap...',
//           'Discover. Explore. Inspire.',
//           'Endless Possibilities, One Click Away!',
//         ]}
//         cursor="|"
//         speed={100}
//         eraseSpeed={100}
//         typingDelay={0}
//         className={styles.typingEffect}
//         displayTextRenderer={text => (
//           <h1 className={styles.h1}>{text}</h1>
//         )}
//       />
//     </div>
//   );
// };
