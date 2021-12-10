import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  recipeItem: {
    display: 'flex',
    cursor: 'pointer',
  },
  stepLabel: {
    paddingLeft: theme.spacing(1),
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    marginBottom: theme.spacing(2),
  },
}));

export { styles };
