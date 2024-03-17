import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles, Metrics } from 'App/Theme'

export default StyleSheet.create({
  darkCard: {
    ...Metrics.normalPadding,
    alignSelf: 'center',
    backgroundColor: Colors.clrF1F9FF,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    marginHorizontal: (Dimensions.get('window').width*.08)/2,
    marginTop: (Dimensions.get('window').height*.08)/3,
    width: (Dimensions.get('window').width*.92),
    elevation: 4
  },
  darkDetail: {
    fontSize: 15,
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont
  },
  darkTitle: {
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  darkTtl: {
    color: Colors.clrF1F9FF,
    fontSize: 15,
    fontFamily: ApplicationStyles.textFont
  },
  detail: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textMsgFont
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 20,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  ttl: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textFont
  },
})
