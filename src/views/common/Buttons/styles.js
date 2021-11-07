import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.secondary.dark,
  },
  blockButton: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2, 0),
  },
  noPadding: {
    '&.MuiIconButton-root': {
      padding: 0,
    },
  },
}));

export default useStyles;
