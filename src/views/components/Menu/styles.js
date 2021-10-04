import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
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
  menuMeal: {
    display: 'grid',
    gridTemplateColumns: '2fr 6fr',
    columnGap: theme.spacing(2),
    '& div': {
      padding: theme.spacing(2),
    },
  },
  menuMealTitle: {
    flex: '0 0 auto',
    marginRight: theme.spacing(3),
  },
  menuMealContent: {
    flex: '1 1 auto',
  },
  menu: {
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
}));
