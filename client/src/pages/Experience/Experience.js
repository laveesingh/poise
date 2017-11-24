import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { compose, withProps } from "recompose"
import ArticleBtn from "../../components/ArticleBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import ReactDOM from 'react-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL:"https:\//maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)
const responseGoogle = (response) => {
  console.log(response);
}

class Experience extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

   

  render() {
    return (
      <Container fluid>
      <Row>
      <Col size="md-12">
      <Jumbotron>
      <h1 style={{color:"#622222"}}>POISE</h1>
      <h2 style={{color:"#622222"}}>Point of interest sharing and exploring</h2>
      </Jumbotron>
      
      </Col>
      </Row>
      <Row>
      <Col size="md-3">
      <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />
      </Col>
      <Col size="md-5">
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
      </Col>
      <Col size="md-4">
      <form>
      <Input
      
      />
      <Input
      
      />
      <Input
      
      />

      <FormBtn 
      >
      Add
      </FormBtn>
      </form>
      </Col>
      
      </Row>

      <Row><hr/></Row>
      <Row>
      
      <Col size="xs-12">
      <div className= "panel-heading" style={{backgroundColor:"#6B6363"}}><h2>Search Result</h2></div>
      
        
  
        
        <List>
        
      
        </List>
        </Col>
        </Row>
        <Row><hr/></Row>
        <Row>
        <Col size="md-12">
        <div className= "panel-heading" style={{backgroundColor:"#6B6363"}}><h2>Saved Articles</h2></div>
        
          
          
          </Col>
          </Row>
          </Container>
          );
  }
}

export default Experience;
