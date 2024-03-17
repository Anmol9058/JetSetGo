import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { min } from 'moment';

export default StyleSheet.create({
  parentContainer: {
    flex: 1
  },
  actionContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingLeft:  wp('1%'),
    paddingRight:  wp('1%'),
    alignItems: 'center', 
    height: hp('12%')
  },
  actionButton: {
    borderWidth: 1.5, 
    alignSelf: 'center',
    height: hp('5%')
  },
  actionButtonText: {
    fontSize: wp('2.8%'),
    fontFamily: ApplicationStyles.textMediumFont
  },
  actionButtonIcon: {
    color: Colors.button, 
    fontSize: 20, 
    marginRight: 0, 
    marginLeft: 12
  },
  callAction: {
    width: wp('20%')
  },
  locationAction: {
     width: wp('30%')
  },
  directionAction: {
    width: wp('38%')
  },
  view1: {
    height: min('30.2%'),
    backgroundColor: 'white',
    paddingHorizontal: '6%',
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view3: {marginVertical: hp('3%')},

  grey: {color: 'grey'},
  
  text1: {fontSize: 17, fontWeight: 'bold'},

  tabs: {
    backgroundColor: Colors.user,
    color: Colors.white,
    marginBottom: hp('2%'),
    borderBottomWidth: 0,
    paddingHorizontal: wp('1%'),
    borderRadius: 5  
 },
   tabText: {
     color: Colors.headingBlack,
     fontFamily: ApplicationStyles.textMsgFont,
     fontSize: wp('3.4%'),
    // width:'30%'
   },
   tabHeading: {
     backgroundColor: Colors.white,
     paddingHorizontal: 0,
 
   },
   tabUnderLine: {
     backgroundColor: Colors.primary
   },
   mainTabs: {
   //  width:wp('100%'),
     marginTop: hp('0%'),
     backgroundColor: Colors.white,
   

   },
   noDataText: {
     color: Colors.button,
     fontFamily: ApplicationStyles.textMsgFont,
     fontSize: 16,
     textAlign: 'center'
   }


});
