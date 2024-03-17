import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from '../../../Theme'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    action: {
        // marginTop: 80,
        width: 360,
    },
    button: {
        ...Metrics.smallBottomMargin,
        backgroundColor: Colors.button,
        borderColor: Colors.border,
        borderStyle: 'solid',
        borderWidth: 1,
        width: wp('45%')
    },
    approvalbutton: {
        ...Metrics.smallBottomMargin,
        backgroundColor: Colors.button,
        borderColor: Colors.border,
        borderStyle: 'solid',
        borderWidth: 1,
        width: wp('70%')
    },
    container: {
        ...Helpers.center,
        backgroundColor: Colors.white,
        flex: 1,
        width: '100%'
    },
    link: {
        color: Colors.label,
        flexDirection: 'row',
        height: 30,
        justifyContent: 'flex-end',
    },
    linkText: {
        ...Fonts.input,
        color: Colors.label,
    },
    mb10: {
        marginBottom: 10,
    },
    plus: {
        backgroundColor: Colors.white,
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    plusIcon: {
        borderRadius: 50,
        bottom: 75,
        position: 'absolute',
        right: 25,
        borderRadius: 50,
        height: 45,
        width: 45,
        backgroundColor: Colors.button,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textFont,
        fontSize: 18,
    },
})
