import styles from './TypingEffectMessage.module.css';
import TypingEffect from 'react-typing-effect';

const TypingEffectMessage = () => {
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
        displayTextRenderer={text => <h1 className={styles.h1}>{text}</h1>}
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
