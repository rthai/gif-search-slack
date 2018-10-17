import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';


import './styles/App.css';
import Nav from './Nav';
import DropNav from './DropNav';
import GifList from './GifList';
import Favorites from './Favorites';
import Upload from './Upload';
import Home from './Home';


// TODO: make an error page, fix favorites, upload, pass extra param to sort so it doesnt keep sorting trending

class App extends Component {
  constructor() {
    super()
    this.state = {
      gifs: [],
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      favCount: 0,
    }

    this.onSort = this.onSort.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
  }

  componentDidMount() {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&rating=G`;

    axios.get(endpoint)
      .then(response => {
        let data = response.data.data;

        let gifs = data.map(gif => {
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
        this.setState({ gifs , favCount: this.state.favorites.length});
      })
      .catch(err => console.error(err));
  }

  onSelectImage(index) {
    console.log(index);
    var copyFavs = this.state.favorites.slice();
    var images = this.state.gifs.slice();
    var img = images[index];
    let count = this.state.favCount;
    
    if (img.hasOwnProperty("isSelected")) {
      img.isSelected = !img.isSelected;
    } else {
      img.isSelected = true;
    }

    if (img.isSelected) {
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

  onSort = (e) => {
    const data = this.state.gifs.slice();
    let input = e.target.value;
    let sortType;

    if (input === "Date Added (oldest)") {
      sortType = this.sortAscending;
    } else if (input === "Date Added (newest)") {
      sortType = this.sortDescending;
    }
    
    let sorted = data.sort(sortType);
    this.setState({gifs: sorted});
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
          <Nav faves={this.state.favCount}/>
          <DropNav faves={this.state.favorites.count}/>
          {/* <GifList gifs={this.state.gifs} onSort={this.onSort} onSelectImage={this.onSelectImage}/> */}
          <Route exact path="/" render={() => <Home gifs={this.state.gifs} onSort={this.onSort} onSelectImage={this.onSelectImage}/>}/>
          <Route path="/favorites" render={() => <Favorites gifs={this.state.favorites} onSort={this.onSort} onSelectImage={this.onSelectImage}/>}/>
          <Route path="/upload" render={() => <Upload/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
