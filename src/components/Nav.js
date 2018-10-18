import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';

import './styles/Nav.css';
import SearchBar from './SearchBar';

// FIXME: active link styling doesnt work

class Nav extends Component {
  constructor(props) {
    super(props) 
    this.state ={
      showDropMenu: false,
    }
  }
 
  showDropMenu = () => {
    console.log('click')
    let menu = document.querySelector('.drop-menu');
    let show = this.state.showDropMenu;

    if (show) {
      this.toggle();
      menu.classList.remove('active');
    } else {
      this.toggle();
      menu.classList.add('active');
    }
  }

  toggle() {
    this.setState({showDropMenu: !this.state.showDropMenu})
  }
  
  render () {
    return (
      <nav>
        <ul className="nav-links">
          <li className="hamburger">
            <button className="menu" ref="hamburger" onClick={this.showDropMenu}>
              <i className="material-icons icn-menu">menu</i>
            </button>
          </li>
          <li className="logo">
            <h1><NavLink exact to="/">GIF Search</NavLink></h1>
          </li>
          <li className="link"><NavLink exact to="/">Home</NavLink></li>
          <li className="link fav"><NavLink to="/favorites">Favorites{this.props.faves > 0 ? ` (${this.props.faves})` : ``}</NavLink></li>
          <li className="link"><NavLink to="/upload">Upload</NavLink></li>
          <li>
            <div className="search-container">
              <Route component={SearchBar}/>
            </div>
          </li>
        </ul>
      </nav>
    );
  };
}

Nav.propTypes = {
  faves: PropTypes.number,
  // onSearch: PropTypes.func
};

export default Nav;
