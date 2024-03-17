import { call, put, select } from 'redux-saga/effects';
import { ExpensesService } from '../Services/Api/ExpensesServices';
import { HelperService } from '../Services/Utils/HelperService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import ExpensesActions from '../Stores/Expenses/Actions';

export function* getMyExpenses({ payload }) {
	//console.log(payload,"SAGA PAYLOAD EXPENSE")
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ExpensesActions.doNothing());
		return;
	}
	yield put(ExpensesActions.getMyExpensesLoading());
	try {
		let successData = yield call(ExpensesService.getMyExpenses, payload);
		
		if (successData) {

			yield put(ExpensesActions.getMyExpensesSuccess(successData));

		} else {
			
			yield put(ExpensesActions.getMyExpensesFailure());
			
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ExpensesActions.getMyExpensesFailure());
	}
}

export function* getMyExpenseLines({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ExpensesActions.doNothing());
		return;
	}
	yield put(ExpensesActions.getMyExpenseLinesLoading());
	try {
		let successData = yield call(ExpensesService.getMyExpenseLines, payload);
		
		if (successData) {

			yield put(ExpensesActions.getMyExpenseLinesSuccess(successData));

		} else {
			
			yield put(ExpensesActions.getMyExpenseLinesFailure());
			
		}
	} catch (error) {
		console.log('Error', error)
		yield put(ExpensesActions.getMyExpenseLinesFailure());
	}
}

export function* updateTravelExpense(payload) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(ExpensesActions.doNothing());
		return;
	}
	yield put(ExpensesActions.updateTravelExpenseLoading());
	try {
		let month=yield select(state=>state.expenses.monthNumber)
		let successData = yield call(ExpensesService.updateTravelExpense,payload);
		console.log(payload,"PAYLOAD UPDATE SAGA");
		if (successData) {
			yield put(ExpensesActions.updateTravelExpenseSuccess(successData));
			HelperService.showToast({ message:successData.message, duration: 2000, buttonText: '' });
			//NavigationService.navigate('MyExpenseDateWise');
			yield put(ExpensesActions.getMyExpenses({token:payload.payload.token,month:month}))
		} else {
			console.log("SUCCESS DATA ELSE",error);
			yield put(ExpensesActions.updateTravelExpenseFailure());
		}
	} catch (error) {
		console.log('FAILURE ERROR', error);
		yield put(ExpensesActions.updateTravelExpenseFailure());
	}
}
