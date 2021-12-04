import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Tooltip } from '@material-ui/core';
import useStyles from '../../../app/styles';
import { useHistory, useParams } from 'react-router-dom';
import { getAllWeeks, createWeek } from '../../../redux/actions/weekActions';
import SearchIcon from '@material-ui/icons/Search';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import WeekList from '../../containers/WeekList/WeekList';
import PaginatedTable from '../../containers/PaginatedTable/PaginatedTable';
import usePagination from '../../../utils/hooks/usePagination';
import useInput from '../../../utils/hooks/useInput';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import { validate } from '../../../utils/validations/validate';
import { getInitialWeekForm, weekFormFields } from '../../../utils/forms/weeks';
import { updateUser } from '../../../redux/actions/userActions';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';

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

  // pagination & filtering
  const {
    pageCount,
    count,
    page,
    limit,
    buildQuery,
    handleSubmitFilter,
    handleChangePage,
    handleChangeLimit,
    handleChangeQueryField,
    handleChangePageCount,
    handleChangePageAndLimit,
    queryFields,
  } = usePagination(
    { name: '', description: '', calories: '', tags: '' },
    loggedInUser.weekView === 'table' ? 0 : 1,
    loggedInUser.weekView === 'table' ? 5 : 9,
    (page, limit) => {
      dispatch(getAllWeeks(buildQuery(page, limit), isInExploreMode, userId));
    },
    '&fields=userId,name,description,calories,tags,updatedTime'
  );

  // view
  const defaultView = loggedInUser ? loggedInUser.weekView : 'board';
  const [view, toggleView] = useToggle(defaultView === 'board' ? false : true); // initially the view is board view

  const viewOptions = {
    table: {
      value: true,
      defaultLimit: 5,
      defaultPage: 0,
    },
    board: {
      value: false,
      defaultLimit: 9,
      defaultPage: 1,
    },
  };
  const handleChangeView = () => {
    if (view) {
      handleChangePageAndLimit(1, 9);
      dispatch(getAllWeeks(buildQuery(1, 9), isInExploreMode, userId));
      handleChangePageCount(weekCount, 9);
    } else {
      handleChangePageAndLimit(0, 5);
      dispatch(getAllWeeks(buildQuery(1, 5), isInExploreMode, userId));
      handleChangePageCount(weekCount, 5);
    }
    toggleView();
  };

  const handleSetDefaultView = () => {
    dispatch(
      updateUser(loggedInUser._id, { weekView: view ? 'table' : 'board' })
    );
  };

  // get initial weeks
  useEffect(() => {
    if (loggedInUser.weekView === 'table') {
      handleChangePageAndLimit(0, 5);
    }
    console.log('get all weeks in use effect');
    dispatch(getAllWeeks(buildQuery(0, 5), isInExploreMode, userId));
  }, []);

  // set count for pagination when weeks have been loaded or a query has been submitted
  useEffect(() => {
    handleChangePageCount(weekCount, loggedInUser.weekView === 'table' ? 5 : 9);
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
    ['description', 'tags']
  );

  // explore mode
  const [isInExploreMode, toggleIsInExploreMode] = useToggle(false);

  const handleChangeMode = () => {
    dispatch(getAllWeeks(buildQuery(), !isInExploreMode, userId));
    toggleIsInExploreMode();
  };

  if (!loading && error) return <EmptyMessage />;

  if (!loading && weeks.length >= 0)
    return (
      <div>
        {/* Change View */}
        <div style={{ float: 'right' }}>
          {loggedInUser && (
            <Tooltip
              title="Set current view as default"
              placement="top"
              style={{ marginRight: '8px' }}
            >
              <span>
                <RoundButton
                  type="default"
                  handleClick={handleSetDefaultView}
                />
              </span>
            </Tooltip>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangeView}
          >
            {view ? (
              <ViewModuleIcon fontSize="small" />
            ) : (
              <ViewListIcon fontSize="small" />
            )}
            &nbsp;{view ? 'Board' : 'Table'} View
          </Button>
        </div>
        {/* search bar and action */}
        <Grid container spacing={3} style={{ marginBottom: '12px' }}>
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
                label="Calories"
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
                <SearchIcon fontSize="small" />
                &nbsp;Search
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
                    &nbsp;Explore
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        {/* weeks */}
        {!view ? (
          <WeekList
            weeks={weeks}
            count={pageCount}
            page={page}
            handleChangePage={handleChangePage}
          />
        ) : (
          <PaginatedTable
            title="weeks"
            data={weeks}
            count={count}
            limit={limit}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeLimit={handleChangeLimit}
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
