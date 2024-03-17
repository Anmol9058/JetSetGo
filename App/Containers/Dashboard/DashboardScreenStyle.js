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
      borderRadius: 5,
    },
    tabText: {
      color: Colors.firozi,
      fontFamily: ApplicationStyles.textMsgFont,
      fontSize: wp('4%'),
      fontWeight:'bold',
    },
    tabHeading: {
      backgroundColor: Colors.white,
      paddingHorizontal: 0,
     
      
    },
    tabUnderLine: {
      backgroundColor: Colors.button,
    },
    mainTabs: {
      marginTop: hp('1%'),
      backgroundColor: Colors.user,
    },
    noDataText: {
      color: Colors.button,
      fontFamily: ApplicationStyles.textMsgFont,
      fontSize: 16,
      textAlign: 'center',
    },
    itemContainer: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#f0f0f0',
    },
    itemTitle: {
      fontSize: wp('2.9%'),
      fontWeight: 'bold',
      color: '#343434',
      textAlign: 'center'
  
  
    },
    itemDetail: {
      fontWeight: 'bold',
      color: '#08b3a6',
      textAlign: 'center',
      marginVertical: 30,
    },
    itemDetail1: {
      fontWeight: 'bold',
      color: '#08b3a6',
      textAlign: 'center',
      marginVertical: 8,
    },
    orderValueWrapper: {
      flexDirection: 'row',
      marginVertical: 30,
      alignItems: 'center',
      alignSelf: 'center',
    },
    orderValueTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#08b3a6',
      textAlign: 'center',
    },
    visitedAreaHeading: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#343434',
      textAlign: 'left',
      marginHorizontal: 10,
      marginTop: 15,
    },
    visitedAreaName: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#08b3a6',
      textAlign: 'center',
    },
  })
  