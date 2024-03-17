import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
    container: {
        marginBottom: 10
    },
    leftViewContainer: {
        borderRadius: 100,
        height: hp('5.5%'),
        width: '100%',
        marginTop: 5,
        marginBottom: hp('2%'),
        fontSize: wp('2%'),
        justifyContent: 'center',
        paddingLeft: 8,
        borderColor: Colors.button,
        borderWidth: 1
    },
    rightViewContainer: {
        width: wp('25%'),
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: Colors.button,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        color: Colors.white,
        fontSize: 16
    },
    textStyle: {
        marginLeft: 5,
        color: Colors.white
    },
    labelStyle: {
        color: Colors.button,
        fontFamily: ApplicationStyles.textMsgFont,
        paddingLeft: 10,
        fontSize: wp('4.2%')
    }
})
