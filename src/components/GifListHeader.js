import React from 'react';
import PropTypes from 'prop-types';

// FIXME: select doesnt go back default option after giflist updates
// FIXME: there could be a bug if Trending GIFs and Favorites are searched for
// FIXME: display total gif count for search conditional

const GifListHeader = (props) => {
  
  return (
  <div className="main-header">
    <h3>{props.title}</h3>
      <div className="sort">
        <select className="sort-select" onChange={ (e) => props.onSort(e)}>
          <option value="" defaultValue="disabled selected">Sort by</option>
          <option value="Date Added (oldest)">Date Added (oldest)</option> 
          <option value="Date Added (newest)">Date Added (newest)</option> 
        </select>
      </div>
  </div>
  );
}

GifListHeader.propTypes = {
  title: PropTypes.string,
  onSort: PropTypes.func,
  pages: PropTypes.object
};

export default GifListHeader;