import { call, put, select } from 'redux-saga/effects';
import { ordersService } from '../Services/Api/OrdersService';
import NavigationService from '../Services/NavigationService';
import { HelperService } from '../Services/Utils/HelperService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import OrdersActions from '../Stores/Orders/Actions';

//fetchOrderDetails
//fetchAllOrders


export function* fetchOrderDetails({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(OrdersActions.doNothing());
		return;
	}

	yield put(OrdersActions.fetchOrderDetailsLoading());
	try {
		let successData = yield call(ordersService.fetchOrderDetails, payload);
		if (successData) {
			yield put(OrdersActions.fetchOrderDetailsSuccess({ id: payload.order_id, data: successData }));
		} else {
			console.log("ERROR",error);
			yield put(OrdersActions.fetchOrderDetailsFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(OrdersActions.fetchOrderDetailsFailure());
	}
}

export function* fetchDealerOrderDetails({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(OrdersActions.doNothing());
		return;
	}

	yield put(OrdersActions.fetchOrderDetailsLoading());

	try {
		let successData = yield call(ordersService.fetchDealerOrderDetails, payload);
		if (successData) {
			yield put(OrdersActions.fetchOrderDetailsSuccess({ id: payload.order_id, data: successData }));
		} else {
			yield put(OrdersActions.fetchOrderDetailsFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(OrdersActions.fetchOrderDetailsFailure());
	}
}


export function* fetchAllOrders({ payload }) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(OrdersActions.doNothing());
		return;
	}

	yield put(OrdersActions.fetchAllOrdersLoading());

	try {
		let successData = yield call(ordersService.fetchAllOrders, payload);
		if (successData) {
			yield put(OrdersActions.fetchAllOrdersSuccess(successData));
		} else {
			yield put(OrdersActions.fetchAllOrdersFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(OrdersActions.fetchAllOrdersFailure());
	}
}


export function* repeatOrder({payload}) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(OrdersActions.doNothing());
		return;
	}

	yield put(OrdersActions.repeatOrderLoading(payload.order__c));

	try {
		let successData = yield call(ordersService.repeatOrder, payload);
		if (successData) {
			yield put(OrdersActions.repeatOrderSuccess(successData));
			HelperService.showToast({ message: 'Order created Successfully.', duration: 1000, buttonText: '' });
			NavigationService.navigate('ReOrderInfoScreen', { id: payload.data.pg_id__c, data: payload.data });
		} else {
			yield put(OrdersActions.repeatOrderFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(OrdersActions.repeatOrderFailure());
	}
}


