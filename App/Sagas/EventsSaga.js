import { call, put, select, take } from 'redux-saga/effects';
import { eventService } from '../Services/Api/EventService';
import NavigationService from '../Services/NavigationService';
import { HelperService } from '../Services/Utils/HelperService';
import { ValidationService } from '../Services/ValidationService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import EventAction, { EventTypes } from '../Stores/Events/Actions';
import { offlineApiCall } from './OfflineSaga';


export function* watchCreateEventRequest() {
    while (true) {
        const { payload } = yield take(EventTypes.CREATE_EVENT);
        try {
            const validationFailed = yield call(ValidationService.validateEventForm, payload);
            if (validationFailed) {
                HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
                yield put(EventAction.eventFormValidationFailed(validationFailed));
                continue;
            }
        } catch (err) {
            console.log(err)
        }

        yield call(createEvent, payload)
    }
}


export function* watchUpdateEventRequest() {
    while (true) {
        const { payload } = yield take(EventTypes.UPDATE_EVENT)
        try {
            const validationFailed = yield call(ValidationService.validateEventForm, payload);
            if (validationFailed) {
                HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
                yield put(EventAction.eventFormValidationFailed(validationFailed));
                continue;
            }
        } catch (err) {
            console.log(err)
        }
        yield call(updateEvent, payload)
    }
}


export function* createEvent(payload) {
    yield put(EventAction.createEventLoading());
    try {
        let offlinActionData = {
            apiCall: (eventService.createEvent),
            resource: 'createEvent', //specify for which reducer we are using it
            callName: 'create', //specify operation
            params: HelperService.decorateWithLocalId(payload),
            timestamp: HelperService.getCurrentTimestamp(),
            successCallback: (EventAction.createEventSuccess),
            failureCallback: (EventAction.createEventFailure),
            replaceServerParams: false
        };

        const successData = yield call(offlineApiCall, offlinActionData);

        if (successData) { //Todo : change it to userData
            yield put(EventAction.createEventSuccess(payload));
            HelperService.showToast({ message: 'Event Added Successfully.', duration: 1000, buttonText: '' });
            //navigate to today's visit page
            yield put(EventAction.createEventSuccess(payload));
            yield put(EventAction.clearEventForm());
            let user = yield select(state => state.user)
            let events = yield select(state => state.events)


            yield put(EventAction.fetchEvents({
                token: user.token,
                agentid: user.id,
                offset: events.eventOffset,
                limit: events.eventLimit
            }));

            NavigationService.navigate('EventList');
        } else {
            yield put(EventAction.createEventFailure())
            HelperService.showToast({ message: 'Cannot Create Event. Try after some time', duration: 2000, buttonText: 'Okay' });

        }
    } catch (error) {
        console.log('Error', error)
        yield put(EventAction.createEventFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}



export function* updateEvent(payload) {
    yield put(EventAction.updateEventLoading());
    try {
        let offlinActionData = {
            apiCall: (eventService.updateEvent),
            resource: 'updateEvent', //specify for which reducer we are using it
            callName: 'create', //specify operation
            params: HelperService.decorateWithLocalId(payload),
            timestamp: HelperService.getCurrentTimestamp(),
            successCallback: (EventAction.updateEventSuccess),
            failureCallback: (EventAction.updateEventFailure),
            replaceServerParams: false
        };

        const successData = yield call(offlineApiCall, offlinActionData);

        if (successData) { //Todo : change it to userData
            yield put(EventAction.updateEventSuccess(payload));
            HelperService.showToast({ message: 'Event Updated Successfully', duration: 1000, buttonText: '' });
            let user = yield select(state => state.user)
            let events = yield select(state => state.events)


            yield put(EventAction.fetchEvents({
                token: user.token,
                agentid: user.id,
                offset: events.eventOffset,
                limit: events.eventLimit
            }));
            NavigationService.navigateAndReset('EventList');
        } else {
            yield put(EventAction.updateEventFailure())
            HelperService.showToast({ message: 'Event Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
        }
    } catch (error) {
        yield put(EventAction.updateEventFailure());
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}


export function* fetchEvents({ payload }) {
    const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
    if (!isOnline) {
        yield put(EventAction.doNothing());
        return;
    }
    yield put(EventAction.fetchEventsLoading());
    try {
        let successData = yield call(eventService.fetchEvents, payload);
        if (successData) {
            yield put(EventAction.fetchEventsSuccess(successData));
        } else {
            yield put(EventAction.fetchEventsFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(EventAction.fetchEventsFailure());
    }
}


export function* addParticipants(payload) {
    yield put(EventAction.addParticipantLoading());
    try {
        let offlinActionData = {
            apiCall: (eventService.addParticipants),
            resource: 'addParticipant', //specify for which reducer we are using it
            callName: 'create', //specify operation
            params: HelperService.decorateWithLocalId(payload),
            timestamp: HelperService.getCurrentTimestamp(),
            successCallback: (EventAction.addParticipantSuccess),
            failureCallback: (EventAction.addParticipantFailure),
            replaceServerParams: false
        };

        const successData = yield call(offlineApiCall, offlinActionData);

        if (successData) { //Todo : change it to userData
            yield put(EventAction.addParticipantSuccess(payload));
            HelperService.showToast({ message: 'Participants Added Successfully.', duration: 1000, buttonText: '' });
            //navigate to today's visit page
            yield put(EventAction.addParticipantSuccess(payload));
            NavigationService.navigate('EventParticipantListScreen');
        } else {
            yield put(EventAction.addParticipantFailure())
            NavigationService.navigate('AddParticipantScreen');
            HelperService.showToast({ message: 'Cannot Add Participant. Try after some time', duration: 2000, buttonText: 'Okay' });

        }
    } catch (error) {
        console.log('Error', error)
        yield put(EventAction.addParticipantFailure());
        NavigationService.navigate('AddParticipantScreen');
        HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
    }
}

export function* fetchParticipants({ payload }) {
    const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
    if (!isOnline) {
        yield put(EventAction.doNothing());
        return;
    }
    yield put(EventAction.fetchParticipantsLoading());
    try {
        let successData = yield call(eventService.fetchParticipants, payload);
        if (successData) {
            yield put(EventAction.fetchParticipantsSuccess(successData));
        } else {
            yield put(EventAction.fetchParticipantsFailure());
        }
    } catch (error) {
        console.log('Error', error)
        yield put(EventAction.fetchParticipantsFailure());
    }
}


