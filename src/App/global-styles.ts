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

  /* React Portal Container */
  #portal {
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
  }

`;

export default GlobalStyles;
