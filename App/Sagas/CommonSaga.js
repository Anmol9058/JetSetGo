import { call, put, select } from 'redux-saga/effects';
import { CommonService } from '../Services/Api/CommonService';
import { HelperService } from '../Services/Utils/HelperService';
import CommonActions from '../Stores/Common/Actions';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import RetailerActions from '../Stores/Retailers/Actions';
import VisitsActions from '../Stores/Visits/Actions';


import { Alert } from 'react-native';


export function* fetchAgentAreaPjp( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllAreaPjpLoading());
	
	try {
		//let user = yield select(state => state.user)
		//payload.team__c = user.user_details.sfid
	
		let data = yield call(CommonService.getAgentAreaPjp, payload.payload);
		if (data) {
			yield put(CommonActions.fetchAllPjpSuccess(data));
			if(data.area){
		let	data1  = HelperService.sortListFilter(data.area, 'area_name__c' , 'ASC');
			data1 = HelperService.convertToSearchableListFormat({ list: data.area, id_key: 'area__c' , label_key: 'area_name__c' });
			yield put(CommonActions.fetchAllAreaPjpSuccess(data1));
			if(data1[0].id)
			{	yield put(VisitsActions.changeAddPlannedVisitsSearchFilters({ edited_field: 'area', edited_value: data1[0].id }));}
			}	
			if(data.beat){

			let	data2= HelperService.convertToSearchableListFormat({ list: data.beat, id_key: 'beat__c' , label_key: 'beat_name' });
			data2 =HelperService.sortListFilter(data2, 'beat_name' , 'ASC');
			yield put(CommonActions.fetchAllBeatPjpSuccess(data2));
			if( data2[0].id ){
				yield put(VisitsActions.changeAddPlannedVisitsSearchFilters({ edited_field: 'beat', edited_value: data2[0].id }));}
		}

		
		
		
			
			
		} else {
			yield put(CommonActions.fetchAllAreaPjpFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllAreaPjpFailure());
	}
}

export function* fetchTodayAreaPjp( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllAreaPjpLoading());
	
	try {
	
	
		let data = yield call(CommonService.getAgentAreaPjp,{token: payload.payload.token, team__c: payload.payload.team__c, date:HelperService.getCurrentTimestamp()});
		if (data) {
			yield put(CommonActions.fetchAllPjpSuccess(data));
			yield put(VisitsActions.changePlannedStartDate(0));
			if(data.area){
				let	data1  = HelperService.sortListFilter(data.area, 'area_name__c' , 'ASC');
					data1 = HelperService.convertToSearchableListFormat({ list: data.area, id_key: 'area__c' , label_key: 'area_name__c' });
					yield put(CommonActions.fetchAllAreaPjpSuccess(data1));
					if(data1[0].id)
					{	yield put(VisitsActions.changeAddPlannedVisitsSearchFilters({ edited_field: 'area', edited_value: data1[0].id }));}
					}	
			
			if(data.beat){
				let	data2= HelperService.convertToSearchableListFormat({ list: data.beat, id_key: 'beat__c' , label_key: 'beat_name' });
				data2 =HelperService.sortListFilter(data2, 'beat_name' , 'ASC');
				yield put(CommonActions.fetchAllBeatPjpSuccess(data2));
				if( data2[0].id ){
					yield put(VisitsActions.changeAddPlannedVisitsSearchFilters({ edited_field: 'beat', edited_value: data2[0].id }));}
			}
			//yield put(CommonActions.fetchAllAreaPjpSuccess(data1));
		
			//yield put(CommonActions.fetchAllAreaPjpSuccess(data1));
			
		} else {
			let user = yield select(state => state.user)
			
			yield put(VisitsActions.changePlannedStartDate(1));
			yield put(VisitsActions.changePlannedSelectedDate(HelperService.getCurrentTimestamp()+ 1 * 24 * 60 * 60 * 1000));
			//payload.payload.date = HelperService.getCurrentTimestamp()+ 1 * 24 * 60 * 60 * 1000
			//payload.date=HelperService.getCurrentTimestamp()+ 1 * 24 * 60 * 60 * 1000
			yield put(CommonActions.fetchAllAreaPjp({payload:{
				token: user.token,
				team__c: user.id,
				date: HelperService.getCurrentTimestamp()+ 1 * 24 * 60 * 60 * 1000
			}}));
		}
	} catch (error) {
		yield put(CommonActions.fetchAllAreaPjpFailure());
	}
}



export function* fetchObjective( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchObjectiveLoading());
	
	try {
	
		
		let data = yield call(CommonService.getObjective, payload);
		if (data) {
			
			yield put(CommonActions.fetchObjectiveSuccess(data));
		} else {
			yield put(CommonActions.fetchObjectiveFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchObjectiveFailure());
	}
}


export function* uploadImage({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}
	// console.log(payload,"PAYLOAD UPLOAD IMAGE SAGA")
	try {
		yield put(CommonActions.setUploadImageField(payload.params.edited_field));
		yield put(CommonActions.uploadImageLoading());
		let {token} = yield select(state => state.user)
		payload.token = token
		let url = yield call(CommonService.uploadImage, payload);
		if (url) {
			yield put(CommonActions.uploadImageSuccess(url));
			let new_value = url;
		
			// console.log("IN COMMON SAGA Image1: ", payload.previous_value);	
			// console.log("IN COMMON SAGA Image2: ", new_value);	
			// console.log("IN COMMON SAGA Image3: ", url);	
			if (payload.multiple) {
				payload.previous_value = payload.previous_value || [];
				new_value.forEach(element => {
					let data = [];
					data.push(element)
					payload.previous_value.push(data);
					
				});
				// payload.previous_value.push(new_value);
				// new_value = payload.previous_value;
			}
			// console.log("IN COMMON SAGA: ", payload.previous_value);	
			if(payload.edit){
				yield put(RetailerActions.changeComplaintForm({...payload.params,edited_value:new_value}));
			} 
			if(payload.params.edited_field==='Attach_Expense_Bills'){
				//yield put(ExpensesActions.uploadedBill({}))
				// console.log(new_value," EXPENSE BILL UPLOADED ")
			}else {
				yield put(VisitsActions.changeVisitInfoForm({...payload.params, edited_value: new_value}));
	
				}
	}else{
		yield put(CommonActions.uploadImageFailure());
	}
	
	} catch (error) {
		yield put(CommonActions.uploadImageFailure());
	}
}

export function* fetchState( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchStateLoading());
	
	try {
	
		let data = yield call(CommonService.getState, payload);
		if (data) {
			
			yield put(CommonActions.fetchStateSuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'name' })));
		} else {
			yield put(CommonActions.fetchStateFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchStateFailure());
	}
}

export function* fetchCity( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchCityLoading());
	
	try {
	
		let data = yield call(CommonService.getCity, payload);
		if (data) {
			
			yield put(CommonActions.fetchCitySuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'name' })));
		} else {
			yield put(CommonActions.fetchCityFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchCityFailure());
	}
}

export function* fetchAllCity( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllCityLoading());
	
	try {
	
		let data = yield call(CommonService.getAllCity, payload);
		if (data) {
			data =HelperService.sortListFilter(data, 'area_name__c' , 'ASC');
			yield put(CommonActions.fetchAllCitySuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'area_name__c' })));
		} else {
			yield put(CommonActions.fetchAllCityFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllCityFailure());
	}
}

export function* fetchRetailerArea( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchRetailerAreaLoading());
	
	try {
		let retailers = yield select(state => state.retailers)
		// console.log('abc',payload)
		let dealerList= retailers.retailersList.parties?Object.values(retailers.retailersList.parties.Retail_Distributor):''
	// 	if(retailers.retailersList.parties.Wholesaler){
	// 	let dealerList2= retailers.retailersList.parties?Object.values(retailers.retailersList.parties.Wholesaler):''

	// 	dealerList2.map((obj)=>
	// 	{
	// 		if(obj.sfid==payload.payload.id)
	// 		{
	// 			payload.payload.city = obj.area__c
	// 		}

	// 	}
	// 	)
	// }
		//console.log(Object.values(retailers.retailersList.parties.Retail_Distributor))
		//console.log(payload);         
		//payload.team__c = user.user_details.sfid
		// console.log('dealerlist',dealerList)
		dealerList.map((obj)=>
		{
			if(obj.sfid==payload.payload.id)
			{
				payload.payload.city = obj.area__c
			}

		}
		)

		let data = yield call(CommonService.getRetailerArea, payload);
		console.log('retailer',data);
		if (data) {
			data =HelperService.sortListFilter(data, 'area_name__c' , 'ASC');
			console.log('retailer',data);

			yield put(CommonActions.fetchRetailerAreaSuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'area_name__c' })));
		} else {
			console.log('retailer',data);

			yield put(CommonActions.fetchRetailerAreaFailure());
		}
	} catch (error) {
		console.log(error)
		yield put(CommonActions.fetchRetailerAreaFailure());
	}
}

export function* fetchDealerType( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchDealerTypeLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.type = user.user_details&&user.user_details.business_channel__c=='Wholesale'?'CRM Customer':'Retailer'

		let data = yield call(CommonService.getDealerType, payload);
		if (data) {
			//data =HelperService.sortListFilter(data,'0 ','ASC');
			yield put(CommonActions.fetchDealerTypeSuccess(HelperService.convertArrayToSearchableListFormat(data.sort())));
		} else {
			yield put(CommonActions.fetchDealerTypeFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchDealerTypeFailure());
	}
}



export function* fetchBeat( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchBeatLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getBeat, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'beat' , 'ASC');
			data =HelperService.sortListFilter(data, 'name' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.fetchBeatSuccess(data));
		} else {
			yield put(CommonActions.fetchBeatFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchBeatFailure());
	}
}

export function* fetchDistChannel( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchDistChannelLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getDistChannel, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'DistChannel' , 'ASC');
		let	searchList = HelperService.convertToSearchableListFormatConcat({ list: data, id_key: 'sfid' ,label_key:'original_code__c', label_key2: 'name' });
			yield put(CommonActions.fetchDistChannelSuccess({data, searchList}));
			 if(payload.payload.type=='Retail Distributor'){
			 yield put(VisitsActions.changeOrderHeaderForm({ edited_field: 'DC__c', edited_value: HelperService.getSFIDFromName(searchList, "Retail  (33)")}));}
		} else {
			yield put(CommonActions.fetchDistChannelFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchDistChannelFailure());
	}
}

export function* getPayment( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.getPaymentLoading());
	
	try {
		let visits = yield select(state => state.visits)
		let retailersId = yield select(state => state.retailers.selectedRetailer)
		payload.id= visits.executeVisitData.customer_sfid__c||retailersId.id 
		
		let data = yield call(CommonService.getPayment, payload);
		if (data) {
			
			// data  = HelperService.sortListFilter(data, 'DistChannel' , 'ASC');
		let	searchList = HelperService.convertToSearchableListFormatConcat({ list: data, id_key: 'sfid' , label_key: 'name' ,label_key2:'description' });
		let	searchList1 = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name'  });
			yield put(CommonActions.getPaymentSuccess(searchList));
			if(payload.payload.type=='Retail Distributor'){
			yield put(VisitsActions.changeOrderHeaderForm({ edited_field: 'payterms__c', edited_value: HelperService.getSFIDFromName(searchList1, 'CD01')}));}
		} else {
			yield put(CommonActions.getPaymentFailure());
		}
	} catch (error) {
		yield put(CommonActions.getPaymentFailure());
	}
}


export function* getDivsion( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.getDivsionLoading());
	
	try {
		let visits = yield select(state => state.visits)
		let retailersId = yield select(state => state.retailers.selectedRetailer)
		payload.id= visits.executeVisitData.customer_sfid__c||retailersId.id 
		

		let data = yield call(CommonService.getDivsion, payload);
		if (data) {
			//console.log(payload)
			// data  = HelperService.sortListFilter(data, 'DistChannel' , 'ASC');
		let	searchList = HelperService.convertToSearchableListFormatConcat({ list: data, id_key: 'sfid' , label_key:'category_code',label_key2: 'division_1_name'});
		
			yield put(CommonActions.getDivsionSuccess(searchList));
		
		} else {
			yield put(CommonActions.getDivisonFailure());
		}
	} catch (error) {
		yield put(CommonActions.getDivsionFailure());
	}
}



export function* fetchAllPlant( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllPlantLoading());
	
	try {
		let currentVisit = yield select(state => state.visits.executeVisitData);
		let currentParty = yield select(state => state.retailers.selectedRetailer);
		payload.team__c =currentVisit.area__c||currentParty.data.area__c
		
		let data = yield call(CommonService.getAllPlant, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'AllPlant' , 'ASC');
			let	searchList = HelperService.convertToSearchableListFormatConcatCon({ list: data[0], id_key: 'sfid' , label_key:'account_sap_code__c' ,label_key3: 'sap_code__c',label_key2: 'name' });
			yield put(CommonActions.fetchAllPlantSuccess({data,searchList}));
			//yield put(VisitsActions.getgetplantaccounttype({data}));
		} else {
			yield put(CommonActions.fetchAllPlantFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllPlantFailure());
	}
}

export function* fetchIncoTerm( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchIncoTermLoading());
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getIncoTerm, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'IncoTerm' , 'ASC');
			data = HelperService.convertToSearchableListFormatConcat({ list: data, id_key: 'sfid' , label_key: 'name' ,label_key2:'description__c'});
			yield put(CommonActions.fetchIncoTermSuccess(data));
		} else {
			yield put(CommonActions.fetchIncoTermFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchIncoTermFailure());
	}
}

export function* fetchAllRoute( payload ) {
	// console.log(payload);
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllRouteLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getAllRoute, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'AllRoute' , 'ASC');
			let searchList = HelperService.convertToSearchableListFormatConcat({ list: data, id_key: 'sfid' , label_key: 'name',label_key2:'description__c' });
			let	searchList1 = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name'  })
			yield put(CommonActions.fetchAllRouteSuccess(searchList));
			
			yield put(VisitsActions.changeOrderHeaderForm({ edited_field: 'route__c', edited_value: HelperService.getSFIDFromName(searchList1, 'JKEXW1')}));
		} else {
			yield put(CommonActions.fetchAllRouteFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllRouteFailure());
	}
}

export function* fetchAllInsurance( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllInsuranceLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getAllInsurance, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'AllInsurance' , 'ASC');
			data = HelperService.convertToSearchableListFormatConcat({ list: data, id_key: 'sfid' , label_key: 'name',label_key2:'description__c'});
			yield put(CommonActions.fetchAllInsuranceSuccess(data));
		} else {
			yield put(CommonActions.fetchAllInsuranceFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllInsuranceFailure());
	}
}


export function* getBillParty( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.getBillPartyLoading());
	
	try {
		let visits = yield select(state => state.visits)
		let retailersId = yield select(state => state.retailers.selectedRetailer)
		payload.id= visits.executeVisitData.customer_sfid__c||retailersId.id 
		
		let data = yield call(CommonService.getBillParty, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'AllInsurance' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.getBillPartySuccess(data));
		} else {
			yield put(CommonActions.getBillPartyFailure());
		}
	} catch (error) {
		yield put(CommonActions.getBillPartyFailure());
	}
}

export function* fetchCurrentLocation({payload}){
    yield put(CommonActions.fetchCurrentLocationLoading());
    let location = yield call(HelperService.requestLocation)
  
    if (location == 'DENIED'){
      Alert.alert("Location permission is required to proceed.", 
        "Go App Permissions and Turn on Location Permission for JKPaper."
      );
      yield put(CommonActions.fetchCurrentLocationFailure());
    }else if (!location) {
      yield put(CommonActions.fetchCurrentLocationFailure());
    }else {
      if (payload.callAction) {
        yield put(payload.callAction(payload.args))
      }
      yield put(CommonActions.fetchCurrentLocationSuccess(location));
    }
  
    yield put(CommonActions.fetchCurrentLocationLoadingStop());  
  } 