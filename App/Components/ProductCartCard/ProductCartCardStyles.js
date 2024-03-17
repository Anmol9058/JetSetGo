import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

let windowWidth = wp('100%')
let containerWidth = wp('94%')

export default StyleSheet.create({
  box: {
    backgroundColor: Colors.lightGrey,
    width: containerWidth,
    marginVertical: hp('.8%'),
    paddingVertical: hp('.7%'),
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('.1%'),
    borderRadius: 10,
    position: 'relative'
  },
  title: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMediumFont,
    fontSize: wp('3.2%'),
    marginBottom: 0,
    overflow:'hidden'
  },
  titleContainer: {
  	alignSelf: 'center',
  	width: wp('40%')
  },
  quantityContainer: {
  	alignSelf: 'center',
  	alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  	width: wp('30%'),
  	overflow: 'visible'
  },
  removeContainer: {
  	alignItems: 'flex-end',
  	justifyContent: 'flex-end',
  	width: wp('10%')
  },
  actionButton: {
    borderWidth: 0, 
    //alignSelf: 'center', 
    backgroundColor: Colors.lightGrey, 
    borderColor: '#BCE0FD',
    elevation: 0,
    width: wp('10%')
  },
  actionButtonText: {
    fontSize: wp('3%'),
    fontFamily: ApplicationStyles.textFont,
    color: Colors.clr66
  },
  actionButtonIcon: {
    color: Colors.button, 
    marginRight: -10,
    fontSize: wp('5%'),
  },
  ttl: {
    color: Colors.grey,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('3.0%'),
    marginTop: hp('.5%'),
    marginBottom: hp('.5%')
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  labelStyle: {
  	fontSize: wp('4%'), 
  },
  editIcon: {
  	fontSize: wp('5.5%'),
  	color: Colors.primary,
  	paddingHorizontal: 10,
  	paddingTop: 3
  },
  editInputField: {
    borderWidth: 0, 
    borderBottomWidth: 1, 
    borderRadius: 0,
    fontSize: wp('3.2%'),
    color: Colors.grey,
    width: 100,
    height: hp('3.2%'),
    textAlign: 'center',
    padding: 0
  },
  editInputFieldContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    width: '50%'
  },
  editInputFieldChildContainer: {
    width: '50%',
    marginLeft: '50%' 
  },
  detail: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.primary,
    fontSize: wp('3.5%'),
    flexWrap: 'wrap',
    flexShrink: 1,
    width: '50%',
    textAlign: 'right',
    marginTop: hp('.5%')
  },
  valueStyle: {
  	fontSize: wp('4%'),
  	color: Colors.grey
  },
  markLostButtonIcon: {
    fontSize: wp('5.2%'), 
    color: Colors.white
  },

  markLostButton: {
    width: wp('17%'), 
    alignSelf: 'center', 
    marginTop: hp('1%'), 
    borderColor: Colors.primary, 
    backgroundColor:Colors.primary,
  //	backgroundColor: 'transparent', 
    borderWidth: 1,
    height: hp('5%')
  },
  markLostButtonText: {
    fontSize: wp('3.4%'), 
    color: Colors.white
  },
})
