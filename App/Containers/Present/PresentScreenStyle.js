import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Row } from 'native-base'

export default StyleSheet.create({
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 50,
  },
  area: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: ApplicationStyles.textFont
  },
  button: {
   
    
    width: wp('30%'),
    borderRadius:20,
    height:hp('6%')
  },
  buttonBox: {
    ...Metrics.bottomMargin,
    textAlign: 'center',
  },
  container: {
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.mediumVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.white,
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 110
  },
  title: {
    fontSize: 24,
    ...Metrics.mediumBottomMargin,
    color: Colors.button,
    marginTop: 60,
    fontFamily: ApplicationStyles.textFont
  },
  card: {
    padding: 20,
    borderRadius: 6,
    elevation: 2
  }
})
