import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, tags } = this.props;

    return (
      <GalleryItem id={id}>
        <GalleryImage src={webformatURL} alt={tags} />
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;

PropTypes.ImageGalleryItem = {
  id: PropTypes.string.isRequired,
  webFormatUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
