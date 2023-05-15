import React from 'react';
import { AppBar, Box, Container, Grid, Link, Toolbar, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <AppBar position="static" sx={{ bgcolor: '#8707ff', boxShadow: 'inset 0px 0px 10px #FFF' }}>
          <Toolbar sx={{ paddingY: '10px' }}>
            <Container>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid container item direction="column" xs={12} md={3}>
                  <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                    +996 558 999999 <WhatsAppIcon />
                  </Typography>
                  <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                    +996 556 829978
                    <CallIcon />
                  </Typography>
                </Grid>
                <Grid container item xs={12} md={3}></Grid>
                <Grid container item direction="column" xs={12} md={5}>
                  <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                    <EmailIcon /> wellko24@gmail.kg
                  </Typography>
                  <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                    <Link
                      href="https://www.instagram.com/attractor.school.bishkek/"
                      target="_blank"
                      color="#FFF"
                      underline="none"
                    >
                      <InstagramIcon /> Attractor School
                    </Link>
                  </Typography>
                  <Typography variant="body1" component="div" style={{ margin: 'auto' }}></Typography>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Footer;
