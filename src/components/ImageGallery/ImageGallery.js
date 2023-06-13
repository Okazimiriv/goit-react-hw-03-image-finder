import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryBlock } from './ImageGallery.styled';

const ImageGallery = ({ images, onImgClick }) => {
  return (
    <ImageGalleryBlock onClick={onImgClick}>
      {images.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem webformatURL={webformatURL} tags={tags} key={id} />
        );
      })}
    </ImageGalleryBlock>
  );
};

export default ImageGallery;

PropTypes.ImageGallery = {
  onImgClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webFormatUrl: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
};
