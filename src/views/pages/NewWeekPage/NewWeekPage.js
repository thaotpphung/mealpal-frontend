import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { Button, Typography, TextField } from '@material-ui/core';
// import Menu from '../../components/Menu/Menu';
// import EditIcon from '@material-ui/icons/Edit';
// import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { createWeek } from '../../../redux/actions/weekActions';
import Spinner from '../../common/Spinner/Spinner';

const NewWeekPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.weekList);
  const { currentUser } = useSelector((state) => state.user);

  const [initialWeek, setInitialWeek] = useState({
    weekName: 'test',
    weekDescription: 'test',
    weekTags: ['test', 'test'],
    weekDiet: 'vegan',
  });

  const { weekName, weekDescription, weekTags, weekDiet } = initialWeek;

  const handleSubmitInitialWeek = async () => {
    dispatch(createWeek({ ...initialWeek, userId: currentUser._id }));
    history.push('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = name === 'weekTags' ? value.split(',') : value;
    setInitialWeek({ ...initialWeek, [name]: formattedValue });
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Typography variant="h3">Create New Week Form</Typography>
      <div className={classes.formRow}>
        <Typography>Name</Typography>
        <div>
          <TextField
            variant="outlined"
            name="weekName"
            value={weekName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={classes.formRow}>
        <Typography>Description</Typography>
        <div>
          <TextField
            variant="outlined"
            name="weekDescription"
            value={weekDescription}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={classes.formRow}>
        <Typography>Diet</Typography>
        <div>
          <TextField
            variant="outlined"
            name="weekDiet"
            value={weekDiet}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={classes.formRow}>
        <Typography>Tags</Typography>
        <div>
          <TextField
            variant="outlined"
            name="weekTags"
            value={weekTags}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleSubmitInitialWeek}
      >
        Submit
      </Button>
    </div>
  );
};

export default NewWeekPage;
