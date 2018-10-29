import React from 'react';
import PropTypes from 'prop-types';
import GifList from './GifList';

const Shared = (props) => (
  <GifList title='Shared to Slack' gifs={props.gifs} updateFavorites={props.updateFavorites} />
);

Shared.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

export default Shared;
