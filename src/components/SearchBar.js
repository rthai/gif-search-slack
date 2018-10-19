import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  display: flex;
  align-content: center;
`;

const SearchInput = styled.input`
  min-width: 185px;
  width: 100%;
  padding: 12px 40px 12px 5px;
  background: none;
  border: none;
  border-bottom: 2px solid #e4e4e4;
  outline: 0;
  font-size: 16px;
  transition: border-color .4s;
  &:focus {
    border-color: #c1c1c1;
  }
`;

const SearchButton = styled.button`
  height: 40px;
  margin-top: 4px;
  border: none;
  margin-left: -40px;
  background: none;
  cursor: pointer;
  outline: 0;
`;


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    };
  }
  
  debounce = (func, wait = 20, immediate = true) => {
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

  handleChange = (e) => {
    this.setState({value: e.target.value});    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let input = this.state.value;
    if (input === '') return;

    let path = `search?q=${input}`;

    e.target.reset();
    this.setState({value: ''});  
    this.props.history.push(path);  
  }


  render() {
    return (
      <Form onSubmit={this.debounce(this.handleSubmit)}>
        <SearchInput type="text" placeholder="Search all the GIFs!" onChange={this.handleChange}/>
        <SearchButton type="submit" className="search-btn">
          <i className="material-icons icn-search">search</i>
        </SearchButton>
      </Form>
    )
  }
}

export default SearchBar;
