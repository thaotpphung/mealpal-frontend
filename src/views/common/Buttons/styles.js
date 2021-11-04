import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.secondary.dark,
  },
  blockButton: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2, 0),
  },
  roundButton: {
    // color: theme.palette.primary.contrastText,
  },
}));

export default useStyles;
