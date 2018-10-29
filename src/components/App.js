import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyle from '../globalStyle';
import Nav from './Nav';
import DropNav from './DropNav';
import Home from './Home';
import Search from './Search';
import Favorites from './Favorites';
import Shared from './Shared';
import Upload from './Upload';
import NotFound from './NotFound';

// TODO: refine upload

const AppWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 95px;
`;

class App extends Component {
  constructor() {
    super()
    this.state = {
      favorites: [],
      shared: [],
    }
  }

  componentDidMount() {
    const localFav = JSON.parse(localStorage.getItem('favorites'));
    const localShared = JSON.parse(localStorage.getItem('shared'));

    if (localFav) {
      this.setState({favorites: localFav});
    }

    if (localShared) {
      this.setState({shared: localShared});
    }
    
  }

  updateFavorites = (newFavorites) => {
    this.setState({favorites: newFavorites});
  }

  updateShared = (newShared) => {
    this.setState({shared: newShared});
  }
  
  render() {
    return (
      <BrowserRouter>
        <AppWrapper>
          <GlobalStyle/>
          <Nav faves={this.state.favorites.length} shares={this.state.shared.length}/>
          <DropNav faves={this.state.favorites.length} shares={this.state.shared.length}/>
          <Switch>
            <Route exact path="/" 
              render={() => <Home updateFavorites={this.updateFavorites} updateShared={this.updateShared}/>}/>
            <Route path="/favorites" 
              render={() => <Favorites updateFavorites={this.updateFavorites} 
                                       gifs={this.state.favorites} 
                                       updateShared={this.updateShared}/>}
                            />
            <Route path="/shared" 
              render={() => <Shared gifs={this.state.shared}/>}/>
            <Route path="/upload" render={() => <Upload/>}/>
            <Route path="/search" 
              render={props => <Search location={props.location} 
                                       updateFavorites={this.updateFavorites} 
                                       updateShared={this.updateShared}/>}
                                />
            <Route component={ NotFound }/>
          </Switch>
        </AppWrapper>
      </BrowserRouter>
    );
  }
}

export default App;
