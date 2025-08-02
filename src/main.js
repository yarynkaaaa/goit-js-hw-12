import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  renderGallery,
  hideLoadMoreBtn,
  showLoadMoreBtn,
} from './js/render-functions';

const form = document.querySelector('.form');
const inputValue = form.querySelector('input[name="search-text"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-page-btn');
let currentValue = '';
let currentPage = 1;
const perPage = 15;
let allImages = 0;

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
  hideLoadMoreBtn();
  showLoader();
  try {
    const data = await getImagesByQuery(currentValue, currentPage, perPage);
    const images = data.hits;
    allImages = data.totalHits;
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
      if (data.totalHits > perPage) {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'Сталася помилка при завантаженні зображень. Будь ласка, спробуйте пізніше.',
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
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadMoreBtn();

  try {
    const data = await getImagesByQuery(currentValue, currentPage, perPage);
    const images = data.hits;
    renderGallery(gallery, images, false);

    const firstCard = gallery.firstElementChild;
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2.1,
        behavior: 'smooth',
      });
    }
    const loadedImagesCount = currentPage * perPage;
    if (loadedImagesCount >= allImages) {
      hideLoadMoreBtn();
      iziToast.warning({
        message: 'You have reached the end of the gallery for this query.',
        position: 'topRight',
        backgroundColor: '#ffa000',
        color: 'white',
        progressBarColor: '#bb7b10',
        timeout: 3000,
      });
    } else {
      showLoadMoreBtn();
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
