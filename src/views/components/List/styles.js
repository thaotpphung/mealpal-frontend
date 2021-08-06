import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.light,
  },
  list: {
    listStyle: "none",
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    // border: `1px solid ${theme.palette.divider}`
  },
  itemAvatar: {
    flex: "0 0 auto",
    marginRight: theme.spacing(3)
  },
  itemContent: {
    flex: "1 1 auto",
  },
  itemAction: {
    flex: "0 0 auto",
    alignSelf: "flex-start",
    marginTop: theme.spacing(-1),
    marginRight: theme.spacing(-1)
  }
}));

export default useStyles;
