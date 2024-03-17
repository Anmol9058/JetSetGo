import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles, Metrics } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  card: {
    ...Metrics.normalPadding,
    backgroundColor: Colors.clrF1F9FF,
    borderRadius: 10,
    width: wp('100%'),
    elevation: 3,
    alignSelf: 'center'
  },
  darkCard: {
    ...Metrics.normalPadding,
    alignSelf: 'stretch',
    backgroundColor: Colors.label,
    borderRadius: 10,
    margin: hp('.6%'),
    elevation: 3
  },
  darkDetail: {
    fontSize: wp('3.5%'),
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont
  },
  darkTitle: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.5%'),
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  darkTtl: {
    color: Colors.clrF1F9FF,
     fontSize: wp('3.5%'),
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
    fontSize: wp('4.5%'),
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  ttl: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: ApplicationStyles.textFont
  },
ttlIcon: {
  	color: Colors.clr66,
    fontSize: 16
  },
  editIcon: {
  	fontSize: wp('5.0%'),
  	color: Colors.white,
  	paddingHorizontal: 10,
  	paddingTop: 3
  },
  editInputField: {
    borderWidth: 0, 
    borderBottomWidth: 1, 
    borderRadius: 0,
    fontSize: wp('3.2%'),
    color: Colors.grey,
    width: 100,
    height: hp('3.2%'),
    textAlign: 'center',
    padding: 0
  },
  editInputFieldContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    width: '80%'
  },
  editInputFieldChildContainer: {
    width: '80%',
    marginLeft: '10%' 
  },
  detail: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.primary,
    fontSize: wp('3.5%'),
    flexWrap: 'wrap',
    flexShrink: 1,
    width: '50%',
    textAlign: 'right',
    marginTop: hp('.5%')
  },

  detail1: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.white,
    fontSize: 15,
    textTransform: 'capitalize'
  },
  valueStyle: {
  	fontSize: wp('4%'),
  	color: Colors.white
  },
})
