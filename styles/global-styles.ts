import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height:100%;
    margin:0;
    padding:0;
    width:100%;
    background-color: rgb(242, 242, 242);
    color:#333333;
    font-weight:300;
  }

  a {
    color: #000;
    cursor: pointer;
  }
`;
