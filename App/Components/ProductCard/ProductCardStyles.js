import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
 box: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
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
    color: Colors.headingBlack,
    fontSize: wp('3.4%'),
    fontWeight:'bold',
    fontFamily: ApplicationStyles.textFont,
    width: wp('62%')*.9,
    overflow:'hidden', 
    marginLeft:'7%',
    marginTop: hp('0.4%')


  },
  brandInput: {
    fontSize: wp('3.0%'),
    height: hp('4.2%'),
    width: wp('9%'),
    padding: 0
},
 title: {
    color: Colors.button,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.1%'),
    marginBottom: 4,
    width: wp('55.5%'),
    marginLeft:'7%',
    fontWeight:'bold',
    marginTop: hp('1%')
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
    alignItems:'center',
    justifyContent:'center', 
    backgroundColor: Colors.firozi, 
    borderColor: '#BCE0FD', 
    height: hp('5.1%'),
    width: wp('60%'),
    marginLeft: wp('12%')
  },
  actionButtonText: {
    fontSize: wp('4%'),
    fontFamily: ApplicationStyles.textFont,
    color: Colors.white,
    fontWeight:'bold',
  },
  actionButtonIcon: {
    color: Colors.button, 
    fontSize: wp('5%'),
    marginRight: 0, 
    fontWeight:'bold',
    marginLeft: wp('5%'),
  },
  quantityContainer: {
  // alignSelf: 'flex-end',
   // width: wp('5%'),
    //textAlign: 'right',
    flexDirection: 'row',
    //justifyContent: 'flex-end'
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('.5%')
  },
  price: {
    color: '#000000',
    fontSize: wp('4%'),
    marginHorizontal: wp('1%'),
    marginLeft: 0
  },
  discountedPrice: {
    color: Colors.clr66,
    fontSize: wp('3%'),
    textDecorationLine: 'line-through',
    marginHorizontal: wp('1%'),
  },
   discountedPriceOff: {
    color: Colors.green,
    fontSize: wp('3%'),
    marginHorizontal: wp('1%'),
    fontWeight: 'bold'
  },
  availableStock: {
    color: '#EF6331',
    fontSize: wp('3.5%'),
    marginHorizontal: wp('1%'),
    fontWeight: 'bold',
    marginLeft: 0
  },
   Img: {

    width : wp('25.5%'),
    height : wp('30%'),
    marginRight : wp('5%'),
    borderRadius: wp('2%'),
    

  } 
})

