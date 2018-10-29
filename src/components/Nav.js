import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';

import styled from 'styled-components';
import SearchBar from './SearchBar';

const NavWrapper = styled.nav`
  background: #fff;
  top:0;
  width: 100%;
  max-height: 63px;
  transition:all 0.5s;
  position: fixed;
  z-index: 1000;
  font-size: 16px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0,0,0,.12);
`;

const NavLinksWrapper = styled.ul`
  width: 90%;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Hamburger = styled.li`
  max-width: 0;
  overflow: hidden;
  transition: all 0.5s;
  flex:1 2;
  text-align: center;
  @media (max-width: 575px) { 
    min-width: 40px;
    max-width: 40px;
  }
`;

const MenuButton = styled.button`
  background: #fff;
  border: 0;
  cursor: pointer;
`;

const LogoLi = styled.li`
  flex:1 2;
  text-align: center;
  max-width: 200px;
  height: 63px;
  transition: all 0.3s;
  h1 {
    min-width: 158px;
    margin: 15px 0 15px 0;
    background: #fff;
    font-weight: 600;
    font-size: 30px;
    text-transform: uppercase;
    @media (max-width: 1005px) {
      font-size: 28px;
    }
    @media (max-width: 875px) {
      font-size: 24px;
    }
  }
  a {
    text-shadow: 1px 1px rgba(0,0,0,.12);
  }
  a:visited {
    color: #000;
  }
  @media (max-width: 735px) { 
    max-width: 0;
    overflow: hidden;
  }
`;

const LinkLi = styled.li`
  flex:1 2;
  text-align: center;
  min-width: 100px;
  max-width: 100px;

  text-align: center;
  a {
    text-shadow: 1px 1px rgba(0,0,0,.12);
  }
  a:hover, a.active {
    color: #1e90ff;
  }
  @media (max-width: 575px) { 
    min-width: 0;
    max-width: 0;
    overflow: hidden;
  }
`;

const SearchLi = styled.li`
  flex: 2;
  max-width: 550px;
`;

class Nav extends Component {
  constructor(props) {
    super(props) 
    this.state ={
      showDropMenu: false,
    }
  }
 
  showDropMenu = () => {
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
    this.setState({
      showDropMenu: !this.state.showDropMenu
    });
  }
  
  //TODO: CHECK hamburger button later
  render () {
    return (
      <NavWrapper>
        <NavLinksWrapper>
          <Hamburger>
            <MenuButton ref="hamburger" onClick={this.showDropMenu}>
              <i className="material-icons icn-menu">menu</i>
            </MenuButton>
          </Hamburger>
          <LogoLi>
            <h1>
              <NavLink exact to="/">GIF Search</NavLink>
            </h1>
          </LogoLi>
          <LinkLi>
            <NavLink exact to="/">Home</NavLink>
          </LinkLi>
          <LinkLi>
            <NavLink to="/favorites">Favorites{this.props.faves > 0 ? ` (${this.props.faves})` : ``}</NavLink>
          </LinkLi>
          <LinkLi>
            <NavLink to="/shared">Shared{this.props.faves > 0 ? ` (${this.props.shares})` : ``}</NavLink>
          </LinkLi>
          <LinkLi>
            <NavLink to="/upload">Upload</NavLink>
          </LinkLi>
          <SearchLi>
            <div className="search-container">
              <Route component={SearchBar}/>
            </div>
          </SearchLi>
        </NavLinksWrapper>
      </NavWrapper>
    );
  };
}

Nav.propTypes = {
  faves: PropTypes.number,
  shares: PropTypes.number,
};

export default Nav;
