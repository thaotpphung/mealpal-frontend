import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 10),
    minHeight: '100vh',
    '@global': {},
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  menuItem: {
    display: 'grid',
    gridTemplateColumns: '2fr 6fr 1fr',
    columnGap: theme.spacing(2),
    '& div': {
      padding: theme.spacing(2),
    },
  },
  menuContent: {
    '& li': {
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  menuContainer: {
    marginBottom: theme.spacing(3),
  },
  formContainer: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  itemIcon: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
  },
  itemContent: {
    flex: '1 1 auto',
  },
  itemAction: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'end',
  },
  selected: {
    backgroundColor: theme.palette.grey[300],
  },
  chip: {
    margin: theme.spacing(2, 0),
    '& > *': {
      margin: theme.spacing(0.2),
    },
  },
  hoverable: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  utilsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  },
  avatar: {
    backgroundColor: 'white',
  },
  utilsFields: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    '& > div': {
      margin: theme.spacing(0, 3),
    },
  },
  utilsActions: {
    flex: '0 0 auto',
    '& > button': {
      margin: theme.spacing(1),
    },
  },
  foodIcon: {
    marginRight: theme.spacing(1),
  },
}));
