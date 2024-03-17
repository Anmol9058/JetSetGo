import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { Left } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    action: {
        // marginTop: 80,
        width: wp('88%'),
    },
    button: {
        backgroundColor:'#2FDFD2',
        width: 100,
        marginRight: 8,
        marginLeft:120
    },
    container: {
        ...Metrics.tinyHorizontalPadding,
        ...Metrics.tinyVerticalPadding,
        ...Helpers.center,
        backgroundColor: Colors.white,
        flex: 1,
    },
    heading: {
        alignSelf: 'center',
        color: '#0720C4',
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: 24,
        marginBottom: 15
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
        marginBottom: hp('2%'),
        height: hp('5.5%'),
        fontSize: wp('3.5%'),
        borderWidth: 0,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10

    },
    
    text: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textFont,
        fontSize: 18,
    },
    picker: {
        borderRadius: 100,
        borderColor:'#515C6F',
        width: wp('88%'),
        borderWidth:0,
        elevation:5,
        backgroundColor:'white',
        // height: hp('5.5%'),
        marginTop: 5,
        marginBottom: hp('2%'),
        fontSize: wp('2%'),
        justifyContent: 'center'
    },
    recurringActionButton: {
        borderColor: Colors.border,
        borderStyle: 'solid',
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 100,
        borderWidth: 2,
        alignSelf: 'center',
        backgroundColor: Colors.clrF1F9FF,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
        marginRight: wp('6%')

    },
    recurringActionButtonText: {
        color: Colors.button,
        fontSize: wp('4%'),
        textTransform: 'capitalize',
        fontFamily: ApplicationStyles.textMediumFont
    },
    recurringActionButtonIcon: {
        color: Colors.button,
        fontSize: wp('4%')
    },
    bottomMargin: {
        margin: hp('1%'),
        width: '100%'
    },

    pickerLabel: {
        color: Colors.placeHolder,
        fontSize: 16,
        fontFamily: ApplicationStyles.textFont,
        textAlign: "left",
        width: "97%",
        padding: 10,
        marginLeft: 15,
        flexDirection: "row"
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: hp('3%')
    }
})
