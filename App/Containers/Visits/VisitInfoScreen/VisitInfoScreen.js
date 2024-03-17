import BlueButton from 'App/Components/BlueButton';
import InputText from 'App/Components/FormInput/InputText';

import VisitsActions from 'App/Stores/Visits/Actions';
import { CheckBox, Label } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity ,FlatList,Linking} from 'react-native';
import { connect } from 'react-redux';

import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import GenericDisplayCard from 'App/Components/GenericDisplayCard'

import { HelperService } from 'App/Services/Utils/HelperService';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MultipleImagePicker from 'App/Components/ImagePicker/MultipleImagePicker';
import CommonActions from 'App/Stores/Common/Actions';
import AttachmentDetail from '../../../Components/AttachmentDetail.js/AttachementDetail';
import  AddCompetitorFormEntity from '../VisitForm/AddCompetitorFormEntity'
import  AddStockFormEntity from '../VisitForm/AddStockFormEntity'
import Style from '../VisitForm/VisitFormStyles';
import _ from 'lodash';
import NoDataFound from 'App/Components/NoDataFound'
import Loading from 'App/Components/Loading'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip';
import ProductActions from 'App/Stores/Products/Actions'

class VisitInfoScreen extends Component {

	componentDidMount() {
		const {
		  token,
		  getCompetitor,
		  getStock,
		  fetchVisitInfo,
		
		  fetchProductCategories
	
		} = this.props;
		const {
			id,
			data
		} = this.props.route.params;
	
	   getCompetitor({token, visit_id: data.sfid , show: true})
	   getStock({token ,visit_id: data.sfid,  show: true})
	  fetchVisitInfo({token,visit_id: id })

	  fetchProductCategories({token ,
		//type: executeVisitData.type__c=='Retailer'? 'Retail':executeVisitData.type__c,
		type: this.props.user_details.business_channel__c ,
		party: data.customer_sfid__c
		})
		//this.fetchProductsCall();
	  }
		componentWillUnmount() {
			const {
				clearAddInfoForm
			} = this.props;
	
			clearAddInfoForm();
	  }
	  
	  getAttachmentInfoNode() {
		let visibleNode = [];
		const {
		  fetchVisitInfoLoader,
		  visitInfoMapping,
		
		 
		} = this.props;
		const {
			id,
			data
		} = this.props.route.params;
		//const dataLength = data.length;
	
		if (!_.isEmpty(visitInfoMapping) && visitInfoMapping[id]&&visitInfoMapping[id].url&&visitInfoMapping[id]&&visitInfoMapping[id].url.length) { 
		  visibleNode = (
			<ScrollView
		   //style={{alignItems:'center'}}
			
			>
			  
			  {visitInfoMapping[id]&&visitInfoMapping[id].url.map((obj, index) =>
			  <View style={{marginBottom:'10%'}}> 
			  	<Text style={Style.formHeading}>{'Image Attachment'}</Text>
			  <View style={Style.box}>
	
			   <GenericDisplayCardStrip key={`Attchament ${index.toString() }`} label={`Attachament ${index+1} `}  labelStyle={{...Style.label, fontSize:wp('3.8%')}}value={ <Text style={ {textDecorationLine: 'underline', color: '#1890ff'} } onPress={() => Linking.openURL(obj)}>{ `View`}</Text> }/>
			   </View>
			   </View>
	
			  )}
			</ScrollView>
		  )
		} else if (fetchVisitInfoLoader){
		  visibleNode = <Loading />;
		}else { 
		  visibleNode = (
			<View style={{marginBottom:'10%'}}> 
			<Text style={Style.formHeading}>{' No Image Attachment'}</Text>
			</View>
		  );
		}
	
		return visibleNode;
	  }
	
	  
	  
	  
	
	
	  render() {
		const {
		  add,
		  form,
		  token,
		  loader,
		  validation,
		  changeForm,
		  competitorData,
		  uploadImageLoading,
		  uploadImageField ,
		  uploadImage,
		  stockData,
		  submitUpdateStockForm,
		  changeUpdateStockForm,
		  submitUpdateCompetitorForm,
		  changeUpdateCompetitorForm,
		  changeAddPlannedVisitsSearchFilters,
		  visitInfoMapping,
		  clearAddInfoForm,
		  fetchVisitInfoLoader,
		  competitorLoader,
		  
		  pgid 
	
	
		} = this.props;
		
	  
		
	  
		let brandsNode= [];
	
			if (competitorData.length) {
				competitorData.map((obj, index) => {
					brandsNode.push(<AddCompetitorFormEntity form={obj} key={obj.id}  changeForm={(params) =>  changeUpdateCompetitorForm({...params, id: obj.id})}
					disable={true}
				/>)
				});
		}
		
		let brandsNode1= [];
	
			if (stockData.length) {
				stockData.map((obj, index) => {
					brandsNode1.push(<AddStockFormEntity form={obj} key={obj.id} changeForm={(params) => changeUpdateStockForm({...params, id: obj.id})}
					disable={true}
				/>)
			  });
			  
			}
		return (
		  <ScrollView style={Style.container}>
		{  //  <ScrollView>
			  
				//visitInfoFormMultiple.map((obj) => {
				//  return(
				  //  <VisitInfoFormEntity 
					//  form={obj} 
					 // key={obj.id} 
					 // validation={{}} 
					 // retailerCompetitors={retailerCompetitors} 
					 // visibilityLevelList={visibilityLevelList}
					 // productCategoryDisplayList={productCategoryDisplayList}
					 // changeForm={(params) => editVisitInfoEntity({...params, id: obj.id})}
					 // removeForm={() => removeVisitInfoEntity(obj.id)}
					///>
				 // )
			   // })
			  
		   // </ScrollView>
		  }
		  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
		{brandsNode.length	? <Text style={Style.formHeading}>{'Competitor Info'}</Text> :<Text style={Style.formHeading}>{'No Competitor Found'}</Text>}
		  
			</View>
			<ScrollView>
			 
		   {brandsNode}
		 
		  </ScrollView>
		
			<View style={{flexDirection:'row', justifyContent:'space-between'}}>
	
		  
		{brandsNode1.length	?<Text style={Style.formHeading}>{'Stock Info'}</Text> : <Text style={Style.formHeading}>{' No Stock Found'}</Text> }
		
		</View>
		<ScrollView>
		  {brandsNode1}
		  </ScrollView>
	   
	
			<View style={{ ...Style.bottomMargin, ...Style.checkboxContainer }}>
				  <View>
					<Label
					  style={{ ...Style.label }}
					
					  >
					  {'Marketing Visibility Material Required'}
					</Label>
				  </View>
				  <View>
					<CheckBox
					  style={{ borderRadius: 2, borderColor:Colors.grey, color: Colors.grey , marginLeft:10 }}
					  checked={form.market_material_required__c == true}
					
					/>
				  </View>
				</View>
				<View style={{ ...Style.bottomMargin1, marginBottom:'0%'}}>
				  
				  <InputText style={{...Style.inputText,}}
					multiline={true}
					numberOfLines={4}
					placeholder = {'Remarks'}
					error={validation.invalid && validation.invalid_field == 'remarks__c'}
					value={form.remarks__c}
					onChange={(value) => changeForm({ edited_field: 'remarks__c', edited_value: value })}
					editable={false}
				  />

{/* <TextArea
                        placeholder={'Remarks'}
                        numberOfLines={5}
						label={'Description*'}
						style={Style.pickerLabel}
                        value={form.remarks__c}
                        error={validation.invalid && validation.invalid_field == 'remarks__c'}
                        onChange={(value) => changeform({ edited_field: 'remarks__c', edited_value: value })}
                    />  */}
				</View>
	
				
			   
			 
				{this.getAttachmentInfoNode()}
	  
			   
			
		
			
		  </ScrollView>
		)
	  }
	}
	
	
	
	const mapStateToProps = (state) => ({
	  token: state.user.token,
	  form: state.visits.visitInfoForm,
	  loader: state.visits.addVisitInfoLoader,
	  validation: state.visits.visitInfoFormValidation,
	  visibilityLevelList: state.visits.visibilityLevelList,
	  retailerCompetitors: state.retailers.retailerCompetitors,
	  visitInfoFormMultiple: state.visits.visitInfoFormMultiple,
	  productCategoryDisplayList: state.products.productCategoryDisplayList,
	  competitorData: state.visits.visitCompetitor,
	  competitorLoader: state.visits.getVisitCompetitorLoader,
	  stockData: state.visits.visitStock,
	  stockLoader: state.visits.getVisitStockLoader,
	  Competitors: state.retailers.retailerCompetitors,
	  productCategory: state.products.productCategoryDisplayList,
	  uploadImageLoading			: state.common.uploadImageLoader,
	  uploadImageField            : state.common.uploadImageField,
	  pgid    : state.visits.executeVisitData.pg_id__c,
	  fetchVisitInfoLoader: state.visits.fetchVisitInfoLoader,
		visitInfoMapping: state.visits.visitInfoMapping,
		executeVisitData: state.visits.executeVisitData,
		user_details: state.user.user_details,
	});
	
	const mapDispatchToProps = (dispatch) => ({
	  changeForm: (params) => dispatch(VisitsActions.changeVisitInfoForm(params)),
	  add: (params) => dispatch(VisitsActions.addVisitInfo(params)),
	  addVisitInfoEntity: (params) => dispatch(VisitsActions.addVisitInfoEntity(params)),
	  removeVisitInfoEntity: (params) => dispatch(VisitsActions.removeVisitInfoEntity(params)),
	  editVisitInfoEntity: (params) => dispatch(VisitsActions.editVisitInfoEntity(params)),
	  getCompetitor: (params) => dispatch(VisitsActions.getCompetitor(params)),
	  getStock: (params) => dispatch(VisitsActions.getStock(params)),
	  uploadImage: (params)      		 => dispatch(CommonActions.uploadImage(params)),
	  submitUpdateStockForm: (params) 	   => dispatch(VisitsActions.submitUpdateStockForm(params)),
	  changeUpdateStockForm: (params) 	   => dispatch(VisitsActions.changeUpdateStockForm(params)),
	  submitUpdateCompetitorForm: (params) 	   => dispatch(VisitsActions.submitUpdateCompetitorForm(params)),
	  changeUpdateCompetitorForm: (params) 	   => dispatch(VisitsActions.changeUpdateCompetitorForm(params)),
	  changeAddPlannedVisitsSearchFilters: (params) => dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
	  clearAddInfoForm: ()  		 => dispatch(VisitsActions.clearAddInfoForm()),
	  fetchVisitInfo: (params) => dispatch(VisitsActions.fetchVisitInfo(params)),
	  fetchProductCategories: (params) => dispatch(ProductActions.fetchProductCategories(params)),
	})
	
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisitInfoScreen)
