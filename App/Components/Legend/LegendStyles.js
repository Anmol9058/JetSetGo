import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
  heading: {
  	fontSize: wp('2.2%'),
  	fontFamily: ApplicationStyles.textFont,
  	color: Colors.clr66
  }
})
