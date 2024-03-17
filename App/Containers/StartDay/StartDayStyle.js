import { StyleSheet } from 'react-native'
import { Helpers, Metrics, Fonts, Colors, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  box: {
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
  buttons: {
    marginHorizontal: 60,
    marginTop: 30,
    width: wp('50%'),
    borderRadius:20,
    height:hp('6%'),
  },

  buttons1: {
    
    marginTop: 30,
    minWidth: wp('70%'),
    borderRadius:18,
    height:hp('6%'),
    borderColor:Colors.primary,
    borderWidth:1,
  },
  buttontextStyle: {
    textTransform : 'uppercase',
    alignSelf:'center',
    justifyContent: 'center',
    marginTop: hp('-0.5%')
  },
  input: {
    backgroundColor: Colors.error,
    borderRadius: 5,
    color: Colors.error,
    padding: 10,
    fontFamily: ApplicationStyles.textMsgFont
  },
  mb10: {
    marginBottom: 10,
  },
  ml52: {
    marginLeft: 52,
  },
  mt30: {
    marginTop: 30
  },
  title: {
    // margin: 'auto',
    ...Fonts.regular,
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont
  },
  wish: {
    alignSelf: 'center',
    color: Colors.label,
    fontSize: 34,
    fontFamily: ApplicationStyles.textMsgFont,
    textTransform: 'capitalize'
  },
})
