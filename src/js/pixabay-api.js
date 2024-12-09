import axios from 'axios';

export async function fetchImages(query, page, perPage) {
  const API_KEY = '47381991-217f0392cb987e93da3bacc78';
  const BASE_URL = 'https://pixabay.com/api/';
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await axios.get(url);
  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
}
