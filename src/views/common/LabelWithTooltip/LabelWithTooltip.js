import React from 'react';
import IconWithTooltip from '../IconWithTooltip/IconWithTooltip';

const LabelWithTooltip = ({ label, tooltip }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {label}&nbsp;
    <IconWithTooltip tooltip={tooltip} />
  </div>
);

export default LabelWithTooltip;
