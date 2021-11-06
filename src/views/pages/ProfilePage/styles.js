import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: '0 auto',
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: 'auto',
    marginBottom: theme.spacing(5),
    backgroundColor: 'white',
  },
  paper: {
    '& > div': {
      padding: theme.spacing(3),
    },
  },
  form: {
    minHeight: '350px',
    padding: theme.spacing(4),
  },
}));

export { styles };
