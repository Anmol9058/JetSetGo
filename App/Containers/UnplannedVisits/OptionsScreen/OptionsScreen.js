import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { Button, Text, Icon } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from 'App/Containers/StartDay/StartDayStyle'
import OptionStyle from './OptionsStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'
import RetailerCard from '../UnplannedRetailerCard'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService'
import VisitsActions from 'App/Stores/Visits/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import GenericIcon from 'App/Components/GenericIcon'
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import { Colors } from 'App/Theme'
import { SEARCH_BY_AREA, FIND_RETAILERS_NEAR_ME } from '../../../Constants'

class UnplannedOptionsScreen extends React.Component {
  componentDidMount() {
  }

  async fetchLocation() {
    const {
      findNearMeLoading,
      findNearMeLoadingStop,
      setNearLocation
    } = this.props;

    findNearMeLoading();
    const location = await HelperService.requestLocation();
    if (location == 'DENIED') {
      Alert.alert("Location permission is required to proceed.", 
        "Go App Permissions and Turn on Location Permission for JK Paper."
      );
      
      findNearMeLoadingStop();
      return;
    }else if (!location) {
      HelperService.showToast({
          message: 'Cant Find Location. Try again.',
          duration: 2000, 
          buttonText: 'Okay'
        });
      findNearMeLoadingStop();
      return;
    }

    findNearMeLoadingStop();
    setNearLocation({
      latitude: location.latitude, 
      longitude: location.longitude
    });

    NavigationService.navigate('SearchByLocationScreen');

  }
  render() {
    const {
      findNearMeLoader
    } = this.props;
    return (
      <View style={OptionStyle.container}>
        <WhiteButton
          style={OptionStyle.actionButtons}
          textStyle={OptionStyle.actionButtonsText}
          title={FIND_RETAILERS_NEAR_ME}
          onPress={() => this.fetchLocation()}
          loading={findNearMeLoader}
          disabled={findNearMeLoader}
        >
          <Icon
            name="locate"
            style={OptionStyle.optionIcon}
          />
        </WhiteButton>
        <WhiteButton
          style={OptionStyle.actionButtons}
          textStyle={OptionStyle.actionButtonsText}
          title={'Search By Name/Area'}
          onPress={() => NavigationService.navigate('SearchByAreaScreen')}
          disabled={findNearMeLoader}
        >
          <GenericIcon
            name="search"
            style={OptionStyle.optionIcon}
          />
        </WhiteButton>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token           : state.user.token,
  agentid         : state.user.id,
  findNearMeLoader: state.visits.unplannedVisit.findNearMeLoader
})

const mapDispatchToProps = (dispatch) => ({
  getRetailersList: (params) => dispatch(RetailersActions.getRetailersList(params)),
  findNearMeLoading:()       => dispatch(VisitsActions.findNearMeLoading()),
  findNearMeLoadingStop:()   => dispatch(VisitsActions.findNearMeLoadingStop()),
  setNearLocation: (params)  => dispatch(VisitsActions.setNearLocation(params))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(UnplannedOptionsScreen)
