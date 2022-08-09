const API_KEY = '24098743-7553027393eef521f019e0de7';

export const API = (searchName, pageNumber) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchName}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
};
