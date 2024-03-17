import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../Theme';

export default StyleSheet.create({
  button: {
   color: Colors.button,
   paddingRight: 10,
   paddingLeft: 5,
   fontSize: wp('7%')
  }
})
