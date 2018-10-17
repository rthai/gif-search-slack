import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles/Nav.css';
import Search from './Search';

// TODO: click hamburger show dropnav;

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
          <Search/>
        </div>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = {
  faves: PropTypes.number
};

export default Nav;
