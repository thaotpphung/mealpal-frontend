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
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  activeClassName: {
    color: theme.palette.primary.main,
  },
  logo: {
    height: '40px',
    margin: theme.spacing(1),
  },
}));

export default useStyles;
