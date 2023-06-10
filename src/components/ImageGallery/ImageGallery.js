import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onImgClick }) => (
  <ul>
    {images.map(({ id, webformatURL, description }) => {
      return (
        <li key={id}>
          <ImageGalleryItem
            onClick={onImgClick}
            src={webformatURL}
            alt={description}
            data-id={id}
          />
        </li>
      );
    })}
  </ul>
);

PropTypes.ImageGallery = {
  onImgClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webFormatUrl: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ),
};
