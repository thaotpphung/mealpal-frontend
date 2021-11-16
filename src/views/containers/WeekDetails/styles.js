import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    '&> div': {
      marginBottom: theme.spacing(3),
    },
  },
  weekContainer: {
    maxWidth: '100%',
  },
}));
