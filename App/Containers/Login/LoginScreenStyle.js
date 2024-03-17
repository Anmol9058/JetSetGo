import { ApplicationStyles, Colors, Fonts, Helpers, Metrics } from 'App/Theme';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  action: {
    marginTop: hp('5%'),
    width: wp('80%'),
    justifyContent: 'center'
  },
  button: {
    ...ApplicationStyles.formButton,
    alignSelf: 'center',
    marginTop: hp('5%'),
    maxHeight: hp('6%')
  },
  buttonBox: {
    ...Helpers.textCenter,
  },
  container: {
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.mediumVerticalPadding,
    ...Helpers.center,
    backgroundColor: Colors.white,
    flex: 1,
    // marginHorizontal: 30,
    // marginVertical: hp('10%'),
    shadowColor: Colors.white
  },
  link: {
    color: Colors.label,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'flex-end',
  },
  linkText: {
    ...Fonts.input,
    color: Colors.label,
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },
  mb10: {
    marginBottom: 10
  },
  logoContainer:{
    width: 250, 
    height: 150, 
    resizeMode: 'contain'
  }
});
