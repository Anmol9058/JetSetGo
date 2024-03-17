import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { Button, Textarea } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CheckBox, Label } from 'native-base';
import Style from './Styles'
import InputText from 'App/Components/FormInput/InputText'
import InputMobile from 'App/Components/FormInput/InputMobile'
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import {Header} from 'App/Components/Header'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import TextArea from 'App/Components/FormInput/TextArea';
import {
	SUBMIT, 
} from 'App/Constants'
import NavigationService from 'App/Services/NavigationService'
import MultipleImagePicker from 'App/Components/ImagePicker/MultipleImagePicker';
import CommonActions from 'App/Stores/Common/Actions';
import GenericIcon from 'App/Components/GenericIcon';

import { HelperService } from 'App/Services/Utils/HelperService';
import Select from 'App/Components/Select/Select';
import RetailersActions from 'App/Stores/Retailers/Actions'

class NewComplaintsScreen extends Component {
	componentDidMount() {
       
		this.props.clearcomplaintform();
		this.fetchIssuesCall();
		
		// this.props.changeInfluencerForm({ edited_field: 'psm__c', edited_value: 'psm' });
	}
	fetchIssuesCall() {
		const{
			categoryData,
			category,
			invoiceData,
			orderData,
			selectedRetailer,
			subcategoryData,
			subcategory,
		}=this.props
		categoryData({});
		subcategoryData({});
		invoiceData({});
		orderData({sfid:selectedRetailer.id})
		  
	  }

	componentWillUnmount() {
		// this.props.clearForm();
		this.props.clearcomplaintform();
}




	submit() {


		this.props.submitForm({
			form:{
				...this.props.form,
				//complaint_url__c: this.props.complaint_url__c.join(),
				team__c:this.props.agentid,
				customer_name__c:this.props.selectedRetailer.id,

			}  ,
			token : this.props.token
			//  ...{
			// 	token: this.props.token,
				//agentid: this.props.agentid,
				//account_type__c: this.props.user_details.business_channel__c == 'Wholesale' ? 'CRM Customer' : 'Retailer'

			
		});
	}

	render() {
		const { category,
			categoryData,
			subcategory,
			subcategoryData,
			order,
			token,
			orderData,
			invoice,
			invoiceData,
			invoiceloader,
			form,
			uploadImageLoading,
			uploadImageField ,
			uploadImage,
			subloader,
			formloading,
			validation,
			orderloader
		} = this.props;
	//	console.log(form);
		//let navParams = this.props.navigation.state.params;
		//let defaultSource =  navParams && navParams.source ? navParams.source : '';
		return (
			<View style={{ flex: 1}}>
                 <Header title={'New Complaint'}  />
				 
				<ScrollView
				showsVerticalScrollIndicator={false}
				style={Style.action}>
				
				<SearchableDropdown
							dataSource={category}
							placeHolderText={'Select Category'}
							selectedValue={form.complaint_type__c}
							onChange={(value) =>{this.props.changeform({ edited_field: 'complaint_type__c', edited_value: value })
							subcategoryData({
									token,
									id:value

							})
						
						
						}}
							placeholder={'Type or Select WholeSaler'}
							invalid={false}
							customPickerStyles={{ ...Style.picker }}
							labelStyles={{ ...Style.pickerLabel }}
							invalid={validation.invalid && validation.invalid_field == 'complaint_type__c'}
							label={'Category*'}
							style={Style.mb10}
							key={form.complaint_type__c}

						/>
					{subloader ?
						<Text style={Style.heading1}>{   'Sub-Category List Loading ..'}</Text>
						:
				<SearchableDropdown
							dataSource={subcategory}
							placeHolderText={'Select Sub-Category'}
							selectedValue={form.complaint_sub_type__c}
							onChange={(value) => this.props.changeform({ edited_field: 'complaint_sub_type__c', edited_value: value })}
							placeholder={'Type or Select WholeSaler'}
							invalid={false}
							customPickerStyles={{ ...Style.picker }}
							labelStyles={{ ...Style.pickerLabel }}
							invalid={validation.invalid && validation.invalid_field == 'complaint_sub_type__c'}
							label={'Sub Category*'}
							style={Style.mb10}
							key={form.complaint_sub_type__c}

						/>
					}
	{	orderloader	?	
		<Text style={Style.heading1}>{ 'Order number List Loading ..'}</Text>:
				<SearchableDropdown
							dataSource={order}
							placeHolderText={'Select Order number'}
							selectedValue={form.custom_order__c}
							// onChange={(value) => this.props.changeform({ edited_field: 'custom_order__c', edited_value: value })}
							onChange={(value) =>{this.props.changeform({ edited_field: 'custom_order__c', edited_value: value })
							invoiceData({
									token,
									id:value

							})
						
						
						}}
					
							placeholder={'Type or Select WholeSaler'}
							invalid={false}
							customPickerStyles={{ ...Style.picker }}
							labelStyles={{ ...Style.pickerLabel }}
							invalid={validation.invalid && validation.invalid_field == 'custom_order__c'}
							label={'Order No'}
							style={Style.mb10}
							key={form.custom_order__c}

						/>
						
					}			
						{invoiceloader ?
							<Text style={Style.heading1}>{   'Invoice List Loading ..'}</Text>
	
							:
				<SearchableDropdown
							dataSource={invoice}
							placeHolderText={'Select Invoice number'}
							selectedValue={form.invoice__c}
							onChange={(value) => this.props.changeform({ edited_field: 'invoice__c', edited_value: value })}
							placeholder={'Type or Select WholeSaler'}
							invalid={false}
							customPickerStyles={{ ...Style.picker }}
							labelStyles={{ ...Style.pickerLabel }}
							invalid={validation.invalid && validation.invalid_field == 'invoice__c'}
							label={'Invoice No'}
							style={Style.mb10}
							key={form.invoice__c}

						/>
	}
				
                 <TextArea
                        placeholder={'Descriptiion'}
                        numberOfLines={5}
						label={'Description*'}
						style={Style.pickerLabel}
                        value={form.description__c}
                        error={validation.invalid && validation.invalid_field == 'description__c'}
                        onChange={(value) => this.props.changeform({ edited_field: 'description__c', edited_value: value })}
                    /> 
    					<View style={{ ...Style.imgbottomMargin, width:'95%' }}>
            			<MultipleImagePicker
						//key={'complaint form'}
						
		            	title={'Take Pictue'}
		              	images={form.complaint_url__c|| []} 
		              	loading={uploadImageLoading && uploadImageField == 'complaint_url__c'}
		              	onClearImage={(value) => this.props.changeform({ edited_field: 'complaint_url__c', edited_value: '' })}
		              	onImageSuccess={({image}) => uploadImage({image, params: {edited_field: 'complaint_url__c'}, multiple: true, previous_value: form.complaint_url__c,edit:true})}
						  >
		              	<View style={Style.recurringActionButton1}>
		                <Text style={Style.recurringActionButtonText1}>
		                <GenericIcon 
                            name="camera" 
                            //show={true}
				                    style={Style.recurringActionButtonIcon1}
				                  />
		                {'Take Pictue'}
		                </Text>
		              	</View>
		            	</MultipleImagePicker>
            			</View>

				

				


			
{/* <View style={{marginTop:10}}> */}
					<BlueButton
						style={Style.button}
						// rounded
						// large
						title={SUBMIT}
						disabled={formloading}
					loading={formloading}
						onPress={() => this.submit()}
					/>
					{/* </View> */}
					
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		agentid: state.user.id,
		selectedRetailer: state.retailers.selectedRetailer,
		//form: state.retailers.issueForm,
		//validation: state.retailers.issueFormValidation,
        loader: state.retailers.fetchComplaintTypeLoading,
		category: state.retailers.agentComplaintType,
        subloader: state.retailers.fetchSubComplaintTypeLoading,
		subcategory: state.retailers.agentSubComplaintType,
		order:state.retailers.agentfetchOrderComplaints,
		orderloader:state.retailers.fetchOrderComplaintLoading,
		invoice:state.retailers.agentfetchInvoice,
		invoiceloader:state.retailers.fetchInvoiceComplaintLoading,
		form:state.retailers.ComplaintForm,
		formloading:state.retailers.createComplaintLoading,
		validation: state.retailers.createComplaintValidation,
		uploadImageLoading			: state.common.uploadImageLoader,
  uploadImageField            : state.common.uploadImageField,
		//subCategory:state.retailers.issueSubCategory,
		
		
	
	}
}

const mapDispatchToProps = (dispatch) => ({
	categoryData:(params) => dispatch(RetailersActions.fetchComplaintType(params)),
	subcategoryData:(params) => dispatch(RetailersActions.fetchSubComplaintType(params)),
	orderData:(params) => dispatch(RetailersActions.fetchOrderComplaint(params)),
	invoiceData:(params) => dispatch(RetailersActions.fetchInvoiceComplaint(params)),
	submitForm:(params) => dispatch(RetailersActions.createComplaint(params)),
	changeform:(params) => dispatch(RetailersActions.changeComplaintForm(params)),
	clearcomplaintform:() => dispatch(RetailersActions.clearComplaintForm()),
	// clearform:() => dispatch(RetailersActions.clearForm()),
	uploadImage: (params)      		 => dispatch(CommonActions.uploadImage(params)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewComplaintsScreen)