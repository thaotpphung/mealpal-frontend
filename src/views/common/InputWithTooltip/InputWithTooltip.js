import React from 'react';
import Input from '../Input/Input';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

const InputWithTooltip = ({ label, tooltip, ...rest }) => (
  <Input
    InputLabelProps={{
      style: { pointerEvents: 'auto' },
    }}
    label={
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {label}&nbsp;
        <Tooltip title={tooltip} placement="top">
          <HelpIcon fontSize="small" />
        </Tooltip>
      </div>
    }
    {...rest}
  />
);

export default InputWithTooltip;
