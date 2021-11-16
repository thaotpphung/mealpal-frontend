import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    margin: theme.spacing(1, 1.5),
    fontSize: 15,
  },
  activeClassName: {
    color: theme.palette.primary.main,
  },
  logo: {
    height: '42px',
    margin: theme.spacing(1.4),
  },
}));

export default useStyles;
