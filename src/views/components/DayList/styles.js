import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  menuItem: {
    display: 'grid',
    gridTemplateColumns: '2fr 6fr 2fr',
    columnGap: theme.spacing(2),
    margin: theme.spacing(2),
  },
  menuContent: {
    '& li': {
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  content: {
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  total: {
    marginLeft: theme.spacing(2),
  },
}));

export { styles };
