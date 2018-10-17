import React from 'react';
import PropTypes from 'prop-types';


const GifListHeader = (props) => (
  <div className="main-header">
    <h3>{props.title}</h3>
      <div className="sort">
        <select className="sort-select" onChange={ (e) => props.onSort(props.title, e)}>
          <option value="" defaultValue="disabled selected">Sort by</option>
          <option value="Date Added (oldest)">Date Added (oldest)</option> 
          <option value="Date Added (newest)">Date Added (newest)</option> 
        </select>
      </div>
  </div>
)

GifListHeader.propTypes = {
  title: PropTypes.string,
  onSort: PropTypes.func,
};

export default GifListHeader;