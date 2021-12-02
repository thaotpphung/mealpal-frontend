import React from 'react';
import LabelWithTooltip from '../LabelWithTooltip/LabelWithTooltip';
import Input from '../Input/Input';

const InputWithTooltip = ({ label, tooltip, ...rest }) => (
  <Input
    InputLabelProps={{
      style: { pointerEvents: 'auto' },
    }}
    label={<LabelWithTooltip label={label} tooltip={tooltip} />}
    {...rest}
  />
);

export default InputWithTooltip;
