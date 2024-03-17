import React from 'react'
import { Platform, View, ActivityIndicator, Image, StyleSheet, Dimensions } from 'react-native'
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


class RetailerInfoLayout extends React.Component {
  render() {
    return (
      <View>
        <Header transparent style={Styles.header}>

          <View style={Styles.container}>
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
              onPress={() => NavigationService.navigate('RetailerInfoScreen')}
              selected={this.props.currentScreen == 'RetailerInfoScreen' || this.props.currentScreen == 'DealerInfoScreen'}
            />

            <WhiteButton
              title={'Orders'}
              style={Styles.actionButton}
              textStyle={Styles.actionButtonText}
              onPress={() => NavigationService.navigate('RetailerOrdersListScreen', { id: this.props.id, type: this.props.type })} selected={this.props.currentScreen == 'RetailerOrdersListScreen'}
            />

            <WhiteButton
              title={'Issues'}
              style={Styles.actionButton}
              textStyle={Styles.actionButtonText}
              onPress={() => NavigationService.navigate('RetailerIssuesScreen')}
              selected={this.props.currentScreen == 'RetailerIssuesScreen'}
            />
          </View>
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
)(RetailerInfoLayout)


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    padding: 5
  },
  actionButton: {
    borderWidth: 1.5,
    width: wp('24%'),
    paddingLeft: 0,
    paddingRight: 0
  },
  actionButtonText: {
    fontSize: wp('3.9%'),
    fontFamily: ApplicationStyles.textMediumFont
  }
});
