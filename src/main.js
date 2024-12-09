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
  progressBar: true,
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

// Параметри для пошуку
let currentPage = 1;
const perPage = 15;
let currentQuery = '';
let totalHits = 0;

// Обробник кнопки пошуку
searchButton.addEventListener('click', onSearch);

// Обробник для клавіші Enter
searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onSearch();
  }
});

// Обробник кнопки "Load more"
loadMoreButton.addEventListener('click', onLoadMore);

// Функція для пошуку
async function onSearch() {
  currentQuery = searchInput.value.trim();

  if (!currentQuery) {
    iziToast.error({
      title: 'Input Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  loadingIndicator.style.display = 'block';
  loadMoreButton.style.display = 'none';

  try {
    currentPage = 1;
    const response = await fetchImages(currentQuery, currentPage, perPage);
    totalHits = response.totalHits;

    if (response.hits.length === 0) {
      iziToast.error({
        title: 'No Results',
        message: 'Sorry, no images match your query. Please try again!',
      });
      gallery.innerHTML = '';
    } else {
      gallery.innerHTML = '';
      renderGallery(response.hits);
      lightbox.refresh();
      loadMoreButton.style.display = totalHits > perPage ? 'block' : 'none';

      // Якщо відразу після першого запиту всі результати відображені
      if (currentPage * perPage >= totalHits) {
        iziToast.info({
          title: 'End of Results',
          message: "We're sorry, but you've reached the end of search results.",
        });
        loadMoreButton.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loadingIndicator.style.display = 'none';
    searchInput.value = '';
  }
}

// Функція для завантаження більше зображень
async function onLoadMore() {
  if (!currentQuery) return;

  loadingIndicator.style.display = 'block';

  try {
    currentPage += 1;
    const response = await fetchImages(currentQuery, currentPage, perPage);

    if (response.hits.length === 0 || currentPage * perPage >= totalHits) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreButton.style.display = 'none';
    } else {
      renderGallery(response.hits);
      lightbox.refresh();
      smoothScroll();

      // Якщо завантаження останньої сторінки
      if (currentPage * perPage >= totalHits) {
        iziToast.info({
          title: 'End of Results',
          message: "We're sorry, but you've reached the end of search results.",
        });
        loadMoreButton.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

import { fetchImages } from './js/pixabay-api.js'; // Імпортуємо функцію, що відповідає за отримання зображень з API
// // Функція отримання даних з API
// async function fetchImages(query, page, perPage) {
//   const API_KEY = '47381991-217f0392cb987e93da3bacc78';
//   const BASE_URL = 'https://pixabay.com/api/';
//   const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
//     query
//   )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

//   const response = await axios.get(url);
//   return {
//     hits: response.data.hits,
//     totalHits: response.data.totalHits,
//   };
// }

// Функція для рендерингу галереї
function renderGallery(images) {
  const markup = createGalleryMarkup(images);
  gallery.insertAdjacentHTML('beforeend', markup);
}

// Функція плавної прокрутки
function smoothScroll() {
  const galleryCards = document.querySelectorAll('.gallery .photo-card');
  if (galleryCards.length > 0) {
    const { height: cardHeight } = galleryCards[0].getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
