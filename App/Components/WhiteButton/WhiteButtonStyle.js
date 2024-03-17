import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    overflow: 'visible',
    ...ApplicationStyles.buttonShadow,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    width: wp('60%'),
  },
  text: {
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('5%'),
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  selectedButton: {
    backgroundColor: Colors.primary,
    elevation: 0
  },
  selectedText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
})

