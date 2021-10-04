import { createMuiTheme } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import 'lato-font';

export const theme = createMuiTheme({
  palette: {
    primary: cyan,
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
