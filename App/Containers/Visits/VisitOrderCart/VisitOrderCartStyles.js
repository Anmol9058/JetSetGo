import { StyleSheet, Dimensions } from 'react-native'
import { 
	Helpers, 
	Metrics, 
	Fonts, 
	Colors, 
	ApplicationStyles 
} from 'App/Theme'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
  	flex: 1,
    paddingHorizontal: wp('3%'),
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  orderValueContainer: {
    width: wp('90%'),
    paddingTop:0,
    marginTop: 0,
    alignSelf: 'center'
  },
  orderValueContainerInput: {
    padding: 0,
    height: hp('5%'),
    fontSize:  wp('3.5%'),
  },
  picker: {
    borderRadius: 50, 
    width: wp('40%'),
    paddingTop:0,
    marginTop: 0,
    height: hp('5%'),
    padding: 0 
  },
  pickerLabel: {
    color: Colors.placeHolder,
    fontSize: wp('3%'),
    fontFamily: ApplicationStyles.textFont
  },
  itemListContainer: {
    height: hp('33%'),
    alignItems: 'center'
  },
  orderEditContainer: {
    height: hp('8%'),
    paddingTop: 0,
    justifyContent: 'center'
  },
  placeOrderContainer: {
    height: hp('13%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeOrderAction: {
    width: wp('45%'),
    alignSelf: 'center', 
    height: hp('6%'), marginBottom: hp('10%')
  },
  placeOrderActionText: {
    fontSize: wp('3.5%')
  },
  visitCardContainer: {
    height: hp('22%'),
    justifyContent: 'center',
    alignItems: 'center', 
  }
})
