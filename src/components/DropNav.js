import React from 'react';
import PropTypes from 'prop-types';

import './styles/DropNav.css';

const DropNav = (props) => (
  <ul className="drop-menu">
    <li className="link"><a>Home</a></li>
    <li className="link"><a>Favorites{props.faves > 0 ? ` (${props.faves})` : ``}</a></li>
    <li className="link"><a>Upload</a></li>
  </ul>
);

DropNav.propTypes = {
  faves: PropTypes.number
};

export default DropNav;
