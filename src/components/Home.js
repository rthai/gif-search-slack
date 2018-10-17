import React from 'react';
import PropTypes from 'prop-types';
import GifList from './GifList';

const Home = (props) => (
  <GifList title='Trending GIFs' gifs={props.gifs} onSort={props.onSort} onSelectImage={props.onSelectImage}/>
)

Home.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func,
  onSelectImage: PropTypes.func,
}

export default Home;