import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

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
  // for yellow paper
  notePaper: {
    minHeight: '420px',
    backgroundColor: `${yellow[100]} !important`,
    paddingBottom: theme.spacing(6),
  },
  notePaperItem: {
    height: '55px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(0, 2),
    cursor: 'pointer',
    borderBottom: '1px solid black',
  },
  recipeDetailsHeader: {
    textAlign: 'center',
    fontStyle: 'italic',
    textDecoration: 'underline',
    fontSize: theme.typography.fontSize + 5,
    marginBottom: theme.spacing(3),
  },
  recipeDetailsCardContent: {
    padding: theme.spacing(3),
  },

  // menu, edit day
  menuItem: {
    display: 'grid',
    gridTemplateColumns: '2fr 6fr 1fr',
    columnGap: theme.spacing(2),
    '& div': {
      padding: theme.spacing(2),
    },
    marginBottom: theme.spacing(3),
  },

  menuContent: {
    '& li': {
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '& span': {
        marginLeft: theme.spacing(2),
      },
    },
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
}));
