import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  box: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: wp('90%'),
    marginVertical: 20,
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderRadius: 15,
    position: 'relative',
    elevation:8
  },
  disabledBox: {
    alignSelf: 'center',
    backgroundColor: Colors.disabled,
    width: wp('92%'),
    marginVertical: 8,
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderRadius: 10,
    position: 'relative'
  },
  ratingBox: {
  	position: 'absolute',
  	right: wp('2%'),
  	top: hp('2.5%'),
  	flexDirection: 'row'
  },
  btmBox: {
    flexDirection: 'column',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingTop: hp('2%')
  },
  desc: {
    color: Colors.clr66,
    fontSize: 13,
    fontFamily: ApplicationStyles.textFont,
    width: (Dimensions.get('window').width - 30)/1.9,
    overflow:'hidden'
  },
  detail: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.headingBlack,
    fontSize: wp('4%'),
    textTransform: 'capitalize',
    fontWeight:'bold'
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  stripM: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
     marginTop: 10
  },
  avatarContainer: {
    marginRight: 6,
  },
  title: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('5%'),
    marginBottom: 6,
    width: (Dimensions.get('window').width - 30)/2,
    overflow:'hidden',
    fontWeight:'bold'
  },
  ttl: {
    color: Colors.grey,
    fontFamily: ApplicationStyles.textFont,
    fontSize: wp('4%'),
    fontWeight:'700'
  },
  ttlIcon: {
  	color: Colors.clr66,
    fontSize: wp('3%')
  },
  tuple: {
    borderBottomColor: Colors.button,
    flexDirection: 'row'
  },
  userDtl: {
     position: 'relative'
  },
  titleContainer: {
    flexDirection: "row",
   // width:'40%',
  },
  actionButton: {
   elevation:10,
    alignSelf: 'center', 
    backgroundColor: Colors.firozi,
    paddingHorizontal: wp('4%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  disabledActionButton: {
    borderWidth: 1.5, 
    alignSelf: 'center', 
    backgroundColor: Colors.disabled,
    width: wp('92%')*.30,
  
  },
  actionButtonText: {
    fontSize: wp('2.9%'),
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
  },
  actionButtonIcon: {
    color: Colors.firozi, 
    fontSize: wp('5%'),
    marginRight: 0,
    marginLeft: wp('3%')
  },
  callActionButtonIcon: {
    color: Colors.button, 
    fontSize: wp('4%'),
  },
  actionContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    marginTop: 20
  },
  editAction: {
    paddingTop: 5, 
    marginTop: 15, 
    position: 'absolute', 
    right: wp('20%'), 
    top: hp('4.5%')
  },
  visitStatusBarContainer: {
    paddingTop: 5, 
    marginTop: 5, 
    position: 'absolute', 
    right: 10, 
    top: hp('7.5%'),
    width: '66%',
    alignItems: 'flex-end'
  },
  editActionIcon: {
    fontSize: wp('4%'), 
    color: Colors.button
  },
  cancelAction: {
    paddingTop: 5, 
    marginTop: 15, 
    position: 'absolute', 
    right: 10, 
    top: hp('4.5%')
  },
  cancelActionIcon: {
    fontSize: 14, 
    color: Colors.button
  },
  actionText: {
    fontSize: wp('3.0%'),
    color: Colors.button
  },
  statusContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: wp('92%'),
  },
  callAction: {
    width: wp('92%')*.24
  },
  directionAction: {
    width: wp('92%')*.32
  },
  visitAction: {
    width: wp('30%')
  },
  showVisitAction: {
    width: wp('92%')*.50
  },
  directionActionText: {
    fontSize: wp('3.5%')
  },
  visitActionText: {
    fontSize: wp('3.0%')
  }
})
