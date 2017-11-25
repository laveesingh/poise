import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {compose, withProps} from 'recompose';
import ArticleBtn from '../../components/ArticleBtn';
import Jumbotron from '../../components/Jumbotron';
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Col, Row, Container} from '../../components/Grid';
import {List, ListItem} from '../../components/List';
import {Input, FormBtn} from '../../components/Form';

import { Grid } from 'material-ui'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import NotchesList from './NotchesList'
import '../../styles/experience.css'

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
const responseGoogle = response => {
  console.log(response);
};


class Experience extends React.PureComponent {
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
            <Grid item lg={12} md={12} sm={12} > 
              <NotchesList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={3} sm={3} id='right-bar-col'>
          <Rightbar /> 
        </Grid>
        <Grid item lg={7} md={7} sm={7} >
          <Container fluid>
            <Row>
              <Col size="md-3">
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </Col>
            </Row>
          </Container>
        </Grid>
        <Grid item lg={3} md={3} sm={3} > </Grid>
      </Grid>
    );
  }
}

export default Experience;
