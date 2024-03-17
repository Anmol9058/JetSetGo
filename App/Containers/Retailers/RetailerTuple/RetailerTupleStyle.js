import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  box: {
    alignSelf: 'center',
    backgroundColor: Colors.clrF1F9FF,
    width: Dimensions.get('window').width - 30,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    position: 'relative'
  },
  surface: {
    elevation: 5,
    backgroundColor: "white",
    marginVertical: 20,
    paddingHorizontal: "8%",
    paddingVertical: 20,
    marginTop:'3%',
    width:'92%', 
    alignSelf:'center',
    borderRadius:20, 
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:'5%'
  },
  keyvalue: {
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  head: { color: Colors.blue, fontWeight: "bold", fontSize: wp('5.6%') },
  subhead: { fontSize: 16, color: Colors.black },
  key: { color: Colors.grey, fontWeight:'800' },
  value: {
    color: Colors.black,
    fontWeight: "bold",
    width: "46%",
    marginLeft:10
  },
  marginTop: { marginTop: 18 },
  btmBox: {
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5
  },
  desc: {
    color: Colors.button,
    fontSize: 12,
    fontFamily: ApplicationStyles.textFont,
  },
  detail: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.clr66,
    fontSize: 14,
    textTransform: 'capitalize'
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  title: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 16
  },
  ttl: {
    color: Colors.clr66,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 14
  },
  tuple: {
    borderBottomColor: Colors.button,
    flexDirection: 'row'
  },
  userCircle: {
    // marginTop: 80,
    alignItems: 'center',
    backgroundColor: Colors.user,
    borderRadius: 50,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  userDtl: {
    padding: 10,
    paddingTop: 3
  },
  userIcon: {
    height: 16,
    width: 16,
  }
})
