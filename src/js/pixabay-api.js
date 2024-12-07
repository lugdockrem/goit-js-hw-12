const API_KEY = '47381991-217f0392cb987e93da3bacc78';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Отримуємо зображення з API Pixabay за пошуковим запитом.
 * @param {string} query - Пошуковий запит.
 * @returns {Promise<Array>} - Масив зображень.
 */
export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return data.hits; // Масив зображень у відповіді
}
