import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import useStyles from '../../../containers/styles';
import { useHistory } from 'react-router-dom';
import { styles } from './styles';
import WeekCard from '../../components/WeekCard/WeekCard';
import Pagination from '@material-ui/lab/Pagination';
import { getAllWeeks, createWeek } from '../../../redux/actions/weekActions';
import SearchIcon from '@material-ui/icons/Search';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import usePagination from '../../../utils/hooks/usePagination';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import { validate } from '../../../utils/validations/validate';
import { getInitialWeekForm, weekFormFields } from '../../../utils/forms/weeks';

const WeekPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.user);
  const {
    weeks,
    count: weekCount,
    currentCount,
    loading,
  } = useSelector((state) => state.weekList);

  useEffect(() => {
    dispatch(getAllWeeks(buildQuery()));
  }, []);

  useEffect(() => {
    setPageCount(weekCount);
  }, [weekCount]);

  // create week dialog
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => reset()
  );
  const {
    values: dialogValue,
    handleSubmit,
    handleChange,
    reset,
    errors,
  } = useForm(
    getInitialWeekForm(false),
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
  } = usePagination(
    getInitialWeekForm(false),
    9,
    (value) =>
      dispatch(
        getAllWeeks(buildQuery(value, isInExploreMode ? '&all=true' : ''))
      ),
    '&fields=userId,weekName,weekDescription,weekDiet,caloGoal,planTag'
  );

  // explore mode
  const [isInExploreMode, toggleIsInExploreMode] = useToggle(false);
  const handleChangeMode = () => {
    dispatch(
      getAllWeeks(buildQuery(undefined, !isInExploreMode ? '&all=true' : ''))
    );
    toggleIsInExploreMode();
  };

  if (!loading && weeks.length >= 0)
    return (
      <div>
        <div className={classes.utilsBar}>
          <div className={classes.utilsFields}>
            {weekFormFields.map((field, fieldIdx) => (
              <Input
                key={`weekfieldform-${field.name}-${fieldIdx}`}
                name={field.name}
                label={field.label}
                handleChange={handleChangeQueryField}
                type={field.type ? field.type : 'text'}
              />
            ))}
          </div>
          <div className={classes.utilsActions}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleSubmitFilter(currentCount)}
            >
              <SearchIcon /> Search
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleOpenEditMode}
            >
              + Week
            </Button>
            <Button
              variant={isInExploreMode ? 'contained' : 'outlined'}
              color="primary"
              onClick={handleChangeMode}
            >
              Explore
            </Button>
          </div>
        </div>
        <Grid container alignItems="stretch" spacing={3}>
          {weeks.map((week, weekIdx) => (
            <Grid
              key={`{'explore-page-${week._id}-${weekIdx}`}
              item
              xs={12}
              sm={3}
              md={3}
            >
              <WeekCard week={week} />
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
          open={openEditMode}
          title="Add a new week"
          handleClose={handleCloseEditMode}
          handleSubmit={handleSubmit}
          content={
            <div className={classes.formContainer}>
              {weekFormFields.map((field, fieldIdx) => (
                <Input
                  key={`new-week-form-field-${field.name}-${fieldIdx}`}
                  name={field.name}
                  label={field.label}
                  value={dialogValue[field.name]}
                  handleChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                  type={field.type ? field.type : 'text'}
                />
              ))}
            </div>
          }
        />
      </div>
    );
  return <Spinner />;
};

export default WeekPage;
