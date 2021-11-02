import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    // width: '70%',
    margin: '0 auto',
  },
  rightColumn: {
    '& > div': {
      marginBottom: theme.spacing(3),
    },
  },
}));
