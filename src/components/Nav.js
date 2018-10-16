import React from 'react';
import './styles/Nav.css';
import Search from './Search';

const Nav = () => (
  <nav>
    <ul className="nav-links">
      <li className="hamburger">
        <button className="menu">
          <i className="material-icons icn-menu">menu</i>
        </button>
      </li>
      <li className="logo">
        <h1><a>GIF Search</a></h1>
      </li>
      <li className="link"><a>Home</a></li>
      <li className="link"><a>Favorites</a></li>
      <li className="link"><a>Upload</a></li>
      <li>
        <div className="search-container">
          <Search/>
        </div>
      </li>
    </ul>
  </nav>
);

export default Nav;
