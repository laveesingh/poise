import React from 'react'

import { 
  Grid, Divider, Typography, TextField,
  Avatar, Paper
} from 'material-ui'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import { MenuItem } from 'material-ui/Menu'

import { notches } from '../../utils/dummyNotches'

class NotchesList extends React.Component{

  constructor(props){
    super(props)
    this.changeSearchBy = this.changeSearchBy.bind(this)
    this.state = {
      searchBy: 'radius'
    }
  }

  changeSearchBy(event){
    this.setState({
      searchBy: event.target.value
    })
  }

  render(){
    return (
      <Paper id='right-paper' style={{padding: '10px'}}>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} >
            <Grid container>
              <Grid item lg={12} md={12} sm={12} >
                <center>
                  <Typography type='heading' component='h1' color='primary'>
                    Notches List
                  </Typography>
                </center>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Divider />
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Grid container>
              <Grid item lg={12} md={12} sm={12} >
                <Grid container>
                  <Grid item lg={2} md={2} sm={2} > </Grid>
                  <Grid item lg={8} md={8} sm={8} >
                    <Grid container>
                      { notches.map(notch => (
                        <Grid item lg={12} md={12} sm={12} >
                          <Card>
                            <CardHeader
                              avatar={
                                <Avatar aria-label='Recipe' style={{ backgroundColor: '#333333'}}>
                                  {notch.user.name[0].toUpperCase()}
                                </Avatar>
                              }
                              title={notch.user.name.toUpperCase()}
                              subheader={notch.location[0] + " " + notch.location[1]}
                              style={{backgroundColor: '#37a000'}}
                            />
                            <CardContent>
                              <Typography component='p'>
                                Category: {notch.category}
                              </Typography>
                              <Typography component='p'>
                                Experience: {notch.experience}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      )) }
                      
                    </Grid>
                  </Grid>
                  <Grid item lg={2} md={2} sm={2} > </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default NotchesList
