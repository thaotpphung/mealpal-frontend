import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    minHeight: '80vh',
  },
}));

export { styles };
