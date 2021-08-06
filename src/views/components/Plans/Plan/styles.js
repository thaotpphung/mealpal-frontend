import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  // cardActions: {
  //   padding: '0 16px 8px 16px',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  // },
  chips: {
    margin: theme.spacing(2, 0),
    '& > *': {
      margin: theme.spacing(0.2)
    }
  }
}));

