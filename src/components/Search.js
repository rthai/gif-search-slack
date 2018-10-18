import React, { Component } from 'react';
import GifList from './GifList';

// TODO: search page QUERY #of gifs

class Search extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

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

  render() {
    // let title = searchValue; 
    return (
      <GifList title='Search' gifs={[]} onSort={this.props.onSort} onSelectImage={this.props.onSelectImage}/>
      );
  }






}


export default Search;