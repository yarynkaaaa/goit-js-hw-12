import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  renderGallery,
} from './js/render-functions';

const form = document.querySelector('.form');
const inputValue = form.querySelector('input[name="search-text"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-page-btn');
let currentValue = '';
let currentPage = 1;
const perPage = 15;
function showLoadMore() {
  loadMoreBtn.style.display = 'block';
}
function hideLoadMore() {
  loadMoreBtn.style.display = 'none';
}
form.addEventListener('submit', async evt => {
  evt.preventDefault();
  const searchValue = inputValue.value.trim();
  if (searchValue === '') {
    iziToast.warning({
      title: '',
      message: 'Please enter something in the search field',
      position: 'topRight',
      backgroundColor: '#ffa000',
      color: 'white',
      progressBarColor: '#bb7b10',
      timeout: 3000,
    });
    return;
  }
  currentValue = searchValue;
  currentPage = 1;
  inputValue.value = '';
  clearGallery(gallery);
  showLoader();
  hideLoadMore();
  try {
    const data = await getImagesByQuery(currentValue, currentPage, perPage);
    const images = data.hits;
    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: 'white',
        progressBarColor: '#b51b1b',
        timeout: 3000,
      });
    } else {
      renderGallery(gallery, images);
      if (images.length === perPage) {
        showLoadMore();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'Сталася помилка при завантаженні зображень. Будь ласка, спробуйте пізніше.',
      position: 'topRight',
      backgroundColor: '#ef4040;',
      color: 'white',
      progressBarColor: '#b51b1b;',
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
});
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadMore();

  try {
    const data = await getImagesByQuery(currentValue, currentPage, perPage);
    const images = data.hits;
    renderGallery(gallery, images, false);

    if (images.length === perPage) {
      showLoadMore();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: 'white',
      progressBarColor: '#b51b1b',
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
});
