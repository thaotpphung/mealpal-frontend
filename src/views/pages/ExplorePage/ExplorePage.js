import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Button } from '@material-ui/core';
import useStyles from '../../../containers/styles';
import { styles } from './styles';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';
import Pagination from '@material-ui/lab/Pagination';
import { getAllWeeks } from '../../../redux/actions/weekActions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FunctionsIcon from '@material-ui/icons/Functions';
import SearchIcon from '@material-ui/icons/Search';
import Input from '../../common/Input/Input';

const ExplorePage = () => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const { weeks, count: weekCount } = useSelector((state) => state.weekList);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1); // number of total page on load
  const [currentCount, setCurrentCount] = useState(1); // number of total page on filter
  const [weekDiet, setWeekDiet] = useState('');
  const [weekName, setWeekName] = useState('');

  const buildPaginateQuery = (page) => {
    return `?limit=${limit}&page=${page}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWeekName(value);
  };

  useEffect(() => {
    dispatch(getAllWeeks(buildPaginateQuery()));
  }, []);

  useEffect(() => {
    const pageCount = weekCount / limit;
    setCount(pageCount !== 1 ? Math.floor(pageCount) + 1 : pageCount);
  }, [weeks, limit]);

  const handleChangePage = (event, value) => {
    dispatch(getAllWeeks(buildPaginateQuery(value)));
    setPage(value);
  };

  const handleSubmitFilter = () => {
    let filterQuery = '?';
    if (weekName !== '') filterQuery += `&weekName=${weekName}`;
    if (weekDiet !== '') filterQuery += `&weekDiet=${weekDiet}`;
    filterQuery = filterQuery !== '?' ? filterQuery : '';
    console.log('filter', filterQuery);
    dispatch(getAllWeeks(filterQuery));
  };

  return (
    <div>
      <div className={classes.utilsBar}>
        <FormControl className={localClasses.formControl}>
          <Input
            name="weekName"
            label="Week Name"
            handleChange={handleChange}
          />
        </FormControl>
        <FormControl className={localClasses.formControl}>
          <Input
            label="Calories Goal"
            endAction={
              <IconButton>
                <FunctionsIcon />
              </IconButton>
            }
          />
        </FormControl>
        <FormControl className={localClasses.formControl}>
          <InputLabel id="demo-simple-select-label">Diet</InputLabel>
          <Select labelId="demo-simple-select-label" value={weekDiet}>
            <MenuItem value={10}>Vegan</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" color="primary" onClick={handleSubmitFilter}>
          <SearchIcon /> Search
        </Button>
      </div>

      <Grid
        className={localClasses.container}
        container
        alignItems="stretch"
        spacing={3}
      >
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
