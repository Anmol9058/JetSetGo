import React from 'react'
import { Platform, View, ActivityIndicator, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { Container, Header, Title, Content, Button, Icon, Left, Body, Text, Input, Item, Right } from 'native-base';
import NavigationService from 'App/Services/NavigationService'
import WhiteButton from 'App/Components/WhiteButton'
import GenericIcon from 'App/Components/GenericIcon'
import { Colors } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class DealerInfoLayout extends React.Component {
  scrollToIndex(index){
    let distanceToBeScrolled = (index)*wp('23%');
    if (this.flatListRef){
      this.flatListRef.scrollTo({x: distanceToBeScrolled, y: 0, animated: true});
    }
  }

  render() {
    return (
      <View>
        <Header transparent style={Styles.header}>
          <ScrollView 
              horizontal={true}
              ref={ref => {this.flatListRef = ref}}
          >
             <View style={Styles.arrowContainer}>
              <GenericIcon
                name={'arrow-back'}
                onPress={NavigationService.goback}
                style={Styles.backArrow}
              />
            </View>
            <WhiteButton
              title={'Info'}
              style={Styles.actionButton}
              textStyle={Styles.actionButtonText}
              onPress={() => {NavigationService.navigate('DealerInfoScreen'); this.scrollToIndex(0)}} 
              selected={this.props.currentScreen == 'DealerInfoScreen'}
            />

            <WhiteButton
              title={'Orders'}
              style={Styles.actionButton}
              textStyle={Styles.actionButtonText}
              onPress={() => {NavigationService.navigate('DealerOrdersListScreen', { id: this.props.id, type: this.props.type }); this.scrollToIndex(1)}} 
              
              selected={this.props.currentScreen == 'DealerOrdersListScreen'}
            />

            <WhiteButton
              title={'Invoice'}
              style={Styles.actionButton}
              textStyle={Styles.actionButtonText}
              onPress={() => {NavigationService.navigate('DealerInvoiceListScreen'); this.scrollToIndex(2)}} 
              selected={this.props.currentScreen == 'DealerInvoiceListScreen'}
            />
            <WhiteButton
              title={'Outstanding'}
              style={Styles.actionButton}
              textStyle={Styles.actionButtonText}
              onPress={() => {NavigationService.navigate('DealerOutstandingListScreen'); this.scrollToIndex(3)}} 
              selected={this.props.currentScreen == 'DealerOutstandingListScreen'}
            />
            <WhiteButton
              title={'Payments'}
              style={Styles.actionButton}
              textStyle={Styles.actionButtonText}
              onPress={() => {NavigationService.navigate('DealerPaymentsListScreen'); this.scrollToIndex(4)}} 
              selected={this.props.currentScreen == 'DealerPaymentsListScreen'}
            />
          </ScrollView>
        </Header>
        {this.props.children}
      </View>
    )
  }
}



const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
  isVisible: state.common.isNetworkBannerVisible,
  currentScreen: state.common.currentScreen,
})

export default connect(
  mapStateToProps
)(DealerInfoLayout)


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp('100%')
  },
  header: {
    alignItems: 'center',
    height: hp('14%')
  },
  arrowContainer: {
    width: wp('10%'),
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  backArrow: {
    color: Colors.button,
    paddingLeft: 5
  },
  actionButton: {
    borderWidth: 1.5, 
    paddingLeft: 0, 
    paddingRight: 0,
    textAlign: 'center',
    marginHorizontal: 4,
    minWidth: wp('26%'), 
    backgroundColor: '#F1F9FF',
    alignSelf: 'center',
    height: hp('5.5%'), 
    overflow: 'visible'
  },
  actionButtonText: {
   fontSize: wp('3.6%'), 
    fontFamily: ApplicationStyles.textMediumFont,
    textAlign: 'center'
  }
});
