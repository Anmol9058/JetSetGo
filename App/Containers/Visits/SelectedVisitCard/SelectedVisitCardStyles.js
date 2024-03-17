import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

export default StyleSheet.create({
  box: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: Dimensions.get('window').width - 30,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    position: 'relative', 
    elevation:10
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
    fontSize: 15,
    textTransform: 'capitalize'
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  title: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 20,
    marginBottom: 6,
    width: (Dimensions.get('window').width - 30)/1.5,
    fontWeight:'bold'

  },
  ttl: {
    color: Colors.clr66,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 12,
    alignSelf: 'center'
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
    padding: 0,
    paddingTop: 3,
    paddingLeft: 10
  },
  userIcon: {
    height: 16,
    width: 16,
  },
  recurringActionButton: {
    borderColor: Colors.border,
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 2, 
    alignSelf: 'center', 
    backgroundColor: Colors.clrF1F9FF,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15

  },
  recurringActionButtonText: {
    color: Colors.button,
    fontSize: 18,
    textTransform: 'capitalize',
    fontSize: 14,
    fontFamily: ApplicationStyles.textMediumFont
  },
  recurringActionButtonIcon: {
    color: Colors.button, 
    fontSize: 20, 
    marginRight: 0
  }

})
