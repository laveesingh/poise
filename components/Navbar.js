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
            <Grid item lg={2} md={2} sm={2} >
              <Avatar aria-label='Recipe' id='avatar-logo'>
                P
              </Avatar>
            </Grid>
            <Grid item lg={10} md={10} sm={10} >
              <SearchNotches />
            </Grid>
            <Grid item lg={2} md={2} sm={2} > </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar
