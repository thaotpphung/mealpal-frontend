import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7)
  },
  title: {
    padding: theme.spacing(2),
    borderBottom: theme.palette.divider,
    borderBottomStyle: 'solid',
    borderBottomWidth: 'thin'
  },
  list: {
    width: '500px'
  },
  item: {
    marginBottom: theme.spacing(2),
    '& $lastChild': {marginBottom: 0},
    borderBottomStyle: 'solid',
    borderBottomWidth: 'thin'
  }
}));

export default useStyles;
