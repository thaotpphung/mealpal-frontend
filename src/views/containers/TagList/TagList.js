import React from 'react';
import { Chip } from '@material-ui/core';
import useStyles from '../../../app/styles';

const TagList = ({ data, title }) => {
  const classes = useStyles();

  return (
    <>
      {data.map((item, itemIdx) => (
        <span key={`${title}-${item}-${itemIdx}`}>
          {item !== '' && (
            <Chip size="small" label={item} className={classes.tag} />
          )}
        </span>
      ))}
    </>
  );
};

export default TagList;
