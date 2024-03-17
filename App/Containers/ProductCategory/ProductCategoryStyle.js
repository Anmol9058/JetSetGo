import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
export default StyleSheet.create({
  box: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 30,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    position: 'relative'
  }, mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("3%"),
    elevation: 10,
    

    
  },


  Card: {
      width:'90%',
      height:60,
    marginTop: "5%",
    elevation:5,
    justifyContent:'center',
    borderColor:'white',
    
    borderRadius:5 ,
  }
})
