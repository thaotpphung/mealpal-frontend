import React, { useEffect, useRef, useCallback, useState } from 'react';
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
    error,
  } = useSelector((state) => state.weekList);

  const views = {
    board: {
      limit: 9,
      icon: <ViewListIcon fontSize="small" />,
      label: 'Table',
    },
    table: {
      limit: 5,
      icon: <ViewModuleIcon fontSize="small" />,
      label: 'Board',
    },
  };

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
    queryFields,
  } = usePagination(
    { name: '', description: '', calories: '', tags: '' },
    views[loggedInUser ? loggedInUser.weekView : 'board'].limit,
    (newLimit, newPage = 0) => {
      dispatch(
        getAllWeeks(buildQuery(newLimit, newPage), isInExploreMode, userId)
      );
    },
    '&fields=userId,name,description,calories,tags,updatedTime'
  );

  // set count for pagination when weeks have been loaded
  useEffect(() => {
    handleChangePageCount(weekCount);
  }, [weekCount]);

  // infinite strolling
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('get more', page);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // view
  const [view, setView] = useState(
    loggedInUser ? loggedInUser.weekView : 'board'
  );
  const handleChangeView = () => {
    setView(view === 'board' ? 'table' : 'board');
  };
  useEffect(() => {
    handleChangeLimit(views[view].limit);
  }, [view]);
  const handleSetDefaultView = () => {
    dispatch(
      updateUser(loggedInUser._id, { weekView: view ? 'table' : 'board' })
    );
  };

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
    dispatch(getAllWeeks(buildQuery(view ? 5 : 9), !isInExploreMode, userId));
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
            {views[view].icon}
            &nbsp;{views[view].label} View
          </Button>
        </div>
        {/* search bar and action */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Grid container spacing={3} style={{ marginBottom: '9px' }}>
            <Grid item sm={9} md={9} lg={9}>
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
            <Grid item sm={9} md={9} lg={3}>
              <div className={classes.utilsActions}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSubmitFilter()}
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
        </form>
        {/* weeks */}
        {view === 'board' ? (
          <WeekList
            lastElementRef={lastElementRef}
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
