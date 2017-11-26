import React from 'react'

import {
  Grid, Typography, TextField, Button
} from 'material-ui'
import { MenuItem } from 'material-ui/Menu'
import '../../styles/search_notches.css'

class SearchNotches extends React.Component{

  constructor(props){
    super(props)
    this.changeSearchBy = this.changeSearchBy.bind(this)
    this.changeSearchKey = this.changeSearchKey.bind(this)
    this.search = this.search.bind(this)
    this.state = {
      searchBy: 'radius'
    }
  }

  changeSearchBy(event){
    this.setState({
      searchBy: event.target.value
    })
  }

  changeSearchKey(event){
    this.setState({
      searchKey: event.target.value
    })
  }

  search(event){
    alert('searching')
  }

  render(){
    return (
      <Grid container>
        <Grid item lg={12} md={12} sm={12} >
          <Grid container>
            <Grid item lg={2} md={2} sm={2} >
              <center>
                <Typography component='p' type='body' style={{marginTop: '18px'}}>
                  SEARCH BY
                </Typography>
              </center>
            </Grid>
            <Grid item lg={2} md={2} sm={2} >
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
            <Grid item lg={4} md={4} sm={4} >
              <TextField id='search-box' fullWidth
                value={this.state.searchKey}
                onChange={this.changeSearchKey}
                label='search'
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} >
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
