import React from 'react'

import { 
  Grid, Divider, Typography, TextField,
  Avatar
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
      <Grid container>
        <Grid item lg={12} md={12} sm={12} >
          <Grid container>
            <Grid item lg={12} md={12} sm={12} >
              <center>
                <Typography type='headline' component='h1'>
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
                <Grid item lg={4} md={4} sm={4} >
                  <center>
                    <Typography component='p' type='body' style={{marginTop: '18px'}}>
                      Search By:
                    </Typography>
                  </center>
                </Grid>
                <Grid item lg={4} md={4} sm={4} >
                  <TextField fullWidth select
                    id='search-by'
                    value={this.state.searchBy}
                    onChange={this.changeSearchBy}
                    label='search by'
                  >
                    <MenuItem key='radius' value='radius'>Radius</MenuItem>
                    <MenuItem key='user' value='user'>User</MenuItem>
                    <MenuItem key='keyword' value='keyword'>Keyword</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} >
              <Grid container>
                <Grid item lg={3} md={3} sm={3} > </Grid>
                <Grid item lg={6} md={6} sm={6} >
                  <Grid container>
                    { notches.map(notch => (
                      <Grid item lg={6} md={6} sm={6} >
                        <Card>
                          <CardHeader
                            avatar={
                              <Avatar aria-label='Recipe'>
                                C
                              </Avatar>
                            }
                            title={notch.user.name}
                            subheader={notch.location[0] + " " + notch.location[1]}
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
                <Grid item lg={3} md={3} sm={3} > </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default NotchesList
