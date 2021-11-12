import React from 'react';
import useStyles from './styles';
import { Typography } from '@material-ui/core';
import RoundButton from '../Buttons/RoundButton';

const CardHeader = ({
  title,
  action,
  useEditMode = false,
  useEditCondition = false,
  showEdit = false,
  handleOpenEdit = () => {},
  handleCloseEdit = () => {},
}) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography variant="h6" className={classes.headerTitle}>
        {title}
      </Typography>
      <div className={classes.action}>
        {action}
        {useEditMode && useEditCondition && (
          <>
            {showEdit ? (
              <RoundButton type={'cancel'} handleClick={handleCloseEdit} />
            ) : (
              <RoundButton type={'edit'} handleClick={handleOpenEdit} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
