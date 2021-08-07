import React from "react";
import IconButton from "@material-ui/core/IconButton";

const ListHeaderButton = ({icon, link}) => {
  return (
    <IconButton aria-label="settings">
      <MoreHorizIcon />
    </IconButton>
  )
}

export default ListHeaderButton