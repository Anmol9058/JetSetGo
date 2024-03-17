import _ from 'lodash';
import { call, put, select } from 'redux-saga/effects';
import { productService } from '../Services/Api/ProductService';
import { HelperService } from '../Services/Utils/HelperService';
import CommonActions from '../Stores/Common/Actions';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import ProductActions from '../Stores/Products/Actions';
import SiteActions from '../Stores/Sites/Actions';
import VisitsActions from '../Stores/Visits/Actions';


// fetchAllProducts
// makefilteredProductList
// fetchCategories
// fetchSub Categories
// fetch Sub Sub Categories
// change search filter


// makeCategoryDisplayList
// makeSubCategoryDisplayList
// makeSubSubCategoryDisplayList



export function* fetchProductBrand({ payload }) {
	//console.log(payload)
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ProductActions.doNothing());
		return;
	}
	yield put(ProductActions.fetchProductsBrandLoading());
	try {
		
		let successData = yield call(productService.fetchProductBrands, payload);
		if (successData) {
			
			let productSearchableList = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'category_code__c', label_key: 'name' });
			yield put(ProductActions.fetchProductsBrandSuccess({successData:successData, productSearchableList : productSearchableList}));
			//yield put(SiteActions.makeProductSearchableList(productSearchableList));
		} else {
			yield put(ProductActions.fetchProductsBrandFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ProductActions.fetchProductsBrandFailure());
	}
}


export function* fetchSchemes({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ProductActions.doNothing());
		return;
	}
	yield put(ProductActions.fetchSchemesLoading());
	try {
		let successData = yield call(productService.fetchSchemes, payload);
		if (successData) {
			yield put(ProductActions.fetchSchemesSuccess(successData));
		} else {
			yield put(ProductActions.fetchSchemesFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ProductActions.fetchSchemesFailure());
	}
}

export function* fetchProductCategories({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ProductActions.doNothing());
		return;
	}
	yield put(ProductActions.fetchProductCategoriesLoading());
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		let successData = yield call(productService.fetchProductCategories, payload);
		if (successData) {
			yield put(ProductActions.fetchProductCategoriesSuccess(successData));
			let productSearchableList = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'sfid', label_key: 'name' });
			//yield put(SiteActions.makeProductCategorySearchableList(productSearchableList));

			yield put(ProductActions.makeCategoryDisplayList(successData))
		} else {
			yield put(ProductActions.fetchProductCategoriesFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ProductActions.fetchProductCategoriesFailure());
	}
}

export function* fetchProductGsm({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ProductActions.doNothing());
		return;
	}
	yield put(ProductActions.fetchProductGsmLoading());
	try {
		let successData = yield call(productService.fetchProductGsm, payload);
		if (successData) {
			
			
			yield put(ProductActions.fetchProductGsmSuccess(successData));
			//yield put(ProductActions.makeSubCategoryDisplayList());
		} else {
			yield put(ProductActions.fetchProductGsmFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ProductActions.fetchProductGsmFailure());
	}
}

export function* fetchProductItem({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ProductActions.doNothing());
		return;
	}
	yield put(ProductActions.fetchProductItemLoading());
	try {
		let successData = yield call(productService.fetchProductItem, payload);
		if (successData) {
			let previousData = yield select(state => state.products.productItemList);
			let packagingSearchList = HelperService.convertToSearchableListFormatLabel({ list:successData, id_key: 'packaging', label_key: 'packaging' });
			let removeDuplicatePackaging= HelperService.removeDuplicateLabel(packagingSearchList)
			let SizeSearchList = HelperService.convertToSearchableListFormatLabel({ list:successData, id_key: 'size', label_key: 'size' });
			let removeDuplicateSize= HelperService.removeDuplicateLabel(SizeSearchList)
			//let updatedData = previousData.concat(successData)
			let removeDuplicate = HelperService.removeSfidNullitem(successData)
			//console.log(updatedData)
			
			yield put(ProductActions.fetchProductItemSuccess({successData:removeDuplicate,removeDuplicatePackaging:removeDuplicatePackaging, removeDuplicateSize:removeDuplicateSize}));
			yield put(CommonActions.closeModal());
			//yield put(ProductActions.makeSubCategoryDisplayList());
		} else {
			yield put(ProductActions.fetchProductItemFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ProductActions.fetchProductItemFailure());
	}
}

export function* fetchProductItemPrice({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ProductActions.doNothing());
		return;
	}
	yield put(ProductActions.fetchProductItemPriceLoading());
	try {
		let user  = yield select(state => state.user);
		let cart = yield select(state => state.visits.cart);
		let currentVisit = yield select(state => state.visits.executeVisitData);
		let currentParty = yield select(state => state.retailers.selectedRetailer);
		
		let successData = yield call(productService.fetchProductItemPrice, {...payload, token: user.token, type: user.user_details.business_channel__c,  order_type: currentVisit.type__c=='Retailer'||currentParty&&currentParty.data&&currentParty.data.account_type__c=='Retailer'?'Secondary' :'Primary'});
		if (successData) {
			//successData.sfid= payload.product_item__c
			let previousData = yield select(state => state.products.productItemPriceList);
			let updatedData = previousData.concat(successData)
			let removeDuplicate = HelperService.removeDuplicateitem(updatedData)
		
			yield put(ProductActions.fetchProductItemPriceSuccess(removeDuplicate));
			cart.items.map((obj)=>
			{
				if(obj.product_item__c==payload.product_item__c)
				{
					obj.number_of_reams__c = successData.number_of_reams=="NA"? 0:successData.number_of_reams,
				obj.total_price__c= successData.actual_price,
				obj.ream_weight__c= successData.ream_weight,
				obj.number_of_sheets= successData.number_of_sheets
				}


			}
			
			)
			yield put(VisitsActions.addItemToCartSuccess(cart))
			console.log('cart',cart)
			//yield put(CommonActions.closeModal());
			//yield put(ProductActions.makeSubCategoryDisplayList());
		} else {
			yield put(ProductActions.fetchProductItemPriceFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ProductActions.fetchProductItemPriceFailure());
	}
}


export function* fetchProductSubSubCategories({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ProductActions.doNothing());
		return;
	}
	yield put(ProductActions.fetchProductSubSubCategoriesLoading());
	try {
		let successData = yield call(productService.fetchProductSubSubCategories, payload);
		if (successData) {
			let previousData = yield select(state => state.products.productSubSubCategoryList);
			let updatedData = previousData.concat(successData)
			updatedData = _.uniqBy(updatedData, 'sfid');
			yield put(ProductActions.fetchProductSubSubCategoriesSuccess(updatedData));
			yield put(ProductActions.makeSubSubCategoryDisplayList());
		} else {
			yield put(ProductActions.fetchProductSubSubCategoriesFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ProductActions.fetchProductSubSubCategoriesFailure());
	}
}

export function* makeCategoryDisplayList({ payload }) {
	let list = [];
	payload.map((obj) => {
		list.push(
			{
				id: obj.sfid,
				name: obj.name
			}
		);
	});

	list= HelperService.removeDuplicateProduct(list);

	yield put(ProductActions.makeCategoryDisplayListSuccess(list));
	//yield put(SiteActions.makeProductCategorySearchableList(list));
}

export function* makeSubCategoryDisplayList() {
	let selectedCategories = yield select(state => state.products.searchFilters['selectedCategories']);
	let allSubCategories = yield select(state => state.products.productSubCategoryList);
	let allCategories = yield select(state => state.products.productCategoryList);
	let list = [];

	selectedCategories.map((catId) => {
		let subList = []
		allSubCategories.map((obj) => {
			if (obj.product_category__c == catId) {
				subList.push({
					id: obj.sfid,
					name: obj.product_sub_category_name__c
				})
			}
		});

		if (subList.length) {
			subList.unshift({
				id: catId,
				name: getSelectedCatName({ list: allCategories, id: catId, idField: 'sfid', nameField: 'category_name__c' }),
				header: true
			});
		}
		list = list.concat(subList)
		console.log(list, "DATAS");
	});

	yield put(ProductActions.makeSubCategoryDisplayListSuccess(list));
	yield put(SiteActions.makeProductSubCategorySearchableList(list));
}

export function* makeSubSubCategoryDisplayList() {
	let selectedSubCategories = yield select(state => state.products.searchFilters['selectedSubCategories']);
	let allSubSubCategories = yield select(state => state.products.productSubSubCategoryList);
	let allSubCategories = yield select(state => state.products.productSubCategoryList);
	let list = [];

	selectedSubCategories.map((catId) => {
		let subList = []
		allSubSubCategories.map((obj) => {
			if (obj.product_sub_category__c == catId) {
				subList.push({
					id: obj.sfid,
					name: obj.product_sub_sub_category_name__c
				})
			}
		});

		if (subList.length) {
			subList.unshift({
				id: catId,
				name: getSelectedCatName({ list: allSubCategories, id: catId, idField: 'sfid', nameField: 'product_sub_category_name__c' }),
				header: true
			});
		}

		list = list.concat(subList)
	});

	yield put(ProductActions.makeSubSubCategoryDisplayListSuccess(list));
	yield put(SiteActions.makeProductSubSubCategorySearchableList(list));
}

function getSelectedCatName(params) {
	let name = '';
	params.list.map((obj) => {
		if (obj[params.idField] == params.id) {
			name = obj[params.nameField]
		}
	});

	return name;
}

export function* changeDealerDiscount({payload}) {
	let cart = _.cloneDeep(yield select(state => state.visits.cart));
	//let dealerDiscount = payload;
	cart.items.map((obj)=>{
		if(obj.product_item__c==payload.sfid)
		{
			obj.additional_discount=payload.additional_discount
			//obj.net_price= obj.total_price__c*obj.quantity__c -payload.additional_discount*obj.quantity__c,

		}

	})
	
	yield put(VisitsActions.addItemToCartSuccess(cart))
}


export function* changeRemark({payload}) {
	let cart = _.cloneDeep(yield select(state => state.visits.cart));
	//let dealerDiscount = payload;
	cart.order['remarks__c']= payload.remarks__c
		
	
	yield put(VisitsActions.addItemToCartSuccess(cart))
}



