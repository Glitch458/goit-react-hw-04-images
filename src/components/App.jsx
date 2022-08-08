import { Component } from 'react';
import ImageGallery from './ImageGallery';
import SearchBar from './Searchbar';
import Modal from './Modal';
import Button from './Button';
import { API } from 'services/galleryAPI';
import Loader from './Loader';

class App extends Component {
  state = {
    searchName: '',
    largeImg: { url: '', alt: '' },
    gallery: [],
    modalIsOpen: false,
    pageNumber: 1,
    status: 'idle',
    buttonIsShown: false,
    itemQuantity: 12,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, pageNumber, itemQuantity } = this.state;

    if (prevState.searchName !== searchName) {
      this.setState({ status: 'pending' });
      API(searchName, pageNumber, itemQuantity)
        .then(collection => {
          this.setState({ gallery: collection.hits, total: collection.total });
          // if (collection.total !== collection.totalHits) {
          //   this.setState({ buttonIsShown: true });
          // }
          // if (this.state.itemQuantity !== collection.hits.length) {
          //   this.setState({ buttonIsShown: false });
          // }
        })
        .finally(() => {
          this.setState({ status: 'resolve' });
        });
    }

    if (prevState.pageNumber !== pageNumber) {
      API(searchName, pageNumber).then(newGallery =>
        this.setState({ gallery: [...prevState.gallery, ...newGallery.hits] })
      );
    }
  }

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  handleClick = (url, alt) => {
    this.setState({
      largeImg: { url, alt },
      modalIsOpen: true,
    });
  };

  handleShowButton = value => {
    this.setState({ buttonIsShown: value });
  };

  closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.setState({ modalIsOpen: false });
    }
  };

  handleLoadMore = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  };

  // handleChangeStatus = (value) => {
  //   this.setState({status: value})
  // }

  render() {
    const { status, gallery, total, modalIsOpen, largeImg } = this.state;
    return (
      <div className="container">
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolve' && (
          <ImageGallery gallery={gallery} handleClick={this.handleClick} />
        )}
        {gallery.length > 0 && gallery.length <= total && (
          <Button loadMore={this.handleLoadMore} />
        )}
        {modalIsOpen && (
          <Modal
            url={largeImg.url}
            alt={largeImg.alt}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
