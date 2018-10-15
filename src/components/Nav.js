import React from 'react';
import './styles/Nav.css';

const Nav = () => (
  <nav>
    <ul className="nav-links">
      <li>
        <h1 className="logo"><a>GIF Search</a></h1>
      </li>
      <li><a>Home</a></li>
      <li><a>Favorites</a></li>
      <li><a>Upload</a></li>
      <li>Search</li>
    </ul>
  </nav>
);

export default Nav;
