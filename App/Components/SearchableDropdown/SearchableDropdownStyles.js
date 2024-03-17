import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Theme'

export default StyleSheet.create({
  select: {
    borderRadius: 10,
    color: Colors.border,
    // height: 33,
    // textAlignVertical: 'center',
    width: 250,
  },
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: Colors.white,
    borderColor: Colors.button,
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    color: Colors.primary,
    fontFamily: ApplicationStyles.textFont
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 0,
    borderRadius: 5,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    color: Colors.primary,
  },
  itemTextStyle: {
    color: Colors.primary,
    fontFamily: ApplicationStyles.textFont
  },
  itemsContainerStyle: {
    maxHeight: 140
  }
})
