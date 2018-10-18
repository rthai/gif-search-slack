import React, { Component } from 'react';
import axios from 'axios';
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

// TODO: make an error page, upload

class App extends Component {
  constructor() {
    super()
    this.state = {
      gifs: [],
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      favCount: 0,
    }

    // this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
  }

  componentDidMount() {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&rating=G`;

    axios.get(endpoint)
      .then(response => {
        let data = response.data.data;
        let gifs = this.structureData(data);
        this.setState({ gifs , favCount: this.state.favorites.length});
      })
      .catch(err => console.error(err));
  }

  structureData(data) {
    return data.map(gif => {
      let copy = {};
      copy.src = gif.images.original.url;
      copy.thumbnail = gif.images.fixed_width.url;
      // copy.data_src = gif.images.fixed_width.url;
      // copy.thumbnail = '';
      copy.thumbnailWidth = parseInt(gif.images.fixed_width.width);
      copy.thumbnailHeight = parseInt(gif.images.fixed_width.height);
      copy.caption = gif.title;
      copy.id = gif.id;
      copy.user = gif.user;
      copy.upload = gif.import_datetime;
      return copy;
    });
  }

  // onSearch(searchValue) {
  //   console.log('onsearch', searchValue);
  //   const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${searchValue}&limit=25&offset=0&rating=G&lang=en`;
    
  //   axios.get(endpoint)
  //     .then(response => {
  //       let data = response.data.data;
  //       let gifs = this.structureData(data);
  //       // this.setState({ gifs });
  //     })
  //     .catch(err => console.error(err));
  // }

  onSelectImage(title, index) {
    // console.log(index);
    var copyFavs = this.state.favorites.slice();
    let images;
    let count = this.state.favCount;

    // console.log(title)

    if (title === "Trending GIFs") {
      images = this.state.gifs.slice();
    } else if (title === "Favorites") {
      images = this.state.favorites.slice();
    }

    var img = images[index];
    
    if (img.hasOwnProperty("isSelected")) {
      img.isSelected = !img.isSelected;
    } else {
      img.isSelected = true;
    }

    if (img.isSelected) {
      // dont push same img twice
      if (copyFavs.find(gif => gif.id === img.id)) {
        return;
      } 
      copyFavs.push(img);
      count++;
    } else {
      // delete by checking gif id
      copyFavs = copyFavs.filter(gif => gif.id !== img.id);
      count--;
    }

    console.log(copyFavs, count)


    this.setState(
      {favorites: copyFavs, favCount: count}, 
      () => localStorage.setItem('favorites', JSON.stringify(this.state.favorites))
    );
  }

  onSort = (title, e) => {
    // check if in favorites or home page
    console.log(title, e.target.value)
    let data, 
        stateKey,
        newState = {};

    if (title === "Trending GIFs") {
      data = this.state.gifs.slice();
      stateKey = 'gifs';
    } else if (title === "Favorites") {
      data = this.state.favorites.slice();
      stateKey = 'favorites';
    }

    let input = e.target.value;
    let sortType;

    if (input === "Date Added (oldest)") {
      sortType = this.sortAscending;
    } else if (input === "Date Added (newest)") {
      sortType = this.sortDescending;
    }
    
    let sorted = data.sort(sortType);
    newState[stateKey] = sorted;
    console.log(stateKey, newState, sorted)

    this.setState(newState);
  }

  // old -> new
  sortAscending(a, b) {
    a = a.upload;
    b = b.upload;

    if (a > b) {
      return 1;
    } else if (a === b) {
      return 0;
    } else {
      return -1;
    }
  }

  // new -> old
  sortDescending(a, b) {
    a = a.upload;
    b = b.upload;

    if (a < b) {
      return 1;
    } else if (a === b) {
      return 0;
    } else {
      return -1;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav faves={this.state.favCount} />
          <DropNav faves={this.state.favorites.count} onSearch={this.onSearch}/>
          <Switch>
            <Route exact path="/" render={() => <Home gifs={this.state.gifs} onSort={this.onSort} onSelectImage={this.onSelectImage}/>}/>
            <Route path="/favorites" render={() => <Favorites gifs={this.state.favorites} onSort={this.onSort} onSelectImage={this.onSelectImage}/>}/>
            <Route path="/upload" render={() => <Upload/>}/>
            <Route path="/search" render={() => <Search onSort={this.onSort} onSelectImage={this.onSelectImage}/>}/>
            <Route  component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
