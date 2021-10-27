import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 10),
  },
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

  // field
  fieldValue: {},
  fieldTitle: {},
  // menu, edit day
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

  // form
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  formSubmitButton: {
    margin: theme.spacing(3, 0, 2),
  },
  // card
  item: {
    height: '55px',
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
    marginRight: theme.spacing(2),
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
  pagination: {
    margin: theme.spacing(7),
    display: 'flex',
    justifyContent: 'center',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  utilsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
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
}));
