import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
}));

export default useStyles;
