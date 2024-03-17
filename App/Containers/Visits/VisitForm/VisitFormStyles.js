import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({

  box:{
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: wp('100%'),
    marginVertical: 0,
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    paddingTop: hp('-10%'),
    paddingBottom: hp('0%'),
    borderRadius: 0,
    position: 'relative',
    elevation:8

  },
  action: {
    ...Helpers.row,
    ...Helpers.mainSpaceBetween,
    marginTop: hp('3%'),
  },
  button: {
    ...Metrics.smallBottomMargin,
    width: wp('40%'),
    alignSelf:'center',
    marginBottom: hp('5%'),
    height: hp('5%')
  },
  camera: {
    color: Colors.button,
    fontSize: 20,
    //marginLeft: 12,
    marginRight: 0,
  },
  container: {
   
    backgroundColor: Colors.white,
    flex: 1,
    position: 'relative'
  },

  addInfoContainer: {
   
    backgroundColor: Colors.lightGrey,
    flex: 1,
    position: 'relative'
  },
  formHeading: {
    alignSelf: 'flex-start',
    color: Colors.grey,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
    fontSize: wp('6.3%'),
    fontWeight:'bold',
    marginBottom: hp('2%'),
    marginTop: hp('5%'),
    marginLeft: wp('10%')
    

  //  textTransform: 'uppercase'
},
AddformHeading: {
  alignSelf: 'flex-start',
  color: Colors.grey,
  fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
  fontSize: wp('6.0%'),
  fontWeight:'600',
  marginBottom: hp('2%'),
  marginTop: hp('2.5%'),
  marginLeft: wp('2.5%')
  

//  textTransform: 'uppercase'
},

compformHeading: {
  alignSelf: 'flex-start',
  color: Colors.primary,
  fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
  fontSize: wp('5.6%'),
  fontWeight:'bold',
  marginBottom: hp('2%'),
  marginTop: hp('0.5%'),
  marginLeft: wp('2.5%')
  

//  textTransform: 'uppercase'
},
  form: {
    width: wp('85%'),
    margin: 'auto',
    alignItems: 'flex-start',
    borderWidth: 1, borderRadius: 10, padding: 10, borderColor: Colors.primary,
    marginBottom: 25,
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'visible'
  },
  heading: {
    alignSelf: 'center',
    color: Colors.clr0094FF,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 24,
    marginBottom: 15,
  },
  label: {
    color: Colors.grey,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('3.5%'),
    ...Metrics.tinyVerticalMargin
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
    marginBottom: 18,
  },
  pickerLabel: {
    color: Colors.placeHolder,
    flexDirection: 'row',
    fontFamily: ApplicationStyles.textFont,
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
    width: '99%',
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },
  uploader: {
    ...Metrics.verticalMargin,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  uploaderText: {
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  wish: {
    alignSelf: 'center',
    color: Colors.label,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 34,
    textTransform: 'uppercase',
  },
  actionButton: {
    marginRight: wp('4%'),
    marginTop: hp('.3%'),
    borderRadius: 100,
    height: 30
  },
  actionButtonText: {
    fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textMsgFont

  },
  recurringActionButton: {
    borderColor: Colors.firozi,
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 2,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    marginRight: wp('6%')

  },
  recurringActionButtonText: {
    color: Colors.firozi,
    fontSize: wp('5%'),
    textTransform: 'capitalize',
    fontFamily: ApplicationStyles.textMediumFont
  },
  recurringActionButtonIcon: {
    color: Colors.firozi,
    fontSize: wp('5%'), 
    
  },
  bottomMargin: {
    marginBottom: hp('2%'),
    width: '100%',
    marginLeft:wp('10%'),
    marginTop:hp('4%'),
  },

  bottomMargin1: {
    marginBottom: hp('2%'),
    width: '100%',
    marginLeft:wp('9%'),
    marginTop:hp('1%'),
    marginRight:hp('2%'),
    width:'80%',
  },
  inputText: {
    borderRadius: 10,
    fontSize: wp('3.5%'),
    paddingRight:20
  },
  picker: {
    borderRadius: 10,
    width: wp('77%'),
    marginLeft: 0,
    flex: 1,
    // height: hp('6%'),
    marginBottom: hp('2%')
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3.5%'),
  },
    plusIcon: {
    borderRadius: 50,
    zIndex: 10,
    position: 'absolute',
    right: 45,
    borderRadius: 50,
    height: 30,
    width: 30,
    backgroundColor: Colors.firozi,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('6%'),
  },

  addPlusIcon: {
    borderRadius: 50,
    bottom: wp('40%'),
    position: 'absolute',
    right: wp('5%'),
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.firozi,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('6%'),
    zIndex: 10
  },
   removeIcon: {
    borderRadius: 50,
    top: 5,
    position: 'absolute',
    right: 5,
    borderRadius: 50,
    height: 25,
    width: 25,
    backgroundColor: Colors.button,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3
  },
  brandInput: {
    fontSize: wp('3.2%'),
  },
  trashButtonIcon: {
    color: Colors.error,
    fontSize: wp('6%'),
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    right: wp('0.5%'),
    padding: 5,
    marginBottom:'2%',
  },

  addButton: {
    marginTop: 20,
    width: wp('15%'),
    height: wp('14%'),
    marginRight: 10,
    borderRadius: 100,
    alignSelf: 'flex-end',
    //textAlign: 'left',
    backgroundColor: Colors.firozi
  },
  addButtonText: {
   fontSize: wp('5.5%'),
   textAlign: 'left',
   color: Colors.white
  },
  addButtonIcon: {
    color: Colors.white,
    fontSize: wp('8%'),
    alignSelf: 'center'
  },
  button: {
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
    width: wp('35%'),
    marginRight: 10,
    borderRadius: 10,
    alignSelf: 'center',
    height: hp('6%')
  },
  recurringActionButton1: {
    borderColor: Colors.primary,
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 2, 
    alignSelf: 'center', 
    backgroundColor: Colors.lightGrey,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    marginRight: wp('6%')

  },
  recurringActionButtonText1: {
    color: Colors.primary,
    fontSize: wp('4%'),
    textTransform: 'capitalize',
    fontFamily: ApplicationStyles.textMediumFont
  },
  recurringActionButtonIcon1: {
    color: Colors.primary, 
    fontSize: wp('4%')
  },

  	markLostButton: {
  		width: wp('17%'), 
  		alignSelf: 'center', 
  		marginTop: hp('1%'), 
      borderColor: Colors.primary, 
      backgroundColor:Colors.primary,
  	//	backgroundColor: 'transparent', 
      borderWidth: 1,
      height: hp('5%')
  	},
  	markLostButtonText: {
  		fontSize: wp('3.4%'), 
  		color: Colors.white
  	},
  	markLostButtonIcon: {
  		fontSize: wp('5.2%'), 
  		color: Colors.white
    },
    box: {
      alignSelf: 'center',
      backgroundColor: Colors.white,
      width: wp('80%'),
      marginVertical: 4,
      paddingLeft: wp('5%'),
      paddingRight: wp('3%'),
      paddingTop: hp('2%'),
      paddingBottom: hp('2%'),
      borderRadius: 10,
      position: 'relative',
      elevation: 1,
     
    },
})
