import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: 'auto',
    paddingBottom: theme.spacing(2),
  },
  menuItem: {
    display: 'grid',
    gridTemplateColumns: '2fr 6fr 2fr',
    columnGap: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

export { styles };
