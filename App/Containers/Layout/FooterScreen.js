import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { Container, Header, Content, Footer, FooterTab, Icon } from 'native-base'
import FooterIcon from '../../Components/FooterIcon'
import Style from './LayoutScreenStyles'
import { HelperService } from 'App/Services/Utils/HelperService'
import NavigationService from 'App/Services/NavigationService'
import Drawer from './SideBarLayout/Drawer'
import GenericIcon from 'App/Components/GenericIcon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class FooterScreen extends React.Component {
  render() {
    const { startedToday, endedToday, absentToday, currentScreen } = this.props
    let startDayIconText = 'Start'
    if (startedToday) {
      startDayIconText = 'End'
    }

    if (endedToday) {
      startDayIconText = 'Ended'
    }

    if (absentToday) {
      startDayIconText = 'Absent'
    }

    let startDayActive =
      currentScreen === 'StartDayScreen' ||
      currentScreen === 'EndDayScreen' ||
      currentScreen === 'PresentScreen' ||
      currentScreen === 'AbsentScreen' ||
      currentScreen === 'CompletedDayScreen'||
      currentScreen === 'StartDaySelectionScreen'
    let startDayDisabled = endedToday || absentToday

    let visitsActive =
      currentScreen === 'VisitsScreen' ||
      currentScreen === 'UnplannedOptionsScreen' ||
      currentScreen === 'RetailerResultListScreen' ||
      currentScreen === 'AddPlannedVisitsScreen' ||
      currentScreen === 'SelectedPlannedVisitsScreen' ||
      currentScreen === 'SearchByAreaScreen' ||
      currentScreen === 'SearchByLocationScreen' ||
      currentScreen === 'StartVisitForm' ||
      currentScreen === 'VisitBookOrder' ||
      currentScreen === 'VisitOrderCart' ||
      currentScreen === 'VisitRetailerOutstanding' ||
      currentScreen === 'OutstandingPaymentInfo'||
      currentScreen === 'AddCompetitorForm'||
      currentScreen === 'AddStockForm'||
      currentScreen === 'UpdateStockForm'||
      currentScreen === 'UpdateCompetitorForm'||
      currentScreen === 'VisitBookOrderHeader'
    let visitsDisabled = false

    let retailersActive =
      currentScreen === 'RetailerList' ||
      currentScreen === 'RetailerOrdersListScreen' ||
      currentScreen === 'NewRetailer' ||
      currentScreen === 'RetailerInfoScreen' ||
      currentScreen === 'DealerInfoScreen' ||
      currentScreen === 'DealerInvoiceListScreen' ||
      currentScreen === 'DealerOrdersListScreen' ||
      currentScreen === 'DealerOutstandingListScreen' ||
      currentScreen === 'InvoiceInfoScreen' ||
      currentScreen === 'DealerOrderInfoScreen' ||
      currentScreen === 'DealerPaymentsListScreen'||
      currentScreen === 'NewDsrScreen'

    let retailersDisabled = false

    let profilesActive =
    currentScreen === 'MenuScreen' ||
    currentScreen === 'MenuDetailScreen'
    

     let profilesDisabled = false

    let ordersListActive =
      currentScreen === 'OrdersListScreen' ||
      currentScreen === 'OrderInfoScreen'

    let ordersListDisabled = ordersListActive

    let settingsActive = currentScreen === 'DashboardScreen';
    let settingsDisabled = false

    return (
      <Footer style={Style.footerContainer}>
        <FooterTab style={Style.footer}>
          <FooterIcon
            icon={'calendar-clock'}
            iconText={startDayIconText}
            active={startDayActive}
            disabled={startDayDisabled}
            onPress={() =>
              startedToday
                ? NavigationService.navigate('EndDayScreen')
                : NavigationService.navigate('StartDayScreen')
            }
          />

          <FooterIcon
            icon={'add-location'}
            iconText={'Visits'}
            show={true}
            active={visitsActive}
            disabled={visitsDisabled}
            onPress={() => NavigationService.navigate('VisitsScreen')}
          />


          <FooterIcon
            icon={'view-dashboard-outline'}
            iconText={'Dashboard'}
            active={settingsActive}
            disabled={settingsDisabled}
            onPress={() => NavigationService.navigate('DashboardScreen')}
          />


          <FooterIcon
            icon={'people'}
            iconText={'Party'}
            show={true}
            active={retailersActive}
            disabled={retailersDisabled}
            onPress={() => NavigationService.navigate('RetailerList')}
          />

         <FooterIcon
            icon={'menu'}
            iconText={'Menu'}
            show={true}
            active={profilesActive}
            disabled={profilesDisabled}
            onPress={() => NavigationService.navigate('MenuScreen')}
           
          />

        
        </FooterTab>
      </Footer>
    )
  }
}

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
  isVisible: state.common.isNetworkBannerVisible,
  currentScreen: state.common.currentScreen,
  startedToday: state.user.startDayTime ? HelperService.isToday(state.user.startDayTime) : false,
  endedToday: state.user.endDayTime ? HelperService.isToday(state.user.endDayTime) : false,
  absentToday: state.user.absentDayTime ? HelperService.isToday(state.user.absentDayTime) : false,
})

export default connect(mapStateToProps)(FooterScreen)


const Styles = StyleSheet.create({
  icon: {
    color: 'white',
    alignSelf: 'center'
  },
  iconText: {
    color: 'white',
    fontFamily: ApplicationStyles.textFont,
    fontSize: Fonts.iconText.fontSize,
    alignSelf: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    paddingLeft: 0,
    paddingRight: 0
  },
  iconActive: {
    color: Colors.white
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 0,
    height: '100%'
  },
  iconActiveButton: {
    backgroundColor: '#0075d8'
  }
});