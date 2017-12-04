import React from 'react'

import { 
  Grid, Divider, Typography,
  Avatar, Paper, Dialog
} from 'material-ui'
import Card, { CardHeader, CardContent } from 'material-ui/Card'

import { notches } from '../utils/dummyNotches'
import NotchCard from './NotchCard'
import axios from 'axios'
import { $SERVER } from '../utils/server'

class NotchesList extends React.Component{

  constructor(props){
    super(props)
    this.changeSearchBy = this.changeSearchBy.bind(this)
    this.openComplexNotch = this.openComplexNotch.bind(this)
    this.closeComplexNotch = this.closeComplexNotch.bind(this)
    this.state = {
      searchBy: 'radius',
      notchesList: [],
      complexNotch: null,
      complexNotchOpened: false,
    }
  }

  componentDidMount(){
    var request_url = $SERVER + '/experience/list/all'
    axios.get(request_url)
      .then(response => response.data)
      .then(response => {
        //console.log('response from server:', response.data)
        this.setState({
          notchesList: response.data,
        })
      })
  }

  changeSearchBy(event){
    this.setState({
      searchBy: event.target.value
    })
  }

  openComplexNotch(event, notch_id){
    var request_url = $SERVER + '/experience/search_by_id/' + notch_id
    console.log('requesting server:', request_url)
    axios.get(request_url)
      .then(response => response.data)
      .then(response => {
        console.log('response from server:', response.data)
        this.setState({
          complexNotch: response.data,
          complexNotchOpened: true,
        })
        setInterval(()=>console.log('current state:', this.state), 5)
      })
  }

  closeComplexNotch(){
    this.setState({
      complexNotchOpened: false,
      complexNotch: null,
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
                      <Card onClick={(event) => this.openComplexNotch(event, notch._id)}>
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
                      <Dialog 
                        onRequestClose={this.closeComplexNotch}
                        open={this.state.complexNotchOpened} >
                        {
                          this.state.complexnotch 
                          ? (
                            <NotchCard 
                              avatarLetter={this.state.complexNotch.username[0].toUpperCase()}
                              title={this.state.complexNotch.title}
                              description={this.state.complexNotch.description}
                              imgUrl={this.state.complexNotch.imgUrl}
                              timestamp={this.state.complexNotch.date}
                            />
                          )
                            : (
                              <h1>This is never gonna appear.</h1>
                            )
                        }
                      </Dialog>
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
