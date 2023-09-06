import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle  = createGlobalStyle`
  ${reset}

  input {
    border: none;
    padding: 0;
  }
  button {
    outline: none;
    border: none;
    padding: 0;
  }
`;

export default GlobalStyle;
