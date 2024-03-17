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
  labelStyle: {
    color: '#515C6F',
    fontFamily: ApplicationStyles.textMsgFont,
    marginBottom: 2,
    marginLeft: 10,
    fontSize: wp('4.2%')
  }
})
