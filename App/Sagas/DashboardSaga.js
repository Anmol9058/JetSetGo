import { call, put, select } from 'redux-saga/effects';
import { dashboardService } from '../Services/Api/DashboardService';
import { HelperService } from '../Services/Utils/HelperService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import DashboardActions from '../Stores/Dashboard/Actions';

// getOrderValue
// getVisitCount
// getSiteCount
// getCounters
// getEventCount


export function* getOrderValue({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(DashboardActions.doNothing());
		return;
	}

	yield put(DashboardActions.getOrderValueLoading());

	try {
		let successData = yield call(dashboardService.getOrderValue, payload);
		if (successData) {
			yield put(DashboardActions.getOrderValueSuccess(successData));
		} else {
			yield put(DashboardActions.getOrderValueFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(DashboardActions.getOrderValueFailure());
	}
}


export function* getVisitCount({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(DashboardActions.doNothing());
		return;
	}

	yield put(DashboardActions.getVisitCountLoading());

	try {
		let successData = yield call(dashboardService.getVisitCount, payload);
		if (successData) {
			yield put(DashboardActions.getVisitCountSuccess(successData));
		} else {
			yield put(DashboardActions.getVisitCountFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(DashboardActions.getVisitCountFailure());
	}
}


export function* getSiteCount({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(DashboardActions.doNothing());
		return;
	}

	yield put(DashboardActions.getSiteCountLoading());

	try {
		let successData = yield call(dashboardService.getSiteCount, payload);
		if (successData) {
			yield put(DashboardActions.getSiteCountSuccess(successData));
		} else {
			yield put(DashboardActions.getSiteCountFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(DashboardActions.getSiteCountFailure());
	}
}


export function* getCounters({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(DashboardActions.doNothing());
		return;
	}

	yield put(DashboardActions.getCountersLoading());

	try {
		let successData = yield call(dashboardService.getCounters, payload);
		if (successData) {
			yield put(DashboardActions.getCountersSuccess(successData));
		} else {
			yield put(DashboardActions.getCountersFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(DashboardActions.getCountersFailure());
	}
}


export function* getEventCount({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(DashboardActions.doNothing());
		return;
	}

	yield put(DashboardActions.getEventCountLoading());

	try {
			let{token}=yield select(state=>state.user)

			payload.token=token


		let successData = yield call(dashboardService.getEventCount, payload);
		if (successData) {
			yield put(DashboardActions.getEventCountSuccess(successData));
		} else {
			yield put(DashboardActions.getEventCountFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(DashboardActions.getEventCountFailure());
	}
}

export function* getDashboardSummary({ payload }) {
	const isOnline = yield select(getConnectionStatus)
	if (!isOnline) {
	  yield put(DashboardActions.doNothing())
	  return
	}
  
	yield put(DashboardActions.getDashboardSummaryLoading())
  
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
	  let successData = yield call(dashboardService.getDashboardSummary, payload)
	  if (successData) {
		yield put(DashboardActions.getDashboardSummarySuccess(successData))
	  } else {
		yield put(DashboardActions.getDashboardSummaryFailure())
	  }
	} catch (error) {
	  console.log('Error', error)
	  yield put(DashboardActions.getDashboardSummaryFailure())
	}
  }



  
export function* getTargetTeam({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(DashboardActions.doNothing());
		return;
	}

	yield put(DashboardActions.getTargetTeamLoading());

	try {
		let {token} = yield select(state => state.user)
		//payload.team_id__c  = user.user_details.sfid
		//payload.dealer__c=user.user_details.sfid
		//payload.year__c='2021'
		payload.token=token

		let successData = yield call(dashboardService.getTargetTeam, payload);
		if (successData) {
			successData=HelperService.getCombineData(successData);
			yield put(DashboardActions.getTargetTeamSuccess(successData));
		} else {
			yield put(DashboardActions.getTargetTeamFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(DashboardActions.getTargetTeamFailure());
	}
}
