import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

const styles = makeStyles((theme) => ({
  notePaper: {
    minHeight: '420px',
    paddingBottom: theme.spacing(6),
  },
  notePaperItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
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
  itemContent: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export { styles };
