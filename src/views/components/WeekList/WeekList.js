import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../containers/styles';
import { Paper } from '@material-ui/core';
import { setSelectedWeek } from '../../../redux/actions/selectActions';
import RoundButton from '../../common/Buttons/RoundButton';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import CardHeader from '../../common/CardHeader/CardHeader';

const WeekList = ({ toggleOpen }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selectedWeek } = useSelector((state) => state.select);
  const { weeks } = useSelector((state) => state.weekList);
  const { currentUser } = useSelector((state) => state.user);

  const handleSelectWeek = (week) => {
    dispatch(setSelectedWeek(week));
  };

  return (
    <Paper>
      <CardHeader
        title="Week List"
        action={<RoundButton handleClick={() => toggleOpen(true)} type="add" />}
      />
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
