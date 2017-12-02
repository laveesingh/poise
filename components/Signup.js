import React from 'react'

import {
  Grid, Paper, TextField, Typography,
  Divider, Button
} from 'material-ui'
import { $SERVER } from '../utils/server'
import axios from 'axios'

class Signup extends React.Component{

  constructor(props){
    super(props)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.signup = this.signup.bind(this)
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


  changeEmail(event){
    this.setState({
      email: event.target.value
    })
  }

  signup(event){
    var request_url = $SERVER + '/user/create/'
    console.log('requesting ', request_url)
    axios.post(request_url, {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
  }

  render(){
    return (
      <Paper style={{ padding: '8px' }}>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} style={{backgroundColor: '#37a000'}}>
            <center>
              <Typography type='headline' component='h1' style={{color: 'white', fontSize: '2.6em'}}> <em> Signup </em> </Typography>
            </center>
          </Grid>
          <Grid item lg={1} md={1} sm={1} > </Grid>
          <Grid item lg={10} md={10} sm={10} >
              <Grid container>
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
                    label='Password' type='password'
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={6} xs={12} id='item-email'>
                  <TextField fullWidth
                    id='email' value={this.state.email}
                    onChange={this.changeEmail}
                    label='Email'
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} style={{marginTop: '10px'}}>
                  <center>
                    <Button raised fullWidth color='primary'
                      onClick={this.signup} >
                      Create User
                    </Button>
                  </center>
                </Grid>
              </Grid>
          </Grid>
          <Grid item lg={1} md={1} sm={1} > </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default Signup
