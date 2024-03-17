import GenericApplicationModal from "App/Components/GenericApplicationModal";
import NetworkStatusBanner from "App/Components/NetworkStatusBanner";
import Layout from 'App/Containers/Layout/LayoutScreen';
import AppNavigator from 'App/Navigators/AppNavigator';
import NavigationService from 'App/Services/NavigationService';
import { HelperService } from 'App/Services/Utils/HelperService';
import CommonActions from 'App/Stores/Common/Actions';
import StartupActions from 'App/Stores/Startup/Actions';
import { Helpers } from 'App/Theme';
import { Root } from "native-base";
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Alert, SafeAreaView, View, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

class RootScreen extends Component {
  async componentDidMount() {
    const {
      id,
      token,
      startup,
      startedToday,
      endedToday,
      absentToday,
      retailersOffset,
      retailersLimit,
      categoryOffset,
      categoryLimit,
      productLimit,
      productOffset,
      fetchCurrentLocationSuccess
    } = this.props;

//     let permission = await HelperService.requestMultipleStoragePermission();
// console.log(permission,"permissionpermissionpermissionpermission");
    
//     if (!permission) {
//       Alert.alert(
//         "Storage permission Denied.",
//         'If you have denied permanently then Go "App Permissions" and Turn on "Storage" Permission for JK Paper.'
//       );
//     }


let locationPermission = Platform.OS == "android" ? await HelperService.requestLocationPermission() : await HelperService.requestLocationIosPermission();
    if (locationPermission) {
    }else {
      Alert.alert(
        "Location permission Denied.Cannot Proceed",
        'If you have denied permanently then Go "App Permissions" and Turn on "Location" Permission for JK Paper.'
      );
    }
    //let locationPermission = await HelperService.requestLocationPermission();

    //if (locationPermission) {
      //HelperService.watchLocation({callback: (fetchCurrentLocationSuccess)});
    //}else {
      //Alert.alert(
        //"Location permission Denied.Cannot Proceed",
        //'If you have denied permanently then Go "App Permissions" and Turn on "Location" Permission for JK Paper.'
      //);
   // }

    startup({
      id,
      token,
      startedToday,
      endedToday,
      absentToday,
      retailersOffset,
      retailersLimit,
      categoryOffset,
      categoryLimit,
      productLimit,
      productOffset
    });

    SplashScreen.hide();
  }


  // gets the current screen from navigation state
  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    // return route.routeName;
    return route.name;
  }

  render() {
    const {
      isConnected,
      isVisible,
      closeModal,
      modalVisible,
      modalContent,
      modalHeading,
      modalDisabled,
      modalBodyFlexHeight
    } = this.props;
    return (
      <Root>
      <SafeAreaView style={{flex: 1}}>
        <Layout >
          <View style={Helpers.fill}>
            <NetworkStatusBanner
              isConnected={this.props.isConnected}
              isVisible={this.props.isVisible}
            />

<GenericApplicationModal 
                  close={() => closeModal()} 
                  visible={modalVisible} 
                  content={modalContent}
                  heading={modalHeading}
                  bodyFlexHeight={modalBodyFlexHeight}
                  disabled={modalDisabled}
                />

            <AppNavigator
              onNavigationStateChange={prevState => {
                const currentRouteName = this.getActiveRouteName(prevState);
                
                this.props.screenChanged(currentRouteName);
              }}
              // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </View>
        </Layout>
      </SafeAreaView>
    </Root>
        
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
  isConnected: PropTypes.bool,
  isVisible: PropTypes.bool
}

const mapStateToProps = (state) => ({
  id: state.user.id,
  token: state.user.token,
  isConnected: state.network.isConnected,
  isVisible: state.common.isNetworkBannerVisible,
  modalVisible: state.common.genericActionModal.visible,
  modalContent: state.common.genericActionModal.content,
  modalHeading: state.common.genericActionModal.heading,
  modalDisabled: state.common.genericActionModal.disable,
  modalBodyFlexHeight: state.common.genericActionModal.bodyFlexHeight,
  retailersOffset: state.retailers.retailersOffset,
  retailersLimit: state.retailers.retailersLimit,
  startedToday: state.user.startDayTime ? HelperService.isToday(state.user.startDayTime) : false,
  endedToday: state.user.endDayTime ? HelperService.isToday(state.user.endDayTime) : false,
  absentToday: state.user.absentDayTime ? HelperService.isToday(state.user.absentDayTime) : false,
  categoryOffset: state.products.categoryOffset,
  categoryLimit: state.products.categoryLimit,
  productLimit: state.products.productLimit,
  productOffset: state.products.productOffset
});

const mapDispatchToProps = (dispatch) => ({
  startup: (params)                  => dispatch(StartupActions.startup(params)),
  screenChanged: (previousRouteName) => dispatch(CommonActions.screenChanged(previousRouteName)),
  closeModal:()                      => dispatch(CommonActions.closeModal()),
  fetchCurrentLocationSuccess:(params)=> dispatch(CommonActions.fetchCurrentLocationSuccess(params)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
