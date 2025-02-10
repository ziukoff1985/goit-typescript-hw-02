import styles from './TypingEffectMessage.module.css';

// Імпортуємо компонент TypingEffect з бібліотеки react-typing-effect
import TypingEffect from 'react-typing-effect';

// Компонент анімованого тексту TypingEffectMessage
const TypingEffectMessage: React.FC = () => {
  return (
    // Контейнер для анімованого тексту
    <div className={styles.typingTextWrap}>
      {/* Компонент TypingEffect для створення ефекту друкування */}
      <TypingEffect
        // Текст для друкування
        text={[
          'Find the Perfect Image in a Snap...',
          'Discover. Explore. Inspire.',
          'Endless Possibilities, One Click Away!',
        ]}
        cursor="|" // Знак курсора
        speed={100} // Швидкість друкування (в мс)
        eraseSpeed={100} // Швидкість стирання (в мс)
        typingDelay={10} // Затримка перед друкуванням
        className={styles.typingEffect}
      />
    </div>
  );
};

export default TypingEffectMessage;
