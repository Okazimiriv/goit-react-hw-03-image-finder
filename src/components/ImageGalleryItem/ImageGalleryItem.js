import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags } = this.props;

    return (
      <GalleryItem>
        <GalleryImage src={webformatURL} alt={tags} loading="lazy" />
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;

PropTypes.ImageGalleryItem = {
  webFormatUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
