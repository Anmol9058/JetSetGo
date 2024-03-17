import DatePicker from 'App/Components/DatePicker';
import DatePickerStyles from 'App/Components/DatePicker/DatePickerStyles';
import GenericIcon from 'App/Components/GenericIcon';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import { HelperService } from 'App/Services/Utils/HelperService';
import CommonActions from 'App/Stores/Common/Actions';
import VisitsActions from 'App/Stores/Visits/Actions';
import { ApplicationStyles, Colors } from 'App/Theme';
import { Badge, Icon, Spinner, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';


class VisitListLayout extends React.Component {
	componentDidMount() {
		const {
			changeSearchFilters,
			  agentid,
			  getAreaPjp,
			  token,
			  searchFilters,
	  	} = this.props;

		this.onDateChange({
			selectedStartDate: HelperService.getCurrentTimestamp()
		});

		changeSearchFilters({edited_field: 'psm__c', edited_value: agentid})
		
	}

	onDateChange(params) {
		const {
			changeSearchFilters,
	  		getVisitsDisplayList,
	  		token,
			  agentid,
			  searchFilters,
			  getAreaPjp,
			  businessChannel,
	  	} = this.props;

		changeSearchFilters({
			edited_field: 'startDate',
			edited_value: params.selectedStartDate
		});

		changeSearchFilters({
			edited_field: 'endDate',
			edited_value: params.selectedStartDate
		});

		getVisitsDisplayList({
			token: token,
	  		agentid: searchFilters['psm__c']||  agentid,
	  		startDate: params.selectedStartDate,
	  		endDate: params.selectedStartDate
		});
	 	{	getAreaPjp({
			token,
			team__c:searchFilters['psm__c']||agentid,
			date:  params.selectedStartDate


		})}
	}
	
	fetchVisitsDisplayListCall() {
		const {
			token,
			agentid,
			searchFilters,
			fetchVisitsDisplayList
		} = this.props;

		fetchVisitsDisplayList({
			token: token,
			agentid: searchFilters['psm__c']? searchFilters['psm__c']: agentid ,
			startDate: searchFilters['startDate'],
			endDate: searchFilters['endDate']
		});
	}


	onFilterChange(value)
{
	const {
		changeSearchFilters,
		  getVisitsDisplayList,
		  searchFilters,
		  token,
		  getAreaPjp,
		  businessChannel,
		  
	  } = this.props;

	  changeSearchFilters({
		edited_field: 'psm__c',
		edited_value: value
	});

	  getVisitsDisplayList({
		token: token,
		startDate: searchFilters['startDate'],
		  endDate: searchFilters['endDate'],
		 agentid: value,
	});
		getAreaPjp({
		token,
		team__c:value,
		date: searchFilters['startDate'],


	})

}

	render() {
	  	const {
			fetchVisitsDisplayListLoader,
	  		changeSearchFilters,
	  		visitsDisplayList,
	  		filteredDisplayData,
	  		searchFilters,
	  		visitCount,
	  		agentAreas,
	  		children,
	  		psmList,
			  isASM,
			  agentAreaPjp,
			  loader,
			  agentBeatPjp,	
			  isManager	,
			  businessChannel,
	  	} = this.props;

	  	let datePickerNode = (
		  		<View 
		  			style={Styles.datePicker}>
	    			<Text style={Styles.dateText}>{HelperService.getVisitsDisplayDate(searchFilters['startDate'])}
	    			</Text>
	    			<GenericIcon 
						name={'calendar'} 
						show={true}
	    				style={{...DatePickerStyles.icon, ...DatePickerStyles.iconActive, ...Styles.dateIcon}} 
	    			/>
	    		</View>
	  	);

	  	let area = '';

	  	agentAreaPjp.map((obj) => {
	  		area = obj.name
		  });
		  
		  let beat = '';

		  agentBeatPjp.map((obj) => {
			beat = obj.name
	  	});  


	  	let psmListNode = [];
	    if (isASM.length) {
	      psmListNode = (
	        <View style={{height: hp('10%')}}>
              	<SearchableDropdown
              		key={'psm' + searchFilters['psm__c']} 
	              	dataSource={psmList} 
	              	placeHolderText={'Select SO'}
	              	selectedValue={searchFilters['psm__c']} 
	              	onChange={(value) => this.onFilterChange(value)}
	              	placeholder={'Type or Select SO'}
	              	invalid={false} 
	              	customPickerStyles={Styles.psmPickerStyles}
	            />
	        </View>
	      );
	    }

	    return ( 
	    	<View>
	    	
	    			<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: hp('10%'), position: 'relative', marginTop:'2%'}}>
		    			<TouchableOpacity transparent onPress={() => this.onDateChange({selectedStartDate: HelperService.getPreviousDayTimestamp(searchFilters['startDate'])})}>
			    			{/* <Icon
			                	name={'chevron-left'}
			                	ios={'chevron-left'}
			                	android={'chevron-left'}
			                	style={Styles.dateChangeIcon}
			              	/> */}
							<GenericIcon
                name={'chevron-left'}
                show={true}
                // onPress={this.props.closeDrawer}
                style={{...Styles.dateChangeIcon}}/>
		              	</TouchableOpacity>
		              	<View>
		              		<DatePicker
								allowRangeSelection={false}
								selectedStartDate={searchFilters['startDate']} 
								selectedEndDate={searchFilters['endDate']} 
								onDateChange={(params) => this.onDateChange(params)}>
								{datePickerNode}
							</DatePicker>
						</View>
						<TouchableOpacity transparent onPress={() => this.onDateChange({selectedStartDate: HelperService.getNextDayTimestamp(searchFilters['startDate'])})}>
						<GenericIcon
                name={'chevron-right'}
                show={true}
                // onPress={this.props.closeDrawer}
                style={{...Styles.dateChangeIcon}}/>
		              	</TouchableOpacity>
		              	 <Badge style={Styles.countBadge}>
                    		<Text style={Styles.countBadgeText}>{visitCount}</Text>
              			</Badge>
	              	</View>
	              	{psmListNode}
			
				
				<Text style={Styles.heading}>{`City: ${ loader	?'...' :	agentAreaPjp.map((obj) => obj.name).join(",")}`}</Text>
			{	 isManager=='ASM'?	[]:   <Text style={(agentBeatPjp&&agentBeatPjp.length)? {...Styles.heading,marginRight:'0%'}: {...Styles.heading,marginRight:'0%' }}>{`Beat: ${ loader	?'...' :	agentBeatPjp.map((obj) => obj.name).join(",")}`}</Text>}
				
			{
						fetchVisitsDisplayListLoader ? <View style={Styles.loadingIcon}><Spinner color={Colors.primary} size={'small'} /></View> : <Icon
							name={'refresh'}
							onPress={() => this.fetchVisitsDisplayListCall()}
							style={Styles.refreshIcon}
							type={'FontAwesome'}
						/>
					}
	     
	    		{children}
	    	</View>
	    )
	}
}

const mapStateToProps = (state) => ({
	fetchVisitsDisplayListLoader: state.visits.fetchVisitsDisplayListLoader,
	visitsDisplayList  			: state.visits.visitsDisplayList,
	filteredDisplayData 		: state.visits.filteredDisplayData,
  	token						: state.user.token,
  	agentid						: state.user.id,
 	searchFilters				: state.visits.searchFilters,
 	isASM                 		: state.user.psmList,
  	psmList               		: state.user.psmList.concat([ {id: state.user.id, name: 'Self'}]),
	agentAreas 					: state.user.agentAreas,
	agentAreaPjp				: state.common.agentAreaPjp, 
	agentBeatPjp				: state.common.agentBeatPjp, 
	loader						:state.common.fetchAllAreaPjpLoading,
	  visitCount         			: state.visits.filteredDisplayData && state.visits.filteredDisplayData.length ? state.visits.filteredDisplayData.length : 0,
	  businessChannel			: state.user.user_details? state.user.user_details.business_channel__c:'',
	  isManager					: state.user.user_details? state.user.user_details.designation__c:''
});

const mapDispatchToProps = (dispatch) => ({
	fetchVisitsDisplayList: (params) => dispatch(VisitsActions.fetchVisitsDisplayList(params)),
  changeSearchFilters:(params)   	=> dispatch(VisitsActions.changeSearchFilters(params)),
  getVisitsDisplayList:(params)     => dispatch(VisitsActions.getVisitsDisplayList(params)),
  getAreaPjp:(params)				=> dispatch(CommonActions.fetchAllAreaPjp(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitListLayout)



const Styles = StyleSheet.create({
	header: {
		backgroundColor: Colors.white, 
		borderBottomWidth: 0,
		height: hp('21%'), 
		alignItems: 'center', 
		justifyContent: 'flex-start',
		flexDirection: 'column',
		//elevation:10, 
		
		

	},
	loadingIcon: {
		color: Colors.primary,
		fontSize: wp('16.9%'),
		alignSelf: 'center',
		position: 'absolute',
		right: wp('5.3%'),
		marginTop: hp('10.2%'),
		// zIndex: 2
	  },
	datePicker:{
		alignSelf: 'center', 
		backgroundColor: Colors.firozi, 
		borderRadius: 10, 
		width: wp('55%'),
		flexDirection:'row', 
		alignItems: 'center', 
		justifyContent: 'center',
		padding: 4
	},
	dateText: {
		fontFamily: ApplicationStyles.textMediumFont, 
		color: Colors.white, 
		fontSize: wp('4%'),
		textTransform: 'capitalize'
	},
	refreshIcon: {
		color: Colors.primary,
		fontSize: wp('6.5%'),
		alignSelf: 'flex-end',
		padding: hp('5%'),
		paddingBottom: 0,
		position: 'absolute',
		right: wp('3.3%'),
		marginTop: hp('15%'),
		marginRight: hp('-4%'),
		zIndex: 2
	  },
	dateIcon: {
		color: Colors.white, 
		fontSize: wp('7%'),
		marginLeft: 0, 
		marginRight: 0,
		zIndex: 2,
		paddingLeft: wp('3%')
	},
	dateChangeIcon: {
	 	color: Colors.firozi, 
	 	fontSize: 60, 
	 	alignSelf: 'center', 
	 	paddingHorizontal: 20
	},
	psmPickerStyles: {
	marginTop: -5,
		backgroundColor: 'white',
		paddingVertical: 8,
		paddingHorizontal: '8%',
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 25,
		elevation: 5,
		marginLeft:'5%',
  	},
  	countBadge: {
    backgroundColor: Colors.white,
    padding: 0,
    borderWidth: .5,
    borderColor: Colors.firozi,
    height: wp('9.3%'),
    width: wp('10%'),
    position: 'absolute',
    borderRadius: wp('10%'),
    left: '64%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countBadgeText: {
     color: Colors.firozi,
     fontSize: wp('3.7%')
  },
  heading: {
    alignSelf: 'center',
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.2%'),
	marginBottom: 0, 
	fontWeight:'bold'
  },
});
