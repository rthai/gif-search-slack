import React from 'react';
import './styles/Nav.css';
import Search from './Search';

const Nav = () => (
  <nav>
    <ul className="nav-links">
      <li>
        <h1 className="logo"><a>GIF Search</a></h1>
      </li>
      <li><a>Home</a></li>
      <li><a>Favorites</a></li>
      <li><a>Upload</a></li>
      <li>
        <div className="search-container">
          <Search/>
        </div>
      </li>
    </ul>
  </nav>
);

export default Nav;
