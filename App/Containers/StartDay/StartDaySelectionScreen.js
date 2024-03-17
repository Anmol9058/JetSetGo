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


export default class StartDaySelectionScreen extends React.Component {

  goTo(screen){
    NavigationService.navigate(screen)
  }
  

  render() {
    return (
        <View style={Style.box}>
          <WhiteButton  style={Style.buttons1} textStyle={Style.buttontextStyle} title={'MARKET VISIT'} onPress={() => this.goTo('PresentScreen')} />
           <WhiteButton  style={Style.buttons1} textStyle={Style.buttontextStyle} title={'IN OFFICE'} onPress={() => this.goTo('InOfficeScreen')}/>
          <WhiteButton  style={Style.buttons1} textStyle={Style.buttontextStyle} title={'WORK FROM HOME'} onPress={() => this.goTo('WorkFromHomeScreen')}/>
        </View>
    )
  }
}
