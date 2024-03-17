import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  indicatorText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 16,
    alignSelf: 'center'
  },
  question: {
  	color: Colors.black,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('6%'),
  	// flexWrap: 'wrap'
  },
  nextButtonText: {
  	color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('5%'),
  	flexWrap: 'wrap',
    flex: 1,
    textAlign: 'center',
},
Button:{
  borderRadius: 10,
  width: 150,
  height:50,
  alignSelf: 'center',
  marginBottom: 40,
  marginTop:10
},
  questionaire: {
  	borderRadius: 10, 
  	width: '90%', 
    height:50,
  	alignSelf: 'center', 
  	marginBottom: 10, 
  	marginTop:10,
  	borderColor: '#f4f4f4'
  },
  questionaireText: {
  	color: '#000000'
  },
  questionaireSelectedText: {
  	color: Colors.primary
  },
  questionaireSelected: {
  	borderRadius: 10, 
  	width: '90%',
    height:50, 
  	alignSelf: 'center', 
  	marginBottom: 10, 
  	marginTop:10,
  	borderWidth: 2
  },
  previousIcon: {
  	color: Colors.primary,
  	fontSize: wp('5%'),
  	paddingHorizontal: wp('2%'),
  	position: 'absolute', 
  	left: '5%'
  }
})