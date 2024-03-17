import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  action: {
    // marginTop: 80,
    width: 360,
  },
  actionButton: {
    overflow: 'visible',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    marginBottom: hp('1%'),
    marginTop: hp('2.5%'),
    marginRight: wp('2%'),
    marginLeft: wp('1%'),
    height: hp('5.5%'),
    elevation:10,
    width: wp('50%'),
    borderWidth:4,
    borderColor:Colors.white
  },
  customSelectedTextStyle: {
    fontSize: wp('3.5%'),
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
     width: wp('50%'),
  },
  actionButtonText: {
    fontSize: wp('3.1%'),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.firozi
  },
  button: {
    ...Metrics.mediumVerticalMargin,
    ...Metrics.smallBottomMargin,
    backgroundColor: Colors.button,
    borderColor: Colors.border,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  container: {
  
    backgroundColor:Colors.lightGrey,
    flex: 1
  },
  link: {
    color: Colors.label,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'flex-end',
  },
  linkText: {
    ...Fonts.input,
    color: Colors.label,
  },
  mb10: {
    marginBottom: 10,
  },
  plus: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  plusIcon: {
    borderRadius: 50,
    bottom: 75,
    position: 'absolute',
    right: 25,
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },
  heading: {
    alignSelf: 'center',
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.2%'),
	marginBottom: 0, 
  fontWeight:'bold',
  marginRight:'5%'
  },
})
