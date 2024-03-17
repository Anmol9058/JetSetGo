import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Button, Textarea } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './NewRetailerStyle'
import InputText from 'App/Components/FormInput/InputText'
import InputMobile from 'App/Components/FormInput/InputMobile'
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import _ from 'lodash';
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

class UpdateRetailer extends Component {
	componentDidMount() {
		this.props.extractFormDataUpdate(this.props.selectedRetailer.data)
	}

	submit() {

		const { updateRetailer, token, retailerUpdateForm, agentid, selectedRetailer } = this.props;

		updateRetailer({
			billingstreet:retailerUpdateForm.billingstreet, 
			postal_code: retailerUpdateForm.postal_code__c,
			area__c: retailerUpdateForm.area__c,
			mobile__c: retailerUpdateForm.mobile__c,
			potential_value__c: retailerUpdateForm.potential_value__c,
			dealer_type__c:retailerUpdateForm.dealer_type__c,
			e_mail__c:retailerUpdateForm.e_mail__c,
				token: token,
				//agentid: agentid,
				id: selectedRetailer.id
			
		});
	}


	render() {

		const { retailerForm,updateRetailer,selectedRetailer, validation, retailerUpdateForm, changeUpdateRetailerForm ,loader,retailerSearchFilters,user_details, dealerType } = this.props;
			const{id,data}=selectedRetailer
		
		return (
			<View >
				<ScrollView>
					<InputText
						style={Style.mb10}
						placeholder="Address*"
						numberOfLines={4}
						value={retailerUpdateForm.billingstreet}
						onChange={(value) => changeUpdateRetailerForm({ edited_field: 'billingstreet', edited_value: value })}
						label={'Address*'}
					/>

                    <InputText
						style={Style.mb10}
						placeholder="Postal Code*"
						value={retailerUpdateForm.postal_code__c}
						onChange={(value) => changeUpdateRetailerForm({ edited_field: 'postal_code__c', edited_value: value })}
						label={'Postal Code*'}
					/>

					<InputMobile
						styles={Style.mb10}
						placeholder={'Mobile'}
						value={retailerUpdateForm.mobile__c}
						onChange={(value) => changeUpdateRetailerForm({ edited_field: 'mobile__c', edited_value: value })}
						label={'Alternate Mobile Number'}
					/>

					<InputNumber
						styles={Style.mb10}
						placeholder={'Potential'}
						value={retailerUpdateForm.potential_value__c}
						onChange={(value) => changeUpdateRetailerForm({ edited_field: 'potential_value__c', edited_value: value })}
						label={user_details.business_channel__c == 'Wholesale'?'Potential OffTake (MT)':'Potential OffTake (No. of Boxes)'}
					/>
					{user_details.business_channel__c == 'Retail'&&retailerSearchFilters['type']!='Retail_Distributor'||user_details.business_channel__c == 'Wholesale'&&retailerSearchFilters['type']!='Wholesaler'?
					<SearchableDropdown
						dataSource={dealerType}
						placeHolderText={'Select Reseller Type*'}
						selectedValue={retailerUpdateForm.dealer_type__c}
						onChange={(value) => changeUpdateRetailerForm({ edited_field: 'dealer_type__c', edited_value: value })}
						placeholder={'Type or Select Reseller Type'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						invalid={validation.invalid && validation.invalid_field == 'dealer_type__c'}
						label={'Reseller Type*'}
						style={Style.mb10}
						key={retailerUpdateForm.dealer_type__c}


					/> : []
				}
{user_details.business_channel__c == 'Retail'?
					<InputText
						style={Style.mb10}
						placeholder={'Email'}
						value={retailerUpdateForm.e_mail__c}
						onChange={(value) => changeUpdateRetailerForm({ edited_field: 'e_mail__c', edited_value: value })}
						label={'Email'}
					/>
					: []
				}
{
					//<InputText
						//style={Style.mb10}
						//placeholder={'City*'}
						//value={retailerUpdateForm.area_name__c}
						//onChange={(value) => changeUpdateRetailerForm({ edited_field: 'area_name__c', edited_value: value})}
						//label={'City*'}
					///>

	}
				{
					//<InputText
					//	style={Style.mb10}
						//placeholder={'State'}
						//value={retailerUpdateForm.state__c}
						//onChange={(value) => changeUpdateRetailerForm({ edited_field: 'state__c', edited_value: value })}
						//label={'State'}
					///>

				}
						<SearchableDropdown

						dataSource={user_details.business_channel__c == 'Wholesale' ? retailerSearchFilters['type']=='Wholesaler'?this.props.agentCity:this.props.cityAllList:retailerSearchFilters['type']=='Retailer'?this.props.Area: this.props.agentCity}
						placeHolderText={'Select Area*'}
						selectedValue={retailerUpdateForm.area__c}
						onChange={(value) => changeUpdateRetailerForm({ edited_field: 'area__c', edited_value: value })}
						placeholder={'Type or Select Area'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						invalid={validation.invalid && validation.invalid_field == 'area__c'}
						label={'Area*'}
						style={Style.mb10}
						key={retailerUpdateForm.area__c}

					/>

				

					<BlueButton
						style={Style.button}
						rounded
						large
						title={SUBMIT}
						disabled={this.props.updateRetailerLoader}
						loading={this.props.updateRetailerLoader}
						onPress={() => this.submit()}
					/>

				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	token: state.user.token,
	agentid: state.user.id,
	retailersOffset: state.retailers.retailersOffset,
	retailersLimit: state.retailers.retailersLimit,
	retailerUpdateForm: state.retailers.retailerUpdateForm,
	validation: state.retailers.retailerFormValidation,
	updateRetailerLoader: state.retailers.updateRetailerLoader,
	retailerCompetitors: state.retailers.retailerCompetitors,
	categories: state.retailers.categories,
	retailerCompetitors: state.retailers.retailerCompetitors,
	dealersSearchList: state.retailers.dealersSearchList,
	loader :state.common.fetchRetailerAreaLoading,
	retailersList: state.retailers.retailersList,
	dealersList: state.retailers.dealersList,
	selectedRetailer: state.retailers.selectedRetailer,
	retailerSearchFilters: state.retailers.retailerSearchFilters,
	agentAreas:state.user.agentCity,
	agentCity: state.user.agentAreas,
	cityAllList : state.common.cityAllList,
	user_details: state.user.user_details,
	dealerType: state.common.dealerType,
	Area: state.common.retailerArea
	
	
})

const mapDispatchToProps = (dispatch) => ({
	changeUpdateRetailerForm: (params) => dispatch(RetailersActions.changeUpdateRetailerForm(params)),
	updateRetailer: (params) => dispatch(RetailersActions.updateRetailer(params)),
	fetchRetailerCompetitors: (params) => dispatch(RetailersActions.fetchRetailerCompetitors(params)),
	fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
	extractFormDataUpdate: (params) => dispatch(RetailersActions.extractFormDataUpdate(params)),
	clearRetailerForm: () => dispatch(RetailersActions.clearRetailerForm())
	
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateRetailer);