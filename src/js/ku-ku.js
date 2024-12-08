// Функція обробки "Завантажити ще"
async function onLoadMore() {
  if (!currentQuery) {
    iziToast.error({
      title: 'Input Error',
      message: 'Please enter a search query.',
      backgroundColor: '#FF4E4E',
    });
    return;
  }

  // Показуємо індикатор завантаження
  loadingIndicator.style.display = 'block';

  try {
    currentPage += 1;
    const response = await fetchImages(currentQuery, currentPage, perPage);
    const images = response.hits;

    if (images.length === 0) {
      iziToast.error({
        title: 'No More Results',
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#FF4E4E',
      });
      loadMoreButton.style.display = 'none'; // Приховуємо кнопку "Завантажити ще"
    } else {
      renderGallery(images); // Рендеринг галереї
      lightbox.refresh(); // Оновлення SimpleLightbox після додавання нових зображень
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
    });
    console.error('Error fetching images:', error);
  } finally {
    loadingIndicator.style.display = 'none'; // Приховуємо індикатор після завершення
  }
}
=========================================================

