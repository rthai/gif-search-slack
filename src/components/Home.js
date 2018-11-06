import React , { Component }from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GifList from './GifList';
import structureData from './lib/structureData.js';
import loadMoreGifs from './lib/loadMoreGifs.js';

// FIXME: console error? for gallery lightbox when gif is clicked
// TODO: cancel calls when unmounted
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      pagination: '',
    }
  }

  componentDidMount() {
    this.fetchGifs();
    window.addEventListener('scroll', (e) => {
      const offset = this.state.pagination.count + this.state.pagination.offset;

      loadMoreGifs(e, offset, this.fetchGifs);
    });
  }

  fetchGifs = (offset) => {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&rating=G&offset=${offset}`;

    let copy = this.state.gifs.slice();
    axios.get(endpoint)
    .then(response => {
      let res = response.data;
      let gifs = structureData(res.data);
      copy.push(...gifs);
      this.setState({ 
        gifs: copy,
        pagination: res.pagination
      });
    })
    .catch(err => console.error(err));
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
