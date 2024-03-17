import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
  input: {
   borderColor:Colors.firozi,
    borderRadius: 8,
     borderWidth: 1.5,
   // elevation:5,
    backgroundColor:'white',
    color: Colors.inputText,
    fontFamily: ApplicationStyles.textMediumFont,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputError: {
    borderColor: Colors.error,
  },
  item: {
    borderBottomWidth: 0,
    marginBottom: 7,
    marginTop: 7
  },
  itemNumber: {
    marginVertical: 10,
  },

  label: {
    color:Colors.primary,
    fontWeight:'bold',
    fontFamily: ApplicationStyles.textMsgFont,
    paddingLeft: 10,
    fontSize: wp('4.2%')
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
  indicatorView:{width:'100%',backgroundColor:'white',borderColor:Colors.firozi,borderWidth:1.5},
})
