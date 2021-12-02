import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

const IconWithTooltip = ({ icon = <HelpIcon fontSize="small" />, tooltip }) => (
  <Tooltip title={tooltip}>{icon}</Tooltip>
);

export default IconWithTooltip;
