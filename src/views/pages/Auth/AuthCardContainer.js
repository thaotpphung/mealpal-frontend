import React from 'react';
import { styles } from './styles';
import { Avatar, Paper, Typography, Container } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const AuthCardContainer = ({ children, title }) => {
  const localClasses = styles();

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={localClasses.paper} elevation={3}>
        <Avatar className={localClasses.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </Paper>
    </Container>
  );
};

export default AuthCardContainer;
