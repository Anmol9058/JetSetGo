import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles, Metrics } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  darkCard: {
    ...Metrics.normalPadding,
    alignSelf: 'stretch',
    backgroundColor: Colors.label,
    borderRadius: 10,
    margin: 5,
    elevation: 3
  },
  darkDetail: {
    fontSize: 15,
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont
  },
  darkTitle: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  darkTtl: {
    color: Colors.clrF1F9FF,
    fontSize: 15,
    fontFamily: ApplicationStyles.textFont
  },
  detail: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textMsgFont
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.clr0094FF,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  ttl: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textFont
  },


  actionButton: {
    overflow: 'visible',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    marginBottom: hp('1%'),
    marginTop: hp('2.5%'),
    marginRight: wp('2%'),
    marginLeft: wp('1%'),
    height: hp('5.0%'),
    elevation:10,
    width: wp('50%'),
    borderWidth:4,
    borderColor:Colors.white,
    
  },
  customSelectedTextStyle: {
    fontSize: wp('3.2%'),
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
    fontSize: wp('3.2%'),
    fontWeight: '700',
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.firozi
  },
})
