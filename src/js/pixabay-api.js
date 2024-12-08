import axios from 'axios';

const API_KEY = '47381991-217f0392cb987e93da3bacc78';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Отримуємо зображення з API Pixabay за пошуковим запитом.
 * @param {string} query - Пошуковий запит.
 * @param {number} page - Номер сторінки.
 * @param {number} perPage - Кількість зображень на сторінку.
 * @returns {Promise<Object>} - Об'єкт з масивом зображень і загальною кількістю зображень.
 */
export async function fetchImages(query, page, perPage) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await axios.get(url);
  return {
    hits: response.data.hits, // Масив зображень у відповіді
    totalHits: response.data.totalHits, // Загальна кількість зображень, які відповідають пошуковому запиту
  };
}
