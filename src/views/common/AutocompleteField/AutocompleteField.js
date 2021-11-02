import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
const filter = createFilterOptions();

const AutocompleteField = ({
  value,
  toggleOpen,
  setDialogValue,
  handleChangeAutocompleteField,
  param,
  options,
  changedIndices,
  error,
  ...rest
}) => {
  return (
    <Autocomplete
      {...rest}
      value={value}
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
            handleChangeAutocompleteField(...changedIndices, newValue);
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
      renderOption={(option) => option[param]}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          margin="dense"
          error={error !== undefined ? true : false}
        />
      )}
    />
  );
};

export default AutocompleteField;
