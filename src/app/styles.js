import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(9, 0),
    // [theme.breakpoints.up('md')]: {
    //   padding: theme.spacing(9),
    // },
  },
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
}));
