import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Tooltip } from '@material-ui/core';
import useStyles from '../../../app/styles';
import { useHistory, useParams } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import AutocompleteTag from '../../common/AutocompleteTag/AutocompleteTag';
import WeekCard from '../../components/WeekCard/WeekCard';
import CardList from '../../containers/CardList/CardList';
import PaginatedTable from '../../containers/PaginatedTable/PaginatedTable';
import usePagination from '../../../utils/hooks/usePagination';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import useDidMountEffect from '../../../utils/hooks/useDidMountEffect';
import useToggle from '../../../utils/hooks/useToggle';
import { validate } from '../../../utils/validations/validate';
import { getInitialWeekForm, weekFormFields } from '../../../utils/forms/weeks';
import views from '../../../constants/views';
import { updateUser } from '../../../redux/actions/userActions';
import {
  getAllWeeks,
  createWeek,
  getAllWeeksInfinite,
  deleteWeeks,
} from '../../../redux/actions/weekActions';

const WeekPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();
  const { loggedInUser, loadingUpdate } = useSelector((state) => state.user);
  const {
    loadingMore,
    loading,
    weeks,
    count: weekCount,
    error,
    currentCount,
  } = useSelector((state) => state.weekList);

  // pagination & filtering
  const {
    pageCount,
    count,
    page,
    limit,
    buildQuery,
    handleSubmitFilter,
    handleChangeQueryField,
    handleChangePageCount,
    handleChangeLimitAndPage,
    queryFields,
    sort,
    sortOrder,
    handleChangeSort,
  } = usePagination(
    { name: '', description: '', tags: '', calories: '' },
    views[loggedInUser ? loggedInUser.weekView : 'board'].limit,
    (newLimit, newPage = 0, newSort = sort, newSortOrder = sortOrder) => {
      if (view === 'board') {
        dispatch(
          getAllWeeksInfinite(
            buildQuery(limit, newPage, newSort, newSortOrder),
            isInExploreMode,
            userId
          )
        );
      } else {
        dispatch(
          getAllWeeks(
            buildQuery(newLimit, newPage, newSort, newSortOrder),
            isInExploreMode,
            userId
          )
        );
      }
    },
    'userId,name,description,calories,tags,updatedTime',
    {
      tags: 'array',
      calories: 'number',
    }
  );

  useEffect(() => {
    dispatch(
      getAllWeeks(
        buildQuery(limit, page, sort, sortOrder),
        isInExploreMode,
        userId
      )
    );
  }, []);

  // view
  const defaultView = loggedInUser ? loggedInUser.weekView : 'board';
  const [view, setView] = useState(defaultView);
  const handleChangeView = () => {
    const newView = view === 'board' ? 'table' : 'board';
    setView(newView);
  };

  // explore mode
  const [isInExploreMode, toggleIsInExploreMode] = useToggle(false);
  const handleChangeMode = () => {
    toggleIsInExploreMode();
  };

  // set count for pagination when week list are updated
  useEffect(() => {
    handleChangePageCount(weekCount);
  }, [weekCount]);

  // set hasMore when week list are updated
  useEffect(() => {
    setHasMore(currentCount !== 0);
  }, [weeks]);

  // when changing view or isInExploreMode, make an api call to get week list with page 0 and new limit
  useDidMountEffect(() => {
    const newLimit = views[view].limit;
    handleChangeLimitAndPage(newLimit, 0, false);
    dispatch(
      getAllWeeks(
        buildQuery(newLimit, 0, sort, sortOrder),
        isInExploreMode,
        userId
      )
    );
  }, [view, isInExploreMode]);

  // infinite strolling
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (weeks.length >= limit) handleChangeLimitAndPage(limit, 'next');
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // set user default view
  const handleSetDefaultView = () => {
    dispatch(updateUser(loggedInUser._id, { weekView: view }));
  };

  // create week dialog
  const [tags, setTags] = useState([]);
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      reset();
      setTags([]);
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
            tags,
            userId: loggedInUser._id,
          },
          history
        )
      );
    },
    validate,
    ['description', 'tags']
  );

  // delete weeks
  const handleClickDelete = (selected) => {
    dispatch(
      deleteWeeks(selected, loggedInUser, buildQuery(limit, 0, sort, sortOrder))
    );
  };

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
                loading={loadingUpdate}
              />
            </span>
          </Tooltip>
        )}
        <Button variant="contained" color="primary" onClick={handleChangeView}>
          {views[view].icon}
          &nbsp;{views[view].label} View
        </Button>
      </div>
      {/* search bar and action */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(
            getAllWeeks(
              buildQuery(limit, page, sort, sortOrder),
              isInExploreMode,
              userId
            )
          );
        }}
      >
        <Grid container spacing={3} style={{ marginBottom: '8px' }}>
          <Grid item xs={12} lg={9}>
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
                tooltip='Ex: "2000", or "0, 2000" or "0," or ",2000"'
                handleChange={handleChangeQueryField}
              />
              <InputWithTooltip
                value={queryFields.tags}
                label="Tags"
                name="tags"
                tooltip='Ex: "Weight Loss Program, Keto, Vegan"'
                handleChange={handleChangeQueryField}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={3}>
            <div className={classes.utilsActions}>
              <Button
                type="submit"
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
        <CardList
          component={WeekCard}
          loading={loading}
          error={error}
          lastElementRef={lastElementRef}
          data={weeks}
          count={pageCount}
          page={page}
          handleChangeLimitAndPage={handleChangeLimitAndPage}
        />
      ) : (
        <PaginatedTable
          handleClickDelete={handleClickDelete}
          loadingMore={loadingMore}
          loading={loading}
          error={error}
          title="weeks"
          data={weeks}
          count={count}
          limit={limit}
          page={page}
          handleChangeLimitAndPage={handleChangeLimitAndPage}
          sort={sort}
          sortOrder={sortOrder}
          handleChangeSort={handleChangeSort}
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
            <AutocompleteTag setTags={setTags} />
          </div>
        }
      />
    </div>
  );
};

export default WeekPage;
