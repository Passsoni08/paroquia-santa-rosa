import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.body};
    border: none;
    outline: none;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.secondary};
      outline-offset: 2px;
    }
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.secondary};
      outline-offset: 2px;
    }
  }

  ul, ol {
    list-style: none;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export default GlobalStyle;
