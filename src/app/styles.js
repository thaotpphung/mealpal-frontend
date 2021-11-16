import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  root: {
    minWidth: '380px',
  },
  container: {
    padding: theme.spacing(4, 10),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
    minHeight: '100vh',
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
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
    display: 'flex',
    flexWrap: 'wrap',
    '& > div': {
      flex: '1 1 auto',
      marginRight: theme.spacing(2),
      width: '110px',
    },
  },
  utilsActions: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    justifyContent: 'end',
    marginRight: theme.spacing(1),
    alignItems: 'center',
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& > button': {
      textAlign: 'center',
      minWidth: '90px',
      margin: theme.spacing(1, 0.6),
    },
  },
  foodIcon: {
    marginRight: theme.spacing(1),
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none !important',
    },
  },
}));
