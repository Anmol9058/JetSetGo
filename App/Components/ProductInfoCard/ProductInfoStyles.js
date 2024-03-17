import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
 box: {
    alignSelf: 'center',
    backgroundColor: Colors.clrF1F9FF,
    width: wp('92%'),
    marginVertical: 8,
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderRadius: 10,
    position: 'relative'
  },
  desc: {
    color: Colors.clr66,
    fontSize: wp('3%'),
    fontFamily: ApplicationStyles.textFont,
    width: wp('92%')*.9,
    overflow:'hidden'
  },
  btmBox: {
    flexDirection: 'column',
    paddingTop: hp('2%')
  },
  detail: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.clr66,
    fontSize: wp('4%'),
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
    fontSize: wp('5%'),
    marginBottom: 4,
    width: wp('80%')
  },
  ttl: {
    color: Colors.clr66,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 12
  },
  ttlIcon: {
  	color: Colors.clr66,
    fontSize: wp('3%')
  },
  tuple: {
    borderBottomColor: Colors.button,
    flexDirection: 'row'
  },
  actionButtonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: hp('3%'),
    width: '100%'
  },
  actionButton: {
    borderWidth: 1.5, 
    alignSelf: 'center', 
    backgroundColor: Colors.clrF1F9FF, 
    borderColor: '#BCE0FD', 
    height: hp('4.5%'),
    width: wp('92%')*.25
  },
  actionButtonText: {
    fontSize: wp('3%'),
    fontFamily: ApplicationStyles.textFont,
    color: Colors.clr66
  },
  actionButtonIcon: {
    color: Colors.button, 
    fontSize: wp('5%'),
    marginRight: 0, 
    marginLeft: wp('5%'),
  },
  quantityContainer: {
    alignSelf: 'flex-end',
    width: wp('92%')*.40,
    textAlign: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
