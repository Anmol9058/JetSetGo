import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors, Fonts } from '../../Theme';

export default StyleSheet.create({
  icon: {
    color: Colors.grey,
    fontSize: wp('7.3%')
  },
  iconText: {
  	color: Colors.grey,
  	fontFamily: ApplicationStyles.textFont,
  	fontSize: Fonts.iconText.fontSize,
    alignSelf: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    paddingLeft: 0, 
    paddingRight: 0
  },
  iconActive: {
  	color: Colors.blue
  },
  iconButton: {
  	backgroundColor: Colors.white,
  	borderRadius: 0,
    height: '100%'
  },
  iconActiveButton: {
  	backgroundColor: Colors.white
  }
});
