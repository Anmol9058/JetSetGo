import React, { Component } from 'react'
import { View, Text, Image, Keyboard} from 'react-native'
import { Item, Input, Button, Spinner } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserActions from 'App/Stores/User/Actions'
import { Colors } from 'App/Theme';
import LoginScreen from 'App/Containers/Login'
import StartDayScreen from 'App/Containers/StartDay'
import Loading from 'App/Components/Loading'
import NavigationService from 'App/Services/NavigationService'

class SplashScreen extends Component {
  componentDidMount() {
    // let logged_in = (this.props.token && this.props.id);
    // if (logged_in) {
    //   NavigationService.navigateAndReset('StartDayScreen')
    // }else {
    //   NavigationService.navigateAndReset('LoginScreen')
    // }
  }

  render() {
    return (<Loading />);
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  id: state.user.id
});


export default connect(
  mapStateToProps
)(SplashScreen)