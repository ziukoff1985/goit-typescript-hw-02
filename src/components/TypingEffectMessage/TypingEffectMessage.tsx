import styles from './TypingEffectMessage.module.css';
import TypingEffect from 'react-typing-effect';

const TypingEffectMessage: React.FC = () => {
  return (
    <div className={styles.typingTextWrap}>
      <TypingEffect
        text={[
          'Find the Perfect Image in a Snap...',
          'Discover. Explore. Inspire.',
          'Endless Possibilities, One Click Away!',
        ]}
        cursor="|"
        speed={100}
        eraseSpeed={100}
        typingDelay={10}
        className={styles.typingEffect}
      />
    </div>
  );
};

export default TypingEffectMessage;
