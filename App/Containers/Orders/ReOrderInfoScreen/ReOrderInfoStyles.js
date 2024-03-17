import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
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
  }
})
