import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function createGallery(images) {
  return images
    .map(
      image => `
      <li class="gallery-item">
        <div class="image-wrap">
          <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
        </div>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${image.likes}</p>
          <p class="info-item"><b>Views</b> ${image.views}</p>
          <p class="info-item"><b>Comments</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');
}

export function clearGallery(galleryEl) {
  galleryEl.innerHTML = '';
}

export function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
  return lightbox;
}

export function renderGallery(galleryEl, images) {
  const markup = createGallery(images);
  galleryEl.insertAdjacentHTML('beforeend', markup);
  if (!lightbox) {
    lightbox = initLightbox();
  } else {
    lightbox.refresh();
  }
}

export function updateGallery(galleryEl, images) {
  const markup = createGallery(images);
  galleryEl.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  }
}

export function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}
export function showLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load-page-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'block';
  }
}
export function hideLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load-page-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
}
