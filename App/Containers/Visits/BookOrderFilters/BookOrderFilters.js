import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList, SafeAreaView} from 'react-native'
import { Button, Text, Icon } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'
import InputNumber from 'App/Components/FormInput/InputNumber'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import VisitsActions from 'App/Stores/Visits/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import VisitAction from '../VisitsDisplayScreen/VisitAction';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import EditVisitCard from 'App/Containers/Visits/EditVisitCard';
import CommonActions from 'App/Stores/Common/Actions'
import ProductActions from 'App/Stores/Products/Actions'
import VisitOrderCartCard from 'App/Containers/Visits/VisitOrderCartCard';
import ProductCartCard from 'App/Components/ProductCartCard'
import SearchBar from 'App/Components/SearchBar'
import { Colors } from 'App/Theme'
import Style from './BookOrderFiltersStyles';
import SelectFiltersList from './SelectFiltersList'
import CategoriesList from './CategoriesList'
import SubCategoriesList from './SubCategoriesList'
import SubSubCategoriesList from './SubSubCategoriesList'
import _ from 'lodash';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ApplicationStyles} from 'App/Theme'

class BookOrderFilters extends React.Component {
	onDeselect(params) {
		const {
			changeSearchFilters,
			fetchProductsBrandFailure,
			fetchProductGsmFailure,
			makeSubSubCategoryDisplayList,
			

		} = this.props

		let list = params.list;
		let value = params.value;
		_.remove(list, (item) => item==value);

		changeSearchFilters({
			edited_field: params.edited_field,
			edited_value: ''
		})


		if (params.edited_field == 'selectedCategories') {
			fetchProductsBrandFailure()
			fetchProductGsmFailure()
			//changeSearchFilters({edited_field: 'selectedCategoryParentFilter', edited_value: 'Brand'})
		}

		if (params.edited_field == 'selectedSubCategories') {
			fetchProductGsmFailure()
			//makeSubSubCategoryDisplayList()
		}
	}

	onSelect(params) {
		const {
			id,
			token,
			changeSearchFilters,
			orderHeaderForm,
			fetchProductSubSubCategories,
			fetchProductsBrand,
			fetchProductGsm,
			agentAllPlant,
		} = this.props;
		
		changeSearchFilters({
			edited_field: params.edited_field,
			edited_value: params.value
		});

	

		if (params.edited_field == 'selectedCategories') {

			fetchProductsBrand({
				//agentid: id,
				token: token,
				category: params.value,
				type: this.props.user_details.business_channel__c ,

			});
			changeSearchFilters({edited_field: 'selectedCategoryParentFilter', edited_value: 'Brand'})
			changeSearchFilters({ edited_field: 'name', 'edited_value': '' })

		}

		if (params.edited_field == 'selectedSubCategories') {
			fetchProductGsm({
				//agentid: id,
				token: token,
				brand: params.value,
				type: this.props.user_details.business_channel__c ,
				plant__c:orderHeaderForm.plant__c?HelperService.getNameFromSFID(agentAllPlant[0], orderHeaderForm.plant__c, 'sap_code__c'):''
			});
			changeSearchFilters({edited_field: 'selectedCategoryParentFilter', edited_value: 'GSM'})
			changeSearchFilters({ edited_field: 'name', 'edited_value': '' })
		}
	}

	clearFilters() {
		const {
			changeSearchFilters,
			makeSubCategoryDisplayList,
			makeSubSubCategoryDisplayList
		} = this.props;

		changeSearchFilters({edited_field: 'selectedCategories', edited_value: []})
		changeSearchFilters({edited_field: 'selectedSubCategories', edited_value: []})
		changeSearchFilters({edited_field: 'selectedSubSubCategories', edited_value: []})
		changeSearchFilters({edited_field: 'name', edited_value: ''})
		makeSubCategoryDisplayList();
		makeSubSubCategoryDisplayList();
	}

	submit()
	{
		const {
			fetchProductItem,
			productSearchFilters,
			parentAreas	,
			orderHeaderForm,
			token	,
			executeVisitData,
			selectedRetailer,
			agentDistChannel,
			agentAllPlant,
		} = this.props;
//console.log(HelperService.getSFIDFromName(agentDistChannel,33,'distribution_code__c'))
		if (productSearchFilters.selectedSubSubCategories.name) {
			fetchProductItem({...productSearchFilters.selectedSubSubCategories, 
				brand:productSearchFilters.selectedSubCategories, 
				zone:executeVisitData.type__c=='Retailer'||selectedRetailer&&selectedRetailer.data&&selectedRetailer.data.account_type__c=='Retailer'?parentAreas.parent_city__c: parentAreas.parent_zone__c?	parentAreas.parent_zone__c:'', 
				channel:orderHeaderForm.DC__c?
				HelperService.getNameFromSFID(agentDistChannel, orderHeaderForm.DC__c, 'distribution_code__c')
				: '',
				plant__c :orderHeaderForm.plant__c?
				HelperService.getNameFromSFID(agentAllPlant[0], orderHeaderForm.plant__c, 'sap_code__c')
				:'',
			gsm_name:productSearchFilters.selectedSubSubCategories.name ,
			token,
			type: this.props.user_details.business_channel__c ,
			order_type: executeVisitData.type__c=='Retailer'||selectedRetailer&&selectedRetailer.data&&selectedRetailer.data.account_type__c=='Retailer'? 'Secondary': 'Primary'
		});
		}else {
			HelperService.showToast({
				message: 'Please Select GSM '
			});
		}
	}

	filterResults(list) {
		const {
			productSearchFilters 
		} = this.props;
		let filteredList=[]
	
		 
		
		filteredList = HelperService.searchTextListFilter(list, 'name', productSearchFilters['name']);
	   
		return filteredList;
	  }


	
  	render() {
	  	const {
	  		token,
  			agentid,
  			changeSearchFilters,
 			categoryFiltersList,
 			productSearchFilters,
 			productCategoryDisplayList,
 			productSubCategoryDisplayList,
    		productSubSubCategoryDisplayList,
    		fetchCategoryLoader,
    		fetchSubCategoryLoader,
			fetchSubSubCategoryLoader,
			fetchProductsBrandLoader,
			productBrandList,
			fetchGsmLoader,
			productGsmList,
			
	  	} = this.props;

	  	let listNode = [];
	  	switch(productSearchFilters.selectedCategoryParentFilter) {
	  		case 'Product':
	  			listNode = (
	  				<CategoriesList 
	  					data={this.filterResults(productCategoryDisplayList)} 
	  					loading={fetchCategoryLoader}
	  					selectedData={productSearchFilters.selectedCategories} 
	  					onDeselect={(value) => this.onDeselect({list: productSearchFilters.selectedCategories, value: value, edited_field: 'selectedCategories'})}
	  					onSelect={(value) => this.onSelect({ list: productSearchFilters.selectedCategories,value: value, edited_field: 'selectedCategories'})} 
	  				/>
	  			);
	  			break;
	  		case 'Brand':
	  			listNode = (
	  				<SubCategoriesList
	  					loading={fetchProductsBrandLoader} 
	  					data={this.filterResults(productBrandList)} 
	  					selectedData={productSearchFilters.selectedSubCategories} 
	  					onDeselect={(value) => this.onDeselect({list: productSearchFilters.selectedSubCategories, value: value, edited_field: 'selectedSubCategories'})}
	  					onSelect={(value) => this.onSelect({ value: value, edited_field: 'selectedSubCategories'})} 
	  				/>
	  			);
	  			break;
	  		case 'GSM':
	  			listNode = (
	  				<SubSubCategoriesList 
	  					loading={fetchGsmLoader}
	  					data={this.filterResults(productGsmList)} 
	  					selectedData={productSearchFilters.selectedSubSubCategories} 
	  					onDeselect={(value) => this.onDeselect({list: productSearchFilters.selectedSubSubCategories, value: value, edited_field: 'selectedSubSubCategories'})}
	  					onSelect={(value) => this.onSelect({ value: value, edited_field: 'selectedSubSubCategories'})} 
	  				/>
	  			)
	  			break;
		  }
		  
	  	

	    return (
			<View style={Style.topContainer}>
				
				{
					/*<View style={Style.leftFiltersContainer}>
						<SelectFiltersList 
							listData={categoryFiltersList} 
							selectedFilter={productSearchFilters.selectedCategoryParentFilter}
							onChange={(value) => changeSearchFilters({edited_field: 'selectedCategoryParentFilter', edited_value: value})} 
						/>
					</View>*/
	  }		
	{productSearchFilters.selectedCategoryParentFilter=='Product'  ?<Text style={Style.heading}>{'Select Product Name'}</Text>:[]}
	{productSearchFilters.selectedCategoryParentFilter=='Brand'  ?<Text style={Style.heading}>{'Select Brand Name'}</Text>:[]}
	{productSearchFilters.selectedCategoryParentFilter=='GSM'  ?<Text style={Style.heading}>{'Select Gsm Name'}</Text>:[]}
					
						<SearchBar 
			              placeholder={`Search by Name`} 
						  onInputChange={(text) => changeSearchFilters({ edited_field: 'name', 'edited_value': text })}
						  onInputSubmit={(text) => changeSearchFilters({ edited_field: 'name', 'edited_value': text })}
						  onInputClear={(text) => changeSearchFilters({ edited_field: 'name', 'edited_value': '' })}
						  value={productSearchFilters['name']}
			              ContainerStyles={
			              Style. searchContainer
		              	}
		            />
				
		           {listNode}
				  
	{  (productSearchFilters.selectedCategoryParentFilter=='GSM')?
				   <View 
	          		style={Style.filterActionsContainer}>
		          	<WhiteButton 
		          		onPress={() => this.submit()} 
						  title={'Submit'} 
						  disabled = {this.props.fetchItemLoader}
						  loading={this.props.fetchItemLoader}
		          		style={Style.filterActionButton}
		          	/>
	            </View>: []
	  }    
      		</View>
	    );
  	}
}

const mapStateToProps = (state) => ({
	agentid							: state.user.id,
  	token							: state.user.token,
 	productList						: state.products.productList,
 	productSearchFilters 			: state.products.searchFilters,
 	categoryFiltersList 			: state.products.categoryFiltersList,
 	productCategoryList				: state.products.productCategoryList,
    productSubCategoryList			: state.products.productSubCategoryList,
    productSubSubCategoryList		: state.products.productSubSubCategoryList,
    productCategoryDisplayList 		: state.products.productCategoryDisplayList,
    productSubCategoryDisplayList	: state.products.productSubCategoryDisplayList,
    productSubSubCategoryDisplayList: state.products.productSubSubCategoryDisplayList,
    fetchCategoryLoader 			: state.products.fetchCategoryLoader,
    fetchSubCategoryLoader 			: state.products.fetchSubCategoryLoader,
	fetchSubSubCategoryLoader 		: state.products.fetchSubSubCategoryLoader,
	fetchProductsBrandLoader			: state.products.fetchProductsBrandLoader,
	productBrandList				: state.products.productBrandList,
	fetchGsmLoader			: state.products.fetchGsmLoader,
	productGsmList				: state.products.productGsmList,
	fetchItemLoader				: state.products.fetchItemLoader,
	parentAreas					:     state.visits.parentAreas,
	executeVisitData: state.visits.executeVisitData,
	user_details: state.user.user_details,
	orderHeaderForm: state.visits.orderHeaderForm,
	selectedRetailer: state.retailers.selectedRetailer,
	agentDistChannel : state.common.agentDistChannel,
	agentAllPlant:   state.common.agentAllPlant,
  
	
});

const mapDispatchToProps = (dispatch) => ({
  
  
  fetchProductSubSubCategories:(params)	=> dispatch(ProductActions.fetchProductSubSubCategories(params)),
  changeSearchFilters:(params)		 	=> dispatch(ProductActions.changeSearchFilters(params)),
  makeSubCategoryDisplayList:()			=> dispatch(ProductActions.makeSubCategoryDisplayList()),
  makeSubSubCategoryDisplayList:()		=> dispatch(ProductActions.makeSubSubCategoryDisplayList()),
  fetchProductsBrand:(params)		 		=> dispatch(ProductActions.fetchProductsBrand(params)),
  fetchProductGsm:(params)	=> dispatch(ProductActions.fetchProductGsm(params)),
  fetchProductItem:(params)	=> dispatch(ProductActions.fetchProductItem(params)),
  fetchProductsBrandFailure: () => dispatch(ProductActions.fetchProductsBrandFailure()),
  fetchProductGsmFailure: () => dispatch(ProductActions.fetchProductGsmFailure()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookOrderFilters)

