import React from 'react'


import { withStyles } from "@material-ui/core/styles";

import QRCode from 'react-qr-code';
import App from './App';
import Container from '@material-ui/core/Container';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import i18n from "./i18n";
import { Alert } from '@material-ui/lab';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';



const Cont = (classes, success, url)=> {
<Container component="main" maxWidth="xs">
          
          <div>
          <div className={classes.paper} style={{ display: success&& "none" }}>
        
        {success && <Alert severity="error">{url}</Alert>}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Download Cashq To Complete Registration
          </Typography>
          </div>
            { success&& <QRCode value={url}/>}
          </div>
  
         </Container>

}

// export default App;

export default Cont;