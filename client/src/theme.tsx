import createTheme from '@smart-react-components/core/theme'
import createPaletteItem from '@smart-react-components/core/theme/palette'

export default () => {
  const theme = createTheme({
    $: {
      color: {
        dark: {
          separator: '#161719',
          tabOverlayBackground: '#151618',
        },
        light: {
          separator: '#dee2e6',
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

  theme.$.palette.primary = createPaletteItem(theme.$.color.purple, theme)

  theme.$.palette.light = createPaletteItem({
    main: theme.$.palette.light.main,
    alert: {
      background: '#f1f5f7',
      border: '#dee2e6',
    },
  }, theme)

  theme.$.palette.dark = createPaletteItem({
    main: theme.$.palette.dark.main,
    alert: {
      background: '#202124',
      border: '#161719',
    },
  }, theme)


  return theme
}
