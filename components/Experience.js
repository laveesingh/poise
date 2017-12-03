import React from 'react';
import {compose, withProps} from 'recompose';
import { Grid } from 'material-ui'
import Leftbar from './Leftbar'
import NotchesList from './NotchesList'
import Navbar from './Navbar'
import '../styles/experience.css'
import Cookies from 'js-cookie'
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
  <GoogleMap defaultZoom={8} defaultCenter={{lat: -34.397, lng: 150.644}} onClick={props.handleMapClick}>
    {props.isMarkerShown && (
      <Marker
        position={{lat: -34.397, lng: 150.644}}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));


class Experience extends React.Component {

  constructor(props){
    super(props)
    this.loginUserToRoot = this.loginUserToRoot.bind(this)
    this.logoutUserToRoot = this.logoutUserToRoot.bind(this)
    this.openSignupDialog = this.openSignupDialog.bind(this)
    this.closeSignupDialog = this.closeSignupDialog.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.state = {
      isMarkerShown: false,
      user: {},
      userLoggedIn: false,
      signupDialogOpened: false,
    };
    //setInterval(()=>console.log("current user is", this.state.user), 3000)
  }


  componentDidMount() {
    this.delayedShowMarker();
    if(Cookies.get('username')){
      this.setState({
        userLoggedIn: true,
        user: {
          username: Cookies.get('username')
        }
      })
    }
  }

  loginUserToRoot(user){
    this.setState({
      userLoggedIn: true,
      user: {
        username: user.username
      }
    })
    Cookies.set('username', user.username)
  }

  logoutUserToRoot(){
    this.setState({
      userLoggedIn: false,
      user: {}
    })
    Cookies.remove('username')
  }

  openSignupDialog(){
    this.setState({
      signupDialogOpened: true,
    })
  }
  closeSignupDialog(){
    this.setState({
      signupDialogOpened: false,
    })
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

  handleMapClick(event){
    //console.log("position:", event.latLng.lat())
    console.log('position:', event.latLng.lat(), event.latLng.lng())
  }

  render() {
    return (
      <Grid container>
        <Grid item lg={12} md={12} sm={12} >
          <Navbar />
        </Grid>
        <Grid item lg={2} md={6} sm={12} xs={12} id='left-bar-col'>
          <Leftbar 
            loginUserToRoot={this.loginUserToRoot} 
            userLoggedIn={this.state.userLoggedIn} 
            user={this.state.user} 
            logoutUserToRoot={this.logoutUserToRoot} 
            signupDialogOpened={this.state.signupDialogOpened}
            openSignupDialog={this.openSignupDialog}
            closeSignupDialog={this.closeSignupDialog}
          />
        </Grid>
        <Grid item lg={7} md={6} sm={12} xs={12} id='mid-col'>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} >
              <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                handleMapClick={this.handleMapClick}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={10} sm={12} xs={12} id='right-bar-col'>
          <NotchesList />
        </Grid>
      </Grid>
    );
  }
}

export default Experience;
