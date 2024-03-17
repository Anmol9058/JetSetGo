import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { Left } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  action: {
     marginTop: 10,
    width: wp('88%'),
  marginHorizontal:22
   
  },
  dropdown: {
    height: hp('6%'),
    width: ('100%'),
    borderRadius: 1,
    borderColor: '#707070',
    marginTop: 5
},
  label: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.5%'),
    ...Metrics.tinyVerticalMargin
  },
  button: {
    width: 120,
    alignSelf:'center', 
    marginTop:30,
    marginBottom:20,
    height: hp('5%')
  },
  container: {
    ...Metrics.tinyHorizontalPadding,
    ...Metrics.tinyVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.white,
    flex: 1,
  },
 
  heading: {
    alignSelf: 'center',
    color: Colors.clr0094FF,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 24,
    marginBottom: 15
  },

  mb10: {
    marginBottom: hp('2%'),
    height: hp('5.5%'),
    fontSize: wp('3.7%'),
    justifyContent: 'center',
    padding: 0
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },
  pickerStyle: {
    borderRadius: 10,
    width: wp('88%'),
    height: hp('5.5%'),
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: hp('2%'),
    fontSize: wp('2%'),
    justifyContent: 'center'
  },
  heading1: {
    alignSelf: 'center',
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.2%'),
	marginBottom: 0, 
  fontWeight:'bold',
  marginRight:'5%'
  },
  picker: {
    borderRadius: 10,
    width: wp('88%'),
    height: hp('5.5%'),
    marginTop: 5,
    marginBottom: hp('2%'),
    fontSize: wp('2%'),
    paddingHorizontal: 5,
    justifyContent: 'center'
  },

  bottomMargin: {
    marginBottom: hp('2%'),
    width: '100%',alignSelf:'center',justifyContent:'center'
  },
  imgbottomMargin: {
    marginBottom: hp('2%'),
    width: '100%',
   marginLeft:wp('1%'),
    marginTop:hp('2%'),
  },

  inputText: {
    borderRadius: 10,
    fontSize: wp('3.5%')
  },
  
  recurringActionButton1: {
    borderColor: Colors.white,
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
  recurringActionButtonText1: {
    color: Colors.white,
    fontSize: wp('5%'),
    textTransform: 'capitalize',
    fontFamily: ApplicationStyles.textMediumFont
  },
  recurringActionButtonIcon1: {
    color: Colors.placeHolder,
    fontSize: wp('5%'), 
    
  },
  pickerLabel: {
    color: Colors.placeHolder,
    fontFamily: ApplicationStyles.textFont,
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  Input:{
    borderWidth: 0, 
    margin: 1,
    elevation: 4,
    marginTop: 2,
    borderRadius: 5,
    backgroundColor: 'white',
    height:hp('5%'), 
  
  },
  v3:{
    borderWidth: 0, 
    margin: 1,
    elevation: 4,
    marginTop: 2,
    borderRadius: 5,
    backgroundColor: 'white',
    height:hp('6%'),  
     width:wp('65%'),
     fontWeight: 'bold',
     color: '#707070', padding:15
  
  },
  Input2:{
    borderWidth: 0, 
    margin: 1,
    elevation: 4,
    marginTop: 2,
    borderRadius: 5,
    backgroundColor: 'white',
    height:hp('15%'), 
  },
  T1:{
    fontWeight: 'bold', marginTop: 8, color: '#707070' },
   
    button2:{
      width:wp('20%'),
      height:hp('6.5%')
    }

})
