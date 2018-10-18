import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';

import './styles/Nav.css';
import SearchBar from './SearchBar';

// TODO: click hamburger show dropnav;
// FIXME: active link styling doesnt work

const Nav = (props) => (
  <nav>
    <ul className="nav-links">
      <li className="hamburger">
        <button className="menu">
          <i className="material-icons icn-menu">menu</i>
        </button>
      </li>
      <li className="logo">
        <h1><NavLink exact to="/">GIF Search</NavLink></h1>
      </li>
      <li className="link"><NavLink exact to="/">Home</NavLink></li>
      <li className="link fav"><NavLink to="/favorites">Favorites{props.faves > 0 ? ` (${props.faves})` : ``}</NavLink></li>
      <li className="link"><NavLink to="/upload">Upload</NavLink></li>
      <li>
        <div className="search-container">
          {/* <SearchBar onSearch={props.onSearch}/> */}
          {/* <SearchBar /> */}
          <Route component={SearchBar}/>
        </div>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = {
  faves: PropTypes.number,
  // onSearch: PropTypes.func
};

export default Nav;
