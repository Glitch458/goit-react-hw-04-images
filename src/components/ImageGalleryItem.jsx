import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, handleClick }) => {
  return (
    <li
      onClick={() => handleClick(image.largeImageURL, image.tags)}
      className="imageGalleryItem"
    >
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
