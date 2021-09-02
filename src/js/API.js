import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

const KEY_API = '23134758-68ab0efee1477745fc8aff6a6';

export async function getPictures(query, page) {
  const {
    data: { hits },
  } = await axios.get(`&q=${query}&page=${page}&per_page=12&key=${API_KEY}`);

  return hits;
}
export default { getPicture };
