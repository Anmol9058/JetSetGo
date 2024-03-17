import { Dimensions, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
    loader: {
        color: Colors.primary
    },
    label: {
        fontFamily: ApplicationStyles.textMediumFont,
        color: Colors.label,
        fontSize: 16,
        textAlign: 'left'
    },
    value: {
        fontFamily: ApplicationStyles.textMediumFont,
        color: Colors.clr66,
        fontSize: wp('3%'),
        textAlign: 'left'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 2,
        minHeight: 60,
        backgroundColor: Colors.lightBlue,
        width: Dimensions.get('window').width / 1.05,
        alignSelf: 'center',
        paddingHorizontal: 5
    },
    textContainerLabel: {
        width: '45%',
        color: Colors.label,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: Colors.lightBlue,

    },
    textContainerValue: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: Colors.lightBlue
    },
    imageStyle: {
        alignSelf: 'flex-end',
        height: 50,
        width: 50
    }

})
