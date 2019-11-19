import {
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';

export const muiTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        dark: '#2e73ab',
        main: '#42a5f5',
        light: '#67b7f7'
      },
      secondary: {
        dark: '#7bc1f8',
        main: '#c6e4fc',
        light: '#f6fbff'
      },
      backgroundColor: { paper: '#ffffff' },
      text: {
        primary: '#000000',
        secondary: '#888888'
      },
      typography: {
        // Tell Material-UI what's the font-size on the html element is.
        htmlFontSize: 10
      }
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: '1em'
        }
      }
    }
  })
);
