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
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      favCount: JSON.parse(localStorage.getItem('favorites')).length || 0,
    }

    this.onSelectImage = this.onSelectImage.bind(this);
  }

  // structureData(data) {
  //   return data.map(gif => {
  //     let copy = {};
  //     copy.src = gif.images.original.url;
  //     // copy.thumbnail = gif.images.fixed_width.url;
  //     copy.thumbnail = gif.images.preview_gif.url;
  //     // copy.data_src = gif.images.fixed_width.url;
  //     // copy.thumbnail = '';
  //     copy.thumbnailWidth = parseInt(gif.images.preview_gif.width);
  //     copy.thumbnailHeight = parseInt(gif.images.preview_gif.height);
  //     copy.caption = gif.title;
  //     copy.id = gif.id;
  //     copy.user = gif.user;
  //     copy.upload = gif.import_datetime;
  //     return copy;
  //   });
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

 
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav faves={this.state.favCount} />
          <DropNav faves={this.state.favorites.count} onSearch={this.onSearch}/>
          <Switch>
            <Route exact path="/" 
              render={() => <Home onSelectImage={this.onSelectImage} structureData={this.structureData}/>}/>
            <Route path="/favorites" 
              render={() => <Favorites gifs={this.state.favorites} onSelectImage={this.onSelectImage}/>}/>
            <Route path="/upload" render={() => <Upload/>}/>
            <Route path="/search" 
              render={(props) => <Search structureData={this.structureData} location={props.location} onSelectImage={this.onSelectImage}/>}/>
            <Route  component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
