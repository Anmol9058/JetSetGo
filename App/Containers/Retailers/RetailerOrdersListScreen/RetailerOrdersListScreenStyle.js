import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  action: {
    width: wp('88%'),

    marginTop:'8.5%',
   
  },
  
  container: {
  
    backgroundColor: Colors.white,
    flex: 1,
  },
 
  monthPicker: {
    alignSelf: 'center',
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: 'row',
    
    justifyContent: 'center',
    padding: 10,
    width: wp('25%')
},

dateText: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
    fontSize: wp('4%'),
    textTransform: 'capitalize'
},
dateIcon: {
  color: Colors.white,
  fontSize: wp('7%'),
  marginLeft: 0,
  marginRight: 0,
  zIndex: 2,
  paddingLeft: wp('3%')
},
dateChangeIcon: {
  color: Colors.button,
  alignSelf: 'center',
  paddingHorizontal: wp('3%'),
  fontSize: wp('11%'),
 
},
  
 
})