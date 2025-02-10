// *** Інтерфейси для типізації ***

// 📌 Інтерфейс URL визначає структуру об'єкта, який містить посилання на зображення у різних розмірах
export interface URL {
  small: string; // 🔹 Посилання на маленьку версію зображення
  regular: string; // 🔹 Посилання на стандартну версію зображення
}

// 📌 Інтерфейс Image описує структуру об'єкта зображення, отриманого від API Unsplash
export interface Image {
  id: string; // 🆔 Унікальний ідентифікатор зображення
  urls: URL; // 🔗 Об'єкт із посиланнями на різні розміри зображення
  alt_description?: string; // 🖼️ Альтернативний текст (може бути відсутній)
  likes: number; // ❤️ Кількість лайків для зображення
  description?: string; // 📝 Опис зображення (може бути відсутній)
}

// 📌 Інтерфейс FetchImagesResponse описує структуру відповіді від API при пошуку зображень
export interface FetchImagesResponse {
  results: Image[]; // 📸 Масив об'єктів зображень
  total_pages: number; // 📄 Загальна кількість сторінок результатів
  total: number; // 🔢 Загальна кількість знайдених зображень
}
