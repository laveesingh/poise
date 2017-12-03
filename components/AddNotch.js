import React from 'react'

import { 
  Grid, Typography, Select,
  Divider, TextField, Button
} from 'material-ui'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import '../styles/rightbar.css'
import { $SERVER } from '../utils/server'
import axios from 'axios'

class AddNotch extends React.Component{

  constructor(props){
    super(props)
    this.changeCategory = this.changeCategory.bind(this)
    this.changeLatitude = this.changeLatitude.bind(this)
    this.changeLongitude = this.changeLongitude.bind(this)
    this.addNotch = this.addNotch.bind(this)
    this.uploadNotchImage = this.uploadNotchImage.bind(this)
    this.changeHeadline = this.changeHeadline.bind(this)
    this.changeExperience = this.changeExperience.bind(this)
    this.state = {
      category: 'first',
      headline: '',
      experience: '',
      notchImage: '',
    }
  }

  changeHeadline(event){
    this.setState({
      headline: event.target.value
    })
  }

  changeExperience(event){
    this.setState({
      experience: event.target.value
    })
  }

  uploadNotchImage(event){
    var file = event.target.files[0];
    this.setState({
      notchImage: file
    })
  }

  changeCategory(event){
    this.setState({
      category: event.target.value
    })
  }

  changeLatitude(event){
    this.setState({
      latitude: event.target.value
    })
  }

  changeLongitude(event){
    this.setState({
      longitude: event.target.value
    })
  }

  addNotch(){
    var notchData = {
      username: this.props.username,
      category: this.state.category,
      location: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      },
      title: this.state.headline,
      description: this.state.experience,
      imgUrl: "http://travel.home.sndimg.com/content/dam/images/travel/fullset/2014/12/3/top-10-caribbean-beaches-eagle-beach-aruba.jpg.rend.hgtvcom.966.725.suffix/1491584555480.jpeg"
      //file: this.state.notchImage,
    }
    axios.post($SERVER + '/experience/create/', notchData, {headers: {'Content-Type': false}})
      .then(response => response.data)
      .then(function(response){
        console.log('response from server:', response)
      })
  }

  render(){
    return (
      <Grid container id='add-notch-dialog' style={{ margin: '10px'}}>
        <Grid item lg={1} md={1} sm={0} xs={0}> </Grid>
        <Grid item lg={10} md={10} sm={12} xs={12}>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                  <center>
                    <Typography type='heading' component='h1' color='primary'>
                      Add a Notch
                    </Typography>
                  </center>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Divider />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography component='h3' type='body'>
                Category
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <FormControl fullWidth >
                <Select
                  value={this.state.category}
                  onChange={this.changeCategory}
                  id='category' >

                  <MenuItem value='first' onClick={this.changeCategory}>First</MenuItem>
                  <MenuItem value='second' onClick={this.changeCategory}>Second</MenuItem>
                  <MenuItem value='third' onClick={this.changeCategory}>Third</MenuItem>
                </Select>
              </FormControl>

            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Divider />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextField id='lat' value={this.state.latitude}
                    fullWidth onChange={this.changeLatitude} label='latitude'
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextField id='lng' value={this.state.longitude}
                    fullWidth onChange={this.changeLongitude} label='longitude'
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Divider />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField  fullWidth id='headline' value={this.state.headline}
                onChange={this.changeHeadline} label='headline' 
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Divider />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField multiline fullWidth
                id='experience' value={this.state.experience}
                onChange={this.changeExperience} label='experience'
                rows={3}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <input type='file' onChange={this.uploadNotchImage} name="notchImg" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <center>
                <Button raised color='primary' onClick={this.addNotch}>
                  Add Notch
                </Button>
              </center>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0}> </Grid>
      </Grid>
    )
  }
}

export default AddNotch
