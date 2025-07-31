import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios
    .get('/', {
      params: {
        key: '51491215-b07c5a52c3d96c7bcc8c26318',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
