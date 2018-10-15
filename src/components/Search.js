import React, { Component } from 'react';
import './styles/Search.css';

class Search extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
    };
  }
  
  render() {
    return (
      <form className="search-form">
        <input type="text" placeholder="Search all the GIFs!" />
        <button type="submit" className="search-btn">
          <i className="material-icons icn-search">search</i>
        </button>
      </form>
    )
  }
}

export default Search;
