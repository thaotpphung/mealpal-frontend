import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: 'auto',
  },
  logo: {
    width: '100%',
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: theme.spacing(3),
  },
  row: {
    '& h3': {
      marginBottom: theme.spacing(3),
    },
    '& h5': {
      marginBottom: theme.spacing(3),
    },
  },
}));
