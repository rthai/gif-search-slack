import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';

import './styles/GifList.css';

// TODO: fix sort

const GifList = ({ data }) => {
  let gifs = data.map(gif => {
    let copy = {};
    copy.src = gif.images.original.url;
    copy.thumbnail = gif.images.fixed_width.url;
    copy.thumbnailWidth = parseInt(gif.images.fixed_width.width);
    copy.thumbnailHeight = parseInt(gif.images.fixed_width.height);
    copy.caption = gif.title;
    copy.id = gif.id;
    copy.user = gif.user;
    copy.upload = gif.import_datetime
    return copy;
  });

  return (
    <main>
      <div className="main-header">
        <h3>Trending GIFs</h3>
        <div className="sort-wrap">
          <form>
          <select name="sort">
            <option value="Sort">Sort</option>
            <option value="Upload Date">Upload Date</option> 
          </select>
          </form>
        </div>
      </div>
      <Gallery images={gifs}/>
    </main>
  );
}

GifList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default GifList;