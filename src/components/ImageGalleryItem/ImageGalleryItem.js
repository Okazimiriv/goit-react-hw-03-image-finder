import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, webformatURL, description }) => (
  <li>
    <img src={webformatURL} alt={description} data-id={id} />
  </li>
);

PropTypes.ImageGalleyItem = {
  id: PropTypes.string.isRequired,
  webFormatUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
