import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import * as ImageService from '../service/apiService';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';


import { Container } from './App.styled';
import { Text } from './Text/Text.styled';
import { ButtonLoadMore } from './Button/Button.styled';
import { Loader } from './Loader/Loader.styled';

const PER_PAGE = 12;

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

  componentDidUpdate(prevProps, prevState) {
    const { query, page, images } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
     if (prevState.images !== images) {
      setTimeout(() => {
        window.scrollBy({
          top: 500 * 3,
          behavior: 'smooth',
        });
      }, 500);
    }
  }

  getImages = (query, page) => {
    this.setState({ isLoading: true });

    ImageService.getImages(query, page)
      .then(response => {
        const { page, hits, totalHits } = response;
        console.log(response);
        console.log('page', page);
        console.log('hits', hits);
        console.log('totalHits', totalHits);
        console.log('PER_PAGE', PER_PAGE);

        if (!hits.length) {
          this.setState({
            isEmpty: true,
            showMoreBtn: false,
          });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          // isShowBtn: page < Math.ceil(totalHits / PER_PAGE),
          isShowBtn: true,
        }));
      })
      .catch(e => this.setState({ error: e.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onSearchSubmit = value => {
    // console.log(value);
    this.setState({
      query: value,
      images: [],
      page: 1,
      // showModal: false,
      isShowBtn: false,
      isEmpty: false,
      error: null,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, isEmpty, isShowBtn } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ToastContainer autoClose={3000} theme="colored" />
        <ImageGallery images={images} onImgClick={this.onGalleryImgClick} />
        {isEmpty && <Text>Sorry. There are no images...😕 </Text>}
        {/* {isLoading && <Text>Loading ... </Text>} */}        
        {isLoading && (<Loader>
          <ThreeDots color="#00BFFF" />
        </Loader>)}
        {isShowBtn && (
          <ButtonLoadMore type="button" onClick={this.onLoadMore}>
            Load more
          </ButtonLoadMore>
        )}
      </Container>
    );
  }
}
