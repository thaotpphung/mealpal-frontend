import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

const styles = makeStyles((theme) => ({
  notePaper: {
    minHeight: '420px',
    backgroundColor: `${yellow[100]} !important`,
    paddingBottom: theme.spacing(6),
  },
  notePaperItem: {
    height: '55px',
    display: 'flex',
    alignItems: 'center',
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
}));

export { styles };
