import React , { Component }from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GifList from './GifList';
import structureData from './lib/structureData.js';

// FIXME: console error for gallery lightbox when gif is clicked

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      offset: 0,
    }
  }

  componentDidMount() {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&rating=G`;

    this.fetchGifs(endpoint);
    window.addEventListener('scroll', this.loadMoreGifs);
  }

  fetchGifs = (endpoint) => {
    axios.get(endpoint)
    .then(response => {
      let res = response.data;
      console.log(res);
      let gifs = structureData(res.data);
      this.setState({ gifs });
    })
    .catch(err => console.error(err));
  }

  loadMoreGifs = (e) => {    
    let offset = this.state.offset + 25;
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&rating=G&offset=${offset}`;
    let scrollPosition = window.scrollY + window.innerHeight;
    let end = e.target.documentElement.offsetHeight;

    if (scrollPosition === end) {
      console.log('end')
      this.fetchGifs(endpoint)
    }
  }

  render() {
    return (
      <GifList title='Trending GIFs' gifs={this.state.gifs} updateFavorites={this.props.updateFavorites} updateShared={this.props.updateShared}/>
    );
  }
}

Home.propTypes = {
  updateFavorites: PropTypes.func.isRequired,
  updateShared: PropTypes.func.isRequired,
}

export default Home;
