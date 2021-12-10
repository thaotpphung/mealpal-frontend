import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
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
  editForm: {
    display: 'flex',
  },
  action: {
    display: 'flex',
    paddingTop: theme.spacing(3),
  },
}));

export { styles };
