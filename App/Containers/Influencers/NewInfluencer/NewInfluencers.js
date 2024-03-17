import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Button, Textarea } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './NewInfluencersStyle'
import InputText from 'App/Components/FormInput/InputText'
import InputMobile from 'App/Components/FormInput/InputMobile'
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import {
	SUBMIT, TITLE,
	ADD_CONTACT,
	FIRST_NAME,
	LAST_NAME,
	EMAIL,
	ATTACHED_DEALER,
	ATTACHED_RETAILER,
	BUSINESS_SO_FAR,
	BUSINESS_THIS_MONTH,
	MEETING_ATTENDED,
	POTENTIAL
} from 'App/Constants'
import NavigationService from 'App/Services/NavigationService'
import influencerActions from '../../../Stores/Influencers/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import Select from '../../../Components/Select/Select';

class NewInfluencers extends Component {
	componentDidMount() {

		this.props.changeInfluencerForm({ edited_field: 'status__c', edited_value: 'Active' });
		this.props.changeInfluencerForm({ edited_field: 'title', edited_value: 'Mr.' });
		this.props.changeInfluencerForm({ edited_field: 'category__c', edited_value: 'ASM' });
		this.props.changeInfluencerForm({ edited_field: 'potential__c', edited_value: 'Low' });
		this.props.changeInfluencerForm({ edited_field: 'asm__c', edited_value: this.props.agentid });
		// this.props.changeInfluencerForm({ edited_field: 'psm__c', edited_value: 'psm' });
	}

	componentWillUnmount() {
		this.props.clearInfluencerForm();
	}

	submit() {
		this.props.createInfluencer({

			...this.props.influencerForm, ...{
				token: this.props.token,
				agentid: this.props.agentid
			}
		});
	}

	render() {
		const { validation, titleType, statusType, categoryType, potentialType, influencerForm } = this.props;
		return (
			<View style={Style.container}>
				<Text style={Style.heading}>{ADD_CONTACT}</Text>
				<ScrollView style={Style.action}>

					<Select style={Style.selectPickerStyle}
						label={`${TITLE}*`}
						selected={influencerForm.title}
						list={titleType}
						onChange={(value) => {
							this.props.changeInfluencerForm({ edited_field: 'title', edited_value: value })
						}}
					/>

					<InputText
						style={Style.mb10}
						placeholder={FIRST_NAME + '*'}
						value={influencerForm.firstname}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'firstname', edited_value: value })}
						error={validation.invalid && validation.invalid_field == 'firstname'}
						label={`${FIRST_NAME}*`}
					/>

					<InputText
						style={Style.mb10}
						placeholder={LAST_NAME + '*'}
						value={influencerForm.lastname}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'lastname', edited_value: value })}
						error={validation.invalid && validation.invalid_field == 'lastname'}
						label={`${LAST_NAME}*`}
					/>

					<InputMobile
						styles={Style.mb10}
						placeholder={'Phone No' + '*'}
						value={influencerForm.phone}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'phone', edited_value: value })}
						error={validation.invalid && validation.invalid_field == 'phone'}
						label={'Mobile*'}
					/>

					<InputText
						style={Style.mb10}
						placeholder={'Email'}
						value={influencerForm.email}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'email', edited_value: value })}
						error={validation.invalid && validation.invalid_field == 'email'}
						label={'Email'}
					/>

					<SearchableDropdown
						dataSource={this.props.agentAreas}
						placeHolderText={'Select Area'}
						selectedValue={influencerForm.area__c}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'area__c', edited_value: value })}
						placeholder={'Type or Select Area'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						invalid={validation.invalid && validation.invalid_field == 'area__c'}
						label={'Area'}
					/>

					<SearchableDropdown
						dataSource={this.props.psmList}
						placeHolderText={'Select PSM'}
						selectedValue={influencerForm.psm__c}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'psm__c', edited_value: value })}
						placeholder={'type or select psm'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						invalid={validation.invalid && validation.invalid_field == 'psm__c'}
						label={'PSM'}
					/>

					<Select style={Style.selectPickerStyle}
						label={'Category'}
						selected={influencerForm.category__c}
						list={categoryType}
						onChange={(value) => {
							this.props.changeInfluencerForm({ edited_field: 'category__c', edited_value: value })
						}}
					/>

					<SearchableDropdown
						dataSource={this.props.attachedRetailer}
						placeHolderText={'Attached retailer '}
						selectedValue={influencerForm.attached_retailer__c}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'attached_retailer__c', edited_value: value })}
						placeholder={'Type or Select retailer'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						label={'Attached retailer'}
					/>

					<SearchableDropdown
						dataSource={this.props.attachedDealer}
						placeHolderText={'Attached Dealer'}
						selectedValue={influencerForm.attached_dealer__c}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'attached_dealer__c', edited_value: value })}
						placeholder={'Type or Select Dealer'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						label={'Attached Dealer'}
					/>

					<InputNumber
						style={Style.mb10}
						placeholder={'Business So far'}
						value={influencerForm.business_so_far__c}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'business_so_far__c', edited_value: value })}
						error={validation.invalid && validation.invalid_field == 'business_so_far__c'}
						label={'Business So far'}
					/>

					<InputNumber
						style={Style.mb10}
						placeholder={'Business this month'}
						value={influencerForm.business_this_month__c}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'business_this_month__c', edited_value: value })}
						error={validation.invalid && validation.invalid_field == 'business_this_month__c'}
						label={'Business this month'}
					/>

					<InputNumber
						style={Style.mb10}
						placeholder={'Meets Attended'}
						value={influencerForm.meets_attended__c}
						onChange={(value) => this.props.changeInfluencerForm({ edited_field: 'meets_attended__c', edited_value: value })}
						error={validation.invalid && validation.invalid_field == 'meets_attended__c'}
						label={'Meets Attended'}
					/>

					<Select style={Style.selectPickerStyle}
						label={'Status'}
						selected={influencerForm.status__c}
						list={statusType}
						onChange={(value) => {
							this.props.changeInfluencerForm({ edited_field: 'status__c', edited_value: value })
						}}
					/>

					<Select style={Style.selectPickerStyle}
						label={'Potential'}
						selected={influencerForm.potential__c}
						list={potentialType}
						onChange={(value) => {
							this.props.changeInfluencerForm({ edited_field: 'potential__c', edited_value: value })
						}}
					/>


					<BlueButton
						style={Style.button}
						rounded
						large
						title={SUBMIT}
						disabled={this.props.createInfluencersLoader}
						loading={this.props.createInfluencersLoader}
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
		influencerOffset: state.influencers.offset,
		influencerLimit: state.influencers.influencerLimit,
		influencerForm: state.influencers.influencerForm,
		validation: state.influencers.influencerFormValidation,
		createInfluencersLoader: state.influencers.createInfluencersLoader,
		statusType: state.influencers.statusType,
		titleType: state.influencers.titleType,
		categoryType: state.influencers.categoryType,
		potentialType: state.influencers.potentialType,
		agentAreas: state.user.agentAreas,
		attachedRetailer: state.influencers.retailerSearchableList,
		attachedDealer: state.influencers.dealerSearchableList,
		psmList: state.influencers.psmList

	}
}

const mapDispatchToProps = (dispatch) => ({
	changeInfluencerForm: (params) => dispatch(influencerActions.changeInfluencerForm(params)),
	createInfluencer: (params) => dispatch(influencerActions.createInfluencer(params)),
	clearInfluencerForm: () => dispatch(influencerActions.clearInfluencerForm())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewInfluencers)
