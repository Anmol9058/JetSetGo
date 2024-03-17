/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { TourTypes } from './Actions'
import _ from 'lodash';


//fetch my tour
export const fetchMyTourLoading = (state) => ({
    ...state,
    fetchMyTourLoader: true
});

export const fetchMyTourSuccess = (state, { payload }) => ({
    ...state,
    myTourList: _.cloneDeep(payload),
    fetchMyTourLoader: false
});

export const fetchMyTourFailure = (state) => ({
    ...state,
    fetchMyTourLoader: false,
    myTourList: []
});


// fetch team tour

export const fetchTeamTourLoading = (state) => ({
    ...state,
    fetchTeamTourLoader: true
});

export const fetchTeamTourSuccess = (state, { payload }) => ({
    ...state,
    teamTourList: _.cloneDeep(payload),
    fetchTeamTourLoader: false
});

export const fetchTeamTourFailure = (state) => ({
    ...state,
    fetchTeamTourLoader: false,
    teamTourList: []
});

// create tour


export const createTourLoading = (state) => ({
    ...state,
    createTourLoader: true
});


export const createTourSuccess = (state, { payload }) => ({
    ...state,
    tourForm: {},
    createTourLoader: false

});


export const createTourFailure = (state, { payload }) => ({
    ...state,
    createTourLoader: false
});

//update tour 

export const updateTourLoading = (state) => ({
    ...state,
    updateTourLoader: true
});

export const updateTourSuccess = (state) => ({
    ...state,
    tourForm: {},
    updateTourLoader: false
});

export const updateTourFailure = (state) => ({
    ...state,
    updateTourLoader: false
});

export const approveRejectLoading = (state) => ({
    ...state,
    updateTourLoader: true
});

export const approveRejectSuccess = (state) => ({
    ...state,
    tourForm: {},
    updateTourLoader: false
});

export const approveRejectFailure = (state) => ({
    ...state,
    updateTourLoader: false
});

export const sendApprovalLoading = (state) => ({
    ...state,
    sendApprovalLoader: true
});

export const sendApprovalSuccess = (state) => ({
    ...state,
    sendApprovalLoader: false
});

export const sendApprovalFailure = (state) => ({
    ...state,
    sendApprovalLoader: false
});

export const updateMonthNumber = (state, { payload }) => ({
    ...state,
    monthNumber: _.cloneDeep(payload)
});


export const selectMyTour = (state, { payload }) => ({
    ...state,
    selectMyTour: _.cloneDeep(payload)
});

export const selectTeamTour = (state, { payload }) => ({
    ...state,
    selectTeamTour: _.cloneDeep(payload)
});


export const changeTourForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.tourForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        tourForm: {
            ...state.tourForm,
            ...updated_form
        },
        tourFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};

export const tourFormValidationFailed = (state, { payload }) => ({
    ...state,
    tourFormValidation: {
        ...payload
    }
});


export const clearSelectMyTour = (state) => ({
    ...state,
    selectMyTour: {}
});

export const clearSelectTeamTour = (state) => ({
    ...state,
    selectTeamTour: {}
});


export const clearTourForm = (state) => ({
    ...state,
    tourForm: {}
})

export const openMoreFilters = (state) => ({
    ...state,
    openMoreFilters: true
});

export const closeMoreFilters = (state) => ({
    ...state,
    openMoreFilters: false
});

export const updateTourSearchFilters = (state, { payload }) => {
    let updated_search_filters = _.cloneDeep(state.searchFilters);
    updated_search_filters[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        searchFilters: {
            ...state.searchFilters,
            ...updated_search_filters
        }
    }
};

export const fetchCitiesSuccess = (state, { payload }) => ({
    ...state,
    cityList: _.cloneDeep(payload)
});

export const fetchCitiesFailure = (state) => {
    return {
        ...state,
        cityList: []
    }
}

export const changeType = (state, { payload }) => {
    return {
        ...state,
        type: payload ? 'other' : 'self'
    }
};


export const doNothing = (state) => ({
    ...state
});

export const reducer = createReducer(INITIAL_STATE, {

    [TourTypes.FETCH_MY_TOUR_LOADING]: fetchMyTourLoading,
    [TourTypes.FETCH_MY_TOUR_SUCCESS]: fetchMyTourSuccess,
    [TourTypes.FETCH_MY_TOUR_FAILURE]: fetchMyTourFailure,

    [TourTypes.FETCH_TEAM_TOUR_LOADING]: fetchTeamTourLoading,
    [TourTypes.FETCH_TEAM_TOUR_SUCCESS]: fetchTeamTourSuccess,
    [TourTypes.FETCH_TEAM_TOUR_FAILURE]: fetchTeamTourFailure,

    [TourTypes.CREATE_TOUR_LOADING]: createTourLoading,
    [TourTypes.CREATE_TOUR_SUCCESS]: createTourSuccess,
    [TourTypes.CREATE_TOUR_FAILURE]: createTourFailure,

    [TourTypes.UPDATE_TOUR_LOADING]: updateTourLoading,
    [TourTypes.UPDATE_TOUR_SUCCESS]: updateTourSuccess,
    [TourTypes.UPDATE_TOUR_FAILURE]: updateTourFailure,

    [TourTypes.SEND_APPROVAL_LOADING]: sendApprovalLoading,
    [TourTypes.SEND_APPROVAL_SUCCESS]: sendApprovalSuccess,
    [TourTypes.SEND_APPROVAL_FAILURE]: sendApprovalFailure,

    [TourTypes.APPROVE_REJECT_LOADING]: approveRejectLoading,
    [TourTypes.APPROVE_REJECT_SUCCESS]: approveRejectSuccess,
    [TourTypes.APPROVE_REJECT_FAILURE]: approveRejectFailure,


    [TourTypes.UPDATE_MONTH_NUMBER]: updateMonthNumber,

    [TourTypes.CHANGE_TYPE]: changeType,

    [TourTypes.SELECT_MY_TOUR]: selectMyTour,
    [TourTypes.SELECT_TEAM_TOUR]: selectTeamTour,

    [TourTypes.CLEAR_SELECT_MY_TOUR]: clearSelectMyTour,
    [TourTypes.CLEAR_SELECT_TEAM_TOUR]: clearSelectTeamTour,


    [TourTypes.OPEN_MORE_FILTERS_OPTION]: openMoreFilters,
    [TourTypes.CLOSE_MORE_FILTERS_OPTION]: closeMoreFilters,


    [TourTypes.CHANGE_TOUR_FORM]: changeTourForm,

    [TourTypes.FETCH_CITIES_SUCCESS]: fetchCitiesSuccess,
    [TourTypes.FETCH_CITIES_FAILURE]: fetchCitiesFailure,

    [TourTypes.CLEAR_TOUR_FORM]: clearTourForm,

    [TourTypes.UPDATE_TOUR_SEARCH_FILTERS]: updateTourSearchFilters,

});
