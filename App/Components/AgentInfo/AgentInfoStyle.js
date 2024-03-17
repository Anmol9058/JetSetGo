import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from '../../Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  heading: {
  	fontSize: wp('5%'),
  	fontFamily: ApplicationStyles.textFont,
	  color: Colors.primary,
	  fontWeight:'bold'
  },
  value: {
  	fontSize: wp('4%'),
  	fontFamily: ApplicationStyles.textMsgFont,
  	color: Colors.primary
  },
  container: {
  	flexDirection: 'column',
  	marginVertical: 10
  },
  textContainer: {
  	width: '100%',
  	backgroundColor: Colors.lightGrey,
  	padding: 10,
  	alignItems: 'flex-start',
  	justifyContent: 'center',
  	borderRadius: 5,
  	marginTop: 7 
  }
})
