import React from 'react'

import {
  Grid, Typography, TextField, Button
} from 'material-ui'
import { MenuItem } from 'material-ui/Menu'
import '../styles/search_notches.css'
import axios from 'axios'
import { $SERVER } from '../utils/server'

class SearchNotches extends React.Component{

  constructor(props){
    super(props)
    this.changeSearchCategory = this.changeSearchCategory.bind(this)
    this.changeSearchUsername = this.changeSearchUsername.bind(this)
    this.search = this.search.bind(this)
    this.state = {
      searchCategory: 'all'
    }
  }

  changeSearchCategory(event){
    this.setState({
      searchCategory: event.target.value
    })
  }

  changeSearchUsername(event){
    this.setState({
      searchUsername: event.target.value
    })
  }

  search(){
    var request_url = $SERVER + '/experience/list_by_category/'
    axios.get(request_url, {
      params:{
        username: this.state.searchUsername,
        category: this.state.searchCategory
      }
    })
      .then(response => response.data)
      .then(response => {
        console.log('response from server:', response)
        this.props.setFilteredNotches(response.data)
      })
  }

  render(){
    return (
      <Grid container>
        <Grid item lg={12} md={12} sm={12} >
          <Grid container>
            <Grid item lg={2} md={2} sm={2} xs={3} >
              <center>
                <Typography component='p' type='body' style={{marginTop: '18px'}}>
                  SEARCH BY
                </Typography>
              </center>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={3}>
              <TextField fullWidth select
                id='search-by'
                value={this.state.searchCategory}
                onChange={this.changeSearchCategory}
                label='search by'
              >
                <MenuItem key='all' value='all'>All</MenuItem>
                <MenuItem key='art' value='art'>Art</MenuItem>
                <MenuItem key='shows' value='shows'>Shows</MenuItem>
                <MenuItem key='sports' value='sports'>Sports</MenuItem>
                <MenuItem key='animal' value='animal'>Animal</MenuItem>
                <MenuItem key='outdoor' value='outdoor'>Outdoor</MenuItem>
                <MenuItem key='lifestyle' value='lifestyle'>Lifestyle</MenuItem>
              </TextField>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={3}>
              <TextField id='search-box' fullWidth
                value={this.state.searchUsername}
                onChange={this.changeSearchUsername}
                label='search'
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={3}>
              <Button raised id='search-button'
                color='primary' onClick={this.search}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default SearchNotches
