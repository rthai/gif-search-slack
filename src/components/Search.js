import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import GifList from './GifList';
import structureData from './lib/structureData.js';
import loadMoreGifs from './lib/loadMoreGifs.js';

// TODO: cancel calls when component unmounted
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      q: '', 
      pagination: '',
    }
  }

  componentDidMount() {
    this.handleSearch();

    window.addEventListener('scroll', (e) => {
      const offset = this.state.pagination.count + this.state.pagination.offset;

      loadMoreGifs(e, offset, () => {
        this.getGifs(this.state.q, offset);
      });
    });
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props.location.search;

    if (newProps !== prevProps.location.search) {
      this.handleSearch();
    }
  }

  componentWillUnmount() {

  }

  handleSearch = () => {
    /* 
      doesn't support IE, use npm query-string for older browser compatability 
      https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility
    */

    const params = new URLSearchParams(this.props.location.search);
    const q = params.get('q');
    this.getGifs(q);
  }
  
  getGifs = (searchValue, offset = 0) => {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${searchValue}&limit=25&offset=${offset}&rating=G&lang=en`;

    let copy = this.state.gifs.slice();

    axios.get(endpoint)
      .then(response => {
        let res = response.data;
        let gifs = structureData(res.data);
        copy.push(...gifs);
        this.setState({ 
          gifs: copy,
          q: searchValue,
          pagination: res.pagination
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <GifList 
        title={`"${this.state.q}"`} 
        gifs={this.state.gifs} 
        updateFavorites={this.props.updateFavorites} 
        updateShared={this.props.updateShared}
        pages={this.state.pagination}
      />
    );
  }
}

Search.propTypes = {
  location: PropTypes.object.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

export default Search;
