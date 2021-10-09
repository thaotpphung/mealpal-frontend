import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    width: '50%',
    margin: 'auto',
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
    display: 'grid',
    gridTemplateColumns: '2fr 6fr 2fr',
    columnGap: theme.spacing(2),
    margin: theme.spacing(2),
  },
  itemIcon: {
    flex: '0 0 auto',
    marginRight: theme.spacing(3),
  },
  itemContent: {
    flex: '1 1 auto',
  },
  menu: {
    '& li': {
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
}));
