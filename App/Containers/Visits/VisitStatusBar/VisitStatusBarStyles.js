import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  statusBar: {
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6495ed',
    padding: 5,
    borderRadius: 5,
    marginTop: 8,
    width: '60%'
  },
  statusText: {
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('3%'),
    color: Colors.white
  },
  cancelled: {
    backgroundColor: '#C35755'
  },
  started: {
    backgroundColor: '#D0A07C'
  },
  completed: {
    backgroundColor: '#62B986'
  }
})