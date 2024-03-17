import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

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
  ratingBox: {
  	position: 'absolute',
  	right: 10,
  	top: 24,
  	flexDirection: 'row'
  },
  btmBox: {
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5
  },
  desc: {
    color: Colors.clr66,
    fontSize: 13,
    fontFamily: ApplicationStyles.textFont,
    lineHeight: 20
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
    fontSize: 20,
    marginBottom: 6,
    width: (Dimensions.get('window').width - 30)/1.5
  },
  ttl: {
    color: Colors.clr66,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 12,
    paddingTop: 3 
  },
  ttlIcon: {
  	color: Colors.clr66,
    fontSize: 16
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
