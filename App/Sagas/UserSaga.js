import _ from 'lodash'
import moment from 'moment'
import { call, put, select, take } from 'redux-saga/effects'
import { userService } from '../Services/Api/UserService'
import NavigationService from '../Services/NavigationService'
import { HelperService } from '../Services/Utils/HelperService'
import { ValidationService } from '../Services/ValidationService'
import { getConnectionStatus } from '../Stores/Common/Selectors'
import StartupActions from '../Stores/Startup/Actions'
import UserActions, { UserTypes } from '../Stores/User/Actions'
import { offlineApiCall } from './OfflineSaga'

var deviceId = HelperService.getDeviceId();

export function* loginUser(data) {
	yield put(UserActions.userLoginLoading());
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(UserActions.userLoginFailure());
		HelperService.showToast({ message: 'Cannot Login. No Internet connection.', duration: 2000, buttonText: 'Okay' });
		return;
	}

	

	try {
		const userData = yield call(userService.loginUser, data)
		
		if (userData) {
			yield put(UserActions.userLoginSuccess(userData));
			//if(!data.show){
			HelperService.showToast({ message: 'Logged in successfully!!', duration: 1000, buttonText: '' });
			yield put(StartupActions.startup())
			//}
			
			//if(data.show){
			//HelperService.showToast({ message: 'Enter OTP to Logged in successfully', duration: 1000, buttonText: '' });
			//NavigationService.navigate('LoginOtpScreen')}
			// NavigationService.navigateAndReset('DashboardScreen');
			// yield put(UserActions.fetchAllAreas({token: userData.token, agentid: userData.id}));//fetch all areas
			// yield put(UserActions.fetchAgentDetails({token: userData.token, agentid: userData.id}));// //fetch agent details
			
		} else {
			yield put(UserActions.userLoginFailure())
			HelperService.showToast({ message: 'Cannot Login. Invalid Number or Password', duration: 2000, buttonText: 'Okay' });
		}
	} catch (error) {
		yield put(UserActions.userLoginFailure())
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}

export function* startDay(data) {
	yield put(UserActions.userStartDayLoading());
	try {
		let offlinActionData = {
			apiCall: (userService.startDay),
			resource: 'startDay', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(data),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (UserActions.userStartDaySuccess),
			failureCallback: (UserActions.userStartDayFailure),
			replaceServerParams: false
		};

		const userData = yield call(offlineApiCall, offlinActionData);

		if (userData) {
			yield put(UserActions.userStartDaySuccess(data));
			let message = 'Marked Present Successfully';
			switch(data.present_type) {
				case 'In Office':
					message = 'Marked In Office Successfully';
					break;
				case 'Work From Home':
					message = 'Marked Work From Home Successfully';
					break;
				case 'Market Visit':
					message = 'Marked Present Successfully';
					break;
				default: 
					message = 'Marked Present Successfully';
			}

			HelperService.showToast({ message: message, duration: 1000, buttonText: '' });
			NavigationService.navigateAndReset('VisitsScreen');
		} else {
			yield put(UserActions.userStartDayFailure())
			HelperService.showToast({ message: 'Cannot Repeat action, Marked Present Already.', duration: 2000, buttonText: 'Okay' , style: {
				backgroundColor: "green",zIndex: 5
			   }});

		}
	} catch (error) {
		yield put(UserActions.userStartDayFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}

export function* endDay({ user }) {
	yield put(UserActions.userEndDayLoading());
	try {
		let offlinActionData = {
			apiCall: (userService.endDay),
			resource: 'endDay', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(user),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (UserActions.userEndDaySuccess),
			failureCallback: (UserActions.userEndDayFailure),
			replaceServerParams: false
		};

		const userData = yield call(offlineApiCall, offlinActionData);


		if (userData) {
			yield put(UserActions.userEndDaySuccess(user));
			HelperService.showToast({ message: 'Day Ended Successfully.', duration: 1000, buttonText: '' });
			NavigationService.navigateAndReset('CompletedDayScreen');
			setTimeout(() => {
				NavigationService.navigateAndReset('DashboardScreen')
			}, 2000);
		} else {
			yield put(UserActions.userEndDayFailure())
			HelperService.showToast({ message: 'Error Occurred , Try Again', duration: 2000, buttonText: 'Okay' });
		}
	} catch (error) {
		yield put(UserActions.userEndDayFailure())
		HelperService.showToast({ message: 'Error Occurred , Try Again', duration: 2000, buttonText: 'Okay' });
	}
}

export function* markAbsent({ user }) {
	yield put(UserActions.userMarkedAbsentLoading());
	try {
		let offlinActionData = {
			apiCall: (userService.markUserAbsent),
			resource: 'markAbsent', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(user),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (UserActions.userMarkedAbsentSuccess),
			failureCallback: (UserActions.userMarkedAbsentFailure),
			replaceServerParams: false
		};

		const userData = yield call(offlineApiCall, offlinActionData);
		if (userData) { //Todo : change it to user
			yield put(UserActions.userMarkedAbsentSuccess(user));
			HelperService.showToast({ message: 'Absent Marked successfully.', duration: 1000, buttonText: '' });
			NavigationService.navigateAndReset('DashboardScreen');
		} else {
			yield put(UserActions.userMarkedAbsentFailure());
			HelperService.showToast({ message: 'Cannot Repeat action, Absent Already Marked.', duration: 2000, buttonText: 'Okay' });
		}
	} catch (error) {
		yield put(UserActions.userMarkedAbsentFailure());
		HelperService.showToast({ message: 'Cannot Repeat action, Absent Already Marked.', duration: 2000, buttonText: 'Okay' });
	}
}

export function* fetchAgentAreas( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(UserActions.doNothing());
		return;
	}

	yield put(UserActions.fetchAllAreasLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(userService.getAgentAreas, payload);
		if (data) {

		let	data2  = HelperService.sortListFilter(data.city, 'area_name__c' , 'ASC');
			data2 = HelperService.convertToSearchableListFormat({ list: data.city, id_key: 'sfid' , label_key: 'area_name__c' });
		let	data1= HelperService.sortListFilter(data.area, 'area_name__c' , 'ASC');
			data1= HelperService.convertToSearchableListFormat({ list: data.area, id_key: 'sfid' , label_key: 'area_name__c' });
			yield put(UserActions.fetchAllAreasSuccess({data1, data2}));
		} else {
			yield put(UserActions.fetchAllAreasFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(UserActions.fetchAllAreasFailure());
	}
}

export function* logoutUser(data) {
	yield put(UserActions.userLogoutLoading());
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(UserActions.userLogoutFailure());
		HelperService.showToast({ message: 'Cannot Logout. No Internet connection.', duration: 2000, buttonText: 'Okay' });
		return;
	}
		try {
			let user = yield select(state => state.user)
			let sfid =user.id
			data.id = sfid

			let userData = yield call(userService.logoutUser, data)
			if (userData) {
			
			yield put(UserActions.userLogoutSuccess(userData.data));
				HelperService.showToast({ message: 'Logged Out successfully!!', duration: 500, buttonText: '' });
				NavigationService.navigateAndReset('LoginScreen');
			}else {
				yield put(UserActions.userLogoutFailure())
				HelperService.showToast({ message: 'Cannot Logout. ' , duration: 2000, buttonText: 'Okay' });
			}	
				
			} catch (error) {
			
				yield put(UserActions.userLogoutFailure())
			HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
		}
	
	}

export function* fetchAgentDetails({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(UserActions.doNothing());
		return;
	}

	try {

		let data = yield call(userService.getAgentDetails, payload);
		if (data) {
			yield put(UserActions.fetchAgentDetailsSuccess(data));
		} else {
			yield put(UserActions.fetchAgentDetailsFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(UserActions.fetchAgentDetailsFailure());
	}
}

export function* checkAttendance({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(UserActions.doNothing());
		return;
	}
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id

		let data = yield call(userService.checkAttendance, payload);
		if (data && !_.isEmpty(data)) {
			// absent_reason__c: null
			// attendance_date__c: 1591401600000
			// checkin_address: "Unnamed Road, SST Nagar, Patiala, Punjab 147001, India"
			// checkin_address__c: "Unnamed Road, SST Nagar, Patiala, Punjab 147001, India"
			// checkin_location__latitude__s: 30.3354539
			// checkin_location__longitude__s: 76.4217514
			// checkout_address: "N/A"
			// checkout_address__c: null
			// checkout_location__latitude__s: null
			// checkout_location__longitude__s: null
			// createddate: 1591473153000
			// end_day__c: false
			// end_time__c: null
			// name: null
			// pg_id__c: "b8da89d1-b7ad-4ae2-996f-b26a1e850ec4"
			// sfid: null
			// start_day__c: true
			// start_time__c: "19:52:33"
			// team__c: "a0m2y000000PJviAAG"
			// type__c: "Present"
			yield call(updateAttendance, data);
		} else {
			yield put(UserActions.checkAttendanceFailure());
		}
	} catch (error) {
		console.log('checkAttendance Error', error)
		yield put(UserActions.checkAttendanceFailure());
	}
}

export function* fetchAllPsm( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(UserActions.doNothing());
		return;
	}

	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id


		let data = yield call(userService.getAllPSM, payload);
		if (data) {
			data =HelperService.sortListFilter(data, 'team_member_name__c' , 'ASC');
			yield put(UserActions.fetchAllPsmSuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'team_member_name__c' })));
			
		} else {
			yield put(UserActions.fetchAllPsmFailure());
		}
	} catch (error) {
		console.log('error', error)
		yield put(UserActions.fetchAllPsmFailure());
	}
}


export function* updateAttendance(payload) {
	
	try {
		let currentDate = HelperService.getCurrentTimestamp(); 
		let absentDayTime = payload.type== 'Absent' ? currentDate : null;
		let startDayTime = null;
		let endDayTime = null;

		if (payload.dayStarted&&!payload.dayEnded) {
			startDayTime = moment.unix(currentDate/1000).format("YYYY-MM-DD");
			startDayTime = startDayTime + ' ' + payload.start_time_c__c;
			startDayTime = HelperService.convertStringToDate(startDayTime);
		}

		if (payload.dayStarted&&payload.dayEnded) {
			endDayTime = moment.unix(currentDate/1000).format("YYYY-MM-DD");
			endDayTime = endDayTime + ' ' + payload.end_time_c__c;
			endDayTime = HelperService.convertStringToDate(endDayTime);
		}

		yield put(UserActions.updateAgentAttendanceDetails({
			absentDayTime,
			startDayTime,
			endDayTime
		}));
	}catch(error){
		console.log('updateAttendance: ', error)
	}
}


export function* watchUserLoginRequest() {
	while (true) {
		const { data } = yield take(UserTypes.LOGIN_USER)

		try {
			const validationFailed = yield call(ValidationService.validateLoginForm, data);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(UserActions.userLoginValidationFailed(validationFailed));
				continue;
			}
		} catch (err) { }

		yield call(loginUser, data)
	}
}


export function* watchUserStartDayRequest() {
	while (true) {
		const { user } = yield take(UserTypes.START_USER_DAY)
		try {
			const validationFailed = yield call(ValidationService.validateStartDay, user);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(UserActions.userStartDayValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
			console.log(err)
		}
		yield call(startDay, user)
	}
}

export function* watchUserLogoutRequest() {
	while (true) {
		const { data } = yield take(UserTypes.LOGOUT_USER)

		yield call(logoutUser, data)
	}
}


export function* getTaxDetails({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(UserActions.doNothing());
		return;
	}

	try {
		yield put(UserActions.getTaxDetailsLoading());
		
		let successData = yield call(userService.getTaxDetails, payload);
		if (successData) {
			yield put(UserActions.getTaxDetailsSuccess(successData));
			
		} else {
			yield put(UserActions.getTaxDetailsFailure());
		}
	} catch (error) {
		yield put(UserActions.getTaxDetailsFailure());
	}
}


