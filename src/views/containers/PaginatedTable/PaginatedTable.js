import React, { useState } from 'react';
import useStyles from '../../../app/styles';
import { formatTime } from '../../../utils/time';
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PaginatedTableHead from './PaginatedTableHead';
import PaginatedTableToolbar from './PaginatedTableToolbar';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import TagList from '../../containers/TagList/TagList';
import { colors } from '../../../constants/colors';

const PaginatedTable = ({
  handleClickDelete,
  loading,
  error,
  data,
  count,
  page,
  sort,
  sortOrder,
  limit,
  handleChangeLimitAndPage,
  handleChangeSort,
  title,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);

  let headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Description',
    },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    {
      id: 'tags',
      numeric: false,
      disablePadding: false,
      label: 'Tags',
    },
    {
      id: 'updatedTime',
      numeric: false,
      disablePadding: false,
      label: 'Updated',
    },
    {
      id: 'username',
      numeric: false,
      disablePadding: false,
      label: 'Username',
    },
  ];

  if (title === 'recipes') {
    headCells.splice(4, 0, {
      id: 'ingredients',
      numeric: false,
      disablePadding: false,
      label: 'Ingredients',
    });
  }

  const handleRequestSort = (event, property) => {
    const isAsc = sort === property && sortOrder === 'asc';
    handleChangeSort(property, isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    handleChangeLimitAndPage(newLimit);
  };

  const handleChangePage = (event, newValue) => {
    handleChangeLimitAndPage(limit, newValue);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDelete = () => {
    handleClickDelete(selected);
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  if (!loading && error) return <EmptyMessage />;
  if (!loading && data.length >= 0)
    return (
      <div className={classes.tableRoot}>
        <Paper className={classes.tablePaper}>
          <PaginatedTableToolbar
            title={title}
            selected={selected}
            handleClickDelete={handleDelete}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <PaginatedTableHead
                numSelected={selected.length}
                sort={sort}
                sortOrder={sortOrder}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
                headCells={headCells}
              />
              <TableBody>
                {data.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      onClick={(event) => handleClick(event, row._id)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        className={classes.clickable}
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={() =>
                          history.push(
                            `/users/${row.userId._id}/${title}/${row._id}`
                          )
                        }
                      >
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.tableCellOverflow}>
                        {row.description}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <Tooltip title={row.tags.join(', ')} placement="top">
                        <TableCell className={classes.tableCellOverflow}>
                          <TagList
                            data={row.tags}
                            title={`itemTags-${index}`}
                          />
                        </TableCell>
                      </Tooltip>
                      {title === 'recipes' && (
                        <Tooltip
                          title={row.ingredients
                            .map((ingredient) => ingredient.ingredientName)
                            .join(', ')}
                          placement="top"
                        >
                          <TableCell className={classes.tableCellOverflow}>
                            {row.ingredients.map(
                              (ingredient, ingredientIdx) => (
                                <span key={`row-${index}-tag-${ingredientIdx}`}>
                                  {ingredient.ingredientName !== '' && (
                                    <Chip
                                      style={{
                                        backgroundColor:
                                          colors[ingredientIdx % colors.length],
                                      }}
                                      label={ingredient.ingredientName}
                                      className={classes.tag}
                                    />
                                  )}
                                </span>
                              )
                            )}
                          </TableCell>
                        </Tooltip>
                      )}
                      <TableCell>{formatTime(row.updatedTime)}</TableCell>
                      <TableCell
                        className={classes.clickable}
                        onClick={() =>
                          history.push(`/users/${row.userId._id}/profile`)
                        }
                      >
                        {row.userId.username}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
    );
  return <Spinner />;
};

export default PaginatedTable;
