import { call, put, select, take } from 'redux-saga/effects';
import { TourService } from '../Services/Api/TourService';
import NavigationService from '../Services/NavigationService';
import { HelperService } from '../Services/Utils/HelperService';
import { ValidationService } from '../Services/ValidationService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import TourAction, { TourTypes } from '../Stores/Tour/Actions';


export function* watchCreateTourRequest() {
    while (true) {
        const { payload } = yield take(TourTypes.CREATE_TOUR);
        try {
            const validationFailed = yield call(ValidationService.validateTourForm, payload);
            if (validationFailed) {
                HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
                yield put(TourAction.tourFormValidationFailed(validationFailed));
                continue;
            }
        } catch (err) {
            console.log(err)
        }

        yield call(createTour, payload)
    }
}


export function* watchUpdateTourRequest() {
    while (true) {
        const { payload } = yield take(TourTypes.UPDATE_TOUR)
        try {
            const validationFailed = yield call(ValidationService.validateUpdateTourForm, payload);
            if (validationFailed) {
                HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
                yield put(TourAction.tourFormValidationFailed(validationFailed));
                continue;
            }
        } catch (err) {
            console.log(err)
        }
        yield call(updateTour, payload)
    }
}
export function* watchSendForApprovalTourRequest() {
    while (true) {
        const { payload } = yield take(TourTypes.SEND_APPROVAL_TOUR);
        yield call(sendForApproval, payload)
    }
}

export function* watchApproveRejectTourRequest() {
    while (true) {
        const { payload } = yield take(TourTypes.APPROVE_REJECT_TOUR);
        yield call(approveRejectTour, payload)
    }
}


export function* createTour(payload) {
    yield put(TourAction.createTourLoading());

    try {
        const successData = yield call(TourService.createTour, payload);
        if (successData) { //Todo : change it to userData
            if (successData !== 401) {
                yield put(TourAction.createTourSuccess(payload));
                HelperService.showToast({ message: 'Tour created Successfully', duration: 1000, buttonText: '' });
                NavigationService.navigateAndReset('TourTabScreen');
            } else {
                yield put(TourAction.createTourFailure())
                HelperService.showToast({ message: 'Already Tour created within this date range!! Try Again with different dates.', duration: 2000, buttonText: 'Okay' });
            }
        }
        else {
            yield put(TourAction.createTourFailure())
            HelperService.showToast({ message: 'Tour creation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(TourAction.createTourFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}



export function* updateTour(payload) {
    console.log(payload, "PAYLOAD DATA");
    yield put(TourAction.updateTourLoading());

    try {

        const successData = yield call(TourService.updateTour, payload);

        if (successData) { //Todo : change it to userData
            yield put(TourAction.updateTourSuccess(payload));
            HelperService.showToast({ message: 'Tour Updated Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('TourTabScreen');
        } else {
            yield put(TourAction.updateTourFailure())
            HelperService.showToast({ message: 'Tour Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(TourAction.updateTourFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* fetchCities({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(TourAction.doNothing());
        return;
    }
    try {
        let successData = yield call(TourService.fetchCities, payload);
        if (successData) {
            successData  = HelperService.sortListFilter(successData, 'name' , 'ASC');
            let modifiedData = HelperService.convertArrToRNPickerObj(successData, 'name');
            yield put(TourAction.fetchCitiesSuccess(modifiedData));
        } else {
            yield put(TourAction.fetchCitiesFailure());
        }
    } catch (error) {
        console.log('Error FETCH', error)
        yield put(TourAction.fetchCitiesFailure());
    }
}

export function* fetchMyTour({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(TourAction.doNothing());
        return;
    }
    yield put(TourAction.fetchMyTourLoading());
    try {
        let successData = yield call(TourService.fetchTour, payload);
        console.log(payload, "LOCAL EXPENSE");
        if (successData) {
            yield put(TourAction.fetchMyTourSuccess(successData));
        } else {
            yield put(TourAction.fetchMyTourFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(TourAction.fetchMyTourFailure());
    }
}

export function* fetchTeamTour({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
        yield put(TourAction.doNothing());
        return;
    }
    yield put(TourAction.fetchTeamTourLoading());
    try {
        let successData = yield call(TourService.fetchTour, payload);
        console.log(payload, "LOCAL EXPENSE");
        if (successData) {
            yield put(TourAction.fetchTeamTourSuccess(successData));
        } else {
            yield put(TourAction.fetchTeamTourFailure());
        }
    } catch (error) {
        console.log('Error', "LOCAL DATA")
        yield put(TourAction.fetchTeamTourFailure());
    }
}

export function* approveRejectTour(payload) {
    yield put(TourAction.approveRejectLoading());
    try {
        const successData = yield call(TourService.approveRejectTour, payload);
        if (successData) { //Todo : change it to userData
            yield put(TourAction.approveRejectSuccess(payload));
            HelperService.showToast({ message: 'Tour Updated Successfully', duration: 1000, buttonText: '' });
        } else {
            yield put(TourAction.approveRejectFailure())
            HelperService.showToast({ message: 'Tour Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(TourAction.approveRejectFailure());
        HelperService.showToast({ message: 'Tour Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
    }
}


export function* sendForApproval(payload) {
    yield put(TourAction.sendApprovalLoading());
    try {
        const successData = yield call(TourService.sendForApproval, payload);
        if (successData) { //Todo : change it to userData
            yield put(TourAction.sendApprovalSuccess(payload));
            HelperService.showToast({ message: 'Approval Request Send Successfully', duration: 1000, buttonText: '' });
            NavigationService.navigateAndReset('TourTabScreen');
        } else {
            yield put(TourAction.sendApprovalFailure())
            HelperService.showToast({ message: 'Approval Request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(TourAction.sendApprovalFailure());
        HelperService.showToast({ message: 'Approval Request failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
    }
}



