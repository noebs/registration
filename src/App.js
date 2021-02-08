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



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://noebs.dev">
        Noebs: Payment Simplified.
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

      success: false, error: false, message: "",
      name: '', password: "", mobile: "", id_no: "", id_type: 0, city: "", url: ""
    };
  }
 

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleID = (event) => {
    this.setState({ id_type: 1 })
  }

  handleSubmit = (event) => {
    this.setState({ id_type: 1 });
    fetch('https://beta.soluspay.net/api/merchant/new', {
      method: 'POST',
      // We convert the React state to JSON and send it as the POST body

      body: JSON.stringify(this.state)
    }).then((response) => {
      if (!response.ok) {
        // return response.then(Promise.reject.bind(Promise))
        throw response;
      }
      return response.json();
    })
      .then((data) => {
        this.setState({ success: true, message: "Successful", url: data["url"] })
      })
      .catch(error => {
        console.log('error: ' + error);
        this.setState({ error: true, message: error, })
      });

    event.preventDefault();
  }



  render() {
   
    const { classes } = this.props;
   
    return (


        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      {/* <button
       
        onClick={() => this.toggleLanguage(i18n.language)}
      >
        <div>
          <LanguageIcon language={i18n.language} />
        </div>

        <div className="font-bold text-lg">
          {i18n.language === "en" ? "English" : "عربي"}
        </div> 
      </button>*/}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up for noebs
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
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
                required
                fullWidth
                id="idType"
                label={i18n.t("id")}
                name="id_type"
                autoComplete="idType"
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
      {this.state.success && "The success is: " + this.state.url}

    {this.state.error && "The error is: " + this.state.message}
    </Container>

    );
  }
}

// export default App;

export default withStyles(styles, { withTheme: true })(App);

