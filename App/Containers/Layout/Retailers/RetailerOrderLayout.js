import WhiteButton from 'App/Components/WhiteButton';
import BackArrowButton from 'App/Components/BackArrowButton'
import NavigationService from 'App/Services/NavigationService';
import { ApplicationStyles, Colors } from 'App/Theme';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Text, Input, Item, Right } from 'native-base';
import React from 'react';
import { StyleSheet, View, ScrollView,Dimensions ,TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import { HelperService } from 'App/Services/Utils/HelperService';
import GenericIcon from 'App/Components/GenericIcon';
import RetailersActions from 'App/Stores/Retailers/Actions'


class RetailerOrderLayout extends React.Component {
    scrollToIndex(index){
        let distanceToBeScrolled = (index)*wp('25%');
        if (this.flatListRef){
          this.flatListRef.scrollTo({x: distanceToBeScrolled, y: 0, animated: true});
        }
      }

	onMonthChange(month) {
		const {
			
			searchFilters,
      changeSearchFilters,
      fetchData
			
		} = this.props;

		changeSearchFilters({
			edited_field: 'selectedMonth',
			edited_value: month
		});

		let requestParams = {
			date: `${searchFilters['selectedYear']}-${month+1}-${HelperService.getCurrentDate()}`,
		
		}

		fetchData(requestParams);
	}

	onYearChange(month) {
		const {
		
			searchFilters,
			changeSearchFilters,
      fetchData,
		} = this.props;

		changeSearchFilters({
			edited_field: 'selectedYear',
			edited_value: month
		});

		
		let requestParams = {
			date: `${month}-${searchFilters['selectedMonth']+1}-${HelperService.getCurrentDate()}`
			
			
		}

		//fetchData(requestParams);
    } 
    
  
 

  render() {

    const {
     
        searchFilters,
        
    } = this.props;
   
    let monthPickerNode = (
        <View
            style={Styles.monthPicker}>
            <Text style={Styles.dateText}>{HelperService.getMonthMappingName(searchFilters['selectedMonth'])}
            </Text>
        </View>
    );

    let yearPickerNode = (
        <View
            style={Styles.monthPicker}>
            <Text style={Styles.dateText}>{searchFilters['selectedYear']}
            </Text>
        </View>
    );

    let visiblePickerNode = [];

			visiblePickerNode = (<View style={{ flexDirection: 'row', width: wp('43%'), marginLeft:'4%' }}>
				<TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getPreviousMonth(searchFilters['selectedMonth']))}>
					<GenericIcon
						name={'caret-left'}
						
						style={Styles.dateChangeIcon}
					/>
				</TouchableOpacity>
				{monthPickerNode}
				<TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getNextMonth(searchFilters['selectedMonth']))}>
					<GenericIcon
						name={'caret-right'}
						

						style={Styles.dateChangeIcon}
					/>
				</TouchableOpacity>
			</View>);

let visiblePickerNode1 = [];

visiblePickerNode1 = (<View style={{ flexDirection: 'row', width: wp('43%'), marginLeft:'9%' }}>
	<TouchableOpacity transparent onPress={() => this.onYearChange(searchFilters['selectedYear']-1)}>
		<GenericIcon
			name={'caret-left'}
			
			style={Styles.dateChangeIcon}
		/>
	</TouchableOpacity>
	{yearPickerNode}
	<TouchableOpacity transparent onPress={() => this.onYearChange(searchFilters['selectedYear']+1)}>
		<GenericIcon
			
			name={'caret-right'}

			style={Styles.dateChangeIcon}
		/>
	</TouchableOpacity>
</View>);	

    return (
      <ScrollView>
        <Header style={Styles.header}>
        
        {
        	//<View style={{paddingTop: hp('1%'), paddingBottom: hp('1%')}}>
        	//	<BackArrowButton />
        	//</View>
  }  
        {
         //<Text style={Styles.heading}>{'SCHEME CLAIMS'}</Text>
        }
         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginBottom: hp('1%'), marginTop:hp('2%') }}>
					{visiblePickerNode}
						
					{visiblePickerNode1}
					</View>
                   
                    
                    
                    
                     </Header>
                   
       
       
        {this.props.children}
      </ScrollView>
    )
  }
}  



const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
  isVisible: state.common.isNetworkBannerVisible,
  currentScreen: state.common.currentScreen,
  searchFilters: state.retailers.OrderSearchFilters,
 
  data     : state.retailers.dealerOrders,
});


const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) => dispatch(RetailersActions.updateOrderSearchFilters(params)),
  fetchData:(params)   => dispatch(RetailersActions.fetchDealerOrders(params)),
 
	
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerOrderLayout)


const Styles = StyleSheet.create({
  container: {
  	flexDirection: 'row'
  },
  box: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 30,
    marginVertical: 2,
    padding: 15,
    borderRadius: 10,
    position: 'relative'
  },
  heading: {
    alignSelf: 'center',
    color: Colors.black,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Roboto_bold',
    fontSize: wp('5.5%'),
   
    marginTop: hp('0%'),
      textTransform: 'uppercase',
      marginBottom: hp('1%'),
  },
  header: {
   // alignItems: 'flex-start',
    height: hp('50%'),
    //flexDirection: 'column',
   // justifyContent: 'center',
    //backgroundColor: Colors.white,
    //marginTop: hp('5%')
  },
  arrowContainer: {
    width: wp('20%'),
    paddingTop: hp('1%')
  },
  backArrow: {
    color: Colors.primary,
    padding: 5
  },
  actionButton: {
    overflow: 'visible',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
    marginRight: wp('2%'),
    marginLeft: wp('1%'),
    height: hp('5%'),
    minWidth: wp('25%'),
  },
  actionButtonText: {
    fontSize: wp('2.9%'),
    fontFamily: ApplicationStyles.textMsgFont
  },
  countBadge: {
    position: 'absolute',
    backgroundColor: Colors.button,
    right: 0,
    top: -10
  },
  monthPicker: {
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: wp('22%'),
},
dateChangeIcon: {
    color: Colors.primary,
    alignSelf: 'center',
    paddingHorizontal: wp('3%'),
    fontSize: wp('9.5%')
},

dateText: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
    fontSize: wp('3.0%'),
    textTransform: 'capitalize'
},

actionButton1: {
    overflow: 'visible',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    marginBottom: hp('1%'),
    marginTop: hp('2.5%'),
    marginRight: wp('2%'),
    marginLeft: wp('1%'),
    height: hp('5%'),
    elevation: 0,
    width: wp('43%'),
  },
  actionButtonText1: {
    fontSize: wp('2.9%'),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.headingBlack
  },
   actionButtonTextHeading: {
    fontSize: wp('4.9%'),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.headingBlack
  },
  countBadge: {
    position: 'absolute',
    backgroundColor: Colors.button,
    right: 0,
    top: -10
  },
 

});