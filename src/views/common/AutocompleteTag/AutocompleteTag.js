import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Input from '../Input/Input';
import { colors } from '../../../constants/colors';

const AutocompleteTag = ({ setTags, defaultValue = [] }) => {
  return (
    <Autocomplete
      onChange={(event, value) => {
        setTags(value);
      }}
      multiple
      options={[]}
      defaultValue={defaultValue}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={`tag-${index}`}
            label={option}
            size="small"
            {...getTagProps({ index })}
            style={{ backgroundColor: colors[index % colors.length] }}
          />
        ))
      }
      renderInput={(params) => (
        <Input {...params} variant="outlined" label="Tags" />
      )}
    />
  );
};

export default AutocompleteTag;
