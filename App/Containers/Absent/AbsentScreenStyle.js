import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { Row } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default StyleSheet.create({
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  area: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: ApplicationStyles.textFont
  },
  actionButton: {
    ...Metrics.smallBottomMargin,
     width: 250,
     alignSelf: 'center',
     height: hp('5.5%')
   },
  button: {
    ...Metrics.smallBottomMargin,
    width: 120,
    height: hp('5.5%')

  },
  buttonBox: {
    ...Metrics.bottomMargin,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.mediumVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.white,
    flex: 1,
    marginHorizontal: 10
  },
  title: {
    fontSize: 24,
    ...Metrics.mediumBottomMargin,
    color: Colors.button,
    fontFamily: ApplicationStyles.textFont
  },
  card: {
    padding: 15,
    elevation: 2,
    height: hp('55%'),
    justifyContent: 'center'
  },
  mt30: {
    marginTop: 30
  },
  mv10: {
    marginTop: 10,
    marginBottom: 10
  },
  selectedAction: {
    color: Colors.white,
    backgroundColor: Colors.primary
  }
})
