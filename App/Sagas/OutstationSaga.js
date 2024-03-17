import { call, put, select, take } from 'redux-saga/effects';
import { OutstationService } from '../Services/Api/OutstationService';
import NavigationService from '../Services/NavigationService';
import { HelperService } from '../Services/Utils/HelperService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import OutstationAction, { OutstationTypes } from '../Stores/OutstationExpense/Actions';


export function* watchSendForApprovalOutstationExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.SEND_APPROVAL_OUTSTATION_EXPENSE);
        yield call(sendForApprovalOutstationExpense, payload)
    }
}

export function* watchApproveRejectOutstationRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.APPROVE_REJECT_OUTSTATION_EXPENSE);
        yield call(approveRejectOutstationExpense, payload);
    }
}

export function* watchUpdateTravelExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.UPDATE_TRAVEL_EXPENSE);
        try {
            // const validationFailed = yield call(ValidationService.validateOutstationExpenseForm, payload);
            // if (validationFailed) {
            //     HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
            //     yield put(OutstationAction.outstationFormValidationFailed(validationFailed));
            //     continue;
            // }
        } catch (err) {
            console.log(err)
        }
        yield call(updateTravelExpense, payload)
    }
}

export function* watchUpdateConvenienceExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.UPDATE_CONVENIENCE_EXPENSE);
        try {
            // const validationFailed = yield call(ValidationService.validateOutstationExpenseForm, payload);
            // if (validationFailed) {
            //     HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
            //     yield put(OutstationAction.outstationFormValidationFailed(validationFailed));
            //     continue;
            // }
        } catch (err) {
            console.log(err)
        }
        yield call(updateConvenienceExpense, payload)
    }
}

export function* watchUpdateHotelExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.UPDATE_HOTEL_EXPENSE);
        try {
            // const validationFailed = yield call(ValidationService.validateOutstationExpenseForm, payload);
            // if (validationFailed) {
            //     HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
            //     yield put(OutstationAction.outstationFormValidationFailed(validationFailed));
            //     continue;
            // }
        } catch (err) {
            console.log(err)
        }
        yield call(updateHotelExpense, payload)
    }
}

export function* watchUpdateFoodExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.UPDATE_FOOD_EXPENSE);
        try {
            // const validationFailed = yield call(ValidationService.validateOutstationExpenseForm, payload);
            // if (validationFailed) {
            //     HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
            //     yield put(OutstationAction.outstationFormValidationFailed(validationFailed));
            //     continue;
            // }
        } catch (err) {
            console.log(err)
        }
        yield call(updateFoodExpense, payload)
    }
}

export function* watchUpdateIncidentalExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.UPDATE_INCIDENTAL_EXPENSE);
        try {
            // const validationFailed = yield call(ValidationService.validateOutstationExpenseForm, payload);
            // if (validationFailed) {
            //     HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
            //     yield put(OutstationAction.outstationFormValidationFailed(validationFailed));
            //     continue;
            // }
        } catch (err) {
            console.log(err)
        }
        yield call(updateIncidentalExpense, payload)
    }
}

export function* watchUpdateOtherExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.UPDATE_OTHER_EXPENSE);
        try {
            // const validationFailed = yield call(ValidationService.validateOutstationExpenseForm, payload);
            // if (validationFailed) {
            //     HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
            //     yield put(OutstationAction.outstationFormValidationFailed(validationFailed));
            //     continue;
            // }
        } catch (err) {
            console.log(err)
        }
        yield call(updateOtherExpense, payload)
    }
}

export function* watchUpdateLocalExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.UPDATE_LOCAL_EXPENSE);
        try {
            // const validationFailed = yield call(ValidationService.validateOutstationExpenseForm, payload);
            // if (validationFailed) {
            //     HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
            //     yield put(OutstationAction.outstationFormValidationFailed(validationFailed));
            //     continue;
            // }
        } catch (err) {
            console.log(err)
        }
        yield call(updateLocalExpense, payload)
    }
}



export function* watchVisitsByTourRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.FETCH_VISIT_BY_TOUR);
        yield call(visitsByTour, payload)
    }
}

export function* watchVisitExpenseItemRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.FETCH_VISIT_EXPENSE_ITEM);
        yield call(visitExpenseItem, payload)
    }
}

export function* watchAddExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.ADD_EXPENSE);
        yield call(addExpense, payload)
    }
}

export function* watchAddTravelExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.ADD_TRAVEL_EXPENSE);
        yield call(addTravelExpenseItem, payload)
    }
}

export function* watchAddLocalExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.ADD_LOCAL_EXPENSE);
        yield call(addLocalExpenseItem, payload)
    }
}

export function* watchAddConvenienceExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.ADD_CONVENIENCE_EXPENSE);
        yield call(addConvenienceExpenseItem, payload)
    }
}

export function* watchAddHotelExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.ADD_HOTEL_EXPENSE);
        yield call(addHotelExpenseItem, payload)
    }
}

export function* watchAddFoodExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.ADD_FOOD_EXPENSE);
        yield call(addFoodExpenseItem, payload)
    }
}

export function* watchAddIncidentalExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.ADD_INCIDENTAL_EXPENSE);
        yield call(addIncidentalExpenseItem, payload)
    }
}

export function* watchAddOtherExpenseRequest() {
    while (true) {
        const { payload } = yield take(OutstationTypes.ADD_OTHER_EXPENSE);
        yield call(addOtherExpenseItem, payload)
    }
}


export function* fetchMyOutstationExpenses({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchMyOutstationExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchOutstationExpense, payload);
        if (successData) {
            yield put(OutstationAction.fetchMyOutstationExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchMyOutstationExpenseFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchMyOutstationExpenseFailure());
    }
}

export function* fetchApprovedTour({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchApprovedTourLoading());
    try {
        let successData = yield call(OutstationService.fetchApprovedTour, payload);
        if (successData) {
            yield put(OutstationAction.fetchApprovedTourSuccess(successData));
        } else {
            yield put(OutstationAction.fetchApprovedTourFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchApprovedTourFailure());
    }
}

export function* fetchTeamOutstationExpenses({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchTeamOutstationExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchOutstationExpense, payload);
        if (successData) {
            yield put(OutstationAction.fetchTeamOutstationExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchTeamOutstationExpenseFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(OutstationAction.fetchTeamOutstationExpenseFailure());
    }
}


export function* fetchMyOutstationItemExpenses({ payload }) {
    console.log(payload, "PAYLOAD DATA");
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchMyOutstationExpenseItemLoading());
    try {
        let successData = yield call(OutstationService.fetchExpenseItem, payload);
        if (successData) {
            yield put(OutstationAction.fetchMyOutstationExpenseItemSuccess(successData));
        } else {
            yield put(OutstationAction.fetchMyOutstationExpenseItemFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(OutstationAction.fetchMyOutstationExpenseItemFailure());
    }
}


export function* fetchTeamOutstationItemExpenses({ payload }) {

    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchTeamExpenseItemLoading());
    try {
        let successData = yield call(LocalExpenseService.fetchExpenseItem, payload);
        if (successData) {
            yield put(OutstationAction.fetchTeamExpenseItemSuccess(successData));
        } else {
            yield put(OutstationAction.fetchTeamExpenseItemFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(OutstationAction.fetchTeamExpenseItemFailure());
    }
}
export function* fetchUpdateExpenses({ payload }) {

    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchTravelExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchTravelExpense, payload);
        if (successData) {
            yield put(OutstationAction.fetchTravelExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchTravelExpenseFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(OutstationAction.fetchTravelExpenseFailure());
    }
}

export function* updateLocalExpenseStatus({ payload }) {
    try {
        const successData = yield call(OutstationService.updateLocalExpenseStatus, payload);
        if (successData) {
            if (successData !== 401) {
                HelperService.showToast({ message: 'Expense moved Successfully', duration: 1000, buttonText: '' });
            } //Todo : change it to userData
            else {
                HelperService.showToast({ message: 'Expense cannot be moved as local expense is not found', duration: 2000, buttonText: 'Okay' });
            }

        } else {
            HelperService.showToast({ message: 'Expense cannot moved! Try Again', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* visitsByTour(payload) {
    console.log(payload, "VISIT TOUR");
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchVisitTourLoading());
    try {
        let successData = yield call(OutstationService.fetchVisitByTour, payload);
        if (successData) {
            yield put(OutstationAction.fetchVisitTourSuccess(successData));
        } else {
            yield put(OutstationAction.fetchVisitTourFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(OutstationAction.fetchVisitTourFailure());
    }
}

export function* visitExpenseItem(payload) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchVisitExpenseItemLoading());
    try {
        let successData = yield call(OutstationService.fetchVisitExpenseItem, payload);
        if (successData) {
            yield put(OutstationAction.fetchVisitExpenseItemSuccess(successData));
        } else {
            yield put(OutstationAction.fetchVisitExpenseItemFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(OutstationAction.fetchVisitExpenseItemFailure());
    }
}

export function* updateTravelExpense(payload) {
    yield put(OutstationAction.updateTravelExpenseLoading());
    try {
        const successData = yield call(OutstationService.updateExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.updateTravelExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('TravelListScreen');
        } else {
            yield put(OutstationAction.updateTravelExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.updateTravelExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* updateConvenienceExpense(payload) {
    yield put(OutstationAction.updateConvenienceExpenseLoading());
    try {
        const successData = yield call(OutstationService.updateExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.updateConvenienceExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('ConvenienceListScreen');
        } else {
            yield put(OutstationAction.updateConvenienceExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.updateConvenienceExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* updateHotelExpense(payload) {
    yield put(OutstationAction.updateHotelExpenseLoading());
    try {
        const successData = yield call(OutstationService.updateExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.updateHotelExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('HotelListScreen');
        } else {
            yield put(OutstationAction.updateHotelExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.updateHotelExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* updateIncidentalExpense(payload) {
    yield put(OutstationAction.updateOutstationExpenseLoading());
    try {
        const successData = yield call(OutstationService.updateExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.updateIncidentalExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('IncidentalListScreen');
        } else {
            yield put(OutstationAction.updateIncidentalExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.updateIncidentalExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* updateFoodExpense(payload) {
    yield put(OutstationAction.updateFoodExpenseLoading());
    try {
        const successData = yield call(OutstationService.updateExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.updateFoodExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('FoodListScreen');
        } else {
            yield put(OutstationAction.updateFoodExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.updateFoodExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* updateOtherExpense(payload) {
    yield put(OutstationAction.updateOtherExpenseLoading());
    try {
        const successData = yield call(OutstationService.updateExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.updateOtherExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('OtherListScreen');
        } else {
            yield put(OutstationAction.updateOtherExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.updateOtherExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* updateLocalExpense(payload) {
    yield put(OutstationAction.updateLocalExpenseLoading());
    try {
        const successData = yield call(OutstationService.updateLocalItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.updateLocalExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('LocalExpenseList');
        } else {
            yield put(OutstationAction.updateLocalExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.updateLocalExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* approveRejectOutstationExpense(payload) {
    yield put(OutstationAction.approveRejectOutstationLoading());
    try {
        const successData = yield call(OutstationService.approveRejectOutstationExpense, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.approveRejectOutstationSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated succesfully', duration: 1000, buttonText: '' });
        } else {
            yield put(OutstationAction.approveRejectOutstationFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.approveRejectOutstationFailure());
        HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
    }
}


export function* sendForApprovalOutstationExpense(payload) {
    yield put(OutstationAction.sendApprovalOutstationLoading());
    try {
        const successData = yield call(OutstationService.sendForApprovalOutstationExpense, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.sendApprovalOutstationSuccess(payload));
            HelperService.showToast({ message: 'Approval Request Send Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('OutstationExpenseTabScreen');
        } else {
            yield put(OutstationAction.sendApprovalOutstationFailure())
            HelperService.showToast({ message: 'Approval Request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.sendApprovalOutstationFailure());
        HelperService.showToast({ message: 'Approval Request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
    }
}

export function* addExpense(params) {
    yield put(OutstationAction.addExpenseLoading());
    try {
        const successData = yield call(OutstationService.addExpense, params);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.addExpenseSuccess());
            HelperService.showToast({ message: 'Expense Created Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('OutstationExpenseTabScreen');
        } else {
            yield put(OutstationAction.addExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.addExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* submitExpenseItem(params) {
    yield put(OutstationAction.submitExpenseItemLoading());
    try {
        const successData = yield call(OutstationService.submitExpenseItem, params.payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.submitExpenseItemSuccess());
            HelperService.showToast({ message: 'Expense Item created Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('OutstationExpenseTabScreen');
        } else {
            yield put(OutstationAction.submitExpenseItemFailure())
            HelperService.showToast({ message: 'Expense Item Create Request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.submitExpenseItemFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* fetchTravelExpenses({ payload }) {
    console.log(payload, "TRAVEL DATA");
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchTravelExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchExpenseItemType, payload);
        console.log(successData, "HEllo");
        if (successData) {
            yield put(OutstationAction.fetchTravelExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchTravelExpenseFailure());
        }
    } catch (error) {
        yield put(OutstationAction.fetchTravelExpenseFailure());
    }
}

export function* fetchConvenienceExpenses({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchConvenienceExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchExpenseItemType, payload);
        if (successData) {
            yield put(OutstationAction.fetchConvenienceExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchConvenienceExpenseFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchConvenienceExpenseFailure());
    }
}


export function* fetchHotelExpenses({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchHotelExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchExpenseItemType, payload);
        if (successData) {
            yield put(OutstationAction.fetchHotelExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchHotelExpenseFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchHotelExpenseFailure());
    }
}

export function* fetchIncidentalExpenses({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchIncidentalExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchExpenseItemType, payload);
        if (successData) {
            yield put(OutstationAction.fetchIncidentalExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchIncidentalExpenseFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchIncidentalExpenseFailure());
    }
}

export function* fetchOtherExpenses({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchOtherExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchExpenseItemType, payload);
        if (successData) {
            yield put(OutstationAction.fetchOtherExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchOtherExpenseFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchOtherExpenseFailure());
    }
}

export function* fetchLocalExpensesType({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchLocalExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchExpenseItemType, payload);
        if (successData) {
            let customVisitList = successData.map((item, id) => {
                item.checked = false;
                item.id = id;
                return item;
            });
            yield put(OutstationAction.fetchLocalExpenseSuccess(customVisitList));
        }
        else {
            yield put(OutstationAction.fetchLocalExpenseFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchLocalExpenseFailure());
    }
}

export function* fetchFoodExpenses({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchFoodExpenseLoading());
    try {
        let successData = yield call(OutstationService.fetchExpenseItemType, payload);
        if (successData) {
            yield put(OutstationAction.fetchFoodExpenseSuccess(successData));
        } else {
            yield put(OutstationAction.fetchFoodExpenseFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchFoodExpenseFailure());
    }
}


export function* updateEmailStatus({ payload }) {
    try {
        const successData = yield call(OutstationService.updateEmailStatus, payload);
        if (successData) { //Todo : change it to userData
            HelperService.showToast({ message: 'Email send successfully', duration: 1000, buttonText: '' });
        } else {
            HelperService.showToast({ message: 'Email Send Request Failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* addTravelExpenseItem(payload) {
    console.log(payload, "TRAVEl DATA");
    yield put(OutstationAction.addTravelLoading());
    try {
        const successData = yield call(OutstationService.addExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.addTravelSuccess(payload));
            HelperService.showToast({ message: 'Travel Expenseitem added Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('TravelListScreen');
        } else {
            yield put(OutstationAction.addTravelFailure())
            HelperService.showToast({ message: 'Travel Expenseitem created request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.addTravelFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* addConvenienceExpenseItem(payload) {
    yield put(OutstationAction.addConvenienceLoading());
    try {
        const successData = yield call(OutstationService.addExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.addConvenienceSuccess(payload));
            HelperService.showToast({ message: 'Expense added Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('ConvenienceListScreen');
        } else {
            yield put(OutstationAction.addConvenienceFailure())
            HelperService.showToast({ message: 'Expense created request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.addConvenienceFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}



export function* addHotelExpenseItem(payload) {
    console.log(payload, "PAYLOAD DATA");
    yield put(OutstationAction.addHotelLoading());
    try {
        const successData = yield call(OutstationService.addExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.addHotelSuccess(payload));
            HelperService.showToast({ message: 'Expense added Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('HotelListScreen');
        } else {
            yield put(OutstationAction.addHotelFailure())
            HelperService.showToast({ message: 'Expense created request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.addHotelFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* addFoodExpenseItem(payload) {
    yield put(OutstationAction.addFoodLoading());
    try {
        const successData = yield call(OutstationService.addExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.addFoodSuccess(payload));
            HelperService.showToast({ message: 'Expense created Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('FoodListScreen');
        } else {
            yield put(OutstationAction.addFoodFailure())
            HelperService.showToast({ message: 'Expense created request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.addFoodExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* addIncidentalExpenseItem(payload) {
    yield put(OutstationAction.addIncidentalLoading());
    try {
        const successData = yield call(OutstationService.addExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.addIncidentalSuccess(payload));
            HelperService.showToast({ message: 'Expense created Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('IncidentalListScreen');
        } else {
            yield put(OutstationAction.addIncidentalFailure())
            HelperService.showToast({ message: 'Expense created request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.addIncidentalFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* addLocalExpenseItem(payload) {
    yield put(OutstationAction.addLocalExpenseLoading());
    try {
        const successData = yield call(OutstationService.addExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.addLocalExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense created Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('OtherListScreen');
        } else {
            yield put(OutstationAction.addLocalExpenseFailure())
            HelperService.showToast({ message: 'Expense created request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.addLocalExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* addOtherExpenseItem(payload) {
    yield put(OutstationAction.addOtherLoading());
    try {
        const successData = yield call(OutstationService.addExpenseItem, payload);
        if (successData) { //Todo : change it to userData
            yield put(OutstationAction.addOtherSuccess(payload));
            HelperService.showToast({ message: 'Expense created Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('OtherListScreen');
        } else {
            yield put(OutstationAction.addOtherFailure())
            HelperService.showToast({ message: 'Expense created request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(OutstationAction.addOtherFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* fetchExpenseImage({ payload }) {
    console.log(payload, "FETCH IMAGE");
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(OutstationAction.doNothing());
        return;
    }
    yield put(OutstationAction.fetchExpenseImageLoading());

    try {
        let successData = yield call(OutstationService.fetchExpenseImage, payload);
        if (successData) {
            yield put(OutstationAction.fetchExpenseImageSuccess(successData));
        } else {
            yield put(OutstationAction.fetchExpenseImageFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(OutstationAction.fetchExpenseImageFailure());
    }
}


