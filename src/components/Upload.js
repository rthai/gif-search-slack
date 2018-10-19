import React, { Component } from 'react';
import './styles/Upload.css';

class Upload extends Component {
  constructor() {
    super() 
    this.state = {
      upload: '',
    };
  }

  preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleLink = (e) => {
    this.preventDefaults(e);
    let input = this.uploaded.value;
    if (input === '') return;
    this.setState({upload: input});
  };

  render() {
    return (
      <div className="upload">
        <h3>Upload a GIF</h3>
        <form className="upload-form" onSubmit={this.handleLink}>
          <div className="upload-url">
            <input type="text" placeholder=" Insert GIF URL" aria-label="insert gif url" ref={ input => this.uploaded = input} />
            <button type="submit" className="btn-preview">Add GIF</button>
          </div>
        </form>
        <div className="preview" ref={input => this.previewGallery = input}>
          <img src={this.state.upload} alt=""/>
        </div>
      </div>
    );
  }
};

export default Upload;
