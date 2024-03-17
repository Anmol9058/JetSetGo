import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	monthPicker: {
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 80,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height:hp('7%'),
        width: wp('26%'),
    },
    dateChangeIcon: {
        color: Colors.primary,
        alignSelf: 'center',
        paddingHorizontal: wp('1%'),
        fontSize: wp('7.5%'),
       // marginTop: hp('5%')
    },
    
    dateChangeIcon1: {
        color: Colors.primary,
    
        paddingHorizontal: wp('0%'),
        fontSize: wp('8.5%'),
        marginTop: hp('1.5%')
    },
    
    dateText: {
        fontFamily: ApplicationStyles.textMediumFont,
        color: '#ffffff',
        fontSize: wp('4.8%'),
        textTransform: 'capitalize'
    },
  




});