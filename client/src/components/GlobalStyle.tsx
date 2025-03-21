import { Theme } from '@smart-react-components/core/theme'
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle(({ theme }:{ theme: Theme }) => `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #app {
    height: 100%;
  }

  body {
    background: ${theme.$.color.dynamic.tabOverlayBackground};
    color: ${theme.$.color.dynamic.bodyFont};
    fill: currentcolor;
    font-family: '${theme.$.fontFamily.primary}';
    text-size-adjust: none;
    -webkit-tap-highlight-color: transparent;
  }

  b,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
  }

  ul {
    list-style: none;
  }

  .fade-show {
    opacity: 0;
  }

  .fade-show-active {
    opacity: 1;
    transition: opacity 300ms ease-in-out;
  }

  .fade-hide {
    opacity: 1;
  }

  .fade-hide-active {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }
`)
