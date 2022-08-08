import PropTypes from 'prop-types';

const Button = ({ loadMore }) => {
  return (
    <button className="Button" type="button" onClick={loadMore}>
      Load More
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
