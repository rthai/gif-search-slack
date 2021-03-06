import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f6f7f7;
  color: #4c4c4c;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  a {
    text-decoration: none;
    color: #4c4c4c;
  }
  
  a:visited {
    color:#4c4c4c;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  } 
`;

export default GlobalStyle;
