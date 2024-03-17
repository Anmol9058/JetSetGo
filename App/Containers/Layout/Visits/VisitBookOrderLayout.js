import React from 'react'
import { Platform, View, ActivityIndicator, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { liveInEurope } from 'App/Stores/Example/Selectors'

import { Container, Header, Title, Content, Button, Icon, Left, Body, Text, Input, Item, Right, Badge} from 'native-base';
import NavigationService from 'App/Services/NavigationService'
import WhiteButton from 'App/Components/WhiteButton'
import RetailersActions from 'App/Stores/Retailers/Actions'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BackArrowButton from 'App/Components/BackArrowButton'


class VisitBookOrderLayout extends React.Component {
  scrollToIndex(index){
    let distanceToBeScrolled = (index)*wp('23%');
    if (this.flatListRef){
      this.flatListRef.scrollTo({x: distanceToBeScrolled, y: 0, animated: true});
    }
  }

  render() {
    const {
      cart,
      children,
      partyType,
      retailerId,
      currentScreen,
      extractRetailerInfoData
    } = this.props;
    return ( 
    	<SafeAreaView>
    		<Header style={Styles.header}>
        <View style={{paddingTop: hp('1%'), paddingBottom: hp('1%')}}>
      
       </View>
            <View 
            style={{flexDirection:'row'}}
             >
	            	
               
              <WhiteButton 
                 title={'Book Order'} 
                  style={{...Styles.actionButton, ...Styles.customSelectedStyleCorpBlue, marginLeft:wp('3%')}}
                  textStyle={Styles.actionButtonText}
                  onPress={() => {NavigationService.navigate('VisitBookOrder'); this.scrollToIndex(0)}}    
                  selected={currentScreen == 'VisitBookOrder'}
                 customSelectedStyle={{...Styles.customSelectedStyleCorpBlue, ...Styles.selected}}
                 customSelectedTextStyle={Styles.customSelectedTextStyle}
                />
            

	            	<WhiteButton 
                 title={`Cart (${(cart && cart.items) ? (cart.items.length) : 0})`} 
                 style={{...Styles.actionButton, ...Styles.customSelectedStyleCorpBlue,marginLeft:wp('29%') }}
                 textStyle={{...Styles.actionButtonText,color:Colors.primary }}
                 onPress={() => {NavigationService.navigate('VisitOrderCart'); this.scrollToIndex(1)}} 
                 
                  selected={currentScreen == 'VisitOrderCart'}
                  customSelectedStyle={{...Styles.customSelectedStyleCorpBlue, ...Styles.selected}}
                  customSelectedTextStyle={Styles.customSelectedTextStyle}
               >
                 
                   
                
               </WhiteButton>
               
               
            	</View>
              


 
         	</Header>
    		{children}
    	</SafeAreaView>
    )
  }z
}



const mapStateToProps = (state) => ({
  isConnected     : state.network.isConnected,
  isVisible       : state.common.isNetworkBannerVisible,
  currentScreen   : state.common.currentScreen,
  cart            : state.visits.cart,
  retailerId      : state.visits.executeVisitData.retailer_dealer__c,
  partyType       : state.visits.executeVisitData.type1__c
})

const mapDispatchToProps = (dispatch) => ({
  extractRetailerInfoData:(params) => dispatch(RetailersActions.extractRetailerInfoData(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitBookOrderLayout)


const Styles = StyleSheet.create({
  header:{
    height: hp('11%'),
    alignItems: 'flex-start',
    
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey
  },
  headerBody: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
    width: wp('100%')
  },
  headerButton: {
    borderWidth: 1.5, 
    paddingLeft: 0, 
    paddingRight: 0,
    textAlign: 'center',
    marginHorizontal: 4,
    minWidth: wp('26%'), 
    backgroundColor: Colors.firozi,
    alignSelf: 'center',
    height: hp('5.5%'), 
    overflow: 'visible'
  },
  headerButtonText: {
    fontSize: wp('3.6%'), 
    fontFamily: ApplicationStyles.textMediumFont,
    textAlign: 'center'
  },
  countBadge: {
    position: 'absolute', 
    backgroundColor: Colors.button, 
    right: wp('1.5%'), 
    top: hp('1.4%'), 
    borderColor: Colors.user,
    borderWidth: .5
  },

  actionButton: {
    overflow: 'visible',
    paddingLeft: wp('5%'),
    paddingRight: wp('4%'),
    marginBottom: hp('1%'),
    marginTop: hp('0%'),
    marginRight: wp('2%'),
    marginLeft: wp('1%'),
    height: hp('4.0%'),
    elevation:10,
    minWidth: wp('17%'),
    borderWidth:4,
    borderColor:Colors.white,
  },
  customSelectedTextStyle: {
    fontSize: wp('2.8%'),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.white
  },
  selected: {
    borderWidth: 1,
    borderColor: Colors.firozi,
    backgroundColor:Colors.firozi,

  },
  customSelectedStyleCorpBlue: {
    backgroundColor: Colors.white,
     width: wp('31%'),
  },
  actionButtonText: {
    fontSize: wp('2.8%'),
    fontWeight: '700',
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.firozi
  },
});
