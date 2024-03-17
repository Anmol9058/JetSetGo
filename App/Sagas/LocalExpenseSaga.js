import { call, put, select, take } from 'redux-saga/effects';
import { LocalExpenseService } from '../Services/Api/LocalExpenseService';
import NavigationService from '../Services/NavigationService';
import { HelperService } from '../Services/Utils/HelperService';
import { ValidationService } from '../Services/ValidationService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import LocalActions, { LocalTypes } from '../Stores/LocalExpense/Actions';

export function* watchUpdateExpenseRequest() {
    while (true) {
        const { payload } = yield take(LocalTypes.UPDATE_EXPENSE);
        try {
            const validationFailed = yield call(ValidationService.validateLocalExpenseForm, payload);
            if (validationFailed) {
                HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
                yield put(LocalActions.expenseFormValidationFailed(validationFailed));
                continue;
            }
        } catch (err) {
            console.log(err)
        }
        yield call(updateExpenses, payload)
    }
}

export function* watchSendForApprovalLocalExpenseRequest() {
    while (true) {
        const { payload } = yield take(LocalTypes.SEND_APPROVAL_LOCAL_EXPENSE);
        yield call(sendForApprovalLocalExpense, payload)
    }
}

export function* watchUploadLocalImageRequest() {
    while (true) {
        const { payload } = yield take(LocalTypes.UPLOAD_LOCAL_IMAGE);
        yield call(uploadLocalImage, payload)
    }
}

export function* watchApproveRejectLocalRequest() {
    while (true) {
        const { payload } = yield take(LocalTypes.APPROVE_REJECT_LOCAL_EXPENSE);
        yield call(approveRejectLocalExpense, payload)
    }
}

// export function* watchaddRemarkRequest() {
//     while (true) {
//         const { payload } = yield take(LocalTypes.ADD_REMARK);
//         try {
//             const validationFailed = yield call(ValidationService.validateLocalRemarkExpenseForm, payload);
//             if (validationFailed) {
//                 HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
//                 yield put(LocalActions.expenseFormValidationFailed(validationFailed));
//                 continue;
//             }
//             else {
//                 yield call(addRemark, payload)
//             }
//         } catch (err) {
//             console.log(err)
//         }

//     }
// }



export function* fetchLocalExpenseData({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(LocalActions.doNothing());
        return;
    }
    yield put(LocalActions.fetchLocalExpenseLoading());
    try {
        let successData = yield call(LocalExpenseService.fetchLocalExpense, payload);
        if (successData) {
            yield put(LocalActions.fetchLocalExpenseSuccess(successData));
        } else {
            yield put(LocalActions.fetchLocalExpenseFailure());
        }
    } catch (error) {
        yield put(LocalActions.fetchLocalExpenseFailure());
    }
}

export function* fetchTeamExpenses({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(LocalActions.doNothing());
        return;
    }
    yield put(LocalActions.fetchTeamExpenseLoading());
    try {
        let successData = yield call(LocalExpenseService.fetchLocalExpense, payload);
        if (successData) {
            yield put(LocalActions.fetchTeamExpenseSuccess(successData));
        } else {
            yield put(LocalActions.fetchTeamExpenseFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(LocalActions.fetchTeamExpenseFailure());
    }
}


export function* fetchLocalItemExpenses({ payload }) {
   
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(LocalActions.doNothing());
        return;
    }
    yield put(LocalActions.fetchLocalExpenseItemLoading());
    try {
        let successData = yield call(LocalExpenseService.fetchExpenseItem, payload);
        if (successData) {
            yield put(LocalActions.fetchLocalExpenseItemSuccess(successData));
        } else {
            yield put(LocalActions.fetchLocalExpenseItemFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(LocalActions.fetchLocalExpenseItemFailure());
    }
}


export function* fetchTeamItemExpenses({ payload }) {

    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(LocalActions.doNothing());
        return;
    }
    yield put(LocalActions.fetchTeamExpenseItemLoading());
    try {
        let successData = yield call(LocalExpenseService.fetchExpenseItem, payload);
        if (successData) {
            yield put(LocalActions.fetchTeamExpenseItemSuccess(successData));
        } else {
            yield put(LocalActions.fetchTeamExpenseItemFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(LocalActions.fetchTeamExpenseItemFailure());
    }
}

export function* fetchLocalImage({ payload }) {

    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(LocalActions.doNothing());
        return;
    }
    yield put(LocalActions.fetchLocalImageLoading());
    try {
        let successData = yield call(LocalExpenseService.fetchLocalImage, payload);
        if (successData) {
            yield put(LocalActions.fetchLocalImageSuccess(successData));
        } else {
            yield put(LocalActions.fetchLocalImageFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(LocalActions.fetchLocalImageFailure());
    }
}


export function* uploadLocalImage(payload) {
    yield put(LocalActions.uploadLocalImageLoading());
    try {
        const successData = yield call(LocalExpenseService.uploadLocalImage, payload);
        if (successData) { //Todo : change it to userData
            yield put(LocalActions.uploadLocalImageSuccess());
            HelperService.showToast({ message: 'File Upload Successfully', duration: 1000, buttonText: '' });
        } else {
            yield put(LocalActions.uploadLocalImageFailure())
            HelperService.showToast({ message: 'File upload failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(LocalActions.uploadLocalImageFailure());
        HelperService.showToast({ message: 'File upload failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
    }
}



export function* updateExpenses(payload) {
    yield put(LocalActions.updateExpenseLoading());
    try {
        const successData = yield call(LocalExpenseService.updateExpense, payload);
        if (successData) { //Todo : change it to userData
            yield put(LocalActions.updateExpenseSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('LocalExpenseListScreen');
        } else {
            yield put(LocalActions.updateExpenseFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(LocalActions.updateExpenseFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* approveRejectLocalExpense(payload) {
    yield put(LocalActions.approveRejectLoading());
    try {
        const successData = yield call(LocalExpenseService.approveRejectLocalExpense, payload);
        if (successData) { //Todo : change it to userData
            yield put(LocalActions.approveRejectSuccess(payload));
            HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
        } else {
            yield put(LocalActions.approveRejectFailure())
            HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(LocalActions.approveRejectFailure());
        HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
    }
}

// export function* addRemark(payload) {
//     yield put(LocalActions.addRemarkLoading());
//     try {
//         const successData = yield call(LocalExpenseService.addRemarkExpense, payload);
//         if (successData) { //Todo : change it to userData
//             yield put(LocalActions.addRemarkSuccess(payload));
//             HelperService.showToast({ message: 'Expense Updated Successfully', duration: 1000, buttonText: '' });
//         } else {
//             yield put(LocalActions.addRemarkFailure())
//             HelperService.showToast({ message: 'Expense Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
//         }
//     } catch (error) {
//         yield put(LocalActions.addRemarkFailure());
//         HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
//     }
// }


export function* sendForApprovalLocalExpense(payload) {
    yield put(LocalActions.sendApprovalLoading());
    try {
        const successData = yield call(LocalExpenseService.sendForApproval, payload);
        if (successData) { //Todo : change it to userData
            yield put(LocalActions.sendApprovalSuccess(payload));
            HelperService.showToast({ message: 'Approval Request Send Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('LocalExpenseTabScreen');
        } else {
            yield put(LocalActions.sendApprovalFailure())
            HelperService.showToast({ message: 'Approval Request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(LocalActions.sendApprovalFailure());
        HelperService.showToast({ message: 'Approval Request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
    }
}


