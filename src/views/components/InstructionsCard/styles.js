import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '420px',
    backgroundColor: yellow[100],
  },
  item: {
    height: '55px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(0, 2),
    cursor: 'pointer',
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
