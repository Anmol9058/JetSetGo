import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Button, Textarea } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './Styles'
import InputText from 'App/Components/FormInput/InputText'
import InputMobile from 'App/Components/FormInput/InputMobile'
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import Select from 'App/Components/Select';
import CommonActions from 'App/Stores/Common/Actions';

import SearchableDropdown from 'App/Components/SearchableDropdown';
import {
	NEW_RETAILER,
	RETAILER_NAME,
	AREA,
	DISTRIBUTOR,
	CATEGORY,
	CR_LIMIT,
	REMAINING_CR_LIMIT,
	OWNER_NAME,
	OWNER_NUMBER,
	SUBMIT
} from 'App/Constants'
import NavigationService from 'App/Services/NavigationService'
import RetailersActions from 'App/Stores/Retailers/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';

class NewDsrScreen extends Component {
	componentDidMount() {
	
		  
	}

	componentWillUnmount() {

	}

	submit() {
		this.props.createDsr({
			...this.props.dsrForm, ...{
				token: this.props.token,
				retail_distributor: this.props.selectedRetailer.id,
				team_manager:this.props.agentid,
				manager_emp_code: this.props.user_details.manager_employee_code__c,
				manager: this.props.user_details.manager__c
				//agentid: this.props.agentid,
			}
		});
	}



	render() {
		const { dsrForm, validation } = this.props;
		return (
			<View style={Style.container}>
				 
				<Text style={{...Style.heading, fontWeight:'bold'}}>{'ADD DSR'}</Text>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={Style.action}>
					<InputText
						style={Style.mb10}
						placeholder={'DSR Name*'}
						value={dsrForm.team_member_name}
						onChange={(value) => this.props.changeDsrForm({ edited_field: 'team_member_name', edited_value: value })}
						// error={validation.invalid && validation.invalid_field == 'customer_name__c'}
						label={'DSR Name*'}
					/>



				

					
					<InputText
						styles={Style.mb10}
						placeholder={'Employee Code'}
						value={dsrForm.name}
						onChange={(value) => this.props.changeDsrForm({ edited_field: 'name', edited_value: value })}
						label={'Employee Code*'}
					/>
					<InputMobile
						styles={Style.mb10}
						placeholder={'Mobile Number'}
						value={dsrForm.phone}
						onChange={(value) => this.props.changeDsrForm({ edited_field: 'phone', edited_value: value })}
						label={'Mobile Number*'}
					/>

					


				

					

					{/* <SearchableDropdown
						dataSource={this.props.dealersSearchList}
						placeHolderText={'Select Dealer'}
						selectedValue={retailerForm.dealer__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'dealer__c', edited_value: value })}
						placeholder={'Type or Select Dealer'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						label={'Dealer*'}
					/> */}
{
					//<InputText
					//	value={retailerForm.dealer__c}
					//	onChange={(value) => this.props.changeRetailerForm({ edited_field: 'dealer__c', edited_value: value })}
					//	placeholder={'Type or Select Dealer'}
					//	label={'Dealer*'}
					///>
					
	}



					<InputText
						style={Style.mb10}
						placeholder={'Email'}
						value={dsrForm.email}
						onChange={(value) => this.props.changeDsrForm({ edited_field: 'email', edited_value: value })}
						// error={validation.invalid && validation.invalid_field == 'email'}
						label={'Email'}
					/>

					<BlueButton
						style={Style.button}
						rounded
						large
						title={SUBMIT}
						disabled={this.props.createDsrLoader}
						loading={this.props.createDsrLoader}
						onPress={() => this.submit()}
					/>
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		agentid: state.user.id,
		retailersOffset: state.retailers.retailersOffset,
		retailersLimit: state.retailers.retailersLimit,
		dsrForm: state.retailers.dsrForm,
		validation: state.retailers.dsrFormValidation,
		createDsrLoader: state.retailers.createDsrLoader,
		selectedRetailer: state.retailers.selectedRetailer,
		user_details: state.user.user_details,
		
	
	}
}

const mapDispatchToProps = (dispatch) => ({
	changeDsrForm: (params) => dispatch(RetailersActions.changeDsrForm(params)),
	createDsr: (params) => dispatch(RetailersActions.createDsr(params)),
	
	
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewDsrScreen)