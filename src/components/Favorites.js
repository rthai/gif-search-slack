import React from 'react';
import PropTypes from 'prop-types';
import GifList from './GifList';

const Favorites = (props) => (
  <GifList title='Favorites' gifs={props.gifs} updateFavorites={props.updateFavorites} />
);

Favorites.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Favorites;
