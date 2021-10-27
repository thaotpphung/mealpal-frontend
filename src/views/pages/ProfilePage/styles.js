import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: '0 auto',
  },
  rightColumn: {
    '& > div': {
      marginBottom: theme.spacing(3),
    },
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: 'auto',
    marginBottom: theme.spacing(5),
  },
  paper: {
    '& > div': {
      padding: theme.spacing(3),
    },
  },
  form: {
    minHeight: '400px',
    padding: theme.spacing(3),
  },
}));

export { styles };
