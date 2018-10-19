import React from 'react';
import PropTypes from 'prop-types';

// FIXME: select doesnt go back default option after giflist updates

const GifListHeader = (props) => {
  let title = props.title;
  if (props.title.match(/^"/)) {
    title = <h3>{title}<span className="total-gifs">{` ${props.pages.total_count} GIFs`}</span></h3>;
  } else {
    title = <h3>{title}</h3>;
  }
  
  return (
  <div className="main-header">
    {title}
      <div className="sort">
        <select className="sort-select" onChange={e => props.onSort(e)}>
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
  onSort: PropTypes.func.isRequired,
};

export default GifListHeader;