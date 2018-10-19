import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';
import { 
  sortAscending, 
  sortDescending
} from './lib/sorting.js';

import './styles/GifList.css';
import GifListHeader from './GifListHeader';

// TODO: lazy load?
// FIXME: tweek? favorites saved to localstorage but on refresh checkmark is not saved

class GifList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      hasSorted: false,
    }
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props.gifs;

    if (newProps !== prevProps.gifs) {
      this.setState({
        gifs: [], 
        hasSorted: false
      });
    }
  }

  onSort = (e) => {
    let data = this.props.gifs.slice();

    let input = e.target.value;
    let sortType;

    if (input === '') {
      e.preventDefault();
      return;
    }
    
    if (input === "Date Added (oldest)") {
      sortType = sortAscending;
    } else if (input === "Date Added (newest)") {
      sortType = sortDescending;
    } 
    
    let sorted = data.sort(sortType);
    this.setState({
      gifs: sorted, 
      hasSorted: true
    });
  }

  onSelectImage(index) {
    let images, favorites;
    
    if (this.state.hasSorted) {
      images = this.state.gifs;
    } else {
      images = this.props.gifs;
    }
    
    const img = images[index];

    if (JSON.parse(localStorage.getItem('favorites')) === null) {
      localStorage.setItem('favorites', JSON.stringify([])); 
    } 

    favorites = [...JSON.parse(localStorage.getItem('favorites'))]; 
    
    if (img.hasOwnProperty("isSelected")) {
      img.isSelected = !img.isSelected;
    } else {
      img.isSelected = true;
    }

    if (img.isSelected) {
      // dont push same img twice
      if (favorites.find(gif => gif.id === img.id)) return;
      favorites.push(img);
    } else {
      // delete by checking gif id
      favorites= favorites.filter(gif => gif.id !== img.id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.props.updateFavorites(favorites);
  }

  render() {
    let gifs = this.state.hasSorted ? this.state.gifs : this.props.gifs;
    let html;

    if (this.props.gifs.length === 0) {
      if (this.props.title === 'Trending GIFs') {
        html = <h4>Loading...</h4>
      } else {
        html = <h4>No GIFs found.</h4>
      }
    } else {
      html = 
        <Gallery 
          images={gifs}
          onSelectImage={(i) => this.onSelectImage(i)}
        />
    }

    return (
      <main>
        <GifListHeader title={this.props.title} onSort={this.onSort} hasSorted={this.state.hasSorted} pages={this.props.pages}/>
        {html}
      </main>
    );
  }
}

GifList.propTypes = {
  title: PropTypes.string.isRequired,
  gifs: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

export default GifList;