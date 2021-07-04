import { createMuiTheme} from "@material-ui/core/styles";
import { blue, cyan } from '@material-ui/core/colors';
import 'lato-font';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[400],
      light: "",
      dark: "",
      contrastText: ""
    },
    secondary: {
      main: blue[200],
      light: "",
      dark: "",
      contrastText: ""
    }
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
    fontSize: 15
  },
});