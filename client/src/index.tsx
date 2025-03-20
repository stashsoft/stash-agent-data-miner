import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './components/App'
import GlobalStyle from './components/GlobalStyle'
import createTheme from './theme'

const root = createRoot(document.getElementById('app'))
const theme = createTheme()

root.render(
  <ThemeProvider theme={theme}>
    <App />
    <GlobalStyle />
  </ThemeProvider>
)
