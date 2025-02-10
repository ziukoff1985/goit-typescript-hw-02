// 📌 Імпортуємо React для створення компонентів
import React from 'react';
// 📌 Імпортуємо ReactDOM для рендерингу React-компонентів у DOM
import ReactDOM from 'react-dom/client';

// 📌 Імпортуємо `modern-normalize` — CSS-бібліотеку, яка нормалізує стилі у різних браузерах
import 'modern-normalize';
// 📌 Імпортуємо глобальні стилі для застосунку
import './index.css';

// 📌 Імпортуємо головний компонент застосунку
import App from './App';

// 📌 Рендеримо React-застосунок у кореневий елемент з id="root"
// Використовуємо `ReactDOM.createRoot` для підтримки нового підходу до рендерингу у React 18+
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 📌 React.StrictMode активує додаткові перевірки у режимі розробки
  <React.StrictMode>
    <App /> {/* 📌 Головний компонент застосунку */}
  </React.StrictMode>
);
