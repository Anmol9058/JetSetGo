import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    loader: {
        color: Colors.primary
    },
    label: {
        fontFamily: ApplicationStyles.textMediumFont,
        color: Colors.clr66,
        fontSize: 16,
        textAlign: 'left',
    },
    value: {
        fontFamily: ApplicationStyles.textFont,
        color: Colors.clr66,
        fontSize: 16,
        textAlign: 'left',
        padding: 10

    },
    container: {
        flexDirection: 'row',
        borderBottomWidth: .5,
        alignItems: 'center',
        borderColor: Colors.button,
        paddingLeft: 20,
        overflow: 'hidden',
        width: wp('100%')
    },
    textContainerLabel: {
        width: wp('30%')
    },
    textContainerValue: {
        padding: 5,
        marginRight: 10,
        overflow: 'hidden',
        width: wp('70%')
    }
})
