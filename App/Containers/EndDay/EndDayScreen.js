import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import { Card } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './EndDayScreenStyle'
import BlueButton from '../../Components/BlueButton'
import { END } from '../../Constants'
import NavigationService from 'App/Services/NavigationService'
import LayoutScreen from '../Layout/LayoutScreen'
import UserActions from 'App/Stores/User/Actions'
import {HelperService} from 'App/Services/Utils/HelperService';

class EndDayScreen extends Component {

  async submit(){
    this.props.userEndDayLoading();// starts btn loading

    let location = await HelperService.requestLocation();
    if (location == 'DENIED'){
      Alert.alert("Location permission is required to proceed.", 
        "Go App Permissions and Turn on Location Permission for JK Paper."
      );
      this.props.userEndDayLoadingStop();// stops btn loading
      return;
    }else if (!location) {
      this.props.userEndDayLoadingStop();
      return;
    }

    this.props.endUserDay({date: HelperService.getCurrentTimestamp(), latitude: location.latitude, longitude: location.longitude, token: this.props.token, team__c: this.props.sfid});
  }

  render() {
    return (
      <View style={Style.container}>
      <Card style={Style.card}>
        <View style={Style.buttonBox}>
          <View style={Style.clock}>
            <Text style={Style.time}>{HelperService.showElapsedTime(  this.props.startDayTime)}</Text>
          </View>
        </View>
        <View style={Style.action}>
          <BlueButton style={Style.buttons}  textStyle={Style.buttontextStyle} title={END} disabled={!!this.props.userEndDayLoader} loading={!!this.props.userEndDayLoader} onPress={() => this.submit()} />
        </View>
        </Card>
      </View>
    )
  }
}

// EndDayScreen.propTypes = {
//   area: PropTypes.string,
//   validation: PropTypes.object,
//   userStartDayLoader: PropTypes.bool,
//   agentAreas: PropTypes.array, 
//   token: PropTypes.string,
//   agentid: PropTypes.string
// }

const mapStateToProps = (state) => ({
  area: state.user.area,
  userEndDayLoader: state.user.userEndDayLoading,
  token: state.user.token,
  agentid: state.user.id,
  startDayTime: state.user.startDayTime,
  sfid: state.user.id,
})

const mapDispatchToProps = (dispatch) => ({
  endUserDay: (params)   => dispatch(UserActions.endUserDay(params)),
  userEndDayLoading: ()  => dispatch(UserActions.userEndDayLoading()),
  updateUserLocation: (location) => dispatch(UserActions.updateUserLocation(location)),
  userEndDayLoadingStop:()     => dispatch(UserActions.userEndDayLoadingStop()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndDayScreen)
