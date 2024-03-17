import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { Button, Text, Icon } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './VisitOrderCartStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'
import InputNumber from 'App/Components/FormInput/InputNumber'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import VisitsActions from 'App/Stores/Visits/Actions'
import RetailersActions from 'App/Stores/Retailers/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import VisitAction from '../VisitsDisplayScreen/VisitAction';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import EditVisitCard from 'App/Containers/Visits/EditVisitCard';
import CommonActions from 'App/Stores/Common/Actions'
import VisitOrderCartCard from 'App/Containers/Visits/VisitOrderCartCard';
import ProductCartCard from 'App/Components/ProductCartCard'
import SearchableDropdown from 'App/Components/SearchableDropdown'
import ProductActions from 'App/Stores/Products/Actions'
import { Colors } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class VisitOrderCart extends React.Component {
	componentDidMount() {
		const {
			cart,
			editCartOrder,
			dealersList,
			retailersList
		} = this.props;

	/* 	if (retailersList && retailersList.success) {
		} else {
			this.fetchRetailersCall();
		} */

	

		//this.updateDealer();
		// editCartOrder({
		// 	edited_field: 'order_value__c', 
		// 	edited_value: this.getTotalOrderValue(cart.items) + this.getTotalTax(cart.items)
		// })
	}

	

	fetchRetailersCall() {
		const {
			token,
			agentid,
			retailersOffset,
			retailersLimit,
			fetchRetailers
		} = this.props;

		fetchRetailers({
			token,
			agentid,
			offset: retailersOffset,
			limit: retailersLimit
		});
	}

	fetchDealersCall() {
		const {
			token,
			agentid,
			retailersOffset,
			retailersLimit,
			fetchDealers
		} = this.props;

		fetchDealers({
			token,
			agentid,
			offset: retailersOffset,
			limit: retailersLimit
		});
	}

	getItemData(id) {
		const {
			productItemList	,
			productItemPriceList,
			cart,
		} = this.props;
		let data = {};

		productItemList.map((obj) => {
			if (obj.sfid == id) {
				data = obj
			}
		});
		//console.log(data)
		return data;
	}


	getItemWeigthData(id) {
		const {
			productItemList	,
			productItemPriceList
		} = this.props;
		let data = {};

		productItemPriceList.map((obj) => {
			if (obj.sfid == id) {
				data = obj
			}
		});
		return data;
	}

	// updateDealer() {
	// 	const {
	// 		editCartOrder,
	// 		retailersList,
	// 		executeVisitData
	// 	} = this.props;

	// 	let data = {};
	// 	retailersList.map((obj) => {
	// 		if (obj.seller.sfid == executeVisitData.retailer_dealer__c) {
	// 			data = obj.seller
	// 			editCartOrder({ edited_field: 'dealer__c', edited_value: data.dealer__c })
	// 		}
	// 	});
	// 	return data;
	// }

	getRetailerData() {
		const {
			retailersList,
			dealersList,
			executeVisitData
		} = this.props;

		let data = {};
		retailersList.map((obj) => {
			if (obj.seller.sfid == executeVisitData.retailer_dealer__c) {
				data = obj.seller
			}
		});

		

		return data;
	}

	onChangeQuantity(params) {
		const {
			addItemToCart,
			removeItemFromCart
		} = this.props;

		if (params.quantity__c == 0) {
			removeItemFromCart(params);
		} else {
			addItemToCart(params)
		}
	}

	getCardNode(item) {
		const {
			editDealerDiscount,
			
			openDealerDiscountEdit,
			  closeDealerDiscountEdit,
			  changeDealerDiscount,
			  selectedRetailer,
			executeVisitData,
			searchFilters,
		} = this.props;
		return (
			<ProductCartCard
				name={item.gsm_name}
				data={item}
				weigthData={this.getItemWeigthData(item.product_item__c)}
				quantity={item.quantity__c}
				onRemoveClick={() => this.props.removeItemFromCart({ product_item__c: item.product_item__c })}
				onChangeQuantity={(quantity) => this.onChangeQuantity({ quantity__c: quantity, product_item__c: item.product_item__c, exmill_price: item.exmill_price,width:item.width, length: item.length, size:item.size,packaging: item.packaging ,core_diameter_cm__c:item.core_diameter_cm__c,outer_diameter_cm__c:item.outer_diameter_cm__c, name: item.name, brand__c: item.brand__c,quality__c: item.quality__c})}
				dealerDiscount={item.additional_discount}
				openDealerDiscountEdit={() => openDealerDiscountEdit()}
				  closeDealerDiscountEdit={() => closeDealerDiscountEdit()}
				  changeDealerDiscount={(value) => changeDealerDiscount(value)}
				  editDealerDiscount={editDealerDiscount}
				  selectedRetailer={selectedRetailer}
				  executeVisitData={executeVisitData}
				  showEdit={true}
				  
			/>
		);
	}

	placeOrder() {
		this.props.placeOrder(this.props.cart);
	}

	getTotalQuantity(items) {
		let quantity = 0;
		items.map((obj) => {
			quantity += Number(obj.quantity__c);
		})
		return quantity;
	}


	getTotalOrderValueDiscount(items) {
		const {
			productItemList	,
			productItemPriceList,
			cart,
			selectedRetailer,
			executeVisitData
		} = this.props;
		let value = 0;
		items.map((obj) => {
			// console.log(obj.additional_discount, "obj.total_price__c");
			if(obj.additional_discount)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.total_price__c))- (Number(obj.additional_discount))* Number(obj.quantity__c)
			else
			value += Number(obj.quantity__c)*(Number(obj.total_price__c))
		})
		//console.log(value)
		return (value);
	}

	getTotalDiscount(items) {
		const {
			productItemList	,
			productItemPriceList,
			cart
		} = this.props;
		let value = 0;
		items.map((obj) => {
			// console.log(obj, "+++++++")
			
			if(obj.additional_discount)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.additional_discount))
			
		})
		//console.log(value)
		return (value);
	}

	getTotalOrderValue(items) {
		const {
			productItemList	,
			productItemPriceList,
			cart,
			selectedRetailer,
			executeVisitData
		} = this.props;
		let value = 0;
		items.map((obj) => {
			
			
			value +=  Number(obj.quantity__c)*(Number(obj.total_price__c))
		})
		//console.log(value)
		return (value);
	}


	getTotalTax(items) {
		const {
			Tax,
			
		} = this.props;

		let value = this.getTotalOrderValueDiscount(items);
		let taxValue= Tax&&Tax.length&&Tax[0].igst__c?Tax[0].igst__c:0
		//console.log(taxValue)
		let tax = Number(taxValue)/100*value;
		
		return tax;
	}




	render() {
		const {
			token,
			agentid,
			cart,
			executeVisitData,
			editCartOrder,
			placeOrderLoader,
			
			addOrderLineLoader,
			changeRemark,
			closeRemarkEdit,
			openRemarkEdit,
			editRemark,
			addOrderForm,
			selectedRetailer,
			fetchItemPriceLoader,
			
		} = this.props;
			
		let data = cart.items;
		let visibleNode = [];
		if (data && data.length) {
			visibleNode = (
				<View style={Style.itemListContainer}>
					<FlatList
						data={data}
						renderItem={({ item }) => this.getCardNode(item)}
						keyExtractor={item => item.product_item__c}
					/>
				</View>
			);
		} else {
			visibleNode = <NoDataFound text={'No Items in Cart.'}></NoDataFound>
		}



		return (
			<View style={{...Style.container, marginTop:'2%', marginBottom:'0%'}}>
				<View style={{...Style.visitCardContainer, marginBottom:'10%'}}>
					<VisitOrderCartCard
						customerName={executeVisitData.customer_name__c}
						orderDate={(new Date()).getTime()}
						items={cart.items.length} 
						deliveryDate={addOrderForm&&addOrderForm.deliveryDate?addOrderForm.deliveryDate:cart.order.delivery_date__c}
						quantity={this.getTotalQuantity(cart.items)}
						orderValue={this.getTotalOrderValueDiscount(cart.items)}
						orderValueWithoutDis={this.getTotalOrderValue(cart.items)}
						totalTax={this.getTotalTax(cart.items)}
						totalDiscount={this.getTotalDiscount(cart.items)}
						remark={addOrderForm&&addOrderForm.remark?addOrderForm.remark:cart.order.remarks__c}
						openRemarkEdit={()=> openRemarkEdit()}
						closeRemarkEdit={()=> closeRemarkEdit()}
						editRemark={editRemark}
						changeRemark={(value)=> changeRemark(value)}
						editCartOrder={(value)=>editCartOrder(value)}
						dark={true}
						showeditIcon={addOrderForm.status}
						showEdit={!addOrderForm.status}
						show={addOrderForm.status}
						selectedRetailer={selectedRetailer&&selectedRetailer.data&&selectedRetailer.data.account_type__c?selectedRetailer.data.account_type__c:''}
						executeVisitData={executeVisitData&&executeVisitData.type__c?executeVisitData.type__c:''}
					/>
				</View>
				
				{
				visibleNode
				}
		{fetchItemPriceLoader	?
			<View style={{ justifyContent: "center", alignItems: "center", position: "absolute", top: 210, height: hp("5%"), width: "100%" }}>
                        <Loading />
                    </View>
			:[]}	
					
					{!fetchItemPriceLoader?
					<BlueButton
						title={'Place Order'}
						style={Style.placeOrderAction}
						disabled={!cart.items.length || placeOrderLoader||addOrderLineLoader}
						loading={placeOrderLoader||addOrderLineLoader}
						onPress={() => this.placeOrder()}
						textStyle={Style.placeOrderActionText}
					/>
				:[]}
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	token: state.user.token,
	agentid: state.user.id,
	Tax: state.user.Tax,
	fetchProductsLoader: state.products.fetchProductsLoader,
	fetchCategoryLoader: state.products.fetchCategoryLoader,
	fetchSubCategoryLoader: state.products.fetchSubCategoryLoader,
	fetchSubSubCategoryLoader: state.products.fetchSubSubCategoryLoader,
	fetchItemPriceLoader: state.products.fetchItemPriceLoader,
	
	filteredProductList: state.products.filteredProductList,
	productCategoryList: state.products.productCategoryList,
	productSubCategoryList: state.products.productSubCategoryList,
	productSubSubCategoryList: state.products.productSubSubCategoryList,
	searchFilters: state.products.searchFilters,
	categoryOffset: state.products.categoryOffset,
	categoryLimit: state.products.categoryLimit,
	productLimit: state.products.productLimit,
	productOffset: state.products.productOffset,
	cart: state.visits.cart,

	executeVisitData: state.visits.executeVisitData,
	placeOrderLoader: state.visits.placeOrderLoader,
	
	retailersOffset: state.retailers.retailersOffset,
	retailersLimit: state.retailers.retailersLimit,
	dealersList: state.retailers.dealersList,
	productItemList				: state.products.productItemList,
	productItemPriceList				: state.products.productItemPriceList,
	searchFilters				: state.products.searchFilters,
	editDealerDiscount: state.products.editDealerDiscount,
	editRemark: state.products.editRemark,
	selectedRetailer: state.retailers.selectedRetailer,
	addOrderLineLoader: state.retailers.addOrderLineLoader,
	addOrderForm  :state.retailers.addOrderForm
	
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (params) => dispatch(CommonActions.openModal(params)),
	disableModal: (params) => dispatch(CommonActions.disableModal(params)),
	fetchProducts: (params) => dispatch(ProductActions.fetchProducts(params)),
	fetchProductCategories: (params) => dispatch(ProductActions.fetchProductCategories(params)),
	fetchProductSubCategories: (params) => dispatch(ProductActions.fetchProductSubCategories(params)),
	fetchProductSubSubCategories: (params) => dispatch(ProductActions.fetchProductSubSubCategories(params)),
	changeSearchFilters: (params) => dispatch(ProductActions.changeSearchFilters(params)),
	addItemToCart: (params) => dispatch(VisitsActions.addItemToCart(params)),
	removeItemFromCart: (params) => dispatch(VisitsActions.removeItemFromCart(params)),
	editCartOrder: (params) => dispatch(VisitsActions.editCartOrder(params)),
	placeOrder: (params) => dispatch(VisitsActions.placeOrder(params)),
	fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
	fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
	openDealerDiscountEdit:(params)    => dispatch(ProductActions.openDealerDiscountEdit(params)),
  closeDealerDiscountEdit:(params)   => dispatch(ProductActions.closeDealerDiscountEdit(params)),
  changeDealerDiscount:(params)      => dispatch(ProductActions.changeDealerDiscount(params)),

  openRemarkEdit:(params)    => dispatch(ProductActions.openRemarkEdit(params)),
  closeRemarkEdit:(params)   => dispatch(ProductActions.closeRemarkEdit(params)),
  changeRemark:(params)      => dispatch(ProductActions.changeRemark(params)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisitOrderCart)

