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
    }
  }

  componentDidMount() {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&rating=G`;

    axios.get(endpoint)
      .then(response => {
        let res = response.data;
        let gifs = structureData(res.data);
        this.setState({ gifs });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <GifList title='Trending GIFs' gifs={this.state.gifs} updateFavorites={this.props.updateFavorites}/>
    );
  }
}

Home.propTypes = {
  updateFavorites: PropTypes.func.isRequired,
}

export default Home;
