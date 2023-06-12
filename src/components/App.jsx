import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import * as ImageService from '../service/apiService';
import Searchbar from './Searchbar/Searchbar';
import { Text } from './Text/Text.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { Container } from './App.styled';

export default class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    isShowBtn: false,
    isEmpty: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.getImages(query, page);
    }
  }

  getImages = (query, page) => {
    this.setState({ isLoading: true });

    ImageService.getImages(query, page).then(response => {
      // const { page: currentPage, per_page, photos, total_results } = response;
      console.log(response.hits);

      // if (!photos.length) {
      //   this.setState({ isEmpty: true });
      //   return;
      // }
      this.setState({ images: response.hits });
      // this.setState(prevState => ({
      //   images: [...prevState.images, ...photos],
      //   isShowBtn: currentPage < Math.ceil(total_results / per_page),
      // }));
    });
    // .catch(e => this.setState({ error: e.message }))
    // .finally(() => this.setState({ isLoading: false }));
  };

  onSearchSubmit = value => {
    console.log(value);
    this.setState({
      images: [],
      query: value,
      page: 1,
      isLoading: false,
      showModal: false,
      isShowBtn: false,
      isEmpty: false,
      error: null,
    });
  };

  render() {
    const { images } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ToastContainer autoClose={3000} theme="colored" />
        <ImageGallery images={images} onImgClick={this.onGalleryImgClick} />
        <Text>Sorry. There are no images...😕 </Text>
        <Button onClick={this.onLoadMore} />
      </Container>
    );
  }
}
