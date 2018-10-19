import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles/DropNav.css';

const DropNav = (props) => (
  <ul className="drop-menu">
    <li className="link">
      <NavLink exact to="/">Home</NavLink>
    </li>
    <li className="link fav">
      <NavLink to="/favorites">Favorites{props.faves > 0 ? ` (${props.faves})` : ``}</NavLink>
    </li>
    <li className="link">
      <NavLink to="/upload">Upload</NavLink>
      </li>
  </ul>
);

DropNav.propTypes = {
  faves: PropTypes.number.isRequired,
};

export default DropNav;
