/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
    eventList: [],
    fetchEventsLoader: false,
    fetchEventInfoLoader: false,
    participantList: [],
    fetchParticipantLoader: false,
    participantObjList: [],
    customParticipantList: [],
    eventSearchFilters: {
        type: 'Events',
        sortType: 'ASC',
        sortBy: '',
        searchBy: 'name',
        searchValue: ''
    },
    eventParticipantSearchFilters: {
        type: 'Events',
        sortType: 'ASC',
        sortBy: '',
        searchBy: 'name',
        searchValue: ''
    },
    eventForm: {},
    eventFormValidation: {
        invalid: false,
        invalid_field: ''
    },
    createEventLoader: false,
    updateEventLoader: false,
    selectedEvent: {},
    eventOffset: 0,
    eventLimit: 1000,
    checkedStatus: false,
    retailerSearchableList: [],
    targetAudienceType: [{
        'label': 'Electricians',
        'value': 'Electricians'
    }, {
        'label': 'Retailers',
        'value': 'Retailers'
    }],
    meetingListType: [{
        'label': 'Nukkad Meet',
        'value': 'nukkad meet'
    },
    {
        'label': 'Electrician Meet',
        'value': 'electrician meet'
    },
    {
        'label': 'Retailer Meet',
        'value': 'retailer meet'
    },
    {
        'label': 'Commando Activity',
        'value': 'commando activity'
    },
    {
        'label': 'Roadshow',
        'value': 'roadshow'
    },
    {
        'label': 'Umbrella Activity',
        'value': 'umbrella activity'
    },]
}
