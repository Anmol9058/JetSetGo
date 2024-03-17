import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { Row } from 'native-base'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
    ...Metrics.smallBottomMargin,
    width: 120
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
    shadowColor: Colors.button,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 6,
    elevation: 2
  },
  markLostButton: {
    width: wp('21.5%'), 
    alignSelf: 'flex-end', 
    marginTop: hp('1%'), 
    borderColor: Colors.primary, 
    backgroundColor: 'transparent', 
    borderWidth: 1,
    height: hp('4.4%'),
    marginRight: wp('2%'),
    marginBottom:wp('2%')
  },
  markLostButtonText: {
    fontSize: wp('3.8%'), 
    color: Colors.primary
  },
  markLostButtonIcon: {
    fontSize: wp('5%'), 
    color: Colors.primary
  }
})
