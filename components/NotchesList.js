import React from 'react'

import { 
  Grid, Divider, Typography,
  Avatar, Paper
} from 'material-ui'
import Card, { CardHeader, CardContent } from 'material-ui/Card'

import { notches } from '../utils/dummyNotches'
import axios from 'axios'
import { $SERVER } from '../utils/server'

class NotchesList extends React.Component{

  componentDidMount(){
    var request_url = $SERVER + '/experience/list/all'
    axios.get(request_url)
      .then(response => response.data)
      .then(response => {
        //console.log('response from server:', response.data)
        this.setState({
          notchesList: response.data
        })
      })
  }

  constructor(props){
    super(props)
    this.changeSearchBy = this.changeSearchBy.bind(this)
    this.state = {
      searchBy: 'radius',
      notchesList: []
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <center>
                  <Typography type='heading' component='h1' color='primary'>
                    Notches List
                  </Typography>
                </center>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Divider />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={1} md={1} sm={2} xs={1}> </Grid>
              <Grid item lg={10} md={10} sm={8} xs={12}>
                <Grid container>
                  { this.state.notchesList.map(notch => (
                    <Grid item lg={12} md={6} sm={6} xs={12}>
                      <Card>
                        <CardHeader
                          avatar={
                            <Avatar aria-label='Recipe' style={{ backgroundColor: '#333333'}}>
                              {notch.username[0].toUpperCase()}
                            </Avatar>
                          }
                          title={notch.username.toUpperCase()}
                          subheader={"Location: (" + notch.latitude.toFixed(2) + ", " + notch.longitude.toFixed(2) + ")"}
                          style={{backgroundColor: '#37a000'}}
                        />
                        <CardContent>
                          <Typography component='h6' type='headline'>
                            Title: { notch.title } 
                          </Typography>
                          <Typography component='p'>
                            Category: {" Standard"}
                          </Typography>
                          <Typography component='p'>
                            Experience: {notch.description.substr(0, 30) + "..."}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )) }
                  
                </Grid>
              </Grid>
              <Grid item lg={1} md={1} sm={2} > </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default NotchesList
