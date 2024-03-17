import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
  select: {
    borderColor: Colors.border,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.border,
    // height: 33,
    // textAlignVertical: 'center',
    width: 100,
  },
  heading: {
  	fontSize: wp('4.2%'),
  	fontFamily: ApplicationStyles.textFont,
  	color: Colors.clr66
  },
  value: {
  	fontSize: wp('6%'),
  	fontFamily: ApplicationStyles.textMsgFont,
  	color: Colors.button
  }
})
