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

  /* Heart Loading */
  .lds-heart {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  transform: rotate(45deg);
  transform-origin: 32px 32px;
}
.lds-heart div {
  top: 23px;
  left: 19px;
  position: absolute;
  width: 26px;
  height: 26px;
  background: #fff;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  background: #fff;
}
.lds-heart div:before {
  left: -17px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -17px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}

`;

export default GlobalStyles;
