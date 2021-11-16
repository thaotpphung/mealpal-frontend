import { createTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import 'lato-font';

export const theme = createTheme({
  palette: {
    primary: {
      // main: deepPurple[300],
      main: '#666AF6',
    },
  },
  typography: {
    fontFamily: [
      'lato',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
});
