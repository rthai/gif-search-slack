import React, { Component } from 'react';
import axios from 'axios';

import './styles/App.css';
import Nav from './Nav';

// TODO: make an error page

class App extends Component {
  constructor() {
    super()
    this.state = {
      gifs: [],
    }
  }

  componentDidMount() {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&rating=G`;

    axios.get(endpoint)
      .then(response => this.setState({
        gifs: response.data.data
      }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

export default App;
