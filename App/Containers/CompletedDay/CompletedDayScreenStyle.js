import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

export default StyleSheet.create({
  clock: {
    backgroundColor: Colors.clrF1F9FF,
    borderWidth: 0,
  },
  title: {
    ...Metrics.mediumBottomMargin,
    ...Helpers.textCenter,
    color: Colors.button,
    fontSize: 20,
    marginTop: 40,
    fontFamily: ApplicationStyles.textFont
  },
})
