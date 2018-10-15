import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';

// TODO: add more tests

it('renders without crashing', () => {
  const nav = document.createElement('nav');
  ReactDOM.render(<Nav />, nav);
  ReactDOM.unmountComponentAtNode(nav);
});
