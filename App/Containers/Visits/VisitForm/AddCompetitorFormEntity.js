import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import { Button, Textarea } from 'native-base'
import { connect } from 'react-redux'
import Style from './VisitFormStyles';
import InputText from 'App/Components/FormInput/InputText'
import InputMobile from 'App/Components/FormInput/InputMobile'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import Select from 'App/Components/Select';
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import CommonActions from 'App/Stores/Common/Actions'
import RetailerActions from 'App/Stores/Retailers/Actions'
import GenericIcon from 'App/Components/GenericIcon';
import BrandComponent from 'App/Components/BrandComponent';
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NewCompetitorForm from './AddNewCompetitor';
import IndicatorInputText from "App/Components/FormInput/IndicatorInputText";

class AddCompetitorForm extends Component {
	constructor() {
        super();

        this.state = {
            show: false
        };

        
    }
	render() {
		const { 
			form, 
			changeForm, 
			removeForm,
			Competitors,
			productCategory,
			show,
			submitForm,
			loader, 
			editForm,
			searchFilters,
			disable,
			openModal,
			createCompetitor,
			clearNewCompetitorForm,
			user_details
		} = this.props;
		return (
		
 <View
               
				style={{borderWidth: 1, borderColor: Colors.white,elevation:5, marginBottom: '1%',flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '4%',paddingVertical:'4%', paddingHorizontal: 5, borderRadius: 10,backgroundColor: Colors.white, position: 'relative', width: '90%', alignSelf:'center'}}
				>
				<BrandComponent 
				styles={{height:47}}
					list={Competitors} label={'Competitor Name*'} 
					value={form.competitors__c} 
					changeForm={(value) => changeForm({ edited_field: 'competitors__c', edited_value: value })}
					disabled={show&&!(searchFilters['CompEdit']==form.pg_id__c)||disable}
				/>
{
				//<TouchableOpacity
		          //style={{...Style.plusIcon, position: 'absolute', top: -hp('5%'), right: '50%'}}
		          //onPress={() => {
					//return openModal({
							//content: <NewCompetitorForm id={form.id} />, 
							//heading: 'New Competitor', 
							//bodyFlexHeight: .5,
							//close: () => clearNewCompetitorForm()
					//})}
				//}>
			       // <GenericIcon
			           // name={'add'}
			           // style={{ color: Colors.primary, fontSize: 30, alignSelf: 'center' }}
			            
		          //	/>
        	//	</TouchableOpacity>   
	}

			{	form.competitors__c=='a0E2w000002q6koEAA'?
			<View style={{width: wp('36%'), marginTop:'1.2%'}}>
			{	disable ?	<InputText
						style={Style.brandInput}
						placeholder={'Enter Name*'}
						value={form.competitor_name__c}
						onChange={(value) => changeForm({ edited_field: 'competitor_name__c', edited_value: value })}
						label={'Other*'}
						
						editable={false}
					/>
                       :
                    <InputText
						style={Style.brandInput}
						placeholder={'Enter Name*'}
						value={form.competitor_name__c}
						onChange={(value) => changeForm({ edited_field: 'competitor_name__c', edited_value: value })}
						label={'Other*'}
						
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>
			}
				</View>: []
	}	
				<View style={{width: wp('36%'), marginTop:'1.2%'}}>
			{	disable ?	<InputText
						style={Style.brandInput}
						placeholder={'Product Name*'}
						value={form.competitor_product__c}
						onChange={(value) => changeForm({ edited_field: 'competitor_product__c', edited_value: value })}
						label={'Product Name*'}
						
						editable={false}
					/>
                       :
                    <InputText
						style={Style.brandInput}
						placeholder={'Product Name*'}
						value={form.competitor_product__c}
						onChange={(value) => changeForm({ edited_field: 'competitor_product__c', edited_value: value })}
						label={'Product Name*'}
						
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>
			}
				</View>
               
			   
			   
			    <View style={{width: wp('36%')}}>
			{ disable ?		<InputNumber
						styles={Style.brandInput}
						placeholder={'Price'}
						value={form.price__c}
			 			onChange={(value) => changeForm({ edited_field: 'price__c', edited_value: value })}
						label={user_details.business_channel__c == 'Retail'? 'MOP Per Ream':'MOP Per Ream*'}
						editable={false}
					/>
				:
                 <InputNumber
						styles={Style.brandInput}
						placeholder={'Price'}
						value={form.price__c}
			 			onChange={(value) => changeForm({ edited_field: 'price__c', edited_value: value })}
						label={user_details.business_channel__c == 'Retail'? 'MOP Per Ream*':'MOP Per Ream*'}
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>
			}
				</View>

				<View style={{width: wp('36%')}}>
				{ disable ?	<InputNumber
						styles={Style.brandInput}
						placeholder={'Potential'}
						value={form.potential_off_take__c}
						onChange={(value) => changeForm({ edited_field: 'potential_off_take__c', edited_value: value })}
						label={'Potential(Box)*'}
						editable={false}
					/>
					:
                   <InputNumber
						styles={Style.brandInput}
						placeholder={'Potential'}
						numberOfLines={1}
						value={form.potential_off_take__c}
						onChange={(value) => changeForm({ edited_field: 'potential_off_take__c', edited_value: value })}
						label={'Potential(Box)*'}
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>}
				</View>

				<View style={{width: wp('70%')}}>
				{ disable ?	<InputText
						style={Style.brandInput}
						placeholder={'GSM'}
						value={form.gsm__c}
						onChange={(value) => changeForm({ edited_field: 'gsm__c', edited_value: value })}
						label={'GSM'}
						editable={false}
					/>
						:
                       <InputText
						style={Style.brandInput}
						placeholder={'GSM'}
						value={form.gsm__c=='undefined'?'':form.gsm__c}
						onChange={(value) => changeForm({ edited_field: 'gsm__c', edited_value: value })}
						label={'GSM'}
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>}
				</View>
				<View style={{width: wp('70%')}}>
				{ disable ?	<InputText
						style={Style.brandInput}
						placeholder={'Size'}
						value={form.size__c}
						onChange={(value) => changeForm({ edited_field: 'size__c', edited_value: value })}
						label={'Size'}
						editable={false}
					/>
						:
						<InputText
						style={Style.brandInput}
						placeholder={'Size'}
						value={form.size__c=='undefined'?'':form.size__c}
						onChange={(value) => changeForm({ edited_field: 'size__c', edited_value: value })}
						label={'Size'}
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>}
				</View>
				<View style={{width: wp('70%')}}>
				{ disable ?	<InputText
						style={Style.brandInput}
						placeholder={'Packaging'}
						value={form.packaging__c}
						onChange={(value) => changeForm({ edited_field: 'packaging__c', edited_value: value })}
						label={'Packaging'}
						editable={false}
					/>
						:
                       <InputText
						style={Style.brandInput}
						placeholder={'Packaging'}
						value={form.packaging__c=='undefined'?'':form.packaging__c}
						onChange={(value) => changeForm({ edited_field: 'packaging__c', edited_value: value })}
						label={'Packaging'}
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>}
				</View>

				<View style={{width: wp(form.competitors__c=='a0E2w000002q6koEAA'?'36%':'70%')}}>
				{ disable ?	<InputText
						style={Style.brandInput}
						placeholder={'Payment Terms'}
						value={form.payment_term__c}
						onChange={(value) => changeForm({ edited_field: 'payment_term__c', edited_value: value })}
						label={'Payment Terms*'}
						editable={false}
					/>
						:
                       <InputText
						style={Style.brandInput}
						placeholder={'Payment Terms'}
						value={form.payment_term__c}
						onChange={(value) => changeForm({ edited_field: 'payment_term__c', edited_value: value })}
						label={'Payment Terms*'}
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>}
				</View>

				<View style={{width: wp('70%')}}>
				{ disable?	
			form.remarks__c!='undefined'?
				<InputText
						style={Style.brandInput}
						placeholder={'Remarks'}
						multiline={true}
						numberOfLines={1}
						value={form.remarks__c}
						onChange={(value) => changeForm({ edited_field: 'remarks__c', edited_value: value })}
						label={'Remarks'}
						editable={false}
					/>
					:[]
						:
						form.remarks__c!='undefined'?
						<IndicatorInputText
						placeholder={"Remarks"}
						maxLength={131072}
						value={form.remarks__c}
						multiline={true}
						label={'Remarks'}
						style={{borderRadius:10,marginTop:6}}
						numberOfLines={1}
						onChange={(value) => changeForm({ edited_field: 'remarks__c', edited_value: value })}
						editable={!(show&&!(searchFilters['CompEdit']==form.pg_id__c))}
					/>
					:[]
				}
				</View>


				
				

		{	show? <GenericIcon
                    name={'edit'}
                    //show={true}
		            style={Style.trashButtonIcon}
		         onPress={() => (searchFilters['CompEdit']==form.pg_id__c)?editForm({edited_field: 'CompEdit', edited_value: ''}):editForm({edited_field: 'CompEdit', edited_value: form.pg_id__c} ,)}
		        />
				  :	
				 disable? []: <GenericIcon
                    name={'trash-can'}
                    show={true}
		            style={Style.trashButtonIcon}
		            onPress={() => removeForm({id: form.id})}
		        />}
					<View style={{width: wp('100%'), alignSelf:'center', justifyContent:'center'}}>

       { (form.pg_id__c&&form.pg_id__c==searchFilters['CompEdit'])? <BlueButton 
			//title={'Save'} 
			style={Style.markLostButton} 
			textStyle={Style.markLostButtonText} 
			loading={loader&&loader==form.pg_id__c}
			disabled={loader&&loader==form.pg_id__c}
			onPress={() => submitForm({id:form.pg_id__c, 
				form:{
				competitors__c: form.competitors__c,
				competitor_product__c: form.competitor_product__c,
				price__c: form.price__c,
				potential_off_take__c: form.potential_off_take__c,
				payment_term__c: form.payment_term__c,
				competitor_name__c: form.competitor_name__c,
				remarks__c: form.remarks__c,
				gsm__c:form.gsm__c,
				size__c:form.size__c,
				packaging__c:form.packaging__c,
			}})}
			><GenericIcon name="floppy"  show={true} style={Style.markLostButtonIcon} />
			</BlueButton>:[] }
			</View>
			</View>
			
		)
	}
}


const mapStateToProps = (state) => ({
	Competitors: state.retailers.retailerCompetitors,
	productCategory: state.products.productCategoryDisplayList,
	loader: state.visits.UpdateCompetitorSubmitLoader,
	searchFilters: state.visits.planVisit.searchFilters,
	user_details: state.user.user_details,
  });

  const mapDispatchToProps = (dispatch) => ({
  		openModal:(params)	=> dispatch(CommonActions.openModal(params)),
  		createCompetitor:(params)	=> dispatch(RetailerActions.createCompetitor(params)),
  		clearNewCompetitorForm: () => dispatch(RetailerActions.clearNewCompetitorForm())
});
  
  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(AddCompetitorForm)