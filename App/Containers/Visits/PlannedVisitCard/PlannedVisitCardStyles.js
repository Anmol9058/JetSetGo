import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  box: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: wp('94%'),
    marginVertical: hp('1%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 10,
    position: 'relative',
    elevation:5,
  },
  ratingBox: {
  	position: 'absolute',
  	right: wp('4%'),
  	top: hp('2.5%'),
  	flexDirection: 'row'
  },
  desc: {
    color: Colors.clr66,
    fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textFont
  },
  detail: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.clr66,
    fontSize: 14,
    textTransform: 'capitalize'
  },
  title: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('5%'),
    marginBottom: hp('.8%'),
    width: wp('94%')*.6,
    fontWeight:'bold'
  },
  tuple: {
    borderBottomColor: Colors.button,
    flexDirection: 'row',
    marginBottom:'3%'
  },
  actionContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    
    alignItems: 'center', 
    marginTop: hp('0.5%')
  },
  callActionButton: {
    borderWidth: 1.5, 
    alignSelf: 'center', 
    backgroundColor: Colors.clrF1F9FF,
    width: wp('86%')*.28,
    height:'70%'
  },
  directionActionButton: {
    borderWidth: 1.5, 
    alignSelf: 'center', 
    backgroundColor: Colors.clrF1F9FF,
    width: wp('86%')*.38,
    height:'75%'
  },
  addActionButton: {
    borderWidth: 1.5, 
    alignSelf: 'center',
    backgroundColor:Colors.firozi,
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('6%')
    
  },
  callActionButtonText: {
   fontSize: wp('3.5%'),
   fontFamily: ApplicationStyles.textMediumFont
  },
  directionActionButtonText: {
    fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textMediumFont
  },
  addActionButtonText: {
    fontSize: wp('4%'),
    fontFamily: ApplicationStyles.textMediumFont, 
    textTransform: 'uppercase'
  },
  callButtonIcon: {
    color: Colors.button, 
    fontSize: wp('5%'),
    marginRight: 0
  },
  directionActionButtonIcon:{
    color: Colors.button, 
    fontSize: wp('5%'),
    marginRight: 0
  },
  addActionButtonIcon: {
    color: Colors.white, 
    fontSize: wp('5.5%'),
   
  }
})
