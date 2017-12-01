import React  from 'react'

import { 
  Grid, Typography, Divider, TextField,
  Button, Paper
} from 'material-ui'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import AddNotch from './AddNotch'
import { GoogleLogin } from 'react-google-login' 
import '../styles/leftbar.css'

const responseGoogle = response => {
  console.log(response);
};

class Leftbar extends React.Component{

  constructor(props){
    super(props)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.openGuide = this.openGuide.bind(this)
    this.closeGuide = this.closeGuide.bind(this)
    this.openAddNotch = this.openAddNotch.bind(this)
    this.closeAddNotch = this.closeAddNotch.bind(this)

    this.state = {
    }
  }

  changeUsername(event){
    this.setState({
      username: event.target.value
    })
  }

  changePassword(event){
    this.setState({
      password: event.target.value
    })
  }

  login(){
    console.log('going to login')
  }

  signup(){
    console.log('going to signup')
  }

  openGuide(){
    this.setState({
      guideOpened: true,
    })
  }

  closeGuide(){
    this.setState({
      guideOpened: false,
    })
  }

  openAddNotch(){
    this.setState({
      addNotchOpened: true
    })
  }

  closeAddNotch(){
    this.setstate({
      addNotchOpened: false
    })
  }

  render(){
    return(
      <Paper id='left-paper'>
        <Grid container id='cont-left-bar'>
          <Grid item lg={12} md={12} sm={12} xs={12} id='item-logo' >
            <center>
              <Typography type='heading' component='h1' color='primary'>
                POISE
              </Typography>
            </center>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} >
            <Divider />
          </Grid>
          <Grid item lg={12} md={12} sm={6} xs={12} id='item-username'>
            <TextField fullWidth
              id='username' value={this.state.username}
              onChange={this.changeUsername}
              label='Username'
            />
          </Grid>
          <Grid item lg={12} md={12} sm={6} xs={12} id='item-password'>
            <TextField fullWidth
              id='password' value={this.state.password}
              onChange={this.changePassword}
              label='Password'
            />
          </Grid>
          <Grid item lg={6} md={3} sm={2} xs={6} >
            <center>
              <Button raised id='btn-login' onClick={this.login} color='primary'>
                Login
              </Button>
            </center>
          </Grid>
          <Grid item lg={6} md={3} sm={3}  xs={6}>
            <Button raised id='btn-signup' onClick={this.signup} color='primary'>
              Signup
            </Button>
          </Grid>
          <Grid item lg={12} md={2} sm={2}  xs={4}>
            <Typography component='p' color='primary'>
              Or continue with google
            </Typography>
          </Grid>
          <Grid item lg={12} md={4} sm={5}  xs={8}>
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Google Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Divider />
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Button onClick={this.openGuide} color='primary'>
              How it works
            </Button>
            <Dialog 
              onRequestClose={this.closeGuide} open={this.state.guideOpened} >
              <Grid container style={{ margin: '10px'}}>
                <Grid item lg={12} md={12} sm={12} >
                  <DialogTitle>This is guide!</DialogTitle>
                </Grid>
                <Grid item lg={12} md={12} sm={12} >
                  <Divider />
                </Grid>
                <Grid item lg={12} md={12} sm={12} >
                  <Grid container>
                    <Grid item lg={2} md={2} sm={2} > </Grid>
                    <Grid item lg={8} md={8} sm={8} >
                      <Typography component='p' type='body' color='primary'>
                        First move the human icon to the place where you want to add an experience. Then click on 'ADD NEW NOTCH' button. Fill in the details and click 'Add Notch'.
                      </Typography>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} > </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Dialog>
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Button onClick={this.openAddNotch} color='primary'>
              Add new notch
            </Button>
            <Dialog 
              onRequestClose={this.closeAddNotch} open={this.state.addNotchOpened} id='add-notch-dialog'>
              <AddNotch />
            </Dialog>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default Leftbar
