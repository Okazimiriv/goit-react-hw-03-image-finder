import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import * as ImageService from '../service/apiService';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Container } from './App.styled';

export default class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    showModal: false,
    isShowBtn: false,
    isEmpty: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
       this.apiService(searchQuery, page);
    }
  }

  apiService = (searchQuery, page) => {
    this.setState({ isLoading: true });
    ImageService.apiService(searchQuery, page)
      .then(response => {
        const { page: currentPage, per_page, photos, total_results } = response;
        console.log(response);

        if (!photos.length) {
          this.setState({ isEmpty: true });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          isShowBtn: currentPage < Math.ceil(total_results / per_page),
        }));
      })
      .catch(e => this.setState({ error: e.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onSearchSubmit = query => {
    console.log(query );
    this.setState({
      images: [],
      searchQuery: query,
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
        <ImageGallery images={images} onImgClick={this.onGalleryImgClick} />
        <ToastContainer autoClose={3000} theme="colored" />
      </Container>
    );
  }
}
