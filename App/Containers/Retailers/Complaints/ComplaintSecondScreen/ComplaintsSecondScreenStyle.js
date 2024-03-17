import { StyleSheet,Dimensions } from "react-native";
import { Colors, Metrics, Helpers, ApplicationStyles } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const {width,height}=Dimensions.get('window')
export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom:40
    },
    pickerLabel: {
        color: Colors.grey,
        fontFamily: ApplicationStyles.textFont,
        textAlign: "left",
        width: "99%",
        padding: 10,
        marginLeft:20,
        flexDirection: "row"
      },
    ProductCategory: {
        width:'100%',
        marginTop:12.1,
        justifyContent: 'center',
        height: 42,
        borderColor:'#70707078',
        borderWidth:1,
        shadowColor: "#000",
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
  
    Product: {
       
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        marginLeft:20,
        marginTop:12.1,
        borderRadius: 2,
        shadowColor: "#000",
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    Product1: {
       
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        marginLeft:20,
        marginTop:12.1,
        borderRadius: 2,
        shadowColor: "#000",
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
  , mb10: {
       
        height: hp('5.7%'),
        fontSize: wp('3.7%'),
        justifyContent: 'center',
        padding: 0,marginHorizontal:20,
        borderRadius:2,
      },
      
      picker: {
        borderRadius: 2,
        width: wp('90%'),
        marginTop:10,
        height: hp('5.7%'),
      
        paddingHorizontal: 0
      },
      pickerLabel: {
        color: Colors.grey,
        fontFamily: ApplicationStyles.textFont,
        textAlign: "left",
        width: "99%",
        padding: 10,
        flexDirection: "row"
      },

      actionButtonText1: {
        fontSize: wp('2.9%'),
        fontFamily: ApplicationStyles.textMsgFont,
        
      },
      bottomMargin: {
        marginBottom: hp('2%'),
        width: '100%'
      },
      recurringActionButtonText: {
        color: Colors.primary,
        fontSize: wp('4%'),
        textTransform: 'capitalize',
        fontFamily: ApplicationStyles.textMediumFont
      },
      actionButtonText: {
        fontSize: wp('2.9%'),
        fontFamily: ApplicationStyles.textMsgFont,
        color:Colors.black
      },
      actionButton1: {
       
        paddingLeft: wp('6%'),
        paddingRight: wp('4%'),
        marginBottom: hp('2%'),
        marginTop: hp('2%'),
        marginRight: wp('2%'),
        marginLeft: wp('1%'),
        height: hp('6%'),
        minWidth: wp('30%'),
        
      },
      actionButtonText1: {
        fontSize: wp('2.9%'),
        fontFamily: ApplicationStyles.textMsgFont,
        
      },
      box:{height:'15%',marginHorizontal:20,borderWidth:1,marginTop:10,padding:10,borderColor: Colors.grey,borderRadius:2},
      box1:{marginHorizontal:20,borderWidth:1,marginTop:10,padding:10,borderColor: Colors.grey,borderRadius:2},
      text_:{marginLeft:20,marginTop:10,color:Colors.primary}

});