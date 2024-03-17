import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Theme'

export default StyleSheet.create({
  input: {
    borderColor:'#515C6F',
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.inputText,
    fontFamily: ApplicationStyles.textMediumFont,
    paddingLeft: 20,
    width: (Dimensions.get('window').width - 65)
  },
  inputError: {
    borderColor: Colors.error,
  },
  item: {
    borderBottomWidth: 0,
    marginBottom: 7,
    marginTop: 7,
    alignSelf: 'center'
  },
  label: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    paddingLeft: 10,
  },
  placeholder: {
    color: Colors.inputPlaceholder,
    fontFamily: ApplicationStyles.textMsgFont,
  },
  textArea: {
    borderColor: Colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.inputText,
    fontFamily: ApplicationStyles.textMediumFont,
    paddingLeft: 20,
  },
})
