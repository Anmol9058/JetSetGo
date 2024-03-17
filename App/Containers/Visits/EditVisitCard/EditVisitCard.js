import React, { Component } from 'react'
import { View, Alert, ScrollView, FlatList} from 'react-native'
import { Button, Text } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './EditVisitCardStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton';
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import PlannedVisitCard from 'App/Containers/Visits/PlannedVisitCard'
import Loading from 'App/Components/Loading'
import GenericIcon from 'App/Components/GenericIcon'
import NoDataFound from 'App/Components/NoDataFound'
import RetailersActions from 'App/Stores/Retailers/Actions'
import VisitsActions from 'App/Stores/Visits/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import {Colors,ApplicationStyles } from 'App/Theme'
import TextArea from 'App/Components/FormInput/TextArea'
import DatePicker from 'App/Components/DatePicker'
import DatePickerStyles from 'App/Components/DatePicker/DatePickerStyles'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import _ from 'lodash'


class EditVisitCard extends React.Component {
	componentDidMount() {
		const {
			data,
			updateVisitFormChange
		} = this.props;
	
		updateVisitFormChange({
			edited_field: 'visitDate',
			edited_value: HelperService.convertMomentDateToTimestamp(data.visit_date__c)
		});
	}

	componentWillUnmount(){
		const {
			updateVisitFormChange
		} = this.props;

		// updateVisitFormChange({
		// 	edited_field: 'visitDate',
		// 	edited_value: null
		// });

		// updateVisitFormChange({
		// 	edited_field: 'psm',
		// 	edited_value: ''
		// });

		// updateVisitFormChange({
		// 	edited_field: 'summary',
		// 	edited_value: ''
		// });

		// updateVisitFormChange({
		// 	edited_field: 'cancelRemarks',
		// 	edited_value: ''
		// });
	}

	onEditSubmit() {
		const {
			data,
			token,
			agentid,
			editVisit,
			editVisitData
		} = this.props;

		editVisit({
			visit_id	 : data.pg_id__c,
			visit_date__c: editVisitData.visitDate || data.visit_date__c,
			team__c:agentid,
	       // status__c	 : "Planned",
	       // psm__c		 : editVisit.psm || agentid,
	       // summary__c	 : editVisit.summary,
	        token		 : token,
	        //agentid 	 : agentid
		});
	}

	onCancelSubmit() {
		const {
			data,
			token,
			agentid,
			cancelVisit,
			editVisitData,
			editVisitValidationFailed
		} = this.props;

		
		if (!editVisitData.cancelRemarks) {
			HelperService.showToast({
		    	message		: 'Please enter remarks before submitting.', 
		    	duration	: 2000, 
		    	buttonText	: 'Okay',
		    	position    : 'top'
		    });

			editVisitValidationFailed({
				invalid_field: 'cancelRemarks'
			});
			return;
		}
		
		cancelVisit({
			visit_id			: data.pg_id__c,
			token 				: token,
		//	agentid				: agentid,
			status__c			: "Cancelled",
        	cancelled_reason__c : editVisitData.cancelRemarks
		});
	}

  	render() {
	  	const {
	  		edit,
	  		data,
	  		isASM,
	  		cancel,
	  		psmList,
	  		editVisitLoader,
	  		cancelVisitLoader,
	  		updateVisitFormChange,
	  		editVisitData,
	  		editVisit,
	  		cancelVisit,
	  		validation
	  	} = this.props;

  		if (cancel) {
		    return (
		      	<View 
		      		style={{
		      			padding: 20, 
		      			alignSelf: 'center', 
		      			backgroundColor: Colors.white, 
		      			flex: .8, 
		      			justifyContent:'center'
		      		}}>
		      		<ScrollView>
		          	<Text style={Style.title}>
		            	{'Remarks*'}
		          	</Text>
		          	<TextArea 
		          		placeholder={'Cancellation Remarks...'} 
		          		numberOfLines={5}
		          		value={editVisitData.cancelRemarks}
		          		error={validation.invalid && validation.invalid_field == 'cancelRemarks'}
		          		onChange={(text) => updateVisitFormChange({edited_field: 'cancelRemarks', edited_value: text})} 
		          	/>
		          	<BlueButton 
		          		title={'Submit'} 
		          		style={{
		          			marginTop: 20, 
		          			width: '60%',
		          			height: 45
		          		}} 
		          		textStyle={{
		          			fontSize: 20, 
		          			fontFamily: ApplicationStyles.textMsgFont,
							marginTop: -2
		          		}} 
		          		loading={cancelVisitLoader}
		          		onPress={() => this.onCancelSubmit()}
		          	/>
		          </ScrollView>
		        </View>
		    );
		}

		if (edit) {
			let datePickerNode = (
		  		<Text style={Style.detail}>
		       		{ `${HelperService.dateReadableFormat(editVisitData.visitDate)}  `}
		       		<GenericIcon 
		        		name="create"
		        		style={
		        			{...DatePickerStyles.icon, ...DatePickerStyles.iconActive, ...{color: Colors.button, fontSize: 20, marginBottom: 0}
		        		}} 
		        	/>
		        	<Text style={{color: Colors.button, fontSize: 13}}>{'Reschedule Visit Date'}</Text>
		       	</Text>
			);

			let psmListNode = [];
		    if (isASM) {
		      psmListNode = (
		      		<View>
			        	<Text style={{...Style.title, marginTop: 20}}>
			            	{'Assign To'}
			          	</Text>
					    <SearchableDropdown 
				            dataSource={psmList} 
				            placeHolderText={'Select PSM'} 
				            selectedValue={editVisitData.psm} 
				            onChange={(value) => updateVisitFormChange({edited_field: 'psm', edited_value: value})} 
				            placeholder={'Type or Select PSM'} 
				            invalid={false} 
				            customPickerStyles={Style.pickerStyles}
				        />
			        </View>
		      );
		    }

			return (
		      <View style={{flex: .4}}>
		      	<ScrollView>
	    		<View>
	    			<DatePicker
						allowRangeSelection={false}
						minDate={HelperService.getNextNDayTimestamp(1)}
						selectedStartDate={editVisitData.visitDate} 
						selectedEndDate={editVisitData.visitDate} 
						onDateChange={(params) => updateVisitFormChange({edited_field: 'visitDate', edited_value: params.selectedStartDate})}
						iconStyle={{marginBottom: 0}}>
						{datePickerNode}
					</DatePicker>
					{
					//psmListNode
					
					}
	            	{
						//<Text style={{...Style.title, marginTop: 20}}>
		            	//{'Summary'}
		          	//</Text>
	            	// <TextArea 
	            	 //	error={validation.invalid && validation.invalid_field == 'summary'}
		          	//	placeholder={'Summary'} 
		          		//numberOfLines={3}
		          		//value={editVisitData.summary}

		          		//onChange={(text) => updateVisitFormChange({edited_field: 'summary', edited_value: text})} 
		          	///>
					  }
		           	
	          </View>
	           <BlueButton 
		           	title={'Submit'} 
		           	style={{
		           		marginTop: 20, 
		           		height: 40, 
		           		alignSelf: 'flex-start', 
		           		textAlign: 'center', 
		           		paddingHorizontal: 40, 
		           		width: 200
		           	}} 
		           	textStyle={{fontSize: 20, fontFamily: ApplicationStyles.textMsgFont, textAlign: 'center', marginTop: -3, fontWeight: '700'}}
		           	loading={editVisitLoader}
		           	onPress={() => this.onEditSubmit()}
	           	/>
	           	</ScrollView>
	    	</View>
		    )
		}

		return [];
  	}
}

const mapStateToProps = (state) => ({
  token						: state.user.token,
  agentid : state.user.id,
  editVisitData				: state.visits.editVisit.formData,
  cancelVisitLoader			: state.visits.editVisit.cancelVisitLoader,
  editVisitLoader			: state.visits.editVisit.editVisitLoader,
  validation 				: state.visits.editVisit.editVisitValidation,
  isASM                 	: state.user.isASM,
  psmList               	: state.user.psmList
});

const mapDispatchToProps = (dispatch) => ({
  fetchRetailers:(params)    		=> dispatch(RetailersActions.fetchRetailers(params)),
  addVisitToPlan:(params) 	 		=> dispatch(VisitsActions.addVisitToPlan(params)),
  openModal     :(params)    		=> dispatch(CommonActions.openModal(params)),
  cancelVisit   :(params)    		=> dispatch(VisitsActions.cancelVisit(params)),
  editVisit   	:(params)    		=> dispatch(VisitsActions.editVisit(params)),
  cancelVisitLoadingStop:()  		=> dispatch(VisitsActions.cancelVisitLoadingStop()),
  editVisitLoadingStop:()    		=> dispatch(VisitsActions.editVisitLoadingStop()),
  updateVisitFormChange:(params)	=> dispatch(VisitsActions.updateVisitFormChange(params)),
  editVisitValidationFailed:(params)=> dispatch(VisitsActions.editVisitValidationFailed(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditVisitCard)