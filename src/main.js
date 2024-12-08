import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryMarkup } from './js/render-functions.js';

// Налаштування iziToast
iziToast.settings({
  position: 'topRight',
  timeout: 5000,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  progressBar: true,
  customClass: { toast: 'toast-top-right' },
});

// Елементи інтерфейсу
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('#load-more-button');
const loadingIndicator = document.querySelector('#loading-indicator');

// Ініціалізація SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Події
searchButton.addEventListener('click', onSearch);
searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onSearch();
  }
});
loadMoreButton.addEventListener('click', onLoadMore);

// Параметри пагінації
let currentPage = 1;
const perPage = 15;
let currentQuery = '';
let totalHits = 0;

// Функція обробки пошуку
async function onSearch() {
  currentQuery = searchInput.value.trim();

  if (!currentQuery) {
    iziToast.error({
      title: 'Input Error',
      message: 'Please enter a search query.',
      backgroundColor: '#FF4E4E',
    });
    return;
  }

  loadingIndicator.style.display = 'block';
  loadMoreButton.style.display = 'none';

  try {
    currentPage = 1;
    const response = await fetchImages(currentQuery, currentPage, perPage);
    totalHits = response.totalHits;
    const images = response.hits;

    if (images.length === 0) {
      iziToast.error({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#FF4E4E',
      });
    } else {
      gallery.innerHTML = '';
      renderGallery(images);
      lightbox.refresh();

      // Показуємо кнопку "Load more", якщо є ще сторінки
      if (perPage < totalHits) {
        loadMoreButton.style.display = 'block';
      } else {
        // Якщо результатів менше за 1 сторінку, одразу показуємо повідомлення
        iziToast.info({
          title: 'No More Results',
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#007bff',
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
    });
    console.error('Error fetching images:', error);
  } finally {
    loadingIndicator.style.display = 'none';
    searchInput.value = '';
  }
}

// Функція обробки "Load More"
async function onLoadMore() {
  if (!currentQuery) {
    iziToast.error({
      title: 'Input Error',
      message: 'Please enter a search query.',
      backgroundColor: '#FF4E4E',
    });
    return;
  }

  loadingIndicator.style.display = 'block';

  try {
    currentPage += 1;
    const response = await fetchImages(currentQuery, currentPage, perPage);
    const images = response.hits;

    renderGallery(images);
    lightbox.refresh();

    // Якщо досягли останньої сторінки, показуємо повідомлення
    if (currentPage * perPage >= totalHits) {
      iziToast.info({
        title: 'No More Results',
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#007bff',
      });
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      backgroundColor: '#dc3545',
    });
    console.error('Error fetching images:', error);
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

// Функція отримання зображень з API Pixabay
async function fetchImages(query, page, perPage) {
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

// Функція рендеринга галереї
function renderGallery(images) {
  const markup = createGalleryMarkup(images);
  gallery.insertAdjacentHTML('beforeend', markup);
}
