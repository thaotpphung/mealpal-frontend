import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Button, FormControl } from '@material-ui/core';
import useStyles from '../../../containers/styles';
import { styles } from './styles';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';
import Pagination from '@material-ui/lab/Pagination';
import { getAllWeeks } from '../../../redux/actions/weekActions';
import FunctionsIcon from '@material-ui/icons/Functions';
import SearchIcon from '@material-ui/icons/Search';
import Input from '../../common/Input/Input';
import usePagination from '../../../utils/hooks/usePagination';

const ExplorePage = () => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const {
    weeks,
    count: weekCount,
    currentCount,
  } = useSelector((state) => state.weekList);

  useEffect(() => {
    dispatch(getAllWeeks(buildQuery()));
  }, []);

  useEffect(() => {
    setPageCount(weekCount);
  }, [weekCount]);

  const initialState = {
    weekDiet: '',
    weekName: '',
    caloGoal: '',
  };

  // pagination & filtering
  const {
    count,
    page,
    buildQuery,
    handleSubmitFilter,
    handleChangePage,
    handleChangeQueryField,
    setPageCount,
  } = usePagination(initialState, 9, () => dispatch(getAllWeeks(buildQuery())));

  return (
    <div>
      <div className={classes.utilsBar}>
        <FormControl className={localClasses.formControl}>
          <Input
            name="weekName"
            label="Week Name"
            handleChange={handleChangeQueryField}
          />
        </FormControl>
        <FormControl className={localClasses.formControl}>
          <Input
            label="Calories Goal"
            handleChange={handleChangeQueryField}
            endAction={
              <IconButton>
                <FunctionsIcon />
              </IconButton>
            }
          />
        </FormControl>
        <FormControl className={localClasses.formControl}>
          <Input
            name="weekDiet"
            handleChange={handleChangeQueryField}
            label="Diet"
          />
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSubmitFilter(currentCount)}
        >
          <SearchIcon /> Search
        </Button>
      </div>

      <Button variant="outlined" color="primary">
        + Week
      </Button>

      <Grid container alignItems="stretch" spacing={3}>
        {Object.values(weeks).map((week, weekIdx) => (
          <Grid
            key={`{'explore-page-${week._id}-${weekIdx}`}
            item
            xs={12}
            sm={4}
            md={4}
          >
            <WeekInfoCard week={week} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={count}
        page={page}
        boundaryCount={2}
        onChange={handleChangePage}
        className={classes.pagination}
        showLastButton
        showFirstButton
      />
    </div>
  );
};

export default ExplorePage;
