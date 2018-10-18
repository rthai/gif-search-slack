import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import GifList from './GifList';
import structureData from './lib/structureData.js';


// TODO: search page QUERY #of gifs

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      q: 'Search', 
      pagination: '',
    }
  }

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props.location.search;

    if (newProps !== prevProps.location.search) {
      this.handleSearch();
    }
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
  

  getGifs = (searchValue) => {
    console.log('getGifs', searchValue);
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${searchValue}&limit=25&offset=0&rating=G&lang=en`;
    
    axios.get(endpoint)
      .then(response => {
        let res = response.data;
        let gifs = structureData(res.data);
        this.setState({ 
          gifs, 
          q: searchValue,
          pagination: res.pagination
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <GifList title={this.state.q} gifs={this.state.gifs} onSelectImage={this.props.onSelectImage} pages={this.state.pagination}/>
      );
  }
}

Search.propTypes = {
  location: PropTypes.object.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};


export default Search;