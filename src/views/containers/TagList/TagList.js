import React from 'react';
import { Chip } from '@material-ui/core';
import useStyles from '../../../app/styles';
import { colors } from '../../../constants/colors';

const TagList = ({ data, title }) => {
  const classes = useStyles();

  return (
    <>
      {data.map((item, itemIdx) => (
        <span key={`${title}-${item}-${itemIdx}`}>
          {item !== '' && (
            <Chip
              size="small"
              label={item}
              className={classes.tag}
              style={{ backgroundColor: colors[itemIdx % colors.length] }}
            />
          )}
        </span>
      ))}
    </>
  );
};

export default TagList;
