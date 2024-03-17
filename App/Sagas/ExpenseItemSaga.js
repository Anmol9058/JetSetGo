import { call, put, select } from 'redux-saga/effects';
import { ExpenseItemService } from '../Services/Api/ExpenseItemService';
import NavigationService from '../Services/NavigationService';
import { HelperService } from '../Services/Utils/HelperService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import ExpenseActions from '../Stores/ExpenseItem/Actions';

export function* moveLocalToOutstationExpense({ payload }) {
    console.log(payload, "LOCAL INFOS");
    try {
        const successData = yield call(ExpenseItemService.moveLocalToOutstationExpense, payload);
        if (successData) {
            HelperService.showToast({ message: 'Expense moved Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReplace('ExpenseItemTabScreen');
        } else {
            HelperService.showToast({ message: 'Expense cannot moved! Try Again', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* moveOutstationToLocalExpense({ payload }) {
    try {
        const successData = yield call(ExpenseItemService.moveOutstationToLocalExpense, payload);
        if (successData) {
            if (successData !== 401) {
                HelperService.showToast({ message: 'Expense moved Successfully', duration: 1000, buttonText: '' });
                NavigationService.navigateAndReplace('ExpenseItemTabScreen', { data: 1 });
            } //Todo : change it to userData
            else {
                HelperService.showToast({ message: 'Expense cannot be moved as local expense is not found', duration: 2000, buttonText: 'Okay' });
            }

        } else {
            HelperService.showToast({ message: 'Expense cannot moved successfully', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* fetchLocalItem({ payload }) {

    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(ExpenseActions.doNothing());
        return;
    }
    yield put(ExpenseActions.fetchLocalItemLoading());
    try {
        let successData = yield call(ExpenseItemService.fetchLocalItem, payload);
        if (successData) {
            yield put(ExpenseActions.fetchLocalItemSuccess(successData));
        } else {
            yield put(ExpenseActions.fetchLocalItemFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(ExpenseActions.fetchLocalItemFailure());
    }
}


export function* fetchOutstationItem({ payload }) {

    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(ExpenseActions.doNothing());
        return;
    }
    yield put(ExpenseActions.fetchOutstationItemLoading());
    try {
        let successData = yield call(ExpenseItemService.fetchOutstationItem, payload);
        if (successData) {
            yield put(ExpenseActions.fetchOutstationItemSuccess(successData));
        } else {
            yield put(ExpenseActions.fetchOutstationItemFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(ExpenseActions.fetchOutstationItemFailure());
    }
}




