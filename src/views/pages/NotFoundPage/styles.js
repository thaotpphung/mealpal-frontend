import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(20),
    '& h1': {
      fontWeight: 'bold',
      marginRight: theme.spacing(2),
    },
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: theme.spacing(3),
    borderLeft: '1px solid',
    '& h3, & h5': {
      marginBottom: theme.spacing(2),
    },
  },
  logo: {
    height: '300px',
    width: '300px',
    marginRight: theme.spacing(3),
  },
}));
