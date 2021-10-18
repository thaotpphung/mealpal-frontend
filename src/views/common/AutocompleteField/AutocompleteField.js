import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
const filter = createFilterOptions();

const AutocompleteField = ({
  toggleOpen,
  setDialogValue,
  handleChangeAutocompleteField,
  changedIndex,
  param,
  options,
  value,
}) => {
  return (
    <React.Fragment>
      <Autocomplete
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
        id="free-solo-dialog-demo"
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
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} />}
      />
    </React.Fragment>
  );
};

export default AutocompleteField;
