import React from 'react';
import styled from 'styled-components';

const Error = styled.i`
  color: red;
  font-size: 30px;
`;

const NotFound = () => (
  <div className="main-content not-found">
    <Error className="material-icons icn-error">error_outline</Error>
    <h2>Page Not Found</h2>
  </div>
);

export default NotFound;