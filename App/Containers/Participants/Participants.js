import React, { Component } from 'react'
import { View, Alert, ScrollView, StyleSheet} from 'react-native'
import { Button, Text } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton';
import { START, ABSENT, GOOD, MORNING} from 'App/Constants';
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import UserActions from 'App/Stores/User/Actions'
import SingleInfo from 'App/Components/SingleInfo';
import Separator from 'App/Components/Separator';
import DashboardHeading from 'App/Components/DashboardHeading';
import CircularProgressBar from 'App/Components/CircularProgressBar';
import GroupedLineChart from 'App/Components/GroupedLineChart';
import { Colors, ApplicationStyles, Fonts, Metrics } from 'App/Theme'



export default class InfluencersScreen extends React.Component {
  render() {
    return (
      	<View style={Styles.box}>
          <Text style={{ ...Styles.wish}}>
            { 'Participants' }
          </Text>
        </View>
    )
  }
}

const Styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    color: Colors.error,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: Metrics.tiny,
    textAlign: 'center',
    fontFamily: ApplicationStyles.textMsgFont
  },
  buttons: {
    marginHorizontal: 60,
    marginTop: 30,
  },
  input: {
    backgroundColor: Colors.error,
    borderRadius: 5,
    color: Colors.error,
    padding: 10,
    fontFamily: ApplicationStyles.textMsgFont
  },
  mb10: {
    marginBottom: 10,
  },
  ml52: {
    marginLeft: 52,
  },
  mt30: {
    marginTop: 30
  },
  title: {
    // margin: 'auto',
    ...Fonts.regular,
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont
  },
  wish: {
    alignSelf: 'center',
    color: Colors.label,
    fontSize: 34,
    fontFamily: ApplicationStyles.textMsgFont,
    textTransform: 'uppercase'
  }
});
