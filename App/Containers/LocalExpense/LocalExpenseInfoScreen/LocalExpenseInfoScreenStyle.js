import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    parentContainer: {
        flex: 1
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: wp('1%'),
        paddingRight: wp('1%'),
        alignItems: 'center',
        height: hp('12%')
    },
    actionButton: {
        borderWidth: 1.5,
        alignSelf: 'center',
        height: hp('6%'),
        width: wp('94%'),
        margin: 12
    },
    actionButtonText: {
        fontSize: wp('4%'),
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        fontFamily: ApplicationStyles.textMediumFont
    },
    actionButtonIcon: {
        color: Colors.button,
        fontSize: 20,
        marginRight: 0,
        marginLeft: 12
    },
    callAction: {
        width: wp('20%')
    },
    locationAction: {
        width: wp('38%')
    },
    directionAction: {
        width: wp('45%')
    }
});
