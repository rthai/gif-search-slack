import React, { Component } from 'react';
import styled from 'styled-components';

const UploadWrapper = styled.div`
  width: 90%;
  max-width: 1025px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
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

const UploadForm = styled.form`
  margin: 10px;
  max-width: 70%;
  height: 100%;
  border: 2px solid #c1c1c1;
  border-radius: 5px;
  @media (max-width: 660px) {
    min-width: 280px;
    overflow: hidden;
  }
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  min-width: 300px;
  button {
    flex: 1;
    min-width: 85px;
    height: 46px;
    padding: 5px;
    border: none;
    border-left: 1px solid  #c1c1c1;
    background: #228B22;
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
  button:hover {
    background: #32CD32;
    cursor: pointer;
  }
`;

const Input = styled.input`
  flex: 5;
  padding: 4px 8px 4px 8px; 
  border: none;
  @media (max-width: 660px) {
    width: 70%;
  }
`;

const PreviewWrapper = styled.div`
  padding: 5px
  img {
    width: 50%;
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

  render() {
    return (
      <UploadWrapper>
        <h3>Upload a GIF</h3>
        <UploadForm onSubmit={this.handleLink}>
          <InputDiv>
            <Input type="text" placeholder=" Insert GIF URL" aria-label="insert gif url" ref={ input => this.uploaded = input} />
            <button type="submit" className="btn-preview">Add GIF</button>
          </InputDiv>
        </UploadForm>
        <PreviewWrapper ref={input => this.previewGallery = input}>
          <img src={this.state.upload} alt=""/>
        </PreviewWrapper>
      </UploadWrapper>
    );
  }
};

export default Upload;
