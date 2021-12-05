import React, { useState } from 'react';
import useStyles from '../../../app/styles';
import { formatTime } from '../../../utils/time';
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
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

const headCells = [
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
    label: 'Last Updated',
  },
];

const WeekTable = ({
  data,
  count,
  page,
  limit,
  handleChangePage,
  handleChangeLimit,
  title,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
    handleChangeLimit(parseInt(event.target.value, 10), 0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.tableRoot}>
      <Paper className={classes.tablePaper}>
        <PaginatedTableToolbar numSelected={selected.length} title={title} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <PaginatedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
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
                    <TableCell className={classes.tableCellOverflow}>
                      {row.tags.map((tag, tagIdx) => (
                        <Chip
                          key={`tag-${tagIdx}`}
                          label={tag}
                          className={classes.tag}
                        />
                      ))}
                    </TableCell>
                    <TableCell>{formatTime(row.updatedTime)}</TableCell>
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
};

export default WeekTable;
