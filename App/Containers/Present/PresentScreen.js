import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService'
import UserActions from 'App/Stores/User/Actions'
import { Card } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Alert, Text, View } from 'react-native'
import { connect } from 'react-redux'
import BlueButton from '../../Components/BlueButton'
import WhiteButton from '../../Components/WhiteButton'
import { CANCEL, SUBMIT } from '../../Constants'
import Style from './PresentScreenStyle'

class PresentScreen extends Component {
componentDidMount(){
  this.props.userStartDayLoadingStop();
}


  async submit() {
    


    this.props.userStartDayLoading();

    let location = await HelperService.requestLocation();

    if (location == 'DENIED') {
      Alert.alert(
        "Location permission is required to proceed.",
        "Go App Permissions and Turn on Location Permission for JK Paper."
      );
      this.props.userStartDayLoadingStop();
      return;
    } else if (!location) {
      this.props.userStartDayLoadingStop();
      return;
    }

    this.props.updateUserLocation(location);

    this.props.startUserDay({
      date: HelperService.getCurrentTimestamp(),
      latitude: location.latitude,
      longitude: location.longitude,
      token: this.props.token,
     
     
      type: 'Present',	
      team__c: this.props.sfid,
      present_type: "Market Visit"
    });
  }

 

  render() {
    const { area } = this.props
    return (
      <View style={Style.container}>
        <Card style={Style.card}>
          <View style={Style.buttonBox}>
            <Text style={{ ...Style.title, textAlign: 'center' }}>
              You will be marked Present for today
                </Text>
           
          </View>
         
          <View style={{...Style.action, marginTop: 0}}>
            <WhiteButton style={Style.button} rounded title={CANCEL} onPress={() => { NavigationService.goback() }} disabled={!!this.props.userStartDayLoader} />
            <BlueButton loading={!!this.props.userStartDayLoader} style={Style.button} disabled={!!this.props.userStartDayLoader} rounded large title={SUBMIT} onPress={() => this.submit()} />
          </View>
        </Card>
      </View>
    )
  }
}

PresentScreen.propTypes = {
  area: PropTypes.string,
  validation: PropTypes.object,
  userStartDayLoader: PropTypes.bool,
  agentAreas: PropTypes.array,
  token: PropTypes.string,
  //agentid: PropTypes.string
}

const mapStateToProps = (state) => ({
  area: state.user.area,
  agentAreas: state.user.agentAreas,
  validation: state.user.validation,
  userStartDayLoader: state.user.userStartDayLoading,
  token: state.user.token,
  agentid: state.user.id,
  sfid: state.user.id,
})

const mapDispatchToProps = (dispatch) => ({
  startUserDay: (params) => dispatch(UserActions.startUserDay(params)),
  userStartDayLoading: () => dispatch(UserActions.userStartDayLoading()),
  userStartDayLoadingStop: () => dispatch(UserActions.userStartDayLoadingStop()),
  updateUserLocation: (location) => dispatch(UserActions.updateUserLocation(location)),
  updateUserArea: (area) => dispatch(UserActions.updateUserArea(area)),
  updateUserStartDayTime: (time) => dispatch(UserActions.updateUserStartDayTime(area)),
  fetchAllAreas: (params) => dispatch(UserActions.fetchAllAreas(params)),
  userStartDayValidationFailed: (params) => dispatch(UserActions.userStartDayValidationFailed(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentScreen)

