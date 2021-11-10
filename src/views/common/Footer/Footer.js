import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.container}>
        <div className={classes.item}>
          <Typography variant="h6">Feedback Contact</Typography>
          <Typography>mealpal.feedback@gmail.com</Typography>
        </div>
        <div className={classes.item}>
          <Typography variant="h6">Connect with me</Typography>
          <div className={classes.icons}>
            <Link href="https://www.linkedin.com/in/thaotpphung">
              <LinkedInIcon />
            </Link>
            <Link href="https://github.com/thaotpphung">
              <GitHubIcon />
            </Link>
            <Link href="https://www.instagram.com/">
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </div>
      <Typography variant="body1" className={classes.copyRight}>
        Copyright &copy; {new Date().getFullYear()}&nbsp;Thao Phung.&nbsp;All
        Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
