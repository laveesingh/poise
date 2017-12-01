import React from 'react'

import { 
  Grid, AppBar, Toolbar, Avatar
} from 'material-ui'
import SearchNotches from './SearchNotches'
import '../styles/navbar.css'

class Navbar extends React.Component{

  constructor(props){
    super(props)

    this.state = {
    }
  }

  render(){
    return (
      <AppBar position="static" id='appbar' color='white'>
        <Toolbar disableGutters>
          <Grid container>
            <Grid item lg={1} md={1} sm={1} xs={2}>
              <Avatar aria-label='Recipe' id='avatar-logo'>
                P
              </Avatar>
            </Grid>
            <Grid item lg={11} md={11} sm={11} xs={10}>
              <SearchNotches />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar
