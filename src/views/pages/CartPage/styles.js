import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
  },
  container: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(9),
    alignItems: 'center',
    display: 'flex',
  },
}));
