import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  action: {
    marginTop: 60,
    width: 250,
  },
  button: {
    ...Metrics.smallBottomMargin,
  },
  buttonBox: {
    ...Metrics.bottomMargin,
    ...Helpers.textCenter,
  },
  clock: {
    ...Helpers.colCenter,
    borderColor: Colors.label,
    borderRadius: 200,
    borderWidth: 2,
    color: Colors.white,
    height: 220,
    marginTop: 30,
    width: 220,
  },
  buttons: {
   
   
    width: '100%',
    borderRadius:10,
    height:hp('6%')
  },

  buttontextStyle: {
    textTransform : 'uppercase',
    alignSelf:'center'
  },
  container: {
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.mediumVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.white,
    // borderBottomWidth: 0,
    borderColor: Colors.shadow,
    flex: 1
  },
  card: {
    padding: 40,
   
    borderRadius: 6,
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    ...Fonts.h1,
    color: Colors.clr66,
    margin: 'auto',
  },
})
