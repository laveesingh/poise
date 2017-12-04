import React  from 'react'

import { 
  Grid, Typography, Divider, TextField,
  Button, Paper
} from 'material-ui'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import AddNotch from './AddNotch'
import Signup from './Signup'
import { GoogleLogin } from 'react-google-login' 
import '../styles/leftbar.css'
import axios from 'axios'
import { $SERVER } from '../utils/server'
import Cookies from 'js-cookie'

const responseGoogle = response => {
  console.log(response);
};

class Leftbar extends React.Component{

  constructor(props){
    super(props)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.openGuide = this.openGuide.bind(this)
    this.closeGuide = this.closeGuide.bind(this)
    this.openAddNotch = this.openAddNotch.bind(this)
    this.closeAddNotch = this.closeAddNotch.bind(this)
    this.openSignupDialog = this.openSignupDialog.bind(this)
    this.closeSignupDialog = this.closeSignupDialog.bind(this)
    this.tellState = this.tellState.bind(this)

    this.state = {
      userLoggedIn: false,
      user: {},
      loginError: '',
    }
  }

  componentDidMount(){
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


  tellState(){
    console.log('current state is ', this.state)
  }

  login(){
    var _this = this;
    axios.post($SERVER + '/user/login/', {
      username: this.state.username,
      password: this.state.password
    })
      .then((response) => response.data)
      .then(function(response){
        if(response.status){
          _this.setState({
            loginError: response.msg
          })
          setTimeout(function(){
            _this.setState({
              loginError: ''
            })
          }, 5000)
          return
        }
        //Cookies.set('session_token', response.session_token)
        //Cookies.set('username', response.user.username)
        _this.setState({
          userLoggedIn: true,
          user: {
            username: response.user.username
          }
        })
        _this.props.loginUserToRoot(response.user)
      })
  }

  logout(){
    this.setState({
      user: {},
      userLoggedIn: false,
    })
    this.props.logoutUserToRoot()
  }
  openSignupDialog(){
    this.setState({
      signupDialogOpened: true
    })
  }

  closeSignupDialog(){
    this.setState({
      signupDialogOpened: false
    })
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
    this.setState({
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {
              this.props.userLoggedIn
              ? (
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} >
                    <center>
                      <Typography component='h2' type='headline' style={{color: '#37a000'}}>
                        {this.props.user.username}
                      </Typography>
                      <Typography component='p' type='body' style={{color: '#37a000'}}>(Logged In)</Typography>
                    </center>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} >
                    <center>
                      <Button color='primary' fullWidth >
                        Check Your Notches
                      </Button>
                    </center>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} >
                    <center>
                      <Button color='primary' fullWidth 
                        onClick={this.logout}
                      >
                        Logout
                      </Button>
                    </center>
                  </Grid>
                </Grid>
              )
              : (
                <Grid container id='registration'>
                  <Grid item lg={12} md={12} sm={12} >
                  </Grid>
                  <Grid item lg={12} md={12} sm={6} xs={12} id='item-username'>
                    <TextField fullWidth
                      id='username' value={this.state.username}
                      onChange={this.changeUsername}
                      label='Username'
                    />
                  </Grid>
                  {this.state.loginError != '' 
                      ? (
                        <Grid item lg={12} md={12} sm={12} >
                          <Typography component='p' style={{ color: 'red' }}>
                            { this.state.loginError }
                          </Typography>
                        </Grid>
                      )
                      : '' 
                  }
                  <Grid item lg={12} md={12} sm={6} xs={12} id='item-password'>
                    <TextField fullWidth
                      id='password' value={this.state.password}
                      onChange={this.changePassword}
                      label='Password' type='password'
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
                    <Button raised id='btn-signup' onClick={this.props.openSignupDialog} color='primary'>
                      Signup
                    </Button>
                    <Dialog
                      onRequestClose={this.props.closeSignupDialog} open={this.props.signupDialogOpened} id='signup-dialog'>
                      <Signup 
                        loginUserToRoot={this.props.loginUserToRoot}
                        closeSignupDialog={this.props.closeSignupDialog}
                      />
                    </Dialog>
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
                </Grid>
              )


            }
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Divider />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button onClick={this.openAddNotch} color='primary'>
              Add new notch
            </Button>
            <Dialog 
              onRequestClose={this.closeAddNotch} open={this.state.addNotchOpened} id='add-notch-dialog'>
              <AddNotch 
                username={this.props.user.username}
                markerPosition={this.props.markerPosition}
              />
            </Dialog>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default Leftbar
