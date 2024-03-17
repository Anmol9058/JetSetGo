import { StyleSheet } from 'react-native'
import { Helpers, Metrics, Fonts, Colors, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default StyleSheet.create({
  tabs: {
   backgroundColor: Colors.user,
   color: Colors.white,
   marginBottom: 30,
   borderBottomWidth: 0,
   paddingHorizontal: 10,
   borderRadius: 5  
},
  tabText: {
  	color: Colors.button,
  	fontFamily: ApplicationStyles.textMsgFont,
  	fontSize: wp('4%')
  },
  tabHeading: {
  	backgroundColor: Colors.user,
  	paddingHorizontal: 0

  },
  tabUnderLine: {
  	backgroundColor: Colors.button
  },
  mainTabs: {
    marginTop: hp('1%')
  }
})
