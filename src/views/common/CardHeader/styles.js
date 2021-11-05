import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(0, 2),
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.main,
  },
  headerTitle: {
    color: theme.palette.primary.contrastText,
  },
  action: {
    '& button': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default useStyles;
