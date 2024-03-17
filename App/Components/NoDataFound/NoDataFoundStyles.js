import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'10%',
  },
  text: {

    color: Colors.grey,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.4%'),
    textTransform: 'capitalize' ,
   

  }
})
