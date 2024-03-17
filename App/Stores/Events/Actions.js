import { createActions } from 'reduxsauce';


const { Types, Creators } = createActions({

    fetchEvents: ['payload'],
    fetchEventsLoading: null,
    fetchEventsSuccess: ['payload'],
    fetchEventsFailure: null,

    fetchParticipants: ['payload'],
    fetchParticipantsLoading: null,
    fetchParticipantsSuccess: ['payload'],
    fetchParticipantsFailure: null,

    updateSearchFilters: ['payload'],
    updateParticipantSearchFilters: ['payload'],
    updateParticipantCount: null,

    updateCustomParticipantList: ['payload'],
    updateParticipantList: ['payload'],

    createEvent: ['payload'],
    createEventLoading: null,
    createEventSuccess: ['payload'],
    createEventFailure: null,
    createEventLoadingStop: null,

    updateEvent: ['payload'],
    updateEventLoading: null,
    updateEventSuccess: ['payload'],
    updateEventFailure: null,
    updateEventLoadingStop: null,

    addParticipants: ['payload'],
    addParticipantSuccess: ['payload'],
    addParticipantFailure: null,
    addParticipantLoading: null,

    clearParticipantObjList: null,

    changeEventForm: ['payload'],
    changeCheckedStatus: null,
    eventFormValidationFailed: ['payload'],

    makeEventSearchList: ['payload'],

    extractFormData: ['payload'],

    selectEvent: ['payload'],

    clearEventForm: null,
    clearParticipantList: null,
    makeRetailerSearchableList: ['payload'],

    doNothing: null,
});

export const EventTypes = Types
export default Creators
