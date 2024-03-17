import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from '../../Theme'

export default StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 15
  },
})
