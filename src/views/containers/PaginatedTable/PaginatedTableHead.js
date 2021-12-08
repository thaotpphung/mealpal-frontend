import React from 'react';
import useStyles from '../../../app/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

const PaginatedTableHead = ({
  headCells,
  onSelectAllClick,
  sort,
  sortOrder,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={sort === headCell.id ? sortOrder : false}
          >
            <TableSortLabel
              active={sort === headCell.id}
              direction={sort === headCell.id ? sortOrder : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {sort === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {sortOrder === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default PaginatedTableHead;
