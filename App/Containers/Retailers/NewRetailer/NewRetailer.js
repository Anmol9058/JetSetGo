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
import _ from 'lodash'

class NewRetailer extends Component {
	componentDidMount() {
		this.props.clearRetailerForm();
		const {
			token,
			fetchRetailerArea,
			user_details
		} = this.props;
		// if (user_details.business_channel__c == 'Retail') {
		// 	//fetchRetailerArea({
		// 	//	token,
		// 	//	partyType: 'Retailer',

		// 	//});
		// }

	}

	componentWillUnmount() {

	}

	submit() {
		this.props.createRetailer({
			...this.props.retailerForm, ...{
				token: this.props.token,
				agentid: this.props.agentid,
				account_type__c: this.props.user_details.business_channel__c == 'Wholesale' ? 'CRM Customer' : 'Retailer'

			}
		});
	}

	onAreaChange(value) {
		this.props.changeRetailerForm({ edited_field: 'area__c', edited_value: value });
		this.props.fetchDealers({
			token: this.props.token,
			agentid: this.props.agentid,
			offset: this.props.retailersOffset,
			limit: this.props.retailersLimit,
			area: value
		});
	}

	render() {
		const { retailerForm, validation, dealerType, loader, user_details, city, beatLoader, fetchBeat, token,cityAllList } = this.props;
		return (
			<View style={Style.container}>

				<Text style={{ ...Style.heading, fontWeight: 'bold' }}>{user_details.business_channel__c == 'Wholesale' ? 'NEW CUSTOMER' : NEW_RETAILER}</Text>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={Style.action}>
					<InputText
						style={Style.mb10}
						placeholder={user_details.business_channel__c == 'Wholesale' ? 'Customer Name*':'Retailer Name*'}
						value={retailerForm.customer_name__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'customer_name__c', edited_value: value })}
						// error={validation.invalid && validation.invalid_field == 'customer_name__c'}
						label={user_details.business_channel__c == 'Wholesale' ? 'Customer Name*':'Retailer Name*'}
					/>


					<InputNumber
						styles={Style.mb10}
						placeholder="Postal Code*"
						value={retailerForm.postal_code__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'postal_code__c', edited_value: value })}
						// error={validation.invalid && validation.invalid_field == 'billingstreet'}
						label={'Postal Code*'}
					/>
					{user_details.business_channel__c == 'Wholesale' ?

						<SearchableDropdown
							dataSource={this.props.dealersList}
							placeHolderText={'Select WholeSaler'}
							selectedValue={retailerForm.parentid}
							onChange={(value) => this.props.changeRetailerForm({ edited_field: 'parentid', edited_value: value })}
							placeholder={'Type or Select WholeSaler'}
							invalid={false}
							customPickerStyles={{ ...Style.picker }}
							labelStyles={{ ...Style.pickerLabel }}
							invalid={validation.invalid && validation.invalid_field == 'parentid'}
							label={'Whole Saler Attach to*'}
							style={Style.mb10}
							key={retailerForm.parentid}

						/>
						:
						<SearchableDropdown
							dataSource={this.props.dealersList}
							placeHolderText={'Select Distributor*'}
							selectedValue={retailerForm.parentid}
							onChange={(value) => {
								this.props.changeRetailerForm({ edited_field: 'parentid', edited_value: value })
								fetchBeat({
									token,
									id: value
								})
								this.props.fetchRetailerArea({
									token,
									id : value
								})

							}}
							placeholder={'Type or Select Distributor'}
							invalid={false}
							customPickerStyles={{ ...Style.picker }}
							labelStyles={{ ...Style.pickerLabel }}
							invalid={validation.invalid && validation.invalid_field == 'parentid'}
							label={'Distributor*'}
							style={Style.mb10}
							key={retailerForm.parentid}

						/>

					}
					{loader ?
						<Text style={Style.heading1}>{user_details.business_channel__c == 'Wholesale' ? [] : 'Area List Loading ..'}</Text>

						:
						<SearchableDropdown
							dataSource={user_details.business_channel__c == 'Wholesale' ? cityAllList : this.props.agentAreas}
							placeHolderText={user_details.business_channel__c == 'Wholesale' ? 'Select City*' : 'Select Area*'}
							selectedValue={retailerForm.area__c}
							onChange={(value) => this.props.changeRetailerForm({ edited_field: 'area__c', edited_value: value })}
							placeholder={user_details.business_channel__c == 'Wholesale' ? 'Type or Select City' : 'Type or Select Area'}
							invalid={false}
							customPickerStyles={{ ...Style.picker }}
							labelStyles={{ ...Style.pickerLabel }}
							invalid={validation.invalid && validation.invalid_field == 'area__c'}
							label={user_details.business_channel__c == 'Wholesale' ? 'City*' : 'Area*'}
							style={Style.mb10}
							key={retailerForm.area__c}
						/>}
					{
						user_details.business_channel__c == 'Wholesale' ? [] :

							beatLoader ?
								<Text style={Style.heading1}>{'Beat List Loading ..'}</Text>

								:
								<SearchableDropdown
									dataSource={this.props.beatList}
									placeHolderText={'Select Beat*'}
									selectedValue={retailerForm.beat__c}
									onChange={(value) => this.props.changeRetailerForm({ edited_field: 'beat__c', edited_value: value })}
									placeholder={'Type or Select Beat'}
									invalid={false}
									customPickerStyles={{ ...Style.picker, }}
									labelStyles={{ ...Style.pickerLabel }}
									invalid={validation.invalid && validation.invalid_field == 'beat__c'}
									label={'Beat*'}
									style={Style.mb10}
									key={retailerForm.beat__c}
								/>

					}
					<InputMobile
						styles={Style.mb10}
						placeholder={OWNER_NUMBER}
						value={retailerForm.mobile__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'mobile__c', edited_value: value })}
						label={'Mobile Number*'}
					/>
					<InputMobile
						styles={Style.mb10}
						placeholder={OWNER_NUMBER}
						value={retailerForm.alternate_phone}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'alternate_phone', edited_value: value })}
						label={'Alternate Mobile Number'}
					/>

					<InputText
						style={Style.mb10}
						placeholder={'GSTIN'}
						value={retailerForm.gst_in__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'gst_in__c', edited_value: value })}
						label={'GSTIN'}
					/>


					<InputNumber
						styles={Style.mb10}
						placeholder={'Potential'}
						value={retailerForm.potential_value__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'potential_value__c', edited_value: value })}
						label={user_details.business_channel__c == 'Wholesale'?'Potential OffTake (MT)':'Potential OffTake (No. of Boxes)'}
					/>


					<InputText
						style={Style.mb10}
						placeholder={OWNER_NAME}
						value={retailerForm.first_name__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'first_name__c', edited_value: value })}
						label={'Owner First Name*'}
					/>
					<InputText
						style={Style.mb10}
						placeholder={OWNER_NAME}
						value={retailerForm.last_name__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'last_name__c', edited_value: value })}
						label={'Owner Last Name*'}
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

					<SearchableDropdown
						dataSource={dealerType}
						placeHolderText={user_details.business_channel__c == 'Wholesale' ?'Select Reseller Type*':'Retailer Type*'}
						selectedValue={retailerForm.dealer_type__c}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'dealer_type__c', edited_value: value })}
						placeholder={'Type or Select Reseller Type'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						invalid={validation.invalid && validation.invalid_field == 'dealer_type__c'}
						label={user_details.business_channel__c == 'Wholesale' ?'Reseller Type*':'Retailer Type*'}
						style={Style.mb10}
						key={retailerForm.dealer_type__c}


					/>

					<InputText
						style={Style.mb10}
						placeholder={'Email'}
						value={retailerForm.email}
						onChange={(value) => this.props.changeRetailerForm({ edited_field: 'email', edited_value: value })}
						 error={validation.invalid && validation.invalid_field == 'email'}
						label={'Email'}
					/>

					<BlueButton
						style={Style.button}
						rounded
						large
						title={SUBMIT}
						disabled={this.props.createRetailerLoader}
						loading={this.props.createRetailerLoader}
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
		retailerForm: state.retailers.retailerForm,
		validation: state.retailers.retailerFormValidation,
		createRetailerLoader: state.retailers.createRetailerLoader,
		retailerCompetitors: state.retailers.retailerCompetitors,
		categories: state.retailers.categories,
		retailerCompetitors: state.retailers.retailerCompetitors,
		dealersSearchList: state.retailers.dealersSearchList,
		agentAreas: state.common.retailerArea,
		loader: state.common.fetchRetailerAreaLoading,
		beatList: state.common.agentBeat,
		dealersList: state.retailers.dealersSearchList,
		dealerType: state.common.dealerType,
		user_details: state.user.user_details,
		city: state.user.agentAreas,
		beatLoader: state.common.fetchBeatLoading,
		cityAllList : state.common.cityAllList,
	}
}

const mapDispatchToProps = (dispatch) => ({
	changeRetailerForm: (params) => dispatch(RetailersActions.changeRetailerForm(params)),
	createRetailer: (params) => dispatch(RetailersActions.createRetailer(params)),
	fetchRetailerCompetitors: (params) => dispatch(RetailersActions.fetchRetailerCompetitors(params)),
	fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
	fetchRetailerArea: (params) => dispatch(CommonActions.fetchRetailerArea(params)),
	fetchBeat: (params) => dispatch(CommonActions.fetchBeat(params)),
	clearRetailerForm: () => dispatch(RetailersActions.clearRetailerForm())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewRetailer)
