import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';
import {sortAscending, sortDescending} from './lib/sorting.js';

import './styles/GifList.css';
import GifListHeader from './GifListHeader';

// TODO: lazy load?

// needs to happen after gallery is rendered
// const images = document.querySelectorAll('.tile-viewport img');
// images.forEach(image => image.classList.add('hi'))

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
      this.setState({gifs: [], hasSorted: false})
    }

  }

  onSort = (e) => {
    console.log(e.target.value)
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
    this.setState({gifs: sorted, hasSorted: true});
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
          onSelectImage={(i) => this.props.onSelectImage(this.props.title, i)}
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
  title: PropTypes.string,
  gifs: PropTypes.arrayOf(PropTypes.object),
  onSelectImage: PropTypes.func,
};

export default GifList;