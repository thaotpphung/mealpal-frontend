import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Button, FormControl } from '@material-ui/core';
import useStyles from '../../../containers/styles';
import { useHistory } from 'react-router-dom';
import { styles } from './styles';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';
import Pagination from '@material-ui/lab/Pagination';
import { getAllWeeks, createWeek } from '../../../redux/actions/weekActions';
import FunctionsIcon from '@material-ui/icons/Functions';
import SearchIcon from '@material-ui/icons/Search';
import Input from '../../common/Input/Input';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import usePagination from '../../../utils/hooks/usePagination';
import useDialog from '../../../utils/hooks/useDialog';
import useForm from '../../../utils/hooks/useForm';
import { validate } from '../../../utils/validations/validate';

const ExplorePage = () => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    weeks,
    count: weekCount,
    currentCount,
  } = useSelector((state) => state.weekList);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllWeeks(buildQuery()));
  }, []);

  useEffect(() => {
    setPageCount(weekCount);
  }, [weekCount]);

  const initialState = {
    weekName: '',
    weekDiet: '',
    caloGoal: '',
    weekDescription: '',
    planTag: '',
  };

  // create recipe dialog
  const { open, toggleOpen, handleClose } = useDialog(() => reset());
  const {
    values: dialogValue,
    handleSubmit,
    handleChange,
    reset,
    errors,
  } = useForm(
    initialState,
    () => {
      dispatch(
        createWeek({ ...dialogValue, userId: currentUser._id }, history)
      );
    },
    validate,
    ['weekDescription', 'planTag']
  );

  // pagination & filtering
  const {
    count,
    page,
    buildQuery,
    handleSubmitFilter,
    handleChangePage,
    handleChangeQueryField,
    setPageCount,
  } = usePagination(initialState, 9, (value) =>
    dispatch(getAllWeeks(buildQuery(value)))
  );

  return (
    <div>
      <div className={classes.utilsBar}>
        <div className={classes.utilsFields}>
          <Input
            name="weekName"
            label="Week Name"
            handleChange={handleChangeQueryField}
          />
          <Input
            name="caloGoal"
            label="Calories Goal"
            type="number"
            handleChange={handleChangeQueryField}
            endAction={
              <IconButton>
                <FunctionsIcon />
              </IconButton>
            }
          />
          <Input
            name="weekDiet"
            handleChange={handleChangeQueryField}
            label="Diet"
          />
          <Input
            name="planTag"
            handleChange={handleChangeQueryField}
            label="Plan Tag"
          />
        </div>
        <div className={classes.utilsActions}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSubmitFilter(currentCount)}
          >
            <SearchIcon /> Search
          </Button>
          <Button variant="outlined" color="primary" onClick={toggleOpen}>
            + Week
          </Button>
        </div>
      </div>

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

      <PopupDialog
        open={open}
        title="Add a new week"
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        content={
          <div className={classes.formContainer}>
            <Input
              name="weekName"
              label="Week Name"
              value={dialogValue.weekName}
              handleChange={handleChange}
              error={errors?.weekName}
            />
            <Input
              name="weekDescription"
              label="Week Description"
              value={dialogValue.weekDescription}
              handleChange={handleChange}
              error={errors?.weekDescription}
            />
            <Input
              name="caloGoal"
              label="Calories Goal"
              type="number"
              value={dialogValue.caloGoal}
              handleChange={handleChange}
              error={errors?.caloGoal}
            />
            <Input
              name="weekDiet"
              label="Diet"
              value={dialogValue.weekDiet}
              handleChange={handleChange}
              error={errors?.weekDiet}
            />
            <Input
              name="planTag"
              value={dialogValue.planTag}
              handleChange={handleChange}
              label="Plan Tag"
              error={errors?.planTag}
            />
          </div>
        }
      />
    </div>
  );
};

export default ExplorePage;
