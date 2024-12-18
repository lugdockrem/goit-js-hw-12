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

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = createGalleryMarkup(images);
  gallery.insertAdjacentHTML('beforeend', markup);
}
