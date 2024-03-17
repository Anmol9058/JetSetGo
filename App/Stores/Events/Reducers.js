/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import _ from 'lodash';
import { createReducer } from 'reduxsauce';
import { EventTypes } from './Actions';
import { INITIAL_STATE } from './InitialState';

export const createEventLoading = (state) => ({
    ...state,
    createEventLoader: true
});


export const createEventLoadingStop = (state) => ({
    ...state,
    createEventLoader: false
});

export const updateEventLoading = (state) => ({
    ...state,
    updateEventLoader: true
});


export const updateEventLoadingStop = (state) => ({
    ...state,
    updateEventLoader: false
});

export const changeEventForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.eventForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        eventForm: {
            ...state.eventForm,
            ...updated_form
        },
        eventFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};

export const eventFormValidationFailed = (state, { payload }) => ({
    ...state,
    eventFormValidation: {
        ...payload
    }
});

export const createEventSuccess = (state, { payload }) => ({
    ...state,
    eventForm: {},
    createEventLoader: false

});

export const selectEvent = (state, { payload }) => ({
    ...state,
    selectedEvent: payload
});

export const createEventFailure = (state, { payload }) => ({
    ...state,
    createEventLoader: false
});



export const updateEventSuccess = (state, { payload }) => ({
    ...state,
    eventForm: {},
    updateEventLoader: false
});

export const updateEventFailure = (state, { payload }) => ({
    ...state,
    updateEventLoader: false
});

export const fetchEventsLoading = (state) => ({
    ...state,
    fetchEventsLoader: true
});

export const fetchEventsSuccess = (state, { payload }) => {
    return {
        ...state,
        fetchEventsLoader: false,
        eventList: _.cloneDeep(payload),
    }
}

export const fetchEventsFailure = (state, { payload }) => ({
    ...state,
    fetchEventsLoader: false,
    eventList: []
});

export const fetchParticipantsLoading = (state) => ({
    ...state,
    fetchParticipantLoader: true
});

export const fetchParticipantsSuccess = (state, { payload }) => {
    return {
        ...state,
        fetchParticipantLoader: false,
        participantList: _.cloneDeep(payload),
    }
}

export const fetchParticipantsFailure = (state, { payload }) => ({
    ...state,
    fetchParticipantLoader: false,
    participantList: []
});

export const changeCheckedStatus = (state) => (
    {
        ...state,
        checkedStatus: !state.checkedStatus
    })


export const updateSearchFilters = (state, { payload }) => {
    let updated_search_filters = _.cloneDeep(state.eventSearchFilters);
    updated_search_filters[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        eventSearchFilters: {
            ...state.eventSearchFilters,
            ...updated_search_filters
        },
        openMoreFilters: false
    }
};

export const updateParticipantSearchFilters = (state, { payload }) => {
    let updated_search_filters = _.cloneDeep(state.eventParticipantSearchFilters);
    updated_search_filters[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        eventParticipantSearchFilters: {
            ...state.eventParticipantSearchFilters,
            ...updated_search_filters
        },
        openMoreFilters: false
    }
};

export const makeEventSearchList = (state) => ({
    ...state
})

export const clearEventForm = (state) => ({
    ...state,
    checkedStatus: false,
    eventForm: {}
});

export const extractFormData = (state, { payload }) => ({
    ...state,
    eventForm: payload
});

export const doNothing = (state) => ({
    ...state
});

export const makeRetailerSearchableList = (state, { payload }) => ({
    ...state,
    retailerSearchableList: payload
})

export const clearParticipantList = (state) => ({
    ...state,
    participantList: []
});

export const addParticipantsSuccess = (state, { payload }) => ({
    ...state,
    addParticipantsLoading: false,
});

export const addParticipantsFailure = (state, { payload }) => ({
    ...state,
    addParticipantsLoading: false
});

export const addParticipantsLoading = (state, { payload }) => ({
    ...state,
    addParticipantsLoading: true
});

export const updateCustomParticipantList = (state, { payload }) => ({
    ...state,
    customParticipantList: _.cloneDeep(payload),
});

export const updateParticipantList = (state, { payload }) => ({
    ...state,
    participantObjList: _.cloneDeep(payload)
});

export const clearParticipantObjList = (state) => ({
    ...state,
    participantObjList: []
});

export const reducer = createReducer(INITIAL_STATE, {
    [EventTypes.CREATE_EVENT_LOADING]: createEventLoading,
    [EventTypes.CREATE_EVENT_LOADING_STOP]: createEventLoadingStop,
    [EventTypes.CREATE_EVENT_SUCCESS]: createEventSuccess,
    [EventTypes.CREATE_EVENT_FAILURE]: createEventFailure,


    [EventTypes.UPDATE_EVENT_LOADING]: updateEventLoading,
    [EventTypes.UPDATE_EVENT_LOADING_STOP]: updateEventLoadingStop,
    [EventTypes.UPDATE_EVENT_SUCCESS]: updateEventSuccess,
    [EventTypes.UPDATE_EVENT_FAILURE]: updateEventFailure,

    [EventTypes.UPDATE_CUSTOM_PARTICIPANT_LIST]: updateCustomParticipantList,
    [EventTypes.UPDATE_PARTICIPANT_LIST]: updateParticipantList,

    [EventTypes.FETCH_EVENTS_LOADING]: fetchEventsLoading,
    [EventTypes.FETCH_EVENTS_SUCCESS]: fetchEventsSuccess,
    [EventTypes.FETCH_EVENTS_FAILURE]: fetchEventsFailure,

    [EventTypes.ADD_PARTICIPANT_LOADING]: addParticipantsLoading,
    [EventTypes.ADD_PARTICIPANT_SUCCESS]: addParticipantsSuccess,
    [EventTypes.ADD_PARTICIPANT_FAILURE]: addParticipantsFailure,

    [EventTypes.FETCH_PARTICIPANTS_LOADING]: fetchParticipantsLoading,
    [EventTypes.FETCH_PARTICIPANTS_SUCCESS]: fetchParticipantsSuccess,
    [EventTypes.FETCH_PARTICIPANTS_FAILURE]: fetchParticipantsFailure,

    [EventTypes.CHANGE_CHECKED_STATUS]: changeCheckedStatus,
    [EventTypes.CHANGE_EVENT_FORM]: changeEventForm,
    [EventTypes.EVENT_FORM_VALIDATION_FAILED]: eventFormValidationFailed,
    [EventTypes.MAKE_RETAILER_SEARCHABLE_LIST]: makeRetailerSearchableList,


    [EventTypes.UPDATE_SEARCH_FILTERS]: updateSearchFilters,
    [EventTypes.UPDATE_PARTICIPANT_SEARCH_FILTERS]: updateParticipantSearchFilters,

    [EventTypes.MAKE_EVENT_SEARCH_LIST]: makeEventSearchList,


    [EventTypes.EXTRACT_FORM_DATA]: extractFormData,

    [EventTypes.DO_NOTHING]: doNothing,

    [EventTypes.SELECT_EVENT]: selectEvent,
    [EventTypes.CLEAR_EVENT_FORM]: clearEventForm,
    [EventTypes.CLEAR_PARTICIPANT_LIST]: clearParticipantList,

    [EventTypes.CLEAR_PARTICIPANT_OBJ_LIST]: clearParticipantObjList

});
