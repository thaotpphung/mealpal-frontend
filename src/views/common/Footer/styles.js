import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#000',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(6, 9),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 3),
    },
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(2),
    margin: 'auto',
  },
  item: {
    '& h6': {
      marginBottom: theme.spacing(1),
    },
  },
  icons: {
    '& svg': {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.contrastText,
    },
  },
  copyRight: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
}));

export default useStyles;
