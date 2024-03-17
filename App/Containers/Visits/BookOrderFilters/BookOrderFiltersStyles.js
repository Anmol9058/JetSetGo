import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  box: {
    alignSelf: 'center',
    backgroundColor: Colors.clrF1F9FF,
    width: Dimensions.get('window').width - 30,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    position: 'relative'
  },
  topContainer: {
	flex: 1, 
	justifyContent: 'center',
	alignItems: 'center',
	paddingTop: hp('0%') ,
	  elevation: 10
  },
  filtersContainer: {
  	height: '90%', 
  	width: '100%', 
  
  },
  leftFiltersContainer: {
  	width: '35%', 
  	height: '100%', 
  	backgroundColor: Colors.clrF1F9FF
  },
  rightFiltersContainer: {
  
  	backgroundColor: Colors.white
  },
  filterActionsContainer: {
  	height: '10%',
	paddingHorizontal: 15,
	borderTopColor: Colors.clrF1F9FF, 
	borderTopWidth: 1,
	flexDirection: 'row', 
	justifyContent: 'space-between', 
	alignItems: 'center'
  },
  filterActionButton: {
  	alignSelf: 'center', 
  	height: 40, 
  	width: '40%'
  },
  searchContainer: {
    paddingVertical: 10,
    width: '88%',
    borderRadius: 25,
    paddingHorizontal: 20,
    elevation: 10,
    backgroundColor: 'white',
    fontSize: wp('4.8%'),
    fontWeight:'700',
    color: Colors.blue,
	height:'6.5%',
	marginBottom:10
  },
  heading:{
    alignSelf: 'center',
		   color: Colors.primary,
		   fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
       fontSize: wp('4.5%'),
       fontWeight:'900',
		   marginBottom: hp('3%'),
		   marginTop: hp('-1%'),
		   textTransform: 'uppercase'
  }
})
