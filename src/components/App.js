import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';


import './styles/App.css';
import Nav from './Nav';
import DropNav from './DropNav';
import Home from './Home';
import Search from './Search';
import Favorites from './Favorites';
import Upload from './Upload';
import NotFound from './NotFound';

// TODO: upload, 

class App extends Component {
  constructor() {
    super()
    this.state = {
      favorites: 
        JSON.parse(localStorage.getItem('favorites')) || [],
    }
  }

  updateFavorites = (newFavorites) => {
    this.setState({favorites: newFavorites });
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav faves={this.state.favorites.length}/>
          <DropNav faves={this.state.favorites.length} />
          <Switch>
            <Route exact path="/" 
              render={() => <Home updateFavorites={this.updateFavorites}/>}/>
            <Route path="/favorites" 
              render={() => <Favorites updateFavorites={this.updateFavorites} gifs={this.state.favorites}/>}/>
            <Route path="/upload" render={() => <Upload/>}/>
            <Route path="/search" 
              render={(props) => <Search location={props.location} updateFavorites={this.updateFavorites}/>}/>
            <Route  component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
