import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({

    border:{
        borderWidth: 1, borderColor: 'black'
    },
    head:{
        height: 40, backgroundColor: '#f1f8ff'
    },
    text:{
        textAlign:'center', margin: 6 
    },
    V1:{
       marginTop:hp('5%'), bottom:hp('3%'), marginLeft:wp('4%'), marginRight:wp('4%')
    }
})
