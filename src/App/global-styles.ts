import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html, body, #root, .App {
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
  }

  /*Open Sans Font*/
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,800&display=swap');

  a {
    text-decoration: none;
    outline: 0;
    color: inherit;
  }

`;

export default GlobalStyles;
