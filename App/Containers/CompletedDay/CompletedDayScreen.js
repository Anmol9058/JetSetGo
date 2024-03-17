import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Card } from 'native-base'
import Style from '../EndDay/EndDayScreenStyle'
import OwnStyle from './CompletedDayScreenStyle'
import LayoutScreen from '../Layout/LayoutScreen'

export default class CompletedDayScreen extends Component {
  render() {
    return (
        <View style={Style.container}>
          <Card style={Style.card}>
            <View style={Style.buttonBox}>
              <View style={{ ...Style.clock, ...OwnStyle.clock }}>
                <Image
                  style={{ width: 66, height: 66 }}
                  source={require('App/Assets/Images/checked.png')}
                />
              </View>
            </View>
            <Text style={OwnStyle.title}>Your Day Has been Ended.</Text>
            </Card>
        </View>
    )
  }
}