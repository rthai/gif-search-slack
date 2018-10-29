import React from 'react';
import PropTypes from 'prop-types';
import GifList from './GifList';

const Favorites = (props) => (
  <GifList title='Favorites' gifs={props.gifs} updateFavorites={props.updateFavorites} updateShared={props.updateShared}/>
);

Favorites.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateFavorites: PropTypes.func.isRequired,
  updateShared: PropTypes.func.isRequired,
};

export default Favorites;
