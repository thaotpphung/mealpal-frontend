import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  menuContent: {
    '& li': {
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
    },
  },
  total: {
    margin: theme.spacing(1, 0),
  },
  fieldAction: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  foodIcon: {
    margin: theme.spacing(2, 1, 0, 0),
  },
  rowAction: {
    display: 'flex',
    justifyContent: 'end',
  },
  addButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1),
    },
    marginBottom: theme.spacing(1.5),
  },
}));

export { styles };
