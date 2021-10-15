import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '420px',
    minHeight: '420px',
    backgroundColor: 'yellow',
    overflow: 'scroll',
  },
  header: {
    padding: theme.spacing(0, 2),
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.light,
  },
  list: {
    listStyle: 'none',
  },
  item: {
    height: '55px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(0, 2),
    cursor: 'pointer',
    '&hover': {
      backgroundColor: theme.palette.grey[200],
    },
    borderBottom: '1px solid black',
  },
  itemIcon: {
    flex: '0 0 auto',
  },
  itemContent: {
    flex: '1 1 auto',
  },
  itemAction: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
  },
  selected: {
    backgroundColor: theme.palette.grey[200],
  },
}));

export default useStyles;
