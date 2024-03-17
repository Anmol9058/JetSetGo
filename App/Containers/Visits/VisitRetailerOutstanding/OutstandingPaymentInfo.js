import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, Label, ScrollView } from 'react-native'
import OrderCard from 'App/Components/OrderCard'
import RetailersActions from 'App/Stores/Retailers/Actions'
import {HelperService} from 'App/Services/Utils/HelperService';
import _ from 'lodash';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import NavigationService from 'App/Services/NavigationService'
import GenericDisplayCard from 'App/Components/GenericDisplayCard'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'
import InputText from 'App/Components/FormInput/InputText'
import InputNumber from 'App/Components/FormInput/InputNumber'
import InputDate from 'App/Components/FormInput/InputDate'
import {ApplicationStyles} from 'App/Theme'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import BlueButton from 'App/Components/BlueButton';
import DatePicker from 'App/Components/DatePicker'

class OutstandingPaymentInfo extends Component {
	getCardNode(item) {
		return (
			<GenericDisplayCard
				dark={true}
				key={item.sfid}
          		content={[
          			<GenericDisplayCardStrip label={'Invoice No.'} value={item.invoice_no__c} dark={true}/>,
          			<GenericDisplayCardStrip label={'Invoice Date'} value={HelperService.dateReadableFormat(item.invoice_date__c)} dark={true}/>,
          			<GenericDisplayCardStrip label={'Invoice Amount'} value={HelperService.currencyValue(item.invoice_amount__c)} dark={true}/>,
          			<GenericDisplayCardStrip label={'Remaining Amount'} value={HelperService.currencyValue(item.remaining_amount__c)} dark={true}/>,
          			<GenericDisplayCardStrip label={'Due Date'} value={HelperService.dateReadableFormat(item.due_date__c)} dark={true}/>,
          			<GenericDisplayCardStrip label={'C Form Pending'} value={item.pending_c_form__c ? 'Yes' : 'No'} dark={true}/>
          		]} 
	        />
		);
	}

	componentWillUnmount() {
		this.props.clearPaymentsForm();
	}

	submitPaymentForm(params) {
		const {
			token,
			agentid,
			submitForm,
			executeVisitData
		} = this.props

		const {
	      id,
	      data
    	} = this.props.navigation.state.params;

		submitForm({
			...params,
			token: token,
			agentid: agentid,
			date_of_payment__c: HelperService.dateReadableFormatWithHyphen(params.date_of_payment__c),
			"outstanding_sfid": id,
		  	"party__c": executeVisitData.retailer_dealer__c,
		  	"invoice_no": data.invoice_no__c,
		  	"invoice_sfid": data.invoice_id__c
		});
	}
  	render() {
  		const {
  			form,
  			editForm,
  			formLoader,
  			submitForm,
  			paymentModes,
  			executeVisitData,
  			clearPaymentsForm
  		} = this.props;


  		const {
	      id,
	      data
    	} = this.props.navigation.state.params;


	    return (
	      	<View >
	        	<ScrollView style={{marginTop: '5%', width: '100%', paddingHorizontal: '5%'}}>
	        		<Text style={ApplicationStyles.formHeading}>{'ADD PAYMENT'}</Text>
	        		
		              <SearchableDropdown
		                dataSource={paymentModes}
		                placeHolderText={'Select Payment mode* '}
		                selectedValue={form.payment_mode}
		                onChange={(value) => editForm({ edited_field: 'payment_mode', edited_value: value })}
		                placeholder={'Type or Select Payment Mode'}
		                customPickerStyles={{ ...ApplicationStyles.picker }}
						labelStyles={{ ...ApplicationStyles.pickerLabel }}
						label={'Payment Mode*'}
						key={form.payment_mode}
		              />
		           

					<InputNumber
						styles={ApplicationStyles.mb10}
						placeholder={'Amount*'}
						value={form.amount}
						onChange={(value) => editForm({ edited_field: 'amount', edited_value: value })}
						label={'Amount*'}
					/>

					<InputText
						style={ApplicationStyles.mb10}
						placeholder={'Payment Ref.'}
						value={form.payment_reference}
						onChange={(value) => editForm({ edited_field: 'payment_reference', edited_value: value })}
						label={'Payment Ref. (Cheque no./Transaction Id etc)*'}
					/>

					<InputDate
                        style={ApplicationStyles.mb10}
                        placeholder={'Payment Date'}
                        value={form.date_of_payment__c}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            editForm({ edited_field: 'date_of_payment__c', edited_value: formattedDate });
                        }}
                        label={'Payment Date*'}
                        key={form.date_of_payment__c}
                    />

					

					<View style={ApplicationStyles.formAction}>
		              <BlueButton
		                style={ApplicationStyles.formButton}
		                rounded
		                large
		                title={'Submit'}
		                disabled={formLoader}
		                loading={formLoader}
		                onPress={() => this.submitPaymentForm(form)}
		              />

            		</View>
	        	</ScrollView>
	      	</View>
	    );
  	}
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  executeVisitData: state.visits.executeVisitData,
  form: state.retailers.paymentForm,
  formLoader: state.retailers.paymentFormLoader,
  paymentModes: state.retailers.paymentModes,
});

const mapDispatchToProps = (dispatch) => ({
	editForm: (params) => dispatch(RetailersActions.editPaymentsForm(params)),
	submitForm: (params) => dispatch(RetailersActions.submitPaymentsForm(params)),
	clearPaymentsForm: (params) => dispatch(RetailersActions.clearPaymentsForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutstandingPaymentInfo)

