import React, { Component } from 'react'
import { View, Alert} from 'react-native'
import { Button, Text } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './StartDayStyle'
import BlueButton from '../../Components/BlueButton'
import WhiteButton from '../../Components/WhiteButton';
import LayoutScreen from '../Layout/LayoutScreen';
import { START, ABSENT, GOOD, MORNING, LEAVE} from '../../Constants';
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import UserActions from 'App/Stores/User/Actions'


export default class StartDayScreen extends React.Component {

  goTo(screen){
    NavigationService.navigate(screen)
  }

  render() {
    return (
        <View style={Style.box}>
          <Text style={{...Style.wish,...Style.mb10}}>
           {'Welcome!'}
          </Text>
          <BlueButton  style={Style.buttons} title={START} textStyle={Style.buttontextStyle} onPress={() => this.goTo('StartDaySelectionScreen')} />
          <WhiteButton  style={Style.buttons} title={LEAVE} textStyle={Style.buttontextStyle} onPress={() => this.goTo('AbsentScreen')} />
        </View>
    )
  }
}
