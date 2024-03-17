import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
  button: {
    // backgroundColor: Colors.lightGrey,
    // borderColor: Colors.primary,
    // overflow: 'hidden',
    // ...ApplicationStyles.buttonShadow,
    // alignItems: 'center',
    // flexDirection: 'row',
    // paddingLeft: 15,
    // paddingRight: 15,
    // paddingTop: 10,
    // paddingBottom: 10,
    // justifyContent: 'space-around',
    // borderRadius: 10


    backgroundColor: Colors.primary,
    borderColor: 0,
    borderWidth: 0,
    overflow: 'visible',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 5
   
   

   // bottom:20,
   // paddingTop: 10,
    


  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('5%'),
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: -5
  },
})