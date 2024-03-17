import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
  name: {
  	color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4%'),
    marginBottom: 8
  }
})
