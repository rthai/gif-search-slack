import React from 'react';
import PropTypes from 'prop-types';
import GifList from './GifList';

// FIXME: what todo when favorite is removed, how is that updated in state? especially if clash with

const Favorites = (props) => (
  <GifList title='Favorites' gifs={props.gifs} onSort={props.onSort} onSelectImage={props.onSelectImage}/>
);

Favorites.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func,
  onSelectImage: PropTypes.func,
}

export default Favorites;