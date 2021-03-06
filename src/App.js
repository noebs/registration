import React from 'react'
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
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";

import i18n from "./i18n";
import { Alert } from '@material-ui/lab';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import QRCode from 'react-qr-code';
import { CheckCircle, GetApp } from '@material-ui/icons';
import {isMobile} from 'react-device-detect';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://soluspay.net">
        {i18n.t("company")}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      success: false, error: false, message: "", open: false, billerName: "",
      name: '', password: "", mobile: "", id_no: "", id_type: 1, city: "", url: "", canSubmit: true,
    };
  }


  handleChange = (event) => {

    // e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    this.setState({ [event.target.name]: event.target.type  === "number" ? parseInt(event.target.value): event.target.value });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleID = (event) => {
    this.setState({ id_type: 1 })
  }

  handleSubmit = (event) => {
    this.setState({ id_type: 1 });
    this.setState({canSubmit: false});
    console.log(this.state)
    fetch('https://api.soluspay.net/api/merchant/new', {
      method: 'POST', headers: { "content-type": "application/json" },
      // We convert the React state to JSON and send it as the POST body

      body: JSON.stringify(this.state)
    }).then((response) => {
      this.setState({canSubmit: true})
      if (!response.ok) {
        if (response.status === 400) {
          response.json().then(data => this.setState({ open: true, error: true, message: data["message"] }));
        } else {
          response.json().then(data => this.setState({ open: true, error: true, message: "generic_err" }));
        }
      } else {
        response.json().then(data => this.setState({ success: true, message: "Successful", url: JSON.stringify(data), billerName: data["biller_name"] }));
      }
    })
    event.preventDefault();
  }



  render() {

    const { classes } = this.props;

    return (

      <Container component="main" maxWidth="xs">

        <div style={{ display: !this.state.success && "none" }} >
          <div className={classes.paper}   >

            <Avatar className={classes.avatar}>
              <CheckCircle />
            </Avatar>
            <Typography variant="h6">
              {i18n.t("registration_message")}
            </Typography>
          </div>

          {this.state.success && isMobile? <QRCode value={this.state.url} />: <p>Save this ID: {this.state.billerName}</p>}
          <IconButton href="https://play.google.com/store/apps/details?id=net.soluspay.CashQMerchant" color="primary">
            <GetApp/>
            
              <p style={{fontSize: 12}}>{i18n.t("cashq_prompt")}</p>
           
        </IconButton>
        </div>
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message={this.state.message}
            action={
              <React.Fragment>
                <Button color="secondary" size="small" onClick={this.handleClose}>
                 <p> {i18n.t("close")}</p>
               </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
        <CssBaseline />


        <div className={classes.paper} style={{ display: this.state.success && "none" }}>

          {this.state.success && <Alert severity="error">{this.state.url}</Alert>}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i18n.t("signup")}
        </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullname"
                  label={i18n.t("name")}
                  autoFocus
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  onChange={this.handleChange}
                  required
                  fullWidth
                  id="mobile"
                  label={i18n.t("mobile")}
                  name="mobile"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="number"
                  required
                  fullWidth
                  id="idType"
                  label={i18n.t("id")}
                  name="id_type"
                  autoComplete="idType"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="idNo"
                  label={i18n.t("id_number")}
                  name="id_no"
                  autoComplete="lname"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label={i18n.t("city")}
                  name="city"
                  autoComplete="city"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label={i18n.t("password")}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="card"
                  label={i18n.t("pan")}
                  type="pan"
                  id="pan"
                  autoComplete="current-pan"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label={i18n.t("marketing")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={!this.state.canSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {i18n.t("submit")}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  {i18n.t("sign_in")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>

    );
  }
}

// export default App;

export default withStyles(styles, { withTheme: true })(App);

