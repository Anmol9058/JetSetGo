import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default StyleSheet.create({
    card: {
        marginTop: hp('2%'),
        height: hp('24%'),
        width: wp('90%'),
        backgroundColor: '#F0F0F0'
    },
    head: {
        fontWeight: 'bold',
        margin: 10
    }

})
