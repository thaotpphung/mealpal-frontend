import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

const IconWithTooltip = ({ title, icon = <HelpIcon fontSize="small" /> }) => (
  <Tooltip title={title}>{icon}</Tooltip>
);

export default IconWithTooltip;
