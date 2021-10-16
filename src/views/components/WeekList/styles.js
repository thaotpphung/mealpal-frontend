import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    height: '55px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    cursor: 'pointer',
    '&hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
}));

export default useStyles;
