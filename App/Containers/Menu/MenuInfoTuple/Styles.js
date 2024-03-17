import { ApplicationStyles, Colors } from 'App/Theme';
import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  box: {
  	width: Dimensions.get('window').width,
    backgroundColor: "transparent",
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 15,
    position: 'relative',
    elevation:10, 
    

  },
  btmBox: {
      flexDirection: 'column'
  },
  desc: {
    color: Colors.grey,
    fontSize: wp('3%'),
    marginLeft: '5%',
    marginTop:'2%',
    width: wp('50%'),
    
    fontFamily: ApplicationStyles.textFont,
  },

  desc1: {
    color: Colors.firozi,
    fontSize: wp('3.2%'),
    alignSelf:'flex-end',
    marginRight: wp('4%'),
    marginTop:'5%',
    
    fontFamily: ApplicationStyles.textFont,
  },
  button: {
    // ...Metrics.mediumVerticalMargin,
    // ...Metrics.smallBottomMargin,
    width: wp('25.5%'), 
    elevation: 4,
    shadowColor: "#000",  
    alignSelf: 'center', 
    marginTop: hp('2%') , 
    marginBottom: hp('.5%'),
    backgroundColor:Colors.white,
    shadowOffset: {
     width: 0,
          height: 0,
        },
    zIndex: 2,
    borderColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 0,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  desc2: {
    color: Colors.firozi,
    fontSize: wp('4.2%'),
    fontWeight:'700',
    alignSelf:'flex-start',
   marginLeft:'-20%',
   marginTop:'5%',
    
    fontFamily: ApplicationStyles.textFont,
  },
  detail: {
    // fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.clr66,
    fontWeight: '700',
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.headingBlack,
    fontSize: wp('5.3%'),
    fontWeight:'bold',
    fontFamily: ApplicationStyles.textMsgFont
  },
  ttl: {
    color: Colors.black,
    fontSize: wp('3.8%'),
    fontWeight:'bold'
  },
  tuple: {
    borderBottomColor: Colors.clrF1F9FF,
    borderRadius: 1,
    flexDirection: 'row',
  },
  userCircle: {
    // marginTop: 80,
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    flexDirection: 'row',
    borderColor:Colors.lightGrey,
    borderWidth:1,
    height: 80,
    justifyContent: 'center',
    width: 120,
  },
  userDtl: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    overflow: 'hidden',
    width:  Dimensions.get('window').width - 120
  },
  userIcon: {
    height: 16,
    width: 16,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 60,
   }
})
