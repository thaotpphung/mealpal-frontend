import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { Paper, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { getAllWeeks } from '../../../redux/actions/weekActions';
import { setSelectedWeek } from '../../../redux/actions/selectActions';
import routes from '../../../constants/routes';

const WeekList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { selectedWeek } = useSelector((state) => state.select);
  const { weeks } = useSelector((state) => state.weekList);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllWeeks());
  }, []);

  const handleSelectWeek = (week) => {
    dispatch(setSelectedWeek(week));
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div>Week List</div>
        <div className={classes.action}>
          <IconButton onClick={() => history.push(routes.NEW_WEEK_PAGE)}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.content}>
        <ul className={classes.list}>
          {Object.values(weeks).map((week) => (
            <li
              key={week._id}
              className={`${classes.item} ${
                week._id === selectedWeek.id ? classes.selected : null
              }`}
              onClick={() => handleSelectWeek(week)}
            >
              <div className={classes.itemIcon}></div>
              <div className={classes.itemContent}>{week.weekName}</div>
              <div className={classes.itemAction}>
                {currentUser.currentWeek._id === week._id && (
                  <StarOutlineIcon />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  );
};

export default WeekList;
