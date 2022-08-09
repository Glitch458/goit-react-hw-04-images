import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import SearchBar from './Searchbar';
import Modal from './Modal';
import Button from './Button';
import { API } from 'services/galleryAPI';
import Loader from './Loader';

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [largeImg, setLargeImg] = useState({ url: '', alt: '' });
  const [total, setTotal] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    setLoaderStatus(true);
    API(searchName, pageNumber)
      .then(collection => {
        setGallery(gallery => [...gallery, ...collection.hits]);
        setTotal(collection.total);
      })
      .finally(() => {
        setStatus(true);
        setLoaderStatus(false);
      });
  }, [searchName, pageNumber]);

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
  };

  const handleClick = (url, alt) => {
    setLargeImg({ url, alt });
    setModalIsOpen(true);
  };

  const closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setModalIsOpen(false);
    }
  };

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleFormSubmit} />
      {status && <ImageGallery gallery={gallery} handleClick={handleClick} />}
      {loaderStatus && <Loader />}
      {gallery.length > 0 && gallery.length <= total && (
        <Button loadMore={handleLoadMore} />
      )}
      {modalIsOpen && (
        <Modal url={largeImg.url} alt={largeImg.alt} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
