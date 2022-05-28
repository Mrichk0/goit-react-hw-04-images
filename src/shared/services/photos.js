import axios from 'axios';

export const PER_PAGE = 12;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '27139815-fb619e7492dcf89fe4b1aaf4f',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
  },
});

export const searchPhotos = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });

  return data;
};
