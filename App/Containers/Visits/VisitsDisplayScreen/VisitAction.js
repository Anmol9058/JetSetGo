import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { Button, Text, Icon } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './VisitsDisplayScreenStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService'
import VisitsActions from 'App/Stores/Visits/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import { Colors } from 'App/Theme'
import GenericIcon from '../../../Components/GenericIcon'

class VisitAction extends React.Component {
  goto = (screen) => {
    this.props.closeVisitsAction()
    NavigationService.navigate(screen)
  }

  render() {
    const { user_details } = this.props
    return (
      <View>
        {/* {user_details.rd_manual ? null : ( */}
          <View style={{ ...Style.iconContainer, ...{ bottom: 205 } }}>
            <BlueButton
              title={'Plan Visit'}
              style={{ height: 35 }}
              textStyle={{ ...Style.iconMessage }}
              onPress={() => this.goto('AddPlannedVisitsScreen')}
            />
            <TouchableOpacity
              style={{ ...Style.plusIcon, ...{ bottom: -8, right: -65 } }}
              onPress={() => this.goto('AddPlannedVisitsScreen')}
            >
              <GenericIcon
                name={'calendar-month-outline'}
                ios={'calendar-month-outline'}
                android={'calendar-month-outline'}
                show={true}
                style={{ color: Colors.white, fontSize: 25, alignSelf: 'center' }}
              />
            </TouchableOpacity>
          </View>
        {/* )}  */}
        <View style={{ ...Style.iconContainer, ...{ bottom: 140 } }}>
          <BlueButton
            title={'Unplanned Visit'}
            style={{ height: 35 }}
            textStyle={{ ...Style.iconMessage }}
            onPress={() => this.goto('SearchByAreaScreen')}
          />
          <TouchableOpacity
            style={{ ...Style.plusIcon, ...{ bottom: -5, right: -65 } }}
            onPress={() => this.goto('SearchByAreaScreen')}
          >
            <GenericIcon
              name={'pin'}
              ios={'pin'}
              android={'pin'}
              show={true}
              style={{ color: Colors.white, fontSize: 25, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user_details: state.user.user_details,
})

export default connect(
  mapStateToProps,
  null
)(VisitAction)
