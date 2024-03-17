import { put, call, take, select } from 'redux-saga/effects'
import { RetailersTypes } from '../Stores/Retailers/Actions'
import RetailerActions from '../Stores/Retailers/Actions'
import CommonActions from '../Stores/Common/Actions'
import { VisitsTypes } from '../Stores/Visits/Actions'
import VisitsActions from '../Stores/Visits/Actions'
import InfluencersActions from '../Stores/Influencers/Actions'
import SiteActions from '../Stores/Sites/Actions'
import { retailerService } from '../Services/Api/RetailerService'
import { visitsService } from '../Services/Api/VisitsService'
import { ValidationService } from '../Services/ValidationService'
import { Toast } from 'native-base'
import NavigationService from '../Services/NavigationService'
import { HelperService } from '../Services/Utils/HelperService';
import { getConnectionStatus } from '../Stores/Common/Selectors'
import ActionQueuesActions from '../Stores/ActionQueues/Actions'
import { offlineApiCall } from './OfflineSaga'
import { Alert } from 'react-native'
import _ from 'lodash';
import ProductActions from '../Stores/Products/Actions';
import { min } from 'moment'
import RecordTypeId from '../Services/Utils/Constants'



//fetchVisitsDisplayList
//fetchVisitsStorageList
//getVisitsDisplayList
//submit planned visits
//cancel visit
//edit visit
//start visit
//end visit
//press start visit
//press end visit
//fetch visit info



export function* startVisit({ payload }) {
	yield put(VisitsActions.startVisitLoading({ id: payload.visitData.pg_id__c }))
	try {
		let offlinActionData = {
			apiCall: (visitsService.startVisit),
			resource: 'startVisit',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.startVisitSuccess),
			failureCallback: (VisitsActions.startVisitFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);
		if (successData) { //Todo : change it to userData
			yield put(VisitsActions.startVisitSuccess(payload.visitData));
			yield put(VisitsActions.clearOrderHeaderForm())
			yield call(navigateAfterVisitStarted, { visit: payload.visitData });
		//	if(payload.visitData.location__latitude__s==null && payload.visitData.location__longitude__s==null){
		//		HelperService.showToast({
		//			message: 'Please update Geo-location.',
		//			duration: 1000,
		//			buttonText: ''
		//		});
		//	}
			HelperService.showToast({
				message: 'Visit Started.',
				duration: 1000,
				buttonText: ''
			});
			yield call(updateVisitsData, {
				updatedField: 'status__c',
				updatedValue: 'Started',
				visit: payload.visitData,
				visitId: payload.visitData.pg_id__c
			});
			yield call(refreshVisitsDisplayList);
			
		} else {
			yield put(VisitsActions.startVisitFailure());
		}
	} catch (error) {
		yield put(VisitsActions.startVisitFailure())
		HelperService.showToast({
			message: 'Error starting visit',
			duration: 2000,
			buttonText: 'Okay'
		});
	}
}


export function* endVisit({ payload }) {
	yield put(VisitsActions.endVisitLoading({ id: payload.visitData.pg_id__c }))
	try {
		let offlinActionData = {
			apiCall: (visitsService.endVisit),
			resource: 'endVisit',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.endVisitSuccess),
			failureCallback: (VisitsActions.endVisitFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) {
			yield put(VisitsActions.endVisitSuccess(payload.visitData));
			HelperService.showToast({
				message: 'Visit Ended.',
				duration: 1000,
				buttonText: ''
			});

			yield call(updateVisitsData, {
				updatedField: 'status__c',
				updatedValue: 'Completed',
				visit: payload.visitData,
				visitId: payload.visitData.pg_id__c
			});
			yield call(refreshVisitsDisplayList);
			yield call(refreshVisitsStorageList);
		} else {
			yield put(VisitsActions.endVisitFailure())
			HelperService.showToast({
				message: 'Error ending visit',
				duration: 2000,
				buttonText: 'Okay'
			});

		}
	} catch (error) {
		yield put(VisitsActions.endVisitFailure())
		HelperService.showToast({
			message: 'Error ending visit',
			duration: 2000,
			buttonText: 'Okay'
		});
	}
}

export function* fetchVisitsDisplayList( {payload} ) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(VisitsActions.doNothing());
		return;
	}
	yield put(VisitsActions.fetchVisitsDisplayListLoading());
	try {
		

		let successData = yield call(visitsService.fetchVisits, payload);
		if (successData) {
			
			yield put(VisitsActions.fetchVisitsDisplayListSuccess(successData));
			let data = yield call(searchInDisplayList, { startDate: payload.startDate,agentid: payload.agentid })
			data = HelperService.removeDuplicateVisits(data);
			yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess(data));
		} else {
			yield put(VisitsActions.fetchVisitsDisplayListFailure());
			yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess([]));
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.fetchVisitsDisplayListFailure());
		yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess([]));
	}
}

export function* fetchVisitsStorageList({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(VisitsActions.doNothing());
		return;
	}

	try {
		let successData = yield call(visitsService.fetchVisits, payload);
		if (successData) {
			yield put(VisitsActions.fetchVisitsStorageListSuccess(successData));
		} else {
			yield put(VisitsActions.fetchVisitsStorageListFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.fetchVisitsStorageListFailure());
	}
}

export function* getVisitsDisplayList({ payload }) {
	try {
		let searchedData = [];
		searchedData = yield call(searchInDisplayList, payload);

		if (searchedData.length) {
			searchedData = HelperService.removeDuplicateVisits(searchedData);
			yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess(searchedData));
			return
		}

		
		searchedData = yield call(searchInStoredList, payload);
		if (searchedData.length) {
			searchedData = HelperService.removeDuplicateVisits(searchedData);
			yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess(searchedData));
			return
		}
		yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess([]));
		yield put(VisitsActions.fetchVisitsDisplayList(payload));
	} catch (error) {
		console.log('Error in getVisitsDisplayList', error)
	}

}

export function* refreshVisitsDisplayList() {
	let user = yield select(state => state.user);
	let searchFilters = yield select(state => state.visits.searchFilters);
	yield put(VisitsActions.fetchVisitsDisplayList({
		token: user.token,
		agentid: searchFilters['psm__c'],
		startDate: searchFilters['startDate'],
		endDate: searchFilters['endDate']
	}));
}

export function* refreshVisitsStorageList() {
	let user = yield select(state => state.user);
	let searchFilters = yield select(state => state.visits.searchFilters);
	yield put(VisitsActions.fetchVisitsStorageList({
		token: user.token,
		agentid: user.id,
		startDate: searchFilters['startDate'],
		endDate: searchFilters['endDate']
	}));
}


export function* updateVisitsData({ updatedField, updatedValue, visit, visitId }) {
	let filteredDisplayData = yield select(state => state.visits.filteredDisplayData);
	let visitsStorageList = yield select(state => state.visits.visitsStorageList);
	let visitsDisplayList = yield select(state => state.visits.visitsDisplayList);
	let searchFilters = yield select(state => state.visits.searchFilters);

	filteredDisplayData.map((obj) => {
		if (obj.pg_id__c == visitId) {
			obj[updatedField] = updatedValue;
		}
	});

//	_.map(visitsStorageList, (value, key) => {
	//	if (HelperService.datesAreOnSameDay(key, searchFilters['startDate'])) {
		//	value.map((obj) => {
			//	if (obj.sfid == visitId) {
				//	obj[updatedField] = updatedValue;
			//	}
			//});
	//	}
	//});
	visitsStorageList.map((obj, key) => {
		if (HelperService.datesAreOnSameDay(HelperService.getDateTimestamp(obj.visit_date__c),  searchFilters['startDate'])&&(searchFilters['psm__c']==obj.flsp__c)) {
		
				if (obj.pg_id__c == visitId) {
					obj[updatedField] = updatedValue;
				}
		
		}
	});


	visitsDisplayList.map((obj, key) => {
		if (HelperService.datesAreOnSameDay(HelperService.getDateTimestamp(obj.visit_date__c),  searchFilters['startDate'])&&(searchFilters['psm__c']==obj.flsp__c)) {
		
				if (obj.pg_id__c == visitId) {
					obj[updatedField] = updatedValue;
				}
			
		}
	});


	yield put(VisitsActions.fetchVisitsDisplayListSuccess(visitsDisplayList));
	yield put(VisitsActions.fetchFilteredVisitsDisplayListSuccess(filteredDisplayData));
	//yield put(VisitsActions.fetchVisitsStorageListSuccess(visitsStorageList));
}


export function* submitSelectedPlannedVisits({ payload }) {
	yield put(VisitsActions.submitSelectedPlannedVisitsLoading());
	try {
		let offlinActionData = {
			apiCall: (visitsService.planVisit),
			resource: 'submitSelectedPlannedVisits',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.submitSelectedPlannedVisitsSuccess),
			failureCallback: (VisitsActions.submitSelectedPlannedVisitsFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(VisitsActions.submitSelectedPlannedVisitsSuccess(payload));
			NavigationService.navigateAndReset('VisitsScreen');
			HelperService.showToast({
				message: 'Planned Visits Submitted.',
				duration: 1000,
				buttonText: ''
			});
			yield call(refreshVisitsDisplayList);
		//	yield call(refreshVisitsStorageList);
		} else {
			yield put(VisitsActions.submitSelectedPlannedVisitsFailure())
			HelperService.showToast({
				message: 'Error Submitting visits',
				duration: 2000,
				buttonText: 'Okay'
			});

		}
	} catch (error) {
		yield put(VisitsActions.submitSelectedPlannedVisitsFailure())
		HelperService.showToast({
			message: 'Error Submitting visits',
			duration: 2000,
			buttonText: 'Okay'
		});
	}
}

export function* submitSelectedUnplannedVisit({ payload }) {
	yield put(VisitsActions.submitSelectedPlannedVisitsLoading());
	try {
		let offlinActionData = {
			apiCall: (visitsService.planVisit),
			resource: 'submitSelectedUnplannedVisit',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.submitSelectedPlannedVisitsSuccess),
			failureCallback: (VisitsActions.submitSelectedPlannedVisitsFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);
		if (successData) {
			yield put(VisitsActions.submitSelectedPlannedVisitsLoadingStop(payload));
			NavigationService.navigateAndReset('VisitsScreen');
			HelperService.showToast({
				message: 'Visit added for today.',
				duration: 2000,
				buttonText: 'Okay'
			});
			yield call(refreshVisitsDisplayList);
		//	yield call(refreshVisitsStorageList);
		} else {
			yield put(VisitsActions.submitSelectedPlannedVisitsFailure())
			HelperService.showToast({
				message: 'Error Submitting visit',
				duration: 2000,
				buttonText: 'Okay'
			});
		}
	} catch (error) {
		yield put(VisitsActions.submitSelectedPlannedVisitsFailure())
		HelperService.showToast({
			message: 'Error Submitting visit',
			duration: 2000,
			buttonText: 'Okay'
		});
	}
}

export function* cancelVisit({ payload }) {
	yield put(VisitsActions.cancelVisitLoading());
	yield put(CommonActions.disableModal());
	try {
		let offlinActionData = {
			apiCall: (visitsService.cancelVisit),
			resource: 'cancelVisit',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.cancelVisitSuccess),
			failureCallback: (VisitsActions.cancelVisitFailure),
			replaceServerParams: false
		};
		const successData = yield call(offlineApiCall, offlinActionData);
		if (successData) {
			HelperService.showToast({
				message: 'Visit Cancelled.',
				duration: 1000,
				buttonText: 'Okay',
				position: 'top'
			});
			yield put(VisitsActions.cancelVisitSuccess(payload));
			yield put(CommonActions.enableModal());
			yield put(CommonActions.closeModal());
			yield call(updateVisitsData, {
				updatedField: 'status__c',
				updatedValue: 'Cancelled',
				visitId: payload.visit_id
			});
			yield call(refreshVisitsDisplayList);
			yield call(refreshVisitsStorageList);
		} else {
			HelperService.showToast({
				message: 'Cannot Cancel Visit.Try again',
				duration: 2000,
				buttonText: 'Okay',
				position: 'top'
			});
			yield put(VisitsActions.cancelVisitFailure(payload));
			yield put(CommonActions.enableModal());
		}
	} catch (error) {
		HelperService.showToast({
			message: 'Cannot Cancel Visit.Try again',
			duration: 2000,
			buttonText: 'Okay',
			position: 'top'
		});
		yield put(VisitsActions.cancelVisitFailure(payload));
		yield put(CommonActions.enableModal());
	}
}

export function* editVisit({ payload }) {
	yield put(VisitsActions.editVisitLoading());
	yield put(CommonActions.disableModal());
	try {
		let offlinActionData = {
			apiCall: (visitsService.editVisit),
			resource: 'editVisit',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.editVisitSuccess),
			failureCallback: (VisitsActions.editVisitFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);
		if (successData) {
			HelperService.showToast({
				message: 'Visit Updated.',
				duration: 1000,
				buttonText: 'Okay',
				position: 'top'
			});

			yield put(VisitsActions.editVisitSuccess(payload));
			yield put(CommonActions.enableModal());
			yield put(CommonActions.closeModal());
			yield call(refreshVisitsDisplayList);
		//	yield call(refreshVisitsStorageList);

		} else {
			HelperService.showToast({
				message: 'Update Visit failed.',
				duration: 2000,
				buttonText: 'Okay',
				position: 'top'
			});
			yield put(VisitsActions.editVisitFailure(payload));
			yield put(CommonActions.enableModal());
		}
	} catch (error) {
		HelperService.showToast({
			message: 'Update Visit failed.',
			duration: 2000,
			buttonText: 'Okay',
			position: 'top'
		});
		yield put(VisitsActions.editVisitFailure(payload));
		yield put(CommonActions.enableModal());
	}
}

function* navigateAfterVisitStarted(payload) {
	const { visit } = payload || {};
	let routeToNavigate = "StartVisitForm";
	
	NavigationService.navigate(routeToNavigate);
}


export function* pressStartVisit({ payload }) {
	let user = yield select(state => state.user);
	let visit = payload.visit;
	let executeVisitData = yield select(state => state.visits.executeVisitData);
	let currentVisits = yield select(state => state.visits.filteredDisplayData);
	let user_details = yield select(state => state.user.user_details);
	let startedToday = user.startDayTime ? HelperService.isToday(user.startDayTime) : false;
	let endedToday = user.endDayTime ? HelperService.isToday(user.endDayTime) : false;
	let absentToday = user.absentDayTime ? HelperService.isToday(user.absentDayTime) : false;
	let currentLocation = yield call(fetchLocation);
// console.log('current',currentLocation)
	
	//check whether day is started or not.
	//whether agent is absent.
	//whether agent ended day.
	//check whether any other visit is already started.

	if (absentToday) {
		HelperService.showToast({
			message: 'Cannot Start Visit.You are marked absent for today',
			duration: 2000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.doNothing());
		return;
	}



	if (endedToday) {
		HelperService.showToast({
			message: 'Cannot Start Visit.You already ended your day',
			duration: 2000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.doNothing());
		return;
	}


	if (!startedToday) {
		HelperService.showToast({
			message: 'Cannot Start Visit. Please start your day first.',
			duration: 2000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.doNothing());
		return;
	}

	 let distance;
	if(visit.location__latitude__s!=null&&visit.location__longitude__s!=null){
	if (currentLocation.latitude) {
	  distance = HelperService.getDistanceBetweenTwoLocations(currentLocation, {latitude: visit.location__latitude__s, longitude: visit.location__longitude__s});
	// console.log('distance',distance)
	
	//   console.log('distancebetweentwoBefore',HelperService.getDistanceBetweenTwoLocations({latitude: 28.46536636352539,longitude: 77.0306625366211}, {latitude: 28.477381435429855, longitude: 77.05987111337782}))
	// console.log('distancebetweentwoAfter',HelperService.getDistanceBetweenTwoLocations({latitude: 28.46536636352539,longitude: 77.0306625366211}, {latitude: 28.47990133779959, longitude: 77.0140444249792}))

} else {
	  HelperService.showToast({
		message:  `Cannot proceed. ${visit.customer_name__c} is too far from your location`,
		duration: 3000
	  });
	  yield put(VisitsActions.doNothing());
	  return;
	}
}
if(visit.location__latitude__s!=null&&visit.location__longitude__s!=null){
	if( user_details.business_channel__c == 'Wholesale'){
	

	}else{
	

	if (distance > 500) {

	  HelperService.showToast({
		message: `Cannot proceed. ${visit.customer_name__c} is too far from your location`,
		duration: 2000
	  });
	  yield put(VisitsActions.doNothing());
	  return;
	}
	}
}


if(visit.location__latitude__s==null&&visit.location__longitude__s==null && user_details.business_channel__c == 'Retail'){

		HelperService.showToast({
		  message: `Cannot proceed. Please update Geo-location.`,
		  duration: 2000
  
		});
		yield put(VisitsActions.doNothing());
		return;
	 } 
	//same day two visits cannot be started simultaineously.
	if (!_.isEmpty(executeVisitData) && executeVisitData.sfid != visit.sfid && HelperService.isToday(executeVisitData.visit_date__c)) {
		HelperService.showToast({
			message: `Visit for seller ${executeVisitData.seller_name} is already started.Please end that visit before starting new visit.`, 
	duration: 4000, 
	buttonText: 'Okay'
		});

		yield put(VisitsActions.pressStartVisitSuccess());
		return;
	}	

	//condition that checks that this visit is already started
	if ((!_.isEmpty(executeVisitData) && executeVisitData.pg_id__c == visit.pg_id__c)|| visit.status__c == 'Started')  {
		HelperService.showToast({
			message: 'Visit Resumed.',
			duration: 2000,
			buttonText: 'Okay'
		});
		yield call(navigateAfterVisitStarted, { visit });
		yield put(VisitsActions.pressStartVisitSuccess(visit));
		return;
	}


	//same day two visits cannot be started simultaineously on the basis of status
	let anotherVisitInProgress = false
	currentVisits.map((obj) => {
		if (obj.status__c == 'Started' && obj.pg_id__c!= visit.pg_id__c) {
			anotherVisitInProgress = obj;
		}
	});

	if (anotherVisitInProgress) {
		HelperService.showToast({
			message: `Visit for seller ${anotherVisitInProgress.customer_name__c} is already started.Please end that visit before starting new visit.`,
			duration: 4000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressStartVisitSuccess());
		return;
	}


	try {
		const confirm = yield call(HelperService.showAlert, {
			heading: 'Start Visit',
			message: 'Do you want to start this visit?'
		});
		yield call(processStartVisit, { visit: visit, user: user });
	} catch (error) {
		yield put(VisitsActions.startVisitLoadingStop());
		yield put(VisitsActions.pressStartVisitSuccess());
	}
}


export function* pressEndVisit({ payload }) {
	let user = yield select(state => state.user);
	let visit = payload.visit;
	let executeVisitData = yield select(state => state.visits.executeVisitData);
	let startedToday = user.startDayTime ? HelperService.isToday(user.startDayTime) : false;
	let endedToday = user.endDayTime ? HelperService.isToday(user.endDayTime) : false;
	let absentToday = user.absentDayTime ? HelperService.isToday(user.absentDayTime) : false;


	if (visit.status__c != 'Started') {
		HelperService.showToast({
			message: 'Cannot End Visit. This Visit is not started yet',
			duration: 4000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.doNothing());
		return;
	}

	if (absentToday) {
		HelperService.showToast({
			message: 'Cannot End Visit.You are marked absent for today',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.doNothing());
		return;
	}


	if (endedToday) {
		HelperService.showToast({
			message: 'Cannot End Visit.You already ended your day',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.doNothing());
		return;
	}


	if (!startedToday) {
		HelperService.showToast({
			message: 'Cannot End Visit. Please start your day first.',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.doNothing());
		return;
	}

	try {
		const confirm = yield call(HelperService.showAlert, {
			heading: 'End Visit',
			message: 'Do you want to end this visit?'
		});
		yield call(processEndVisit, { visit: visit, user: user });
	} catch (error) {
		console.log(error)
		yield put(VisitsActions.endVisitLoadingStop());
		yield put(VisitsActions.pressEndVisitSuccess());
	}
}


export function* processStartVisit(payload) {
	let visits = yield select(state => state.visits);
	let user = payload.user;
	let data = payload.visit;
	let token = user.token;
	let agentid = visits.searchFilters['psm__c'];

	yield put(VisitsActions.startVisitLoading({ id: data.pg_id__c }));
	let location = yield call(fetchLocation);
	if (location) {
		yield put(VisitsActions.startVisit({
			visit_id: data.pg_id__c,
			token: token,
			agentid: agentid,
			payload: {
				checkin_location__latitude__s: String(location.latitude),
				checkin_location__longitude__s: String(location.longitude),
				checkin_time__c: String(HelperService.getCurrentTimestamp())
			},
			visitData: data
		}));
	} else {
		HelperService.showToast({
			message: 'Unable to fetch location.Please try again.',
			duration: 2000,
			buttonText: 'Okay'
		});
		yield put(VisitsActions.startVisitLoadingStop());

	}
}

export function* processEndVisit(payload) {
	let visits = yield select(state => state.visits);
	let user = payload.user;
	let data = payload.visit;
	let token = user.token;
	let agentid = visits.searchFilters['psm__c'];

	yield put(VisitsActions.endVisitLoading({ id: data.pg_id__c }));
	let location = yield call(fetchLocation);
	if (location) {
		yield put(VisitsActions.endVisit({
			visit_id: data.pg_id__c,
			token: token,
			agentid: agentid,
			payload: {
				check_out_location__latitude__s: String(location.latitude),
				check_out_location__longitude__s: String(location.longitude),
				check_out_time__c: String(HelperService.getCurrentTimestamp()),
				status__c: "Completed"
			},
			visitData: data
		}));
	} else {
		HelperService.showToast({
			message: 'Unable to fetch location.Please try again.',
			duration: 2000,
			buttonText: 'Okay'
		});
		yield put(VisitsActions.endVisitLoadingStop());
	}
}


export function* pressEditVisit({ payload }) {
	//console.log('in edit')
	let user = yield select(state => state.user);
	let visit = payload.visit;
	let modalData = payload.modalData;
	const {
		content,
		heading,
		bodyFlexHeight
	} = modalData;

	let executeVisitData = yield select(state => state.visits.executeVisitData);
	let startedToday = user.startDayTime ? HelperService.isToday(user.startDayTime) : false;
	let endedToday = user.endDayTime ? HelperService.isToday(user.endDayTime) : false;
	let absentToday = user.absentDayTime ? HelperService.isToday(user.absentDayTime) : false;

	if (absentToday) {
		HelperService.showToast({
			message: 'Cannot Edit Visit.You are marked absent for today',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressEditVisitSuccess());
		return;
	}


	if (endedToday) {
		HelperService.showToast({
			message: 'Cannot Edit Visit.You already ended your day',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressEditVisitSuccess());
		return;
	}


	if (!startedToday) {
		HelperService.showToast({
			message: 'Cannot Edit Visit. Please start your day first.',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressEditVisitSuccess());
		return;
	}


	if (visit.status__c == 'Started') {
		HelperService.showToast({
			message: 'Cannot Edit Visit. Visit already started',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressEditVisitSuccess());
		return;
	}


	yield put(CommonActions.openModal({
		content,
		heading,
		bodyFlexHeight
	}))

}


export function* pressCancelVisit({ payload }) {
	let user = yield select(state => state.user);
	let visit = payload.visit;
	let modalData = payload.modalData;
	const {
		content,
		heading,
		bodyFlexHeight
	} = modalData;

	let executeVisitData = yield select(state => state.visits.executeVisitData);
	let startedToday = user.startDayTime ? HelperService.isToday(user.startDayTime) : false;
	let endedToday = user.endDayTime ? HelperService.isToday(user.endDayTime) : false;
	let absentToday = user.absentDayTime ? HelperService.isToday(user.absentDayTime) : false;


	if (absentToday) {
		HelperService.showToast({
			message: 'Cannot Cancel Visit.You are marked absent for today',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressCancelVisitSuccess());
		return;
	}


	if (endedToday) {
		HelperService.showToast({
			message: 'Cannot Cancel Visit.You already ended your day',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressCancelVisitSuccess());
		return;
	}


	if (!startedToday) {
		HelperService.showToast({
			message: 'Cannot Cancel Visit. Please start your day first.',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressCancelVisitSuccess());
		return;
	}


	if (visit.status__c == 'Started') {
		HelperService.showToast({
			message: 'Cannot Cancel Visit. Visit already started',
			duration: 3000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.pressCancelVisitSuccess());
		return;
	}



	yield put(CommonActions.openModal({
		content,
		heading,
		bodyFlexHeight
	}))
}


export function* fetchLocation() {
	let location = yield call(HelperService.requestLocation);
	if (location == 'DENIED') {
		Alert.alert("Location permission is required to proceed.",
			"Go App Permissions and Turn on Location Permission for JK Paper."
		);
		return false;
	} else if (!location) {
		return false;
	}
	return location
}


export function* searchInDisplayList(payload) {
	let filterResultsData = [];
	let visitsDisplayList = yield select(state => state.visits.visitsDisplayList);
	visitsDisplayList.map((obj) => {
		
		if (HelperService.datesAreOnSameDay(HelperService.getDateTimestamp(obj.visit_date__c), payload.startDate)&&(payload.agentid==obj.flsp__c)) {
			filterResultsData = filterResultsData.concat(obj)
		}
	});
	
	return filterResultsData;
}

export function* searchInStoredList(payload) {
	let filterResultsData = [];
	let visitsStorageList = yield select(state => state.visits.visitsStorageList);
	visitsStorageList.map((obj) => {
		
		if (HelperService.datesAreOnSameDay(HelperService.getDateTimestamp(obj.visit_date__c), payload.startDate)&&(payload.agentid==obj.flsp__c)) {
			filterResultsData = filterResultsData.concat(obj)
		}
	});

	return filterResultsData;
}

export function* addItemToCart({ payload }) {
	let cart = yield select(state => state.visits.cart);
	let productList = yield select(state => state.products.productItemList);
	let productSizeForm = yield select(state => state.products.productSizeForm);
	let orderHeaderForm = yield select(state => state.visits.orderHeaderForm);
	let  agentAllPlant =   yield select(state => state.common.agentAllPlant);
	let BrandList = yield select(state => state.products.BrandList,);
	//console.log(productSizeForm)
	//console.log(payload)
	//console.log(Number(payload.width))

	//console.log(payload.width.slice(0,2))
	//console.log((payload.product_item__c==productSizeForm.id) && (productSizeForm.width==""))
	if(payload.quantity__c==0) {
		HelperService.showToast({
			message: 'Cannot Add to Cart.Enter the Quantity',
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}

	if(payload.width.slice(0,2)== '>=' && productSizeForm.width=="") {
		HelperService.showToast({
			message: 'Cannot Add to Cart.Enter the Size1(W)',
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}

	if( !productSizeForm.outer_diameter_cm__c&&!payload.outer_diameter_cm__c&&payload.packaging=='REL') {
		HelperService.showToast({
			message: 'Cannot Add to Cart.Enter the Outer Daimeter(cm)',
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}
	if( !productSizeForm.core_diameter_cm__c&&!payload.core_diameter_cm__c&&payload.packaging=='REL') {
		HelperService.showToast({
			message: 'Cannot Add to Cart.Enter the Core Diameter(cm)',
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}
	if((payload.product_item__c==productSizeForm.id) && (Number(productSizeForm.width)<=Number(payload.width.slice(2,payload.width.length)))) {
		HelperService.showToast({
			message: `Cannot Add to Cart.Enter the Size1(W) in Range (${payload.width}) `,
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}
	
	if((payload.product_item__c==productSizeForm.id) && (Number(productSizeForm.width)>=Number(payload.length.slice(2,payload.length.length)))) {
		HelperService.showToast({
			message: `Cannot Add to Cart.Enter the Size1(W) in Range (${payload.length})`,
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}

	if((payload.product_item__c==productSizeForm.id) && Number(productSizeForm.length)<=Number(payload.width.slice(2,payload.width.length)) && payload.packaging!='REL') {
		HelperService.showToast({
			message: `Cannot Add to Cart.Enter the Size2(L) in Range (${payload.width})`,
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}

	if((payload.product_item__c==productSizeForm.id) && Number(productSizeForm.length)>=Number(payload.length.slice(2,payload.length.length))&& payload.packaging!='REL') {
		HelperService.showToast({
			message: `Cannot Add to Cart.Enter the Size2(L) in Range  (${payload.length})`,
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}

	if(payload.length.slice(0,2)== '<=' && (productSizeForm.length=="")&& payload.packaging!='REL') {
		HelperService.showToast({
			message: 'Cannot Add to Cart.Enter the Size2(L)',
			duration: 1000,
			buttonText: 'Okay'
		});

		yield put(VisitsActions.addItemToCartSuccess(cart))
		return;
	}

	
	let itemAlreadyPresent = false;
	cart.items = cart.items.map((obj) => {
		if (obj.product_item__c == payload.product_item__c &&obj.size == payload.size&&obj.packaging == payload.packaging&&obj.length == payload.length&&obj.width == payload.width) {
			obj.quantity__c = payload.quantity__c
			itemAlreadyPresent = true
		}
		return obj;
	});

try{
	if (!itemAlreadyPresent) {
		cart.items.push(payload)
		//console.log(productList)
		productList.map((obj)=>
		{
			if(obj.sfid == payload.product_item__c &&obj.size == payload.size&&obj.packaging == payload.packaging)
			{
				payload.packaging=obj.packaging,
				payload.plant= agentAllPlant&&agentAllPlant.length&&agentAllPlant[0]?HelperService.getNameFromSFID(agentAllPlant[0], orderHeaderForm.plant__c, 'sap_code__c'):'',
				//payload.quality= obj.brand,
				payload.width =obj.width.slice(0, 2)=='>='||obj.width.slice(0, 2)=='<='?productSizeForm.width:obj.width,
				payload.length=obj.length.slice(0, 2)=='>='||obj.length.slice(0, 2)=='<='? productSizeForm.length: obj.length,
				payload.gsm = obj.gsm,
				payload.size = obj.size,
				payload.core_diameter_cm__c= productSizeForm.core_diameter_cm__c?productSizeForm.core_diameter_cm__c:''
				payload.outer_diameter_cm__c= productSizeForm.outer_diameter_cm__c? productSizeForm.outer_diameter_cm__c:"",
				payload.hsn_code__c=obj.hsn,
				payload.quality__c=getBrandSfid({brand__c:payload.brand__c, list :BrandList })
				payload.brand__c=getBrandSfid({brand__c:payload.brand__c, list :BrandList })
				
				//payload.product_variant__c=obj.name
				//payload.quantity= obj.quantity,



			}

		}
		)

		yield put(ProductActions.fetchProductItemPrice(payload))
		yield put(ProductActions.clearSizeForm())
		yield put(VisitsActions.clearSetQuantity())
		

	}

	yield put(VisitsActions.addItemToCartSuccess(cart))
}
catch (error) {
	console.log(error)
	//yield put(VisitsActions.editCartOrder({ edited_field: 'unique_product_count__c', edited_value: cart.items.length }))
	
	//yield put(VisitsActions.editCartOrder({ edited_field: 'total_tax__c', edited_value: total_value*.18 }))
}
}

export function* removeItemFromCart({ payload }) {
	let cart = yield select(state => state.visits.cart);
	let currentVisit = yield select(state => state.visits.executeVisitData);
	let currentParty = yield select(state => state.retailers.selectedRetailer);
	let itemAlreadyPresent = false;
	cart.items = cart.items.filter((obj) => obj.product_item__c != payload.product_item__c);
	yield put(VisitsActions.removeItemFromCartSuccess(cart))
	let total_value = getTotalOrderValue({ item :cart.items , type :currentVisit.type__c||currentParty&&currentParty.data&&currentParty.data.account_type__c});
	//yield put(VisitsActions.editCartOrder({ edited_field: 'unique_product_count__c', edited_value: cart.items.length }))
	yield put(VisitsActions.editCartOrder({ edited_field: 'total_payable_amount__c', edited_value: (total_value)}))
	//yield put(VisitsActions.editCartOrder({ edited_field: 'total_tax__c', edited_value: total_value*.18 }))

}

export function* editCartOrder({ payload }) {
	let cart = yield select(state => state.visits.cart);
	cart.order[payload.edited_field] = payload.edited_value;
	yield put(VisitsActions.editCartOrderSuccess(cart))
}


export function* placeOrder(payload) {
// console.log(payload, "MYPAYLOAD++++")
	yield put(VisitsActions.placeOrderLoading());
	try {
		let offlinActionData = {
			apiCall: (visitsService.placeOrder),
			resource: 'editVisit',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload.requestdataPayload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.placeOrderSuccess),
			failureCallback: (VisitsActions.placeOrderFailure),
			replaceServerParams: false
		};
		let currentParty = yield select(state => state.retailers.selectedRetailer);
		let party = yield select(state => state.retailers.partiesMapping);
		let currentData =   yield select(state => state.user)
		const successData = yield call(offlineApiCall, offlinActionData);
		if (successData) {
			
			HelperService.showToast({
				message: ' Order Placed Successfully.',
				duration: 1000,
				buttonText: 'Okay'
			});

		

			yield put(VisitsActions.placeOrderSuccess(payload));
			yield put(ProductActions.fetchProductItemSuccess([]));
			
			if(!currentParty.id){
				
					//  console.log("place order",payload);
					//  console.log("place order2", party[payload.type="Retail Distributor"?type="Retail_Distributor":type=payload.type]);
		
		//	party[payload.type][payload.requestdataPayload.from__c]
		//	yield put(RetailerActions.fetchDealerOrders({token:  currentData.token, sfid:payload.requestdataPayload.payload.order.from__c,
		//		date: `${(new Date(HelperService.getCurrentTimestamp())).getFullYear()}-${(new Date(HelperService.getCurrentTimestamp())).getMonth()+1}-${HelperService.getCurrentDate()}`,
		//	}));
		yield put(RetailerActions.selectRetailer({id:payload.requestdataPayload.payload.order.from__c , data: party[payload.type=='Retail Distributor'?'Retail_Distributor':payload.type][payload.requestdataPayload.payload.order.from__c],}));
			}
			//yield put(RetailerActions.updateSearchFilters(1));
			//console.log(successData)
			//NavigationService.navigate('OrderInfoScreen',{id:successData.pg_id__c, data: successData, show: true,status:true})
			
		} else {
			HelperService.showToast({
				message: 'Order cannot be placed.',
				duration: 2000,
				buttonText: 'Okay'
			});
			
			yield put(VisitsActions.placeOrderFailure());
		}
	} catch (error) {
		HelperService.showToast({
			message: 'Order cannot be placed.',
			duration: 2000,
			buttonText: 'Okay'
		});
		console.log(error)
		yield put(VisitsActions.placeOrderFailure());
	}
}


export function* fetchVisitInfo({ payload }) {
	// console.log("visitPPPP+++Mapping", payload);
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(VisitsActions.doNothing());
		return;
	}
	yield put(VisitsActions.fetchVisitInfoLoading());
	try {
		let successData = yield call(visitsService.fetchVisitInfo, payload);
		
		if (successData) {
			yield put(VisitsActions.fetchVisitInfoSuccess({ id: payload.visit_id, data: successData }));
			yield put(VisitsActions.setVisitInfoForm({ market_material_required__c: successData.attachmentDetail[0].market_material_required__c, remarks__c: successData.attachmentDetail[0].remarks__c}))
		} else {
			yield put(VisitsActions.fetchVisitInfoFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.fetchVisitInfoFailure());
	}
}

export function* addVisitInfo(payload) {
	console.log("PAYLOAD UPLOAD IMAGE", payload);
	yield put(VisitsActions.addVisitInfoLoading());
	try {
		let offlinActionData = {
			apiCall: (visitsService.addVisitInfo),
			resource: 'addVisitInfo',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.addVisitInfoSuccess),
			failureCallback: (VisitsActions.addVisitInfoFailure),
			replaceServerParams: false
		};
		let currentUser = yield select(state => state.user);
		let currentVisit = yield select(state => state.visits.executeVisitData);
		let currentVisitId = currentVisit['pg_id__c'];

		const successData = yield call(offlineApiCall, offlinActionData);
		if (successData) {
			HelperService.showToast({
				message: 'Visit Info Added Successfully.',
				duration: 1000,
				buttonText: 'Okay'
			});
			yield put(VisitsActions.addVisitInfoSuccess(successData));
			//yield put(VisitsActions.fetchVisitInfo({ visit_id: currentVisitId, token :currentUser.token}))
			
			//yield put(VisitsActions.clearAddInfoForm());
			NavigationService.navigateAndReset('StartVisitForm');
			

		} else {
			HelperService.showToast({
				message: 'Failed. Cannot Add Visit',
				duration: 2000,
				buttonText: 'Okay'
			});
			yield put(VisitsActions.addVisitInfoFailure());
		}
	} catch (error) {
		HelperService.showToast({
			message: 'Failed. Cannot Add Visit',
			duration: 2000,
			buttonText: 'Okay'
		});
		console.log(error)
		yield put(VisitsActions.addVisitInfoFailure());
	}
}

export function* watchAddVisitInfo() {
	while (true) {
		const { payload } = yield take(VisitsTypes.ADD_VISIT_INFO)
		let currentUser = yield select(state => state.user);
		let currentVisit = yield select(state => state.visits.executeVisitData);
		let attachment_url__c=[]
		let currentVisitId = currentVisit['pg_id__c'];
		payload.visit=currentVisitId

		var formPayload  = _.cloneDeep(payload);
		if (formPayload.attachment_url__c && formPayload.attachment_url__c.length) {
			formPayload.attachment_url__c.forEach((obj) => {
				if (Array.isArray(obj)) {
					obj.forEach((url) => {
						attachment_url__c.push({ attachment_url__c: url });
					});
				} else {
					attachment_url__c.push({ attachment_url__c: obj });
				}
			});
		}

		let requestDataPayload = {
			//agentid: currentUser.id,
			token: currentUser.token,
			//visit_id: currentVisitId,
			payload: payload
		}
		
	{	
		//try {
			//const validationFailed = yield call(ValidationService.validateAddVisitForm, requestDataPayload.payload);
			//if (validationFailed) {
			//	HelperService.showToast({
				//	message: validationFailed.error_message,
				//	duration: 2000,
					//buttonText: 'Okay'
				//});
			//	yield put(VisitsActions.visitInfoValidationFailed(validationFailed));
				//continue;
			//}
		//} catch (err) {
		//	console.log(err)
		//}
	}
		yield call(addVisitInfo, requestDataPayload)
	}
}


export function* watchPlaceOrder() {
	try{
	//console.log(this.getsapcodeaccounttype());
	while (true) {
		const { payload } = yield take(VisitsTypes.PLACE_ORDER)
		let currentVisit = yield select(state => state.visits.executeVisitData);
		let parentAreas = yield select(state => state.visits.parentAreas);
		let currentParty = yield select(state => state.retailers.selectedRetailer);
		let currentData =   yield select(state => state.user.user_details)
		let orderHeaderForm =   yield select(state => state.visits.orderHeaderForm)
		let list =   yield select(state => state.retailers.partiesMapping)
		let plantData  =   yield select(state => state.common.agentAllPlant);
		let Tax =   yield select(state => state.user.Tax)
		//let  agentDistChannel =   yield select(state => state.common.agentDistChannel)
		yield put(VisitsActions.editCartOrder({ edited_field: 'order_created_by__c', edited_value: currentData.sfid  }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'created_from__c', edited_value: 'SFA' }));
	
		yield put(VisitsActions.editCartOrder({ edited_field: 'order_date__c', edited_value: HelperService.getCurrentTimestamp() }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'from__c', edited_value: currentVisit.customer_sfid__c|| currentParty.id }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'bill_to_id__c', edited_value: currentVisit.customer_sfid__c|| currentParty.id }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'business_channel__c', edited_value: currentData.business_channel__c }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'remarks1__c', edited_value: '' }));
		
		//yield put(VisitsActions.editCartOrder({ edited_field: 'created_From__c', edited_value: 'SFA'  }));
		//yield put(VisitsActions.editCartOrder({ edited_field: 'order_Created_By__c', edited_value: currentData.sfid  }));
		//yield put(VisitsActions.editCartOrder({ edited_field: 'created_from__c', edited_value: currentVisit.customer_sfid__c|| currentParty.id }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'to__c', edited_value: currentVisit.type__c=='Retailer'||currentParty&&currentParty.data&&currentParty.data.account_type__c=='Retailer'?currentVisit.parentid|| currentParty.data.parentid : orderHeaderForm.plant__c}));
		if(currentVisit.sfid)
		{
		yield put(VisitsActions.editCartOrder({ edited_field: 'visits__c', edited_value: currentVisit.sfid }));}
		if(currentVisit.type__c!='Retailer'||currentParty&&currentParty.data&&currentParty.data.account_type__c!='Retailer')
		{
			
			yield put(VisitsActions.editCartOrder({ edited_field: 'insurance_type1__c', edited_value: orderHeaderForm.Insutype__c}));
			yield put(VisitsActions.editCartOrder({ edited_field: 'customer_reference_date__c', edited_value: HelperService.dateReadableFormatWithHyphenDate(HelperService.getCurrentTimestamp())}));
		yield put(VisitsActions.editCartOrder({ edited_field: 'sap_order_type__c', edited_value: getsapcodeaccounttype({data:plantData, id:orderHeaderForm.plant__c })}));
			yield put(VisitsActions.editCartOrder({ edited_field: 'inco_terms1__c', edited_value: orderHeaderForm.IncoT__c}));
			yield put(VisitsActions.editCartOrder({ edited_field: 'payment_term1__c', edited_value: orderHeaderForm.payterms__c}));
			yield put(VisitsActions.editCartOrder({ edited_field: 'route__c', edited_value: orderHeaderForm.route__c}));
			yield put(VisitsActions.editCartOrder({ edited_field: 'division__c', edited_value: orderHeaderForm.division__c}));
			
		}
		//yield put(VisitsActions.editCartOrder({ edited_field: 'flsp__c', edited_value: currentVisit.flsp__c }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'team_manager__c', edited_value: currentVisit.team_manager__c|| currentData.team_manager__c}));
		yield put(VisitsActions.editCartOrder({ edited_field: 'zsm__c', edited_value: currentVisit.manager__c||currentData.manager__c }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'order_confirmation_status__c', edited_value: 'Open' }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'order_delivery_status__c', edited_value: 'Open' }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'order_type__c', edited_value: currentVisit.type__c=='Retailer'||currentParty&&currentParty.data&&currentParty.data.account_type__c=='Retailer'?'Secondary' :'Primary'}));
		yield put(VisitsActions.editCartOrder({ edited_field: 'distribution__c', edited_value:currentVisit.type__c=='Retailer'||currentParty&&currentParty.data&&currentParty.data.account_type__c=='Retailer'? RecordTypeId.RETAILERS_UAT_ID : orderHeaderForm.DC__c}));
		yield put(VisitsActions.editCartOrder({ edited_field: 'city__c', edited_value: currentVisit.type__c=='Retailer'||currentParty&&currentParty.data&&currentParty.data.account_type__c=='Retailer'?parentAreas.parent_city__c: currentVisit.area__c||currentParty.data.area__c}));
		yield put(VisitsActions.editCartOrder({ edited_field: 'ship_to_address__c', edited_value: currentVisit.billingstreet|| currentParty.data.billingstreet }));
		yield put(VisitsActions.editCartOrder({ edited_field: 'ship_to_id__c', edited_value:currentVisit.customer_sfid__c|| currentParty.id }));
		//let retailersList = yield select(state => state.retailers.retailersList);
		//let dealersList = yield select(state => state.retailers.dealersList);
		// sandbox=a0s1y0000006aQPAAY, production=a0U2w000003IIPTEA4
		//let dealer__c = '';
		// console.log("TAXCHECK=", RecordTypeId.RETAILERS_UAT_ID);
		let cart = yield select(state => state.visits.cart);
		let total_value = getTotalOrderValue({ item :cart.items , type :currentVisit.type__c||currentParty&&currentParty.data&&currentParty.data.account_type__c});
		let Total_Quantity__c= getTotalOrderQuantity(cart.items);
		let Total_Discount= getTotalDiscount(cart.items);
		let Total_Exmil= getTotalExmil(cart.items);
		let value =getTotalOrderValueWithOutDiscount(cart.items)
		let taxValue= Tax&&Tax.length&&Tax[0].igst__c?Tax[0].igst__c/100:0

		// console.log("TAXCHECK=", currentVisit.type__c);
		// console.log("TAXCHECK==", currentParty.data.account_type__c);
		let matchCode=  currentVisit.type__c=='Retailer'||currentParty&&currentParty.data&&currentParty.data.account_type__c=='Retailer'?getStateCodeMap({type :currentVisit.type__c||currentParty&&currentParty.data&&currentParty.data.account_type__c,parentId:currentVisit.parentid|| currentParty.data.parentid ,accountId: currentVisit.customer_sfid__c|| currentParty.id,list: list }): true
		yield put(VisitsActions.editCartOrder({ edited_field: 'total_payable_amount__c', edited_value: (total_value +taxValue*total_value)}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'order_value_without_discount__c', edited_value: (value)}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'component_2__c', edited_value: (Total_Discount )}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'total_quantity__c', edited_value: (Total_Quantity__c )}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'component_1__c', edited_value: (Total_Exmil )}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'total_tax__c', edited_value: ( taxValue*total_value )}))
		// console.log("TATATA+++++++", taxValue, Tax);

		let taxValue1= Tax&&Tax.length&&Tax[0].igst__c?Tax[0].igst__c/100*total_value:0
		let taxValue2= Tax&&Tax.length&&Tax[0].cgst__c?Tax[0].cgst__c/100*total_value:0
		let taxValue3= Tax&&Tax.length&&Tax[0].sgst__c?Tax[0].sgst__c/100*total_value:0
		// console.log("TATATA1+++++++", taxValue1);
		// console.log("TATATA2+++++++", taxValue2);
		// console.log("TATATA3+++++++", taxValue3);
		
		let taxperValue1= Tax&&Tax.length&&Tax[0].igst__c?Tax[0].igst__c:0
		let taxperValue2= Tax&&Tax.length&&Tax[0].cgst__c?Tax[0].cgst__c:0
		let taxperValue3= Tax&&Tax.length&&Tax[0].sgst__c?Tax[0].sgst__c:0
		// console.log("TATATA4+++++++", taxperValue1);
		// console.log("TATATA5+++++++", taxperValue2);
		// console.log("TATATA6+++++++", taxperValue3);
		
		if(matchCode)
		// console.log("YECHALAKYA====", matchCode);
	{
		yield put(VisitsActions.editCartOrder({ edited_field: 'sgst__c', edited_value: (taxValue3)}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'cgst__c', edited_value: ( taxValue2 )}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'cgst_percentage__c', edited_value: (taxperValue2)}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'sgst_percentage__c', edited_value: ( taxperValue3 )}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'igst_percentage__c', edited_value:0}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'igst__c', edited_value: 0}))
	}
	
	if(!matchCode){
		// console.log("YECHALAKYA====123", matchCode);
		yield put(VisitsActions.editCartOrder({ edited_field: 'igst_percentage__c', edited_value: (taxperValue1)}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'igst__c', edited_value: (taxValue1)}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'sgst__c', edited_value: 0}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'cgst__c', edited_value: 0}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'cgst_percentage__c', edited_value: 0}))
		yield put(VisitsActions.editCartOrder({ edited_field: 'sgst_percentage__c', edited_value: 0}))
		}
		//yield put(VisitsActions.editCartOrder({ edited_field: 'dealer__c', edited_value: dealer__c }));


		let currentCartData = yield select(state => state.visits.cart);
		let BrandList = yield select(state => state.products.BrandList,);
		let productCategoryList = yield select(state => state.products.productCategoryList,);
		
		let currentCart = _.cloneDeep(currentCartData);
		currentCart.items.map((obj, index)=>{
		
			const productVariant= obj['product_variant__c']
			const productitem= obj['product_item__c']
			const number_of_sheets= obj['number_of_sheets']
			const additional_discount= obj['additional_discount']? obj['additional_discount']:0
			const total_price = obj['total_price__c']
			const productVariant1=obj['name']
			
			HelperService.removeField(obj,'quality');
			HelperService.removeField(obj,'plant');
			HelperService.removeField(obj,'gsm');
			HelperService.removeField(obj,'product_variant__c');
			HelperService.removeField(obj,'number_of_sheets');
			HelperService.removeField(obj,'additional_discount');
			HelperService.removeField(obj,'gsm_name');
			HelperService.removeField(obj,'total_price__c');
			HelperService.removeField(obj,'name');
			
			HelperService.interChangeValue(obj,'product_item__c',productVariant);
			
			obj.total_additional_discount__c= Number(additional_discount)*Number(obj.quantity__c);
			obj.additional_discount=additional_discount
			obj.month__c= HelperService.getMonthName(HelperService.getCurrentTimestamp());
			if(currentVisit.type__c!='Retailer'||currentParty&&currentParty.data&&currentParty.data.account_type__c!='Retailer')
			{
				
			obj.product_variant1__c= productVariant1
			obj.line_sequence__c= currentCart.items.length ==index+1? "LAST" :index+1
				
			}
			
			obj.shipped_qty__c=0
			obj.shipping_qty__c=0
			
		
			obj.product_family__c =getProductFamilySfid({ id:obj.product_family__c, list :productCategoryList})
			obj.number_of_sheets__c = number_of_sheets,
			obj.total_price__c = (total_price-additional_discount)*obj.quantity__c+  taxperValue1/100*((total_price-additional_discount)*obj.quantity__c)
			
			obj.unit_price_after_discount__c= total_price-additional_discount
			if(matchCode){
			obj.cgst__c=  taxperValue2/100*((total_price-additional_discount)*obj.quantity__c)
			obj.sgst__c=  taxperValue3/100*((total_price-additional_discount)*obj.quantity__c)
			obj.igst__c=  0
			}
			if(!matchCode){
				obj.cgst__c=  0
				obj.sgst__c=  0
				obj.igst__c=  taxperValue1/100*((total_price-additional_discount)*obj.quantity__c)
				}
			obj.total_tax__c=	taxperValue1/100*((total_price-additional_discount)*obj.quantity__c)
			

		})

		
		
		let currentUser = yield select(state => state.user);

		let addOrderLine = yield select(state => state.retailers.addOrderForm);
		let requestdataPayload = {
			agentid: currentUser.id,
			token: currentUser.token,
			payload: currentCart
		}

		try {
			const validationFailed = yield call(ValidationService.validatePlaceOrderForm, requestdataPayload.payload);
			if (validationFailed) {
				HelperService.showToast({
					message: validationFailed.error_message,
					duration: 2000,
					buttonText: 'Okay'
				});
				yield put(VisitsActions.doNothing());
				continue;
			}
		} catch (err) {
			console.log(err)
		}
		if(!addOrderLine.status){
			
		yield call(placeOrder, {requestdataPayload, type: currentVisit.type__c?currentVisit.type__c:""})
	}

		if(addOrderLine.status){
			let orderValue=orderLineOrderValue({ items:currentCart.items, value:addOrderLine.value})
			currentCart.items.map((obj=>{
				obj['order_pg_id__c']= addOrderLine.id
				//obj['totalTax__c']=  getTotalOrderValue()
			}))
			matchCode?
			yield put(RetailerActions.addOrderLine({token:currentUser.token, orderLine: currentCart.items , order_id:addOrderLine.id,total_tax:  taxperValue1/100*(addOrderLine.value+total_value),sgst_amount: taxperValue3/100*(addOrderLine.value+total_value), cgst_amount: taxperValue2/100*(addOrderLine.value+total_value), igst_amount:0, total_exmill:(Total_Exmil+addOrderLine.total_exmill), deliveryDate: addOrderLine.deliveryDate,remark:addOrderLine.remark})):yield put(RetailerActions.addOrderLine({token:currentUser.token, orderLine: currentCart.items , order_id:addOrderLine.id,total_tax:  taxperValue1/100*(addOrderLine.value+total_value),igst_amount: taxperValue1/100*(addOrderLine.value+total_value),sgst_amount: 0, cgst_amount:0 ,total_exmill:(Total_Exmil+addOrderLine.total_exmill), deliveryDate: addOrderLine.deliveryDate,remark:addOrderLine.remark}))
	}}	
}catch(error){
	console.log('Error', error)
	HelperService.showToast({
		message: 'Failed Order cannot be placed.',
		duration: 2000,
		buttonText: 'Okay'
	});
}	
		
}

export function* fetchVisitImage({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(VisitsActions.doNothing());
		return;
	}
	yield put(VisitsActions.fetchVisitImageLoading());
	try {
		let successData = yield call(visitsService.fetchVisitImage, payload);
		if (successData) {
			let data = successData;
			let imageUri = data[0].location__c;
			yield put(VisitsActions.fetchVisitImageSuccess(imageUri));
		} else {
			yield put(VisitsActions.fetchVisitImageFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.fetchVisitImageFailure());
	}
}

function getStateCodeMap(items) {
	// console.log("TAXCHECK===", items);
	// console.log("TAXCHECK====", items.list);
	// console.log("TAXCHECK=====RD", items.list.Retail_Distributor[items.parentId].state__c);
	// console.log("TAXCHECK=====RD1", items.list.Retail_Distributor[items.parentId]);
	// console.log("TAXCHECK=====RD1", items.list);
	// console.log("TAXCHECK======R", items.list.Retailer[items.accountId].state__c);
	let value = false;
	if(items.list.Retail_Distributor[items.parentId].state__c== items.list.Retailer[items.accountId].state__c)
	{
		value = true

	}
	return value;
}



function getTotalOrderValue(items) {
	let value = 0;
	items.item.map((obj) => {
		if(obj.additional_discount)
			//console.log(Number(obj.price))
			value += Number(obj.quantity__c)*(Number(obj.total_price__c))- (Number(obj.additional_discount))*Number(obj.quantity__c)
			else
			value +=Number(obj.quantity__c)*(Number(obj.total_price__c))
	})
	return value;
}

function getsapcodeaccounttype(items){

let code =''

if(items.data&&items.data.length)
{
	items.data.map((obj)=>{
		if(obj.sfid==items.id)
		{
			if(obj.account_type__c=='Depot')
			{
				code='ZOD'			}
		}
		else{
			code='ZOR'
		}
	})
	return code

}
}



function getTotalOrderValueWithOutDiscount(items) {
	let value = 0;
	items.map((obj) => {
	
			//console.log(Number(obj.price))
			value += Number(obj.quantity__c)*(Number(obj.total_price__c))
			
	})
	return value;
}





function orderLineOrderValue(items) {
	let value = items.value;
	items.items.map((obj) => {
		if(obj.additional_discount)
			//console.log(Number(obj.price))
			value += Number(obj.quantity__c)*(Number(obj.total_price__c))
			else
			value +=Number(obj.quantity__c)*(Number(obj.total_price__c))
			
	})
	return value;
}

function getBrandSfid(items) {
	let value = '';
	items.list.map((obj) => {
		if(obj.category_code__c==items.brand__c)
			//console.log(Number(obj.price))
			value= obj.sfid
	})
	return value;
}

function getProductFamilySfid(items) {
	let value = '';
	items.list.map((obj) => {
		if(obj.sfid==items.id)
			//console.log(Number(obj.price))
			value= obj.parent_category__c
	})
	return value;
}

function getTotalOrderQuantity(items) {
	let value = 0;
	items.map((obj) => {
	
			//console.log(Number(obj.price))
			value += Number(obj.quantity__c)
			
	})
	return value;
}

function getTotalDiscount(items) {
	let value = 0;
	items.map((obj) => {
	
			//console.log(Number(obj.price))
			if(obj.additional_discount){
			value += Number(obj.additional_discount)* Number(obj.quantity__c)}
			else
			{
				value=0
			}
			
	})
	return value;
}

function getTotalExmil(items) {
	let value = 0;
	items.map((obj) => {
	
			//console.log(Number(obj.price))
			value += Number(obj.exmill_price)
			
	})
	return value;
}



export function* watchCompetitorForm() {
	while (true) {
		const { payload } = yield take(VisitsTypes.SUBMIT_COMPETITOR_FORM);

		try {
			const validationFailed = yield call(ValidationService.validateCompetitor, payload.form);
			if (validationFailed) {
				HelperService.showToast({ 
					message: validationFailed.error_message, 
					duration: 2000, 
					buttonText: 'Okay' 
				});

				yield put(VisitsActions.CompetitorFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
			console.log(err)
		}

		
	
		var formPayload  = _.cloneDeep(payload);
		
		formPayload.form.map((obj, index) => {
		
			
			
			obj = HelperService.removeField(obj, 'id')
		});

		yield call(submitCompetitorForm, formPayload)
	}
}

export function* submitCompetitorForm(payload) {
	yield put(VisitsActions.submitCompetitorFormLoading());
	try {
		let offlinActionData = {
			apiCall: (visitsService.submitCompetitorForm),
			resource: 'submitCompetitorForm', 
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.submitCompetitorFormSuccess),
			failureCallback: (VisitsActions.submitCompetitorFormFailure),
			replaceServerParams: false
		};


		const successData = yield call(offlineApiCall, offlinActionData);

		let user = yield select(state => state.user);
		 

		if (successData) { 
			yield put(VisitsActions.submitCompetitorFormSuccess(payload));
			yield put(VisitsActions.getCompetitor({token: user.token, show: false}));
			NavigationService.navigate('StartVisitForm');
			
			HelperService.showToast({ 
				message: 'Competitors submitted successfully.', 
				duration: 1000, 
				buttonText: '' 
			});
		} else {
			yield put(VisitsActions.submitCompetitorFormFailure())
			HelperService.showToast({ 
				message: 'Cannot submit Competitor. Try after some time', 
				duration: 2000, 
				buttonText: 'Okay' 
			});
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.submitCompetitorFormFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}

export function* watchStockForm() {
	while (true) {
		const { payload } = yield take(VisitsTypes.SUBMIT_STOCK_FORM);

		try {
			const validationFailed = yield call(ValidationService.validateStock, payload.form);
			if (validationFailed) {
				HelperService.showToast({ 
					message: validationFailed.error_message, 
					duration: 2000, 
					buttonText: 'Okay' 
				});

				yield put(VisitsActions.StockFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
			console.log(err)
		}

		
	
		var formPayload  = _.cloneDeep(payload);
		
		formPayload.form.map((obj, index) => {
		
			
			
			obj = HelperService.removeField(obj, 'id')
		});

		yield call(submitStockForm, formPayload)
	}
}

export function* watchUpdateStockForm() {
	while (true) {
		const { payload } = yield take(VisitsTypes.SUBMIT_UPDATE_STOCK_FORM);

		
			//try {
		//	const validationFailed = yield call(ValidationService.validateStock, payload.form);
			//if (validationFailed) {
			//	HelperService.showToast({ 
				//	message: validationFailed.error_message, 
				//	duration: 2000, 
				//	buttonText: 'Okay' 
			//	});

				//yield put(VisitsActions.StockFormValidationFailed(validationFailed));
			//	continue;
		//	}
	//	} catch (err) {
			//console.log(err)
	//	} 
	
	

		
	
		yield call(submitUpdateStockForm, payload)
	}
}

export function* watchUpdateCompetitorForm() {
	while (true) {
		//console.log('im here')
		const { payload } = yield take(VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM);

		
			//try {
		//	const validationFailed = yield call(ValidationService.validateStock, payload.form);
			//if (validationFailed) {
			//	HelperService.showToast({ 
				//	message: validationFailed.error_message, 
				//	duration: 2000, 
				//	buttonText: 'Okay' 
			//	});

				//yield put(VisitsActions.StockFormValidationFailed(validationFailed));
			//	continue;
		//	}
	//	} catch (err) {
			//console.log(err)
	//	} 
	
	

		
	
		yield call(submitUpdateCompetitorForm, payload)
	}
}

export function* submitStockForm(payload) {
	yield put(VisitsActions.submitStockFormLoading());
	try {
		let offlinActionData = {
			apiCall: (visitsService.submitStockForm),
			resource: 'submitStockForm', 
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.submitStockFormSuccess),
			failureCallback: (VisitsActions.submitStockFormFailure),
			replaceServerParams: false
		};
		let user = yield select(state => state.user);
		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { 
			yield put(VisitsActions.submitStockFormSuccess(payload));
			yield put(VisitsActions.getStock({token: user.token, show: false}));
			NavigationService.navigate('StartVisitForm');
			HelperService.showToast({ 
				message: 'Stock submitted successfully.', 
				duration: 1000, 
				buttonText: '' 
			});
		} else {
			yield put(VisitsActions.submitStockFormFailure())
			HelperService.showToast({ 
				message: 'Cannot submit Stock. Try after some time', 
				duration: 2000, 
				buttonText: 'Okay' 
			});
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.submitStockFormFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}

export function* submitUpdateStockForm(payload) {
	yield put(VisitsActions.submitUpdateStockFormLoading(payload));
	try {
		let offlinActionData = {
			apiCall: (visitsService.submitUpdateStockForm),
			resource: 'submitStockForm', 
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.submitUpdateStockFormSuccess),
			failureCallback: (VisitsActions.submitUpdateStockFormFailure),
			replaceServerParams: false
		};
		let user = yield select(state => state.user);
		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { 
			yield put(VisitsActions.submitUpdateStockFormSuccess(payload));
			yield put(VisitsActions.getStock({token: user.token, show: false}));
			yield put( VisitsActions.changeAddPlannedVisitsSearchFilters({edited_field: 'StockEdit', edited_value: ''}))
			NavigationService.navigate('StartVisitForm');
			HelperService.showToast({ 
				message: 'Stock Editted successfully.', 
				duration: 1000, 
				buttonText: '' 
			});
		} else {
			yield put(VisitsActions.submitUpdateStockFormFailure())
			HelperService.showToast({ 
				message: 'Cannot submit Stock. Try after some time', 
				duration: 2000, 
				buttonText: 'Okay' 
			});
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.submitUpdateStockFormFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}

export function* submitUpdateCompetitorForm(payload) {
	yield put(VisitsActions.submitUpdateCompetitorFormLoading(payload));
	try {
		let offlinActionData = {
			apiCall: (visitsService.submitUpdateCompetitorForm),
			resource: 'submitUpdateCompetitorForm', 
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (VisitsActions.submitUpdateCompetitorFormSuccess),
			failureCallback: (VisitsActions.submitUpdateCompetitorFormFailure),
			replaceServerParams: false
		};
		let user = yield select(state => state.user);
		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { 
			yield put(VisitsActions.submitUpdateCompetitorFormSuccess(payload));
			yield put(VisitsActions.getCompetitor({token: user.token, show: false}));
			yield put( VisitsActions.changeAddPlannedVisitsSearchFilters({edited_field: 'CompEdit', edited_value: ''}))
			NavigationService.navigate('StartVisitForm');
			HelperService.showToast({ 
				message: 'Competitor Editted successfully.', 
				duration: 1000, 
				buttonText: '' 
			});
		} else {
			yield put(VisitsActions.submitUpdateStockFormFailure())
			HelperService.showToast({ 
				message: 'Cannot submit Competitor. Try after some time', 
				duration: 2000, 
				buttonText: 'Okay' 
			});
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.submitUpdateCompetitorFormFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}

export function* getCompetitor({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(VisitsActions.doNothing());
		return;
	}
	yield put(VisitsActions.getCompetitorLoading());
	try {
		let executeVisitData = yield select(state => state.visits.executeVisitData);
		if(!payload.show){
		payload.visit_id = executeVisitData.sfid||executeVisitData.pg_id__c}
		
		let successData = yield call(visitsService.getCompetitor, payload);
		if (successData) {
			//successData = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'sfid', label_key: 'name' });
			yield put(VisitsActions.getCompetitorSuccess(successData));
		} else {
			yield put(VisitsActions.getCompetitorFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.getCompetitorFailure());
	}
}


export function* getStock({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(VisitsActions.doNothing());
		return;
	}
	yield put(VisitsActions.getStockLoading());
	try {
		let executeVisitData = yield select(state => state.visits.executeVisitData);
		
		if(!payload.show){
			payload.visit_id = executeVisitData.sfid||executeVisitData.pg_id__c}
			
		
		let successData = yield call(visitsService.getStock, payload);
		if (successData) {
			//successData = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'sfid', label_key: 'name' });
			yield put(VisitsActions.getStockSuccess(successData));
			//yield put(VisitsActions.addStockForm({successData}))
		} else {
			yield put(VisitsActions.getStockFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.getStockFailure());
	}
}


export function* getParentAreas({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(VisitsActions.doNothing());
		return;
	}
	yield put(VisitsActions.getParentAreasLoading());
	try {
		let executeVisitData = yield select(state => state.visits.executeVisitData);
		let selectedRetailer = yield select(state =>  state.retailers.selectedRetailer);
		
		
			payload.sfid = executeVisitData.area__c||selectedRetailer.data.area__c
			
		
		let successData = yield call(visitsService.getParentAreas, payload);
		if (successData) {
			//successData = HelperService.convertToSearchableListFormat({ list: successData, id_key: 'sfid', label_key: 'name' });
			yield put(VisitsActions.getParentAreasSuccess(successData));
			//yield put(VisitsActions.addStockForm({successData}))
		} else {
			yield put(VisitsActions.getParentAreasFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.getParentAreasFailure());
	}
}

export function* addBulkVisitsToPlan({payload}) {
	const {
		selectedPlannedVisits,
		selectedVisitDate,
		filterList,
		retailerSearchFilters,
		user_details,
		selectedVisitPSM,
		agentid,
		pjp,
		pjpBeat
	
	} = payload;

	let visitsToBeAdded = [];
	//console.log(partiesMapping[retailerSearchFilters['type']])

	filterList.map((obj) => {
	      	if (!isRetailerAdded({selectedPlannedVisits, selectedVisitDate, retailerSearchFilters,item: obj})) {
	      		visitsToBeAdded.push(HelperService.decorateWithLocalId({
					"customer_name__c": obj.sfid,
					//  "visit_type": "Planned",
					  "visit_date__c": selectedVisitDate,
				   //   "createddate": HelperService.getCurrentTimestamp(),
					  "assigned_by__c":(selectedVisitPSM==agentid) ? 'Self' :'Manager',
					  "type__c": obj.account_type__c,
					  "name": obj.name,
					  "area__c": obj.area__c,
					  "flsp__c" :selectedVisitPSM ? selectedVisitPSM :agentid,
					  "manager__c": user_details.manager__c,
					  "team_manager__c":selectedVisitPSM&&selectedVisitPSM!=agentid? agentid: user_details.team_manager__c,
					  "pjp_header__c": retailerSearchFilters['type']=='Retailer'? 	pjpBeat: pjp,	
					  "visit_type__c":"Planned"
	      		}))
	      	}
      	});
    

    
    

    let updatedSelectedPlannedVisit = _.cloneDeep(selectedPlannedVisits);
    updatedSelectedPlannedVisit = updatedSelectedPlannedVisit.concat(visitsToBeAdded);
    yield put(VisitsActions.addBulkVisitsToPlanSuccess(updatedSelectedPlannedVisit));
}

export function* removeBulkVisitsToPlan({payload}) {
	const {
		selectedPlannedVisits,
		selectedVisitDate,
		filterList,
		retailerSearchFilters,
		user_details,
		selectedVisitPSM,
		agentid,
		pjp,
	
	} = payload;

	let visitsToBeRemoved = [];
	let updatedSelectedPlannedVisit = _.cloneDeep(selectedPlannedVisits);

	
	filterList.map((party) => {
			_.map(selectedPlannedVisits, (obj) => {
		        if (obj.customer_name__c == party.sfid&& HelperService.datesAreOnSameDay(obj.visit_date__c, selectedVisitDate)) {
		          visitsToBeRemoved.push(obj.local_id)
		        }
      		});
		});
   
   
   	updatedSelectedPlannedVisit = updatedSelectedPlannedVisit.filter((obj) => visitsToBeRemoved.indexOf(obj.local_id) == -1);

   	yield put(VisitsActions.removeBulkVisitsToPlanSuccess(updatedSelectedPlannedVisit));
}


function isRetailerAdded(payload) {
    const {
      selectedPlannedVisits,
      selectedVisitDate,
	  retailerSearchFilters,
      item
    } = payload;

    let isAdded = false;
	_.map(selectedPlannedVisits, (obj) => {
		if (obj.customer_name__c == item.sfid && HelperService.datesAreOnSameDay(obj.visit_date__c, selectedVisitDate)) {
		  isAdded = true
		}
	  });
  
	  return isAdded;
   
}

export function* fetchHistory({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(VisitsActions.doNothing());
		return;
	}
	yield put(VisitsActions.fetchHistoryLoading());
	// console.log('visitsaga1')
	try {
		let successData = yield call(visitsService.getVisitHistory, payload);
		if (successData) {
			
			yield put(VisitsActions .fetchHistorySuccess(successData));
		} else {
			// console('fail')
			yield put(VisitsActions.fetchHistoryFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(VisitsActions.fetchHistoryFailure());
	}
}
 


