import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  box: {
    alignSelf: 'center',
    // backgroundColor: Colors.clrF1F9FF,
    width: Dimensions.get('window').width - 10,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    position: 'relative',
  },
//   btmBox: {
//     flexDirection: 'column',
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: 5,
//   },
//   customBox: {
//     alignSelf: 'center',
//     backgroundColor: Colors.clrF1F9FF,
//     borderColor: 'red',
//     borderWidth: 1,
//     width: Dimensions.get('window').width - 30,
//     marginVertical: 5,
//     padding: 12,
//     borderRadius: 10,
//     position: 'relative',
//   },
//   desc: {
//     color: Colors.button,
//     fontSize: 12,
//     fontFamily: ApplicationStyles.textFont,
//   },
//   detail: {
//     fontFamily: ApplicationStyles.textMsgFont,
//     color: Colors.clr66,
//     fontSize: 14,
//     textTransform: 'capitalize',
//     textAlign: 'right',
//     width: '75%',
//   },
//   strip: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   title: {
//     color: Colors.button,
//     fontFamily: ApplicationStyles.textMsgFont,
//     fontSize: 16,
//   },
//   ttl: {
//     color: Colors.clr66,
//     fontFamily: ApplicationStyles.textFont,
//     fontSize: 14,
//     width: '25%',
//   },
//   tuple: {
//     borderBottomColor: Colors.button,
//     flexDirection: 'row',
//   },
//   userCircle: {
//     alignItems: 'center',
//     backgroundColor: Colors.user,
//     borderRadius: 50,
//     flexDirection: 'row',
//     height: 56,
//     justifyContent: 'center',
//     width: 56,
//   },
//   userDtl: {
//     padding: 10,
//     justifyContent: 'center',
//   },
//   userIcon: {
//     height: 16,
//     width: 16,
//   },
  checkbox: {
    borderRadius: 5,
    marginRight: 18,
  },

//   quizButton: {
//     width: wp('30%'),
//     alignSelf: 'center',
//     marginTop: hp('1%'),
//     borderColor: Colors.primary,
//     backgroundColor: Colors.primary,
//     borderWidth: 1,
//   },
  quizText: {
    fontSize: wp('3.8%'),
    color: Colors.white,
  },

  box: {
    width: Dimensions.get('window').width,
    //   backgroundColor: Colors.clrF1F9FF,
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 30,
    position: 'relative',
  },
  btmBox: {
    flexDirection: 'column',
  },
  desc: {
    color: Colors.button,
    fontSize: 12,
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
    color: Colors.button,
    fontSize: 18,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  ttl: {
    color: Colors.clr66,
    fontSize: 14,
  },
//   tuple: {
//     borderBottomColor: Colors.clrF1F9FF,
//     borderRadius: 1,
//     flexDirection: 'row',
//   },
//   userCircle: {
//     // marginTop: 80,
//     alignItems: 'center',
//     backgroundColor: Colors.user,
//     borderRadius: 50,
//     flexDirection: 'row',
//     height: 70,
//     justifyContent: 'center',
//     width: 70,
//   },
  userDtl: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    overflow: 'hidden',
    width: Dimensions.get('window').width - 120,
  },
//   userIcon: {
//     height: 16,
//     width: 16,
//   },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  card: {
    backgroundColor: 'white',
    elevation: 5,
    paddingHorizontal: '8%',
    borderRadius: 10,
    // minHeight:'45%'
  },
  grey: { color: 'grey', fontWeight: '700' },
  width50: { width: '50%' },
  width25: { width: '25%' },
  width20: { width: '20%' },
  width30: { width: '30%' },
  width33: { width: '33%' },
  width35: { width: '35%' },
  paddingTop: { paddingTop: 0 },

  editIcon: {
    fontSize: wp('3.4%'),
    color: Colors.primary,
    paddingHorizontal: 5,
    paddingTop: 0,
  },
  textContainer: {
    width: '100%',
    backgroundColor: Colors.lightGrey,
    padding: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 7,

    //marginBottom:"5%"
  },
  remarkContainer:{
    width: '100%',
    backgroundColor: Colors.primary,
    padding: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 7,
  }
})
