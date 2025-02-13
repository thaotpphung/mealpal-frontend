import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  recipeItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  itemContent: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export { styles };
