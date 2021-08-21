import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {},
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 3),
    marginBottom: theme.spacing(4),
    width: "80%",
    margin: "auto",
    alignItems: "center"
  }
}));