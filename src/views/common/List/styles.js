import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    padding: theme.spacing(0, 2),
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.light,
  },
  list: {
    listStyle: "none",
  },
  item: {
    height: "55px",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    cursor: "pointer",
    '&hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  itemIcon: {
    flex: "0 0 auto",
    marginRight: theme.spacing(3),
  },
  itemContent: {
    flex: "1 1 auto",
  },
  itemAction: {
    flex: "0 0 auto",
    marginTop: theme.spacing(-1),
    marginRight: theme.spacing(-1)
  },
  selected: {
    backgroundColor: theme.palette.grey[200]
  }
}));

export default useStyles;
