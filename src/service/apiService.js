import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35953983-a066171bf8548120346cceae4';

axios.defaults.params = {
  orientation: 'horizontal',
  image_type: 'photo',
  page: 1,
  per_page: 12,
};

export const apiService = async (query, page, pagination) => {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pagination}`
  );

  return response.data.hits;
};
