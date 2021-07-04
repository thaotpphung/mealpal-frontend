import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  title: {
    padding: theme.spacing(2),
    borderBottom: theme.palette.divider,
    borderBottomStyle: 'solid',
    borderBottomWidth: 'thin',
  },
  icon : {
    float: 'right',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  list: {
    width: '100%'
  },
  item: {
    marginBottom: theme.spacing(2),
    '& $lastChild': {marginBottom: 0},
    borderBottomStyle: 'solid',
    borderBottomWidth: 'thin'
  }
}));


export default useStyles;
