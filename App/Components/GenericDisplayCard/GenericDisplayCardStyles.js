import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors, Metrics } from '../../Theme';

export default StyleSheet.create({
  card: {
    ...Metrics.normalPadding,
    backgroundColor: Colors.clrF1F9FF,
    borderRadius: 10,
    margin: 7,
    width: Dimensions.get('window').width - 30,
    elevation: 3,
    alignSelf: 'center'
  },
  darkCard: {
    ...Metrics.normalPadding,
    width: wp('92%'),
    backgroundColor: Colors.label,
    borderRadius: 10,
    margin: 5,
    elevation: 3,
    alignSelf: 'center'
  },
  darkDetail: {
    fontSize: wp('3.5%'),
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont
  },
  darkTitle: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.5%'),
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  darkTtl: {
    color: Colors.clrF1F9FF,
    fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textFont
  },
  detail: {
    color: Colors.clr66,
    fontSize: wp('3.7%'),
    fontFamily: ApplicationStyles.textMsgFont
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('.4%')
  },

  stripV: {
    flexDirection: 'column',
    justifyContent: 'space-around',
   marginLeft:wp('2%'),
   marginRight:wp('2%'),
   marginBottom:wp('1%')
  },
  title: {
    color: Colors.clr0094FF,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  ttl: {
    color: Colors.black,
    fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textFont
  },

  ttl1: {
    color: Colors.black,
    fontWeight:'700',
    fontSize: wp('3.9%'),

    fontFamily: ApplicationStyles.textFont
  },
  detail1: {
    color: Colors.grey,
    fontWeight:'900',
    fontSize: wp('4%'),
    fontFamily: ApplicationStyles.textMsgFont
  },
})
