import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import useStyles from '../../../app/styles';
import { useHistory, useParams } from 'react-router-dom';
import WeekCard from '../../components/WeekCard/WeekCard';
import { getAllWeeks, createWeek } from '../../../redux/actions/weekActions';
import SearchIcon from '@material-ui/icons/Search';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import PageNav from '../../common/PageNav/PageNav';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
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
  const { userId } = useParams();
  const history = useHistory();
  const { loggedInUser } = useSelector((state) => state.user);
  const {
    loading,
    weeks,
    count: weekCount,
    currentCount,
    error,
  } = useSelector((state) => state.weekList);

  useEffect(() => {
    dispatch(getAllWeeks(buildQuery(), isInExploreMode, userId));
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
        createWeek({ ...dialogValue, userId: loggedInUser._id }, history)
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
    { ...getInitialWeekForm(false) },
    9,
    (value) =>
      dispatch(getAllWeeks(buildQuery(value), isInExploreMode, userId)),
    '&fields=userId,weekName,weekDescription,weekDiet,caloGoal,planTag,updatedTime'
  );

  // explore mode
  const [isInExploreMode, toggleIsInExploreMode] = useToggle(false);
  const handleChangeMode = () => {
    dispatch(getAllWeeks(buildQuery(undefined), !isInExploreMode, userId));
    toggleIsInExploreMode();
  };

  if (!loading && error) return <EmptyMessage />;

  if (!loading && weeks.length >= 0)
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item sm={12} md={12} lg={9}>
            <div className={classes.utilsFields}>
              {weekFormFields.map((field, fieldIdx) => (
                <Input
                  key={`weekfieldform-${field.name}-${fieldIdx}`}
                  name={field.name}
                  label={field.label}
                  handleChange={handleChangeQueryField}
                  type={field.type ? field.type : 'text'}
                  step={field.step}
                />
              ))}
            </div>
          </Grid>
          <Grid item sm={12} md={12} lg={3}>
            <div className={classes.utilsActions}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSubmitFilter(currentCount)}
              >
                <SearchIcon fontSize="small" /> Search
              </Button>
              {loggedInUser && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={toggleOpenEditMode}
                  >
                    <AddBoxOutlinedIcon fontSize="small" />
                    &nbsp;Week
                  </Button>
                  <Button
                    variant={isInExploreMode ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={handleChangeMode}
                  >
                    <ExploreOutlinedIcon fontSize="small" /> Explore
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        {weeks.length === 0 ? (
          <EmptyMessage />
        ) : (
          <>
            <Grid
              container
              alignItems="stretch"
              spacing={3}
              className={classes.listContainer}
            >
              {weeks.map((week, weekIdx) => (
                <Grid
                  key={`{'explore-page-${week._id}-${weekIdx}`}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <WeekCard week={week} />
                </Grid>
              ))}
            </Grid>
            <PageNav
              count={count}
              page={page}
              handleChangePage={handleChangePage}
              className={classes.pagination}
            />
          </>
        )}
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
                  step={field.step}
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
