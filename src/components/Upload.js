import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// TODO: msg if successful upload

const UploadWrapper = styled.div`
  width: 90%;
  max-width: 1025px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  min-height: 300px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .12);
`;

const Contents = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: center;
`;

const UploadForm = styled.form`
  display: flex; 
  flex-direction: column;
  margin: 10px;
  max-width: 70%;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  @media (max-width: 660px) {
    min-width: 280px;
    overflow: hidden;
  }
`;

const InputDiv = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  @media (max-width: 450px) {
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  min-width: 95px;
  flex: 1;
  span {
    color: red;
  }
  @media (max-width: 450px) {
    text-align: left;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  min-width: 300px;
  margin-left: 10px;
  padding: 4px 8px 4px 8px; 
  outline: 0;
  overflow: hidden;
  border: none;
  border-bottom: 2px solid #e4e4e4;
  transition: border-color .4s;
  font-size: 16px;
  &:focus {
    border-color: dodgerblue;
  }
  @media (max-width: 660px) {
    min-width: 250px;
  }
`;

const UploadBtn = styled.button`
  align-self: flex-end;
  width: 100px;
  float: right;
  margin-top: 5px;
  padding: 4px 8px 4px 8px;
  border-radius: 5px;
  background: #228B22;
  color: white;
  font-size: 18px;
  font-weight: 600;
  &:hover {
    background: #32CD32;
    cursor: pointer;
  }
`;

const PreviewWrapper = styled.div`
  margin: 10px;
  padding: 5px;
  width: 25%;
  min-width: 150px;
  height: 100%;
  border: 2px dashed black;
  border-radius: 2px;
  background: #e0e0e0;
  text-align: center;
  img {
    margin-top: 5px;
    width: 75%;
    object-fit: contain;
  }
`

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

  handleUpload = (e) => {
    this.preventDefaults(e);
    const tags = this.tags.value;
    const link = this.state.upload;
    if (link === '') return alert('Missing GIF Source');
    this.postToGiphy(link, tags);
    console.log('upload')
  }

  postToGiphy = (link, tags) => {
    const endpoint = `https://upload.giphy.com/v1/gifs?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&source_image_url=${link}&tags=${tags}`;
    axios.post(endpoint)
      .then(response => console.log(response.status))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <UploadWrapper>
        <h3>Upload a GIF to Giphy!</h3>
        <Contents>
          <PreviewWrapper ref={input => this.previewGallery = input}>
            Upload Preview
            <img src={this.state.upload} alt=""/>
          </PreviewWrapper>
          <UploadForm onSubmit={this.handleUpload}>
            <InputDiv>
              <Label>GIF Source <span>*</span></Label>
              <Input type="text" placeholder="Insert GIF URL" required aria-label="insert gif url" ref={input => this.uploaded = input} onChange={this.handleLink}/>
            </InputDiv>
            <InputDiv>
              <Label>Add Tags</Label>
              <Input type="text" placeholder="cat, meow, cute" aria-label="insert tags" ref={input => this.tags = input}/>
            </InputDiv>
            <UploadBtn type="submit" className="btn-preview">Upload</UploadBtn>
          </UploadForm>
        </Contents>
      </UploadWrapper>
    );
  }
};

export default Upload;
