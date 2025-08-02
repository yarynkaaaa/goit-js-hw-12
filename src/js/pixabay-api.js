import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get('/', {
      params: {
        key: '51491215-b07c5a52c3d96c7bcc8c26318',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    {
      console.error('Error fetching images:', error);
      throw error;
    }
  }
}
