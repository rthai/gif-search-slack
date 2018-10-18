import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';

import './styles/GifList.css';
import GifListHeader from './GifListHeader';

// TODO: lazy load?

// needs to happen after gallery is rendered
// const images = document.querySelectorAll('.tile-viewport img');
// images.forEach(image => image.classList.add('hi'))

const GifList = (props) => {
  let html;

  if (props.gifs.length === 0) {
    html = <h4>No GIFs to load...</h4>
  } else {
    html = 
    <Gallery 
      images={props.gifs}
      onSelectImage={(i) => props.onSelectImage(props.title, i)}
    />
  }

  return (
    <main>
      <GifListHeader title={props.title} onSort={props.onSort}/>
      {html}
    </main>
  );
}

GifList.propTypes = {
  title: PropTypes.string,
  gifs: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func,
  onSelectImage: PropTypes.func,
};

export default GifList;