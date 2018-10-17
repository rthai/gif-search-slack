import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';

import './styles/GifList.css';

// TODO: lazy load?

// needs to happen after gallery is rendered
// const images = document.querySelectorAll('.tile-viewport img');
// images.forEach(image => image.classList.add('hi'))

const GifList = (props) => {
  return (
    <main>
      <div className="main-header">
        <h3>Trending GIFs</h3>
          <div className="sort">
            <select className="sort-select" onChange={props.onSort}>
              <option value="" defaultValue="disabled selected">Sort by</option>
              <option value="Date Added (oldest)">Date Added (oldest)</option> 
              <option value="Date Added (newest)">Date Added (newest)</option> 
            </select>
          </div>
      </div>
      <Gallery 
        images={props.gifs}
      />
    </main>
  );
}

GifList.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func
};

export default GifList;