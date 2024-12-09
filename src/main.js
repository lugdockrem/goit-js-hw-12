import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryMarkup } from './js/render-functions.js';

iziToast.settings({
  position: 'topRight',
  timeout: 5000,
  progressBar: true,
});

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('#load-more-button');
const loadingIndicator = document.querySelector('#loading-indicator');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
const perPage = 15;
let currentQuery = '';
let totalHits = 0;

searchButton.addEventListener('click', onSearch);

searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onSearch();
  }
});

loadMoreButton.addEventListener('click', onLoadMore);

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

import { fetchImages } from './js/pixabay-api.js';
function renderGallery(images) {
  const markup = createGalleryMarkup(images);
  gallery.insertAdjacentHTML('beforeend', markup);
}

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
