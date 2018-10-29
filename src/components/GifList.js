import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';
import axios from 'axios';
import { 
  sortAscending, 
  sortDescending
} from './lib/sorting.js';
import slackLogo from './SlackLogo.svg';

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
      currentGif: 0,
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

  onSelectImage = (index) => {
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

  onCurrentImageChange = (index) => {
    this.setState({ currentGif: index });
}

  shareToSlack = () =>  {
    let images;
    
    if (this.state.hasSorted) {
      images = this.state.gifs;
    } else {
      images = this.props.gifs;
    }
    
    const img = images[this.state.currentGif];

    if (JSON.parse(localStorage.getItem('shared')) === null) {
      localStorage.setItem('shared', JSON.stringify([])); 
    } 

    let shared = [...JSON.parse(localStorage.getItem('shared'))]; 

    this.postToSlack(img)

    // dont push same img twice
    if (shared.find(gif => gif.id === img.id)) return;
    shared.push(img);
    

    localStorage.setItem('shared', JSON.stringify(shared));
    this.props.updateShared(shared);
  }

  postToSlack = (img) => {
    const endpoint = `https://hooks.slack.com/services/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`;
    const options = {
      "text": ":tada: A GIF a day keeps the blues away :tada:",
      "attachments": [
          {
            "title": `${img.caption}`,
            "image_url": `${img.src}`
          }
      ]
    };

    axios.post(endpoint, JSON.stringify(options))
      .then(response => console.log(response.status, response.data))
      .catch(err => console.error(err));
          
  } 

  render() {
    const buttonStyles = {
      marginTop: '5px',
      marginBottom: '5px',
      background: '#1bbc8e',
      borderRadius: '5px',
      border: '0',
      color: 'white',
      fontWeight: 600,
    };

    const buttonImgStyle = {
      width: '30px',
      verticalAlign: 'middle'
    };

    let gifs = this.state.hasSorted ? this.state.gifs : this.props.gifs;
    let html;

    if (this.props.gifs.length === 0) {
      if (this.props.title === 'Trending GIFs') {
        html = <h4>Loading...</h4>
      } else if (this.props.title.match(/^"/)) {
        html = <h4>Searching...</h4>
      } else {
        html = <h4>No GIFs found.</h4>
      }
    } else {
      html = 
        <Gallery 
          images={gifs}
          onSelectImage={this.onSelectImage}
          backdropClosesModal={true}
          currentImageWillChange={this.onCurrentImageChange}
          customControls={[
            <button key="slack-share" onClick={this.shareToSlack} style={buttonStyles}>
              <img src={slackLogo} alt="white slack logo" style={buttonImgStyle} />Share to Slack
            </button>
        ]}
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
  updateShared: PropTypes.func,
};

export default GifList;