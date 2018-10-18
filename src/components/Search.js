import React, { Component } from 'react';
import './styles/Search.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.debounce = this.debounce.bind(this);
  }
  
  debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  handleChange(e) {
    // e.preventDefault();

    this.setState({value: e.target.value});    
  }

  handleSubmit(e) {
    e.preventDefault();
    let input = this.state.value;
    if (input === '') return;
    this.props.onSearch(input);
    e.target.reset();
    this.setState({value: ''});    
  }


  render() {
    return (
      <form className="search-form" onSubmit={this.debounce(this.handleSubmit)}>
        <input type="text" placeholder="Search all the GIFs!" onChange={this.handleChange}/>
        <button type="submit" className="search-btn">
          <i className="material-icons icn-search">search</i>
        </button>
      </form>
    )
  }
}

export default Search;
