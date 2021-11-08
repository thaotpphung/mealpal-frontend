import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#000',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(6, 0),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '70%',
    paddingBottom: theme.spacing(2),
    margin: 'auto',
  },
  item: {
    '& h6': {
      marginBottom: theme.spacing(1),
    },
  },
  icons: {
    '& svg': {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.contrastText,
    },
  },
  copyRight: { textAlign: 'center' },
}));

export default useStyles;
