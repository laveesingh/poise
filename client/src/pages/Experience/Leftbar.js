import React  from 'react'

import { 
  Grid, Typography, Divider, TextField,
  Button, 
} from 'material-ui'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import { blue } from 'material-ui/colors'
import '../../styles/leftbar.css'

const theme = createMuiTheme({
  palette: {
  }
})

class Leftbar extends React.Component{

  constructor(props){
    super(props)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.openGuide = this.openGuide.bind(this)
    this.closeGuide = this.closeGuide.bind(this)

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

  render(){
    return(
      <MuiThemeProvider theme={theme}>
        <Grid container id='cont-left-bar'>
          <Grid item lg={12} md={12} sm={12} id='item-logo'>
            <center>
              <Typography type='heading' component='h1'>
                POISE
              </Typography>
            </center>
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Divider />
          </Grid>
          <Grid item lg={12} md={12} sm={12} id='item-username'>
            <TextField fullWidth
              id='username' value={this.state.username}
              onChange={this.changeUsername}
              label='Username'
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} id='item-password'>
            <TextField fullWidth
              id='password' value={this.state.password}
              onChange={this.changePassword}
              label='Password'
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} >
            <Button raised id='btn-login' onClick={this.login} className='white-btn'>
              Login
            </Button>
          </Grid>
          <Grid item lg={6} md={6} sm={6} >
            <Button raised id='btn-signup' onClick={this.signup} className='white-btn'>
              Signup
            </Button>
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Divider />
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Button onClick={this.openGuide}>
              How it works
            </Button>
            <Dialog 
              onRequestClose={this.closeGuide} open={this.state.guideOpened} >
              <DialogTitle>This is guide.</DialogTitle>
            </Dialog>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default Leftbar
