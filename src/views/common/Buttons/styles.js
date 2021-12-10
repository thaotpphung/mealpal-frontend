import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.error.dark,
  },
  blockButtonWrapper: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2, 0),
    position: 'relative',
  },
  roundButton: {
    '&.MuiIconButton-root': {
      maxHeight: '50px',
    },
  },
}));

export default useStyles;
