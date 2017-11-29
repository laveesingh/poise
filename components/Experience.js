import React from 'react';
import {compose, withProps} from 'recompose';
import { Grid } from 'material-ui'
import Leftbar from './Leftbar'
import NotchesList from './NotchesList'
import Navbar from './Navbar'
import '../styles/experience.css'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `400px`}} />,
    mapElement: <div style={{height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{lat: -34.397, lng: 150.644}}>
    {props.isMarkerShown && (
      <Marker
        position={{lat: -34.397, lng: 150.644}}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));


class Experience extends React.Component {
  state = {
    isMarkerShown: false,
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({isMarkerShown: true});
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({isMarkerShown: false});
    this.delayedShowMarker();
  };

  render() {
    return (
      <Grid container>
        <Grid item lg={12} md={12} sm={12} >
          <Navbar />
        </Grid>
        <Grid item lg={2} md={2} sm={2} id='left-bar-col'>
          <Leftbar />
        </Grid>
        <Grid item lg={7} md={7} sm={7} id='mid-col'>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} >
              <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={3} sm={3} id='right-bar-col'>
          <NotchesList />
        </Grid>
        <Grid item lg={3} md={3} sm={3} > </Grid>
      </Grid>
    );
  }
}

export default Experience;
