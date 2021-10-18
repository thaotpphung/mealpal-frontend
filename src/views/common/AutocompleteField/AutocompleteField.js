import React from 'react';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

// toggleOpen: from a popup dialog -> when autocomplete doesn't have that option then a dialog will popup -> always the case
// param is the field being searched in autocomplete
// handleChangeAutocompleteField -> for array autocomplete -> need to change array element at index
// index
const AutocompleteField = ({
  toggleOpen,
  setDialogValue,
  handleChangeAutocompleteField,
  changedIndex,
  param,
  options,
  value,
}) => {
  const filter = createFilterOptions();
  return (
    <Autocomplete
      value={value}
      fullWidth
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setTimeout(() => {
            toggleOpen(true);
            setDialogValue(param, newValue);
          });
        } else if (newValue && newValue.inputValue) {
          toggleOpen(true);
          setDialogValue(param, newValue.inputValue);
        } else {
          if (newValue !== null) {
            handleChangeAutocompleteField(changedIndex, newValue);
          }
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            [param]: `Add "${params.inputValue}"`,
          });
        }
        return filtered;
      }}
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option[param];
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderOption={(props, option) => (
        <li {...props} key={`${option._id}-${changedIndex}`}>
          {option[param]}
        </li>
      )}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="" />}
    />
  );
};

export default AutocompleteField;
