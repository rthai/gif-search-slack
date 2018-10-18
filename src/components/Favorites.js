import React from 'react';
import PropTypes from 'prop-types';
import GifList from './GifList';

const Favorites = (props) => (
  <GifList title='Favorites' gifs={props.gifs} updateFavorites={props.updateFavorites} />
);

Favorites.propTypes = {
  title: PropTypes.string,
  gifs: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func,
  onSelectImage: PropTypes.func,
}

export default Favorites;