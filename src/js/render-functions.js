// Функція створення розмітки для галереї
export function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <a class="gallery__item" href="${largeImageURL}">
          <div class="photo-card">
            <img class="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
          </div>
        </a>
      `
    )
    .join('');
}

// Функція для очищення галереї перед новим запитом
export function clearGallery(container) {
  container.innerHTML = '';
}

// Функція для рендеринга галереї на сторінці
export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  clearGallery(gallery); // Очищаємо галерею перед рендерингом нових елементів
  const markup = createGalleryMarkup(images); // Створюємо нову розмітку
  gallery.insertAdjacentHTML('beforeend', markup); // Додаємо розмітку в галерею
}
