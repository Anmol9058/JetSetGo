import { call, put, select, take } from 'redux-saga/effects'
import { retailerService } from '../Services/Api/RetailerService'
import NavigationService from '../Services/NavigationService'
import { HelperService } from '../Services/Utils/HelperService'
import { ValidationService } from '../Services/ValidationService'
import CommonActions from '../Stores/Common/Actions'
import { getConnectionStatus } from '../Stores/Common/Selectors'
import InfluencerAction from '../Stores/Influencers/Actions'
import LocalActions from '../Stores/LocalExpense/Actions'
import OrdersActions from '../Stores/Orders/Actions'
import RetailerActions, { RetailersTypes } from '../Stores/Retailers/Actions'
import SiteActions from '../Stores/Sites/Actions'
import VisitsActions from '../Stores/Visits/Actions'
import { offlineApiCall } from './OfflineSaga'

import _ from 'lodash'

//createRetailer, validation required, offline support
//updateRetailer, validation required, offline support
//fetchRetailers
//fetchDealers
//updateRetailerLocation
//fetchRetailerOrders
//fetchDealerOrders
//fetchDealerInvoice 
//fetchDealerOutstanding

export function* watchCreateRetailerRequest() {
	while (true) {
		const { payload } = yield take(RetailersTypes.CREATE_RETAILER)

		 try {
		 	const validationFailed = yield call(ValidationService.validateRetailerForm, payload);
		 	if (validationFailed) {
			HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(RetailerActions.retailerFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
		console.log(err)
		 }

		 yield call(createRetailer, payload)
	}
}
export function* watchCreateDsrRequest() {
	while (true) {
		const { payload } = yield take(RetailersTypes.CREATE_DSR)

		// try {
		// 	const validationFailed = yield call(ValidationService.validateRetailerForm, payload);
		// 	if (validationFailed) {
		// 		HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
		// 		yield put(RetailerActions.retailerFormValidationFailed(validationFailed));
		// 		continue;
		// 	}
		// } catch (err) {
		// 	console.log(err)
		// }

		yield call(createDsr, payload)
	}
}


export function* watchUpdateRetailerRequest() {
	while (true) {
		const { payload } = yield take(RetailersTypes.UPDATE_RETAILER)
		 try {
		 	const validationFailed = yield call(ValidationService.validateUpdateRetailerForm, payload);
		 	if (validationFailed) {
		 		HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
		 		yield put(RetailerActions.retailerFormValidationFailed(validationFailed));
		 		continue;
		 	}
		 } catch (err) {
		 	console.log(err)
		 }
		yield call(updateRetailer, payload)
	}
}


export function* watchsubmitPaymentsForm() {
	while (true) {
		const { payload } = yield take(RetailersTypes.SUBMIT_PAYMENTS_FORM)
		try {
			const validationFailed = yield call(ValidationService.validatePaymentForm, payload);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(RetailerActions.doNothing());
				continue;
			}
		} catch (err) {
			console.log(err)
		}
		yield call(submitPaymentsForm, payload)
	}
}

export function* createRetailer(payload) {
	yield put(RetailerActions.createRetailerLoading());
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id


		let offlinActionData = {
			apiCall: (retailerService.createRetailer),
			resource: 'createRetailer', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (RetailerActions.createRetailerSuccess),
			failureCallback: (RetailerActions.createRetailerFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);
		

		if (successData) { //Todo : change it to userData
			console.log('bkahdbvahbvuhdgrwgvs',successData)
			yield put(RetailerActions.createRetailerSuccess(payload));
			HelperService.showToast({ message: payload.account_type__c=='CRM Customer'?'CRM Customer Added Successfully':'Retailer Added Successfully.', duration: 1000, buttonText: '' });
			let retailers = yield select(state => state.retailers.retailersList);
			{
			//let updated_retailers = _.cloneDeep(retailers);

			//updated_retailers.count['Retailer'] += 1;
			//(updated_retailers.parties['Retailer']).unshift(successData);
			//yield put(RetailerActions.createRetailerSuccess(successData));
			//yield put(RetailerActions.fetchRetailersSuccess(updated_retailers));
			//HelperService.showToast({ 
				//message: 'Retailer Added Successfully.', 
				//duration: 1000, 
				//buttonText: '' 
			//});
		}
			//navigate to today's visit page
			yield put(RetailerActions.createRetailerSuccess(payload));
			yield put(RetailerActions.fetchRetailers({
				token: user.token
			}));
			yield put(RetailerActions.selectRetailer({
				id: successData.sfid||successData.pg_id__c, data: successData, 
			}));
			
			if(payload.account_type__c=='CRM Customer')
			{yield put(RetailerActions.updateSearchFilters({ edited_field: 'type', 'edited_value': 'CRM_Customer' }));}

			if(payload.account_type__c=='Retailer')
			{yield put(RetailerActions.updateSearchFilters({ edited_field: 'type', 'edited_value': 'Retailer' }));}

			NavigationService.navigate('RetailerInfoScreen');
		} else {
			yield put(RetailerActions.createRetailerFailure())
			// console.log(successData)
			HelperService.showToast({ message:'Cannot Create Retailer. Try after some time', duration: 2000, buttonText: 'Okay' });

		}
	} catch (error) {
		if(error.response){
			if(error.response.data&&error.response.data.message&&error.response.data.message=='Retailer Phone Number Does not Exist'){
				HelperService.showToast({message:'Retailer Phone Number Exist',duration: 1000, buttonText: ''})
		
		}
		else{
			HelperService.showToast({message:error.response.data.message,duration: 1000, buttonText: ''})
		}
		return null
}
		console.log('error',error.response)
		yield put(RetailerActions.createRetailerFailure());
		// HelperService.showToast({ message: '', duration: 2000, buttonText: 'Okay' });
	}
}

export function* createDsr(payload) {
	yield put(RetailerActions.createDsrLoading());
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id


		let offlinActionData = {
			apiCall: (retailerService.createDsr),
			resource: 'createDsr', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (RetailerActions.createDsrSuccess),
			failureCallback: (RetailerActions.createDsrFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(RetailerActions.createDsrSuccess(payload));
			HelperService.showToast({ message: 'Dsr Added Successfully.', duration: 1000, buttonText: '' });
			//navigate to today's visit page
			yield put(RetailerActions.createDsrSuccess(payload));
			yield put(RetailerActions.fetchDsr({
				token: user.token,
				
				
			  }));
			NavigationService.navigate('RetailerListScreen');
		} else {
			yield put(RetailerActions.createDsrFailure())
			HelperService.showToast({ message: 'Cannot Create Dsr. Try after some time', duration: 2000, buttonText: 'Okay' });

		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.createDsrFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}



export function* createCompetitor({payload}) {
	yield put(RetailerActions.createCompetitorLoading());
	try {
		let user = yield select(state => state.user)
		payload.token = user.token
		let successData = yield call(retailerService.createCompetitor, payload);
		if (successData) { //Todo : change it to userData
			yield put(RetailerActions.createCompetitorSuccess(payload));
			HelperService.showToast({ message: 'Competitor Added Successfully.', duration: 1000, buttonText: '' });
			yield put(RetailerActions.createCompetitorSuccess(payload));
			yield put(CommonActions.closeModal());
			yield put(RetailerActions.clearNewCompetitorForm());
			let competitors = yield select(state => state.retailers.retailerCompetitors);

			competitors.push({
				id: successData.pg_id__c,
				name: payload.Name
			})

			yield put(RetailerActions.fetchRetailerCompetitorsSuccess(competitors));
			yield put(VisitsActions.changeCompetitorForm({edited_field: 'competitors__c', edited_value: successData.pg_id__c, id: payload.id}));


			// let compData = yield call(retailerService.fetchRetailerCompetitors, {
			// 	token: user.token,
   //   			agentid: user.id,
   //   			team__c: user.id
			// });
			// if (compData) {
			// 	compData = HelperService.convertToSearchableListFormat({ list: compData, id_key: 'sfid', label_key: 'name' });
			// 	yield put(RetailerActions.fetchRetailerCompetitorsSuccess(compData));
			// 	let selectedValue = '';
			// 	compData.map((obj) => {
			// 		if (obj.name == payload.Name) {
			// 			selectedValue = obj.id;
			// 		}
			// 	});

				

			// 	yield put(VisitsActions.changeCompetitorForm({edited_field: 'competitors__c', edited_value: selectedValue, id: payload.id}));

			// } else {
			// 	yield put(RetailerActions.fetchRetailerCompetitorsFailure());
			// }




		} else {
			yield put(RetailerActions.createCompetitorFailure())
			HelperService.showToast({ message: 'Cannot Create Competitor. Try after some time', duration: 2000, buttonText: 'Okay' });

		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.createRetailerFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}

export function* createDsrArea({payload}) {
	yield put(RetailerActions.createDsrAreaLoading());
	try {
		let user = yield select(state => state.user)
		payload.token = user.token
		let successData = yield call(retailerService.createDsrArea, payload);
		if (successData) { //Todo : change it to userData
			yield put(RetailerActions.createDsrAreaSuccess(payload));
			HelperService.showToast({ message: 'DSR Area Added Successfully.', duration: 1000, buttonText: '' });
			//yield put(RetailerActions.createCompetitorSuccess(payload));
			yield put(CommonActions.closeModal());
			yield put(RetailerActions.clearDsrAreaForm());
			

			yield put(RetailerActions.fetchDsrArea({token: user.token}));
			//yield put(VisitsActions.changeCompetitorForm({edited_field: 'competitors__c', edited_value: successData.pg_id__c, id: payload.id}));


			// let compData = yield call(retailerService.fetchRetailerCompetitors, {
			// 	token: user.token,
   //   			agentid: user.id,
   //   			team__c: user.id
			// });
			// if (compData) {
			// 	compData = HelperService.convertToSearchableListFormat({ list: compData, id_key: 'sfid', label_key: 'name' });
			// 	yield put(RetailerActions.fetchRetailerCompetitorsSuccess(compData));
			// 	let selectedValue = '';
			// 	compData.map((obj) => {
			// 		if (obj.name == payload.Name) {
			// 			selectedValue = obj.id;
			// 		}
			// 	});

				

			// 	yield put(VisitsActions.changeCompetitorForm({edited_field: 'competitors__c', edited_value: selectedValue, id: payload.id}));

			// } else {
			// 	yield put(RetailerActions.fetchRetailerCompetitorsFailure());
			// }




		} else {
			yield put(RetailerActions.createDsrAreaFailure())
			HelperService.showToast({ message: 'Cannot Create DSR Area. Try after some time', duration: 2000, buttonText: 'Okay' });

		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.createDsrAreaFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}






export function* updateRetailer(payload) {
	yield put(RetailerActions.updateRetailerLoading());
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id

		let offlinActionData = {
			apiCall: (retailerService.EditRetailer),
			resource: 'updateRetailer', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (RetailerActions.updateRetailerSuccess),
			failureCallback: (RetailerActions.updateRetailerFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			//console.log(successData)
			let selectedRetailer = yield select(state => state.retailers.selectedRetailer);
			yield put(RetailerActions.updateRetailerSuccess(payload));
			yield put(CommonActions.closeModal());
			HelperService.showToast({ message:'Updated Successfully', duration: 1000, buttonText: '' });
			yield put(RetailerActions.fetchRetailers({
				token: user.token,
				
				
			  }));
			  selectedRetailer.data['billingstreet']= payload.billingstreet
			  selectedRetailer.data['postal_code__c']= payload.postal_code
			
			  selectedRetailer.data['area_name']= successData.data[0].area_name
			  selectedRetailer.data['mobile__c']= payload.mobile__c
			  selectedRetailer.data['area__c']= payload.area__c
			  selectedRetailer.data['potential_value__c']= payload.potential_value__c
			  selectedRetailer.data['dealer_type__c']= payload.dealer_type__c
			  selectedRetailer.data['e_mail__c']= payload.e_mail__c
			  //console.log(selectedRetailer)
			  yield put(RetailerActions.selectRetailer({
				id:selectedRetailer.id , data:  selectedRetailer.data, 
			}));

			NavigationService.navigate('RetailerInfoScreen');
		} else {
			yield put(RetailerActions.updateRetailerFailure())
			HelperService.showToast({ message: 'Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });

		}
	} catch (error) {
		yield put(RetailerActions.updateRetailerFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
		console.log(error)
	}
}


export function* fetchRetailers({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchRetailersLoading());
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		let rd_List=[]
		let wh_List=[]

		let successData = yield call(retailerService.fetchRetailers, payload);
		if (successData&&successData.count&&successData.parties) {
			// console.log(successData,"Retailer success data")
			yield put(RetailerActions.fetchRetailersSuccess(successData));
			// {
				if(successData.parties&&successData.parties.Retail_Distributor)
			{
			
				rd_List = HelperService.convertToSearchableListFormat({ list:Object.values(successData.parties.Retail_Distributor), id_key: 'sfid', label_key: 'name' });
				// console.log('123')
			}
			if(successData.parties&&successData.parties.Wholesaler)

			{
			
				wh_List = HelperService.convertToSearchableListFormat({ list:Object.values(successData.parties.Wholesaler), id_key: 'sfid', label_key: 'name' });
				 if(successData.parties&&successData.parties.Wholesaler&&successData.parties.Direct_Customer)
				 {
					wh_List = HelperService.convertToSearchableListFormat({ list:Object.values(successData.parties.Wholesaler), id_key: 'sfid', label_key: 'name' }).concat(HelperService.convertToSearchableListFormat({ list:Object.values(successData.parties.Direct_Customer), id_key: 'sfid', label_key: 'name' })); 
				 }
			  }
			  yield put(RetailerActions.makeDealerSearchList(rd_List.concat(wh_List)));
			// }
			if(successData.parties&&successData.parties.Retailer)

			{
				
				let retailerBeatSearchableList = HelperService.convertToSearchableListFormat({ list:Object.values(successData.parties.Retailer), id_key: 'beat__c', label_key: 'beat_name' });
				//console.log(retailerBeatSearchableList)
				retailerBeatSearchableList = HelperService.removeDuplicateBeat(retailerBeatSearchableList);
				yield put(RetailerActions.makeRetailerBeatSearchList(retailerBeatSearchableList));
			}

			

		} else {
			yield put(RetailerActions.fetchRetailersFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchRetailersFailure());
	}
}


export function* fetchDealers({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchDealersLoading());
	try {
		let successData = yield call(retailerService.fetchDealers, payload);
		if (successData) {
			yield put(RetailerActions.fetchDealersSuccess(successData));
			let dealersSearchableList = HelperService.convertToSearchableListFormat({ list: successData.map((obj) => obj.seller), id_key: 'sfid', label_key: 'name' });
			yield put(RetailerActions.makeDealerSearchList(dealersSearchableList));
			yield put(LocalActions.fetchDealerList(dealersSearchableList));
			yield put(SiteActions.makeDealerSearchableList(dealersSearchableList));
			yield put(InfluencerAction.makeDealerSearchableList(dealersSearchableList));
		} else {
			yield put(RetailerActions.fetchDealersFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchDealersFailure());
	}
}

export function* fetchRetailerDealerSearchByLocation({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchRetailerDealerSearchByLocationLoading());
	try {
		let successData = yield call(retailerService.fetchRetailerDealerByLocation, payload);
		if (successData) {
			yield put(RetailerActions.fetchRetailerDealerSearchByLocationSuccess(successData));

		} else {
			yield put(RetailerActions.fetchRetailerDealerSearchByLocationFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchRetailerDealerSearchByLocationFailure());
	}
}

export function* fetchRetailerOrders({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchRetailerOrdersLoading());
	try {
		let successData = yield call(retailerService.fetchRetailerOrders, payload);
		if (successData) {
			let orderObj = {};
			orderObj[payload.seller_id] = successData
			yield put(RetailerActions.fetchRetailerOrdersSuccess(orderObj));
		} else {
			yield put(RetailerActions.fetchRetailerOrdersFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchRetailerOrdersFailure());
	}
}


export function* fetchRetailerCompetitors({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchRetailerCompetitorsLoading());
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let successData = yield call(retailerService.fetchRetailerCompetitors, payload);
		if (successData) {
			successData = HelperService.sortListFilter(successData, 'name' , 'ASC');
			successData = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'sfid', label_key: 'name' });
			yield put(RetailerActions.fetchRetailerCompetitorsSuccess(successData));
		} else {
			yield put(RetailerActions.fetchRetailerCompetitorsFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchRetailerCompetitorsFailure());
	}
}



//fetchDealerOrders
//fetchDealerInvoice 
//fetchDealerOutstanding


export function* fetchDealerOrders({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchDealerOrdersLoading());
	try {
		let successData = yield call(retailerService.fetchDealerOrders, payload);
		if (successData) {
			let orderObj = {};
			orderObj[payload.sfid] = successData
			yield put(RetailerActions.fetchDealerOrdersSuccess(orderObj));
		} else {
			
			yield put(RetailerActions.fetchDealerOrdersFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchDealerOrdersFailure());
	}
}

export function* deleteOrderLine({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.deleteOrderLineLoading({id:payload.id}));
	try {
		let user = yield select(state => state.user);
		let successData = yield call(retailerService.deleteOrderLine, payload);
		if (successData) {
			//HelperService.showToast({ message: successData.message, duration: 2000, buttonText: 'Okay' });
			 yield put(OrdersActions.fetchOrderDetails({token: user.token, order_id: payload.order_id,}))
			yield put(RetailerActions.deleteOrderLineSuccess(successData));
			//NavigationService.navigate("OrderInfoScreen",{id:payload.order_id, status:false});
		} else {
			yield put(RetailerActions.deleteOrderLineFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.deleteOrderLineFailure());
	}
}

export function* editOrderQuantity({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.editOrderQuantityLoading({id: payload.order_line_id}));
	try {
		let user = yield select(state => state.user);
		let successData = yield call(retailerService.editOrderQuantity, payload);
		if (successData) {
			HelperService.showToast({ message: successData.message, duration: 2000, buttonText: 'Okay' });
			yield put(OrdersActions.fetchOrderDetails({token: user.token, order_id: payload.order_id,}))
			yield put(RetailerActions.editOrderQuantitySuccess(successData));
			yield put(RetailerActions.clearEditOrderLineData());
			yield put(RetailerActions.updateSearchFilters({ edited_field: 'editOrder', 'edited_value': '' }));
			
		} else {
			yield put(RetailerActions.editOrderQuantityFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.editOrderQuantityFailure());
	}
}


export function* addOrderLine({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.addOrderLineLoading());
	try {
		let data =[]
		let user = yield select(state => state.user);
		let allOrdersDetailsMapping = yield select(state => state.orders.allOrdersDetailsMapping);
		let successData = yield call(retailerService.addOrderLine, payload);
		if (successData) {
			HelperService.showToast({ message: "OrderLine Added Successfully", duration: 2000, buttonText: 'Okay' });
			//yield put(OrdersActions.fetchOrderDetails({token: user.token, order_id: payload.order_id,}))
			successData.map(obj=>{if(allOrdersDetailsMapping[payload.order_id].length){
				if(obj.order_pg_id__c==payload.order_id)
				{	//console.log(payload.order_id)
					//console.log(successData)
					//console
					data =allOrdersDetailsMapping[payload.order_id].concat(successData)
					
				}
				else
				{
					data= successData
				}

			}})
			yield put(OrdersActions.fetchOrderDetailsSuccess({ id: payload.order_id, data: data&&data.length? data: allOrdersDetailsMapping}));
			NavigationService.navigate('OrderInfoScreen',{ id: payload.order_id, data: {delivery_date__c: payload.deliveryDate, remarks__c:payload.remark}, show:false});
			yield put(RetailerActions.addOrderLineSuccess(successData));
			yield put(RetailerActions.clearAddOrderLineData());
			yield put(RetailerActions.updateSearchFilters({ edited_field: 'editOrder', 'edited_value': '' }));
			
		} else {
			yield put(RetailerActions.addOrderLineFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.addOrderLineFailure());
	}
}



export function* fetchDealerInvoice({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchDealerInvoiceLoading());
	try {
		let successData = yield call(retailerService.fetchDealerInvoice, payload);
		if (successData) {
			let orderObj = {};
			orderObj[payload.seller_id] = successData
			yield put(RetailerActions.fetchDealerInvoiceSuccess(orderObj));
		} else {
			yield put(RetailerActions.fetchDealerInvoiceFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchDealerInvoiceFailure());
	}
}


export function* fetchDealerOutstanding({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchDealerOutstandingLoading());
	try {
		let successData = yield call(retailerService.fetchDealerOutstanding, payload);
		if (successData) {
			let orderObj = {};
			orderObj[payload.seller_id] = successData
			yield put(RetailerActions.fetchDealerOutstandingSuccess(orderObj));
		} else {
			yield put(RetailerActions.fetchDealerOutstandingFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchDealerOutstandingFailure());
	}
}


export function* fetchDealerPayments({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.fetchDealerPaymentsLoading());
	try {
		let successData = yield call(retailerService.fetchDealerPayments, payload);
		if (successData) {
			let orderObj = {};
			orderObj[payload.seller_id] = successData
			yield put(RetailerActions.fetchDealerPaymentsSuccess(orderObj));
		} else {
			yield put(RetailerActions.fetchDealerPaymentsFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchDealerPaymentsFailure());
	}
}



export function* fetchInvoiceDetail({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchInvoiceDetailLoading());

	try {
		let successData = yield call(retailerService.fetchInvoiceDetail, payload);
		if (successData) {
			yield put(RetailerActions.fetchInvoiceDetailSuccess({ id: payload.invoice_id, data: successData }));
		} else {
			yield put(RetailerActions.fetchInvoiceDetailFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchInvoiceDetailFailure());
	}
}


export function* updateRetailerLocation({ payload }) {
	yield put(RetailerActions.updateRetailerLocationLoading());
	try {
		let offlinActionData = {
			apiCall: (retailerService.updateRetailerLocation),
			resource: 'updateRetailerLocation', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (RetailerActions.updateRetailerLocationSuccess),
			failureCallback: (RetailerActions.updateRetailerLocationFailure),
			replaceServerParams: false
		};
		let user = yield select(state => state.user)
		payload.team__c = user.id

		const successData = yield call(offlineApiCall, offlinActionData);
		if (successData) {
			let selectedRetailer = yield select(state => state.retailers.selectedRetailer);
			HelperService.showToast({ message: 'Location Updated.', duration: 1000, buttonText: '' });
			yield put(RetailerActions.updateRetailerLocationSuccess(payload));
			yield put(RetailerActions.fetchRetailers({
				token: user.token,
				
				
			  }));
			  selectedRetailer.data['billingstreet']= successData.data[0].address
			  //console.log(selectedRetailer)
			  yield put(RetailerActions.selectRetailer({
				id:selectedRetailer.id , data:  selectedRetailer.data, 
			}));

			NavigationService.navigate('RetailerInfoScreen');

		} else {
			HelperService.showToast({ message: 'Error!! Location not updated. Try Again.', duration: 2000, buttonText: 'Okay' });
			yield put(RetailerActions.updateRetailerLocationFailure());

		}
	} catch (error) {
		HelperService.showToast({ message: 'Error!! Location not updated.Try Again.', duration: 2000, buttonText: 'Okay' });
		console.log('Error', error)
		yield put(RetailerActions.updateRetailerLocationFailure());
	}
}
export function* extractRetailerInfoData({ payload }) {
	try {
		let id = payload.id
		let selectedRetailerdata = {}
		let retailersList = yield select(state => state.retailers.retailersList);
		if (retailersList && retailersList.length) {
			retailersList.map((obj) => {
				if (obj.seller.sfid == id) {
					selectedRetailerdata = obj.seller
				}
			});	
			yield put(RetailerActions.selectRetailer({ id: id, data: selectedRetailerdata, type: 'Retailers' }));
		} else {
			let retailers = yield select(state => state.retailers);
			let user = yield select(state => state.user);
			let successData = yield call(retailerService.fetchRetailers, {
				agentid: user.id,
				token: user.token,
				offset: retailers.retailersOffset,
				limit: retailers.retailersLimit
			});

			if (successData) {
				yield put(RetailerActions.fetchRetailersSuccess(successData));
				if (successData && successData.length) {
					successData.map((obj) => {
						if (obj.seller.sfid == id) {
							selectedRetailerdata = obj.seller
						}
					});
					yield put(RetailerActions.selectRetailer({ id: id, data: selectedRetailerdata, type: 'Retailers' }));
				}
			} else {
				yield put(RetailerActions.fetchRetailersFailure());
			}
		}

		if (_.isEmpty(selectedRetailerdata)) { // if data is not found in retailers
			let dealersList = yield select(state => state.retailers.dealersList);
			if (dealersList && dealersList.length) {
				dealersList.map((obj) => {
					if (obj.seller.sfid == id) {
						selectedRetailerdata = obj.seller
					}
				});	
				yield put(RetailerActions.selectRetailer({ id: id, data: selectedRetailerdata, type: 'Retailers' }));
			} else {
				let retailers = yield select(state => state.retailers);
				let user = yield select(state => state.user);
				let successData = yield call(retailerService.fetchDealers, {
					agentid: user.id,
					token: user.token,
					offset: retailers.retailersOffset,
					limit: retailers.retailersLimit
				});

				if (successData) {
					yield put(RetailerActions.fetchDealersSuccess(successData));
					if (successData && successData.length) {
						successData.map((obj) => {
							if (obj.seller.sfid == id) {
								selectedRetailerdata = obj.seller
							}
						});
						yield put(RetailerActions.selectRetailer({ id: id, data: selectedRetailerdata, type: 'Retailers' }));
					}
				} else {
					yield put(RetailerActions.fetchRetailersFailure());
				}
			}
		}
	} catch (error) {
		yield put(RetailerActions.doNothing());
	}
}


function* submitPaymentsForm(payload) {
	yield put(RetailerActions.submitPaymentsFormLoading());
	try {
		let offlinActionData = {
			apiCall: (retailerService.submitPaymentsForm),
			resource: 'submitPaymentsForm', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (RetailerActions.submitPaymentsFormSuccess),
			failureCallback: (RetailerActions.submitPaymentsFormFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(RetailerActions.submitPaymentsFormSuccess(payload));
			HelperService.showToast({ message: 'Payment Updated Successfully', duration: 1000, buttonText: '' });
		} else {
			yield put(RetailerActions.submitPaymentsFormFailure())
			HelperService.showToast({ message: 'Payment Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });

		}
	} catch (error) {
		console.log('Error:', error)
		yield put(RetailerActions.submitPaymentsFormFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}


export function* createComplaint(payload) {
	yield put(RetailerActions.createComplaintLoading());
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.user_details.sfid


		let offlinActionData = {
			apiCall: (retailerService.createComplaint),
			resource: 'createRetailer', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (RetailerActions.createComplaintSuccess),
			failureCallback: (RetailerActions.createComplaintFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(RetailerActions.createComplaintSuccess(payload));
			HelperService.showToast({ message: 'Complaint Added Successfully.', duration: 1000, buttonText: '' });
			//navigate to today's visit page
			yield put(RetailerActions.createComplaintSuccess(payload));
		NavigationService.navigate('RetailerInfoScreen')
		} else {
			yield put(RetailerActions.createComplaintFailure())
			HelperService.showToast({ message: 'Cannot Create Complaint. Try after some time', duration: 2000, buttonText: 'Okay' });
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.createComplaintFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}

export function* watchCreateComplaintRequest() {
	while (true) {
		const { payload } = yield take(RetailersTypes.CREATE_COMPLAINT)

		 try {
		  	const validationFailed = yield call(ValidationService.validateComplaintForm, payload.form);
		  	if (validationFailed) {
		 		HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
		 		yield put(RetailerActions.ComplaintFormValidationFailed(validationFailed));
		 		continue;
		 	}
		 } catch (err) {
		 console.log(err)
		  }

		yield call(createComplaint, payload)
	}
}






export function* fetchComplaintType( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchComplaintTypeLoading());
	
	try {
		let {token} = yield select(state => state.user)
		//payload.team__c = user.user_details.sfid
		payload.token=token
		// payload.name='test1'
		let data = yield call(retailerService.getComplaintType, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'ComplaintType' , 'ASC');
		
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(RetailerActions.fetchComplaintTypeSuccess(data));
		} else {
			yield put(RetailerActions.fetchComplaintTypeFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchComplaintTypeFailure());
	}
}

export function* fetchSubComplaintType( {payload} ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchSubComplaintTypeLoading());
	
	try {
		let {token} = yield select(state => state.user)
		//payload.team__c = user.user_details.sfid
		//payload.token=token
		
		let data = yield call(retailerService.getSubComplaintType, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'ComplaintType' , 'ASC');
			
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(RetailerActions.fetchSubComplaintTypeSuccess(data));
		} else {
			yield put(RetailerActions.fetchSubComplaintTypeFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchSubComplaintTypeFailure());
	}
}
// fetchOrderComplaints: ['payload'],
// 	fetchOrderComplaintsLoading: null,
// 	fetchOrderComplaintsSuccess: ['payload'],
// 	fetchOrderComplaintsFailure: null,

export function* fetchOrderComplaint( {payload} ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchOrderComplaintLoading());
	
	try {
		let {token,sfid} = yield select(state => state.user)
		//payload.team__c = user.user_details.sfid
		payload.token=token
		//payload.sfid='0011y000009tQePAAU'
		
		let data = yield call(retailerService.getorderComplaint, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'ComplaintType' , 'ASC')
			
			data = HelperService.convertToSearchableListFormatConcatDate({ list: data, id_key: 'sfid', label_key:'order_date__c', label_key2: 'name' });
			yield put(RetailerActions.fetchOrderComplaintSuccess(data));
		} else {
			yield put(RetailerActions.fetchOrderComplaintFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchOrderComplaintFailure());
	}
}

export function* fetchInvoiceComplaint( {payload} ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchInvoiceComplaintLoading());
	
	try {
		let {token} = yield select(state => state.user)
		//payload.team__c = user.user_details.sfid
		//payload.token=token
		//payload.sfid='a0H1y000003rHKlEAM'
		
		let data = yield call(retailerService.getInvoiceComplaint, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'ComplaintType' , 'ASC');
			
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(RetailerActions.fetchInvoiceComplaintSuccess(data));
		} else {
			yield put(RetailerActions.fetchInvoiceComplaintFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchInvoiceComplaintFailure());
	}
}



export function* fetchComplaints( {payload} ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchComplaintsLoading());
	
	try {
		let {token} = yield select(state => state.user)
		//payload.payload.sfid = sfid
		payload.token=token
		let data = yield call(retailerService.getComplaints, payload);
		
		if (data) {
			// data  = HelperService.sortListFilter(data, 'Complaints' , 'ASC');
			//data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(RetailerActions.fetchComplaintsSuccess(data));
		} else {
			console.log('Error', error)
			yield put(RetailerActions.fetchComplaintsFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchComplaintsFailure());
	}
}

export function* fetchDsr({ payload} ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchDsrLoading());
	
	try {
		
		
		let data = yield call(retailerService.fetchDsr, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'Complaints' , 'ASC');
			//data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(RetailerActions.fetchDsrSuccess(data));
		} else {
			yield put(RetailerActions.fetchDsrFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchDsrFailure());
	}
}

export function* fetchDsrArea( {payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchDsrAreaLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.user_details.sfid
		
		let data = yield call(retailerService.fetchDsrArea, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'Complaints' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'area_name__c' });
			yield put(RetailerActions.fetchDsrAreaSuccess(data));
		} else {
			yield put(RetailerActions.fetchDsrAreaFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchDsrAreaFailure());
	}
}

export function* fetchDsrAreaList( {payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchDsrAreaListLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.sfid = user.user_details.sfid
		
		let data = yield call(retailerService.fetchDsrAreaList, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'Complaints' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'area_name__c' });
			yield put(RetailerActions.fetchDsrAreaListSuccess(data));
		} else {
			yield put(RetailerActions.fetchDsrAreaListFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchDsrAreaListFailure());
	}
}


export function* fetchCreditLimit( {payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}

	yield put(RetailerActions.fetchCreditLimitLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.user_details.sfid
		
		let data = yield call(retailerService.fetchCreditLimit, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'Complaints' , 'ASC');
			// data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'area_name__c' });
			yield put(RetailerActions.fetchCreditLimitSuccess(data));
		} else {
			yield put(RetailerActions.fetchCreditLimitFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.fetchCreditLimitFailure());
	}
}

export function* getRetailerTarget({payload}) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(RetailerActions.doNothing());
		return;
	}
	yield put(RetailerActions.getRetailerTargetLoading());
	
	try {
		let {token} = yield select(state => state.user)
		//payload.team_id__c  = user.user_details.sfid
		//payload.dealer__c=user.user_details.sfid
		//payload.year__c='2021'
		payload.token=token
		
		let data = yield call(retailerService.RetailerTarget, payload);
		if (data) {
			//data = HelperService.convertToSearchableListFormat({ list: data });
			yield put(RetailerActions.getRetailerTargetSuccess(data));
		} else {
			yield put(RetailerActions.getRetailerTargetFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(RetailerActions.getRetailerTargetFailure());
	}
	}


