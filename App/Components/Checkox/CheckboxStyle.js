import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'flex-start',
        position: 'relative',
        flexDirection: 'row'
    },
    labelText: {
        fontSize: wp('4%'),
        fontFamily: ApplicationStyles.textFont,
        color:Colors.grey,
        marginLeft: 40
    }
})
