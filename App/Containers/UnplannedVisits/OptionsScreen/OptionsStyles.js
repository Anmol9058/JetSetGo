import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container:{
    alignItems: 'center',
    backgroundColor: Colors.white,
    color: Colors.error,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: Metrics.tiny,
    textAlign: 'center',
    fontFamily: ApplicationStyles.textMsgFont
  },
  optionIcon: {
  	color: Colors.button, 
  	fontSize: wp('6%')
  },
  actionButtons: {
    width: wp('80%'),
    marginBottom: hp('3.5%'),
    alignSelf: 'center'
  },
  actionButtonsText: {
    fontSize: wp('4.2%')
  }
})
