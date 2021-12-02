import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import useStyles from '../../../app/styles';
import { useHistory, useParams } from 'react-router-dom';
import { getAllWeeks, createWeek } from '../../../redux/actions/weekActions';
import SearchIcon from '@material-ui/icons/Search';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import PageNav from '../../common/PageNav/PageNav';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import WeekList from '../../components/WeekList/WeekList';
import usePagination from '../../../utils/hooks/usePagination';
import useInput from '../../../utils/hooks/useInput';
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
  const [tags, handleChangeTags, resetTags] = useInput();
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      reset();
      resetTags();
    }
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
        createWeek(
          {
            ...dialogValue,
            tags: tags !== '' ? tags.split(',').map((tag) => tag.trim()) : [],
            userId: loggedInUser._id,
          },
          history
        )
      );
    },
    validate,
    ['description', 'tags', 'weekDiet']
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
    queryFields,
  } = usePagination(
    { name: '', description: '', calories: '', tags: '' },
    9,
    (value) => {
      dispatch(getAllWeeks(buildQuery(value), isInExploreMode, userId));
    },
    '&fields=userId,name,description,calories,tags,updatedTime'
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
        {/* Change View */}
        {/* search bar and action */}
        <Grid container spacing={3}>
          <Grid item sm={12} md={12} lg={9}>
            <div className={classes.utilsFields}>
              <Input
                value={queryFields.name}
                name="name"
                label="Name"
                handleChange={handleChangeQueryField}
              />
              <Input
                value={queryFields.description}
                name="description"
                label="Description"
                handleChange={handleChangeQueryField}
              />
              <InputWithTooltip
                value={queryFields.calories}
                name="calories"
                label="Calories Range"
                tooltip='Exact match, Ex: "2000", or separated by comma to search by range, Ex: "0, 2000" or "0," or ",2000"'
                handleChange={handleChangeQueryField}
              />
              <InputWithTooltip
                value={queryFields.tags}
                label="Tags"
                name="tags"
                tooltip='Separated by comma, Ex: "Weight Loss Program, Keto, Vegan"'
                handleChange={handleChangeQueryField}
              />
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
                    <ExploreOutlinedIcon fontSize="small" />
                    Explore
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        {/* weeks */}
        <WeekList weeks={weeks} />
        {weeks.length !== 0 && (
          <PageNav
            count={count}
            page={page}
            handleChangePage={handleChangePage}
            className={classes.pagination}
          />
        )}
        <PopupDialog
          open={openEditMode}
          title="Add a new week"
          handleClose={handleCloseEditMode}
          handleSubmit={handleSubmit}
          content={
            <div>
              {weekFormFields.map((field, fieldIdx) => (
                <Input
                  key={`new-week-form-field-${field.name}-${fieldIdx}`}
                  name={field.name}
                  label={field.label}
                  value={dialogValue[field.name].toString()}
                  handleChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                  type={field.type ? field.type : 'text'}
                  step={field.step}
                />
              ))}
              <InputWithTooltip
                label="Tags"
                tooltip='Separated by comma, Ex: "Main Course, Chicken, Keto"'
                multiline
                minRows={4}
                value={tags}
                handleChange={handleChangeTags}
              />
            </div>
          }
        />
      </div>
    );
  return <Spinner />;
};

export default WeekPage;
