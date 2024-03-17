import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
  picker: {
    borderRadius: 10,
    width:'94%',
    minHeight: hp('4.4%'),
    paddingHorizontal: 8,
    marginBottom: hp('2%'),
    marginLeft: 0,
   ///backgroundColor: 'transparent'
   borderColor: Colors.firozi,
   borderWidth:1.5,
  // marginTop:5,

  },
  pickerLabel: {
    color: Colors.grey,
    fontFamily: ApplicationStyles.textMsgFont,
    textAlign: "left",
    width: "99%",
    fontSize: wp('2.8%'),
    alignSelf: 'center'
  }
})
