import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
  content: {
    display: "grid",
    gridTemplateColumns: "2fr 6fr",
    columnGap: theme.spacing(2),
    '& div': {
      padding: theme.spacing(2)
    }
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
  },
  menu: {
    '& li': {
      paddingBottom: theme.spacing(0.5),
    }
  }
}));