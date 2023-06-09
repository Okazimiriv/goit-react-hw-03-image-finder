import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';

import { Container } from './App.styled';

export default class App extends Component {
  state = {
    images: [],
    searchQuery: "",
    loading: false,
  };

   onSearchSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=35953983-a066171bf8548120346cceae4&image_type=photo&orientation=horizontal&per_page=12'
  //   )
  //     .then(res => res.json())
  //     .then(images => this.setState({ images }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  render() {
    return (
      <Container>      
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ToastContainer  autoClose ={3000} theme="colored"/>      
      </Container>
    );
  }
}
