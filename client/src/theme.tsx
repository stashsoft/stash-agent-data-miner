import createTheme from '@smart-react-components/core/theme'

export default () => {
  const theme = createTheme({
    $: {
      color: {
        dark: {
          tabOverlayBackground: '#151618',
        },
        light: {
          tabOverlayBackground: '#dee2e6',
        },
      },
      length: {
        genericSpace: '0.7rem',
      },
      radius: {
        generic: '.5rem',
      },
    },
  })

  return theme
}
