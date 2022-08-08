import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ gallery, handleClick }) => {
  return (
    <ul className="imageGallery">
      {gallery.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ImageGallery;
