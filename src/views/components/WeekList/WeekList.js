import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../containers/styles';
import { Paper } from '@material-ui/core';
import { setSelectedWeek } from '../../../redux/actions/selectActions';
import RoundButton from '../../common/Buttons/RoundButton';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import CardHeader from '../../common/CardHeader/CardHeader';

const WeekList = ({ weeks, toggleOpen }) => {
  const classes = useStyles();
  const [selectedWeek, setSelectedWeek] = useState(currentUser.currentWeek);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Paper>
      <CardHeader
        title="Plan's Weeks"
        action={<RoundButton handleClick={() => toggleOpen(true)} type="add" />}
      />
      <div className={classes.content}>
        <ul className={classes.list}>
          {weeks.map((week) => (
            <li
              key={week._id}
              className={`${classes.item} ${
                week._id === selectedWeek ? classes.selected : null
              }`}
              onClick={() => setSelectedWeek(week._id)}
            >
              <div className={classes.itemIcon}></div>
              <div className={classes.itemContent}>{week?.weekName}</div>
              <div className={classes.itemAction}>
                {currentUser.currentWeek._id === week?._id && (
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
