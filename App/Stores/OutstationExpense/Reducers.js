/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { OutstationTypes } from './Actions'
import _ from 'lodash';

// fetch Expense Image

export const fetchExpenseImageLoading = (state) => ({
    ...state,
    fetchExpenseImageLoader: true
});

export const fetchExpenseImageSuccess = (state, { payload }) => ({
    ...state,
    expenseImage: _.cloneDeep(payload),
    fetchExpenseImageLoader: false
});

export const fetchExpenseImageFailure = (state) => ({
    ...state,
    fetchExpenseImageLoader: false,
    expenseImage: []
});

//clear expense Image

export const clearExpenseImage = (state) => ({
    ...state,
    expenseImage: []
});


// fetch local expenses reducer

export const fetchMyOutstationExpenseLoading = (state) => ({
    ...state,
    fetchMyOutstationExpenseLoader: true
});

export const fetchMyOutstationExpenseSuccess = (state, { payload }) => ({
    ...state,
    outstationExpenseList: _.cloneDeep(payload),
    fetchMyOutstationExpenseLoader: false
});

export const fetchMyOutstationExpenseFailure = (state) => ({
    ...state,
    fetchMyOutstationExpenseLoader: false,
    outstationExpenseList: []
});

//visit expense item reducer

export const fetchVisitExpenseItemLoading = (state) => ({
    ...state,
    fetchVisitExpenseItemLoader: true
});

export const fetchVisitExpenseItemSuccess = (state, { payload }) => ({
    ...state,
    visitExpenseItem: _.cloneDeep(payload),
    fetchVisitExpenseItemLoader: false
});

export const fetchVisitExpenseItemFailure = (state) => ({
    ...state,
    fetchVisitExpenseItemLoader: false,
    visitExpenseItem: []
});

//fetch local expense item reducer

export const fetchMyOutstationExpenseItemLoading = (state) => ({
    ...state,
    fetchMyOutstationExpenseItemLoader: true
});

export const fetchMyOutstationExpenseItemSuccess = (state, { payload }) => ({
    ...state,
    outstationExpenseItemList: _.cloneDeep(payload),
    ffetchMyOutstationExpenseItemLoader: false
});

export const fetchMyOutstationExpenseItemFailure = (state) => ({
    ...state,
    fetchMyOutstationExpenseItemLoader: false,
    outstationExpenseItemList: []
});

//fetch team expense reducer

export const fetchTeamOutstationExpenseLoading = (state) => ({
    ...state,
    fetchOutstationTeamExpenseLoader: true
});

export const fetchTeamOutstationExpenseSuccess = (state, { payload }) => ({
    ...state,
    outstationTeamExpenseList: _.cloneDeep(payload),
    fetchOutstationTeamExpenseLoader: false
});

export const fetchTeamOutstationExpenseFailure = (state) => ({
    ...state,
    fetchOutstationTeamExpenseLoader: false,
    outstationTeamExpenseList: []
});

//fetch Travel expense

export const fetchTravelExpenseLoading = (state) => ({
    ...state,
    fetchTravelExpenseLoader: true
});

export const fetchTravelExpenseSuccess = (state, { payload }) => ({
    ...state,
    travelExpenseList: _.cloneDeep(payload),
    fetchTravelExpenseLoader: false
});

export const fetchTravelExpenseFailure = (state) => ({
    ...state,
    fetchTravelExpenseLoader: false,
    travelExpenseList: []
});

//fetch convenience expense

export const fetchConvenienceExpenseLoading = (state) => ({
    ...state,
    fetchConvenienceExpenseLoader: true
});

export const fetchConvenienceExpenseSuccess = (state, { payload }) => ({
    ...state,
    convenienceExpenseList: _.cloneDeep(payload),
    fetchConvenienceExpenseLoader: false
});

export const fetchConvenienceExpenseFailure = (state) => ({
    ...state,
    fetchConvenienceExpenseLoader: false,
    convenienceExpenseList: []
});

//fetch Hotel expense

export const fetchHotelExpenseLoading = (state) => ({
    ...state,
    fetchHotelExpenseLoader: true
});

export const fetchHotelExpenseSuccess = (state, { payload }) => ({
    ...state,
    hotelExpenseList: _.cloneDeep(payload),
    fetchHotelExpenseLoader: false
});

export const fetchHotelExpenseFailure = (state) => ({
    ...state,
    fetchHotelExpenseLoader: false,
    hotelExpenseList: []
});

// fetch Food expense

export const fetchFoodExpenseLoading = (state) => ({
    ...state,
    fetchFoodExpenseLoader: true
});

export const fetchFoodExpenseSuccess = (state, { payload }) => ({
    ...state,
    foodExpenseList: _.cloneDeep(payload),
    fetchFoodExpenseLoader: false
});

export const fetchFoodExpenseFailure = (state) => ({
    ...state,
    fetchFoodExpenseLoader: false,
    foodExpenseList: []
});

// fetch Incidental Expense

export const fetchIncidentalExpenseLoading = (state) => ({
    ...state,
    fetchIncidentalExpenseLoader: true
});

export const fetchIncidentalExpenseSuccess = (state, { payload }) => ({
    ...state,
    incidentalExpenseList: _.cloneDeep(payload),
    fetchIncidentalExpenseLoader: false
});

export const fetchIncidentalExpenseFailure = (state) => ({
    ...state,
    fetchIncidentalExpenseLoader: false,
    incidentalExpenseList: []
});

//fetch Other Expense

export const fetchOtherExpenseLoading = (state) => ({
    ...state,
    fetchOtherExpenseLoader: true
});

export const fetchOtherExpenseSuccess = (state, { payload }) => ({
    ...state,
    otherExpenseList: _.cloneDeep(payload),
    fetchOtherExpenseLoader: false
});

export const fetchOtherExpenseFailure = (state) => ({
    ...state,
    fetchOtherExpenseLoader: false,
    otherExpenseList: []
});

//fetch Local Expense

export const fetchLocalExpenseLoading = (state) => ({
    ...state,
    fetchLocalExpenseLoader: true
});

export const fetchLocalExpenseSuccess = (state, { payload }) => ({
    ...state,
    localExpenseList: _.cloneDeep(payload),
    fetchLocalExpenseLoader: false
});

export const fetchLocalExpenseFailure = (state) => ({
    ...state,
    fetchLocalExpenseLoader: false,
    localExpenseList: []
});

//fetch Approved Tour expense

export const fetchApprovedTourLoading = (state) => ({
    ...state,
    fetchApprovedTourLoader: true
});

export const fetchApprovedTourSuccess = (state, { payload }) => ({
    ...state,
    approvedTourList: _.cloneDeep(payload),
    fetchApprovedTourLoader: false
});

export const fetchApprovedTourFailure = (state) => ({
    ...state,
    fetchApprovedTourLoader: false,
    approvedTourList: []
});

export const updateApprovedTourList = (state, { payload }) => ({
    ...state,
    approvedTourList: _.cloneDeep(payload)
});

export const updateVisitExpenseList = (state, { payload }) => ({
    ...state,
    visitExpenseItem: _.cloneDeep(payload)
});

//add expense 

export const addExpenseLoading = (state) => ({
    ...state,
    addExpenseLoader: true
});

export const addExpenseSuccess = (state) => ({
    ...state,
    addExpenseLoader: false
});

export const addExpenseFailure = (state) => ({
    ...state,
    addExpenseLoader: false
});

//add travel expense

export const addTravelExpenseLoading = (state) => ({
    ...state,
    addTravelExpenseLoader: true
});

export const addTravelExpenseSuccess = (state) => ({
    ...state,
    addTravelExpenseLoader: false
});

export const addTravelExpenseFailure = (state) => ({
    ...state,
    addTravelExpenseLoader: false
});

// add convenience expense

export const addConvenienceExpenseLoading = (state) => ({
    ...state,
    addConvenienceExpenseLoader: true
});

export const addConvenienceExpenseSuccess = (state) => ({
    ...state,
    addConvenienceExpenseLoader: false
});

export const addConvenienceExpenseFailure = (state) => ({
    ...state,
    addConvenienceExpenseLoader: false
});

// add hotel expense

export const addHotelExpenseLoading = (state) => ({
    ...state,
    addHotelExpenseLoader: true
});

export const addHotelExpenseSuccess = (state) => ({
    ...state,
    addHotelExpenseLoader: false
});

export const addHotelExpenseFailure = (state) => ({
    ...state,
    addHotelExpenseLoader: false
});

// add food expense

export const addFoodExpenseLoading = (state) => ({
    ...state,
    addFoodExpenseLoader: true
});

export const addFoodExpenseSuccess = (state) => ({
    ...state,
    addFoodExpenseLoader: false
});

export const addFoodExpenseFailure = (state) => ({
    ...state,
    addFoodExpenseLoader: false
});

// add incidental expense

export const addIncidentalExpenseLoading = (state) => ({
    ...state,
    addIncidentalExpenseLoader: true
});

export const addIncidentalExpenseSuccess = (state) => ({
    ...state,
    addIncidentalExpenseLoader: false
});

export const addIncidentalExpenseFailure = (state) => ({
    ...state,
    addIncidentalExpenseLoader: false
});

// add local expense

export const addLocalExpenseLoading = (state) => ({
    ...state,
    addLocalExpenseLoader: true
});

export const addLocalExpenseSuccess = (state) => ({
    ...state,
    addLocalExpenseLoader: false
});

export const addLocalExpenseFailure = (state) => ({
    ...state,
    addLocalExpenseLoader: false
});

//add other expense

export const addOtherExpenseLoading = (state) => ({
    ...state,
    addOtherExpenseLoader: true
});

export const addOtherExpenseSuccess = (state) => ({
    ...state,
    addOtherExpenseLoader: false
});

export const addOtherExpenseFailure = (state) => ({
    ...state,
    addOtherExpenseLoader: false
});


//fetch Visit Tour reducer

export const fetchVisitTourLoading = (state) => ({
    ...state,
    fetchVisitTourLoader: true
});

export const fetchVisitTourSuccess = (state, { payload }) => ({
    ...state,
    visitList: _.cloneDeep(payload),
    fetchVisitTourLoader: false
});

export const fetchVisitTourFailure = (state) => ({
    ...state,
    fetchVisitTourLoader: false,
    visitList: []
});

export const updateVisitTourList = (state, { payload }) => ({
    ...state,
    visitList: _.cloneDeep(payload)
})

// push pop item reducer

export const updateOutstationForm = (state, { payload }) => ({
    ...state,
    selectExpense: _.cloneDeep(payload),
    outstationForm: _.cloneDeep(payload)
});

//update expense item

export const updateOutstationExpenseLoading = (state) => ({
    ...state,
    updateOutstationExpenseLoader: true
});

export const updateOutstationExpenseSuccess = (state) => ({
    ...state,
    outstationForm: {},
    updateOutstationExpenseLoader: false
});

export const updateOutstationExpenseFailure = (state) => ({
    ...state,
    updateOutstationExpenseLoader: false
});

//update travel Expense

export const updateTravelExpenseLoading = (state) => ({
    ...state,
    updateTravelExpenseLoader: true
});

export const updateTravelExpenseSuccess = (state) => ({
    ...state,
    updateTravelExpenseLoader: false
});

export const updateTravelExpenseFailure = (state) => ({
    ...state,
    updateTravelExpenseLoader: false
});

//update Hotel Expense

export const updateHotelExpenseLoading = (state) => ({
    ...state,
    updateHotelExpenseLoader: true
});

export const updateHotelExpenseSuccess = (state) => ({
    ...state,
    updateHotelExpenseLoader: false
});

export const updateHotelExpenseFailure = (state) => ({
    ...state,
    updateHotelExpenseLoader: false
});

//update Incidental Expense

export const updateIncidentalExpenseLoading = (state) => ({
    ...state,
    updateIncidentalExpenseLoader: true
});

export const updateIncidentalExpenseSuccess = (state) => ({
    ...state,
    updateIncidentalExpenseLoader: false
});

export const updateIncidentalExpenseFailure = (state) => ({
    ...state,
    updateIncidentalExpenseLoader: false
});

//update Food expense

export const updateFoodExpenseLoading = (state) => ({
    ...state,
    updateFoodExpenseLoader: true
});

export const updateFoodExpenseSuccess = (state) => ({
    ...state,
    updateFoodExpenseLoader: false
});

export const updateFoodExpenseFailure = (state) => ({
    ...state,
    updateFoodExpenseLoader: false
});

//Update Other expense

export const updateOtherExpenseLoading = (state) => ({
    ...state,
    updateOtherExpenseLoader: true
});

export const updateOtherExpenseSuccess = (state) => ({
    ...state,
    updateOtherExpenseLoader: false
});

export const updateOtherExpenseFailure = (state) => ({
    ...state,
    updateOtherExpenseLoader: false
});

//Update Convenience expense

export const updateConvenienceExpenseLoading = (state) => ({
    ...state,
    updateConvenienceExpenseLoader: true
});

export const updateConvenienceExpenseSuccess = (state) => ({
    ...state,
    updateConvenienceExpenseLoader: false
});

export const updateConvenienceExpenseFailure = (state) => ({
    ...state,
    updateConvenienceExpenseLoader: false
});

//Update Local Expense

export const updateLocalExpenseLoading = (state) => ({
    ...state,
    updateLocalExpenseLoader: true
});

export const updateLocalExpenseSuccess = (state) => ({
    ...state,
    updateLocalExpenseLoader: false
});

export const updateLocalExpenseFailure = (state) => ({
    ...state,
    updateLocalExpenseLoader: false
});

export const updateExpenseItemLoading = (state) => ({
    ...state,
    updateLocalExpenseLoader: true
});

export const updateExpenseItemSuccess = (state) => ({
    ...state,
    outstationForm: {},
    updateOutstationExpenseLoader: false
});

export const updateExpenseItemFailure = (state) => ({
    ...state,
    updateOutstationExpenseLoader: false
});

export const approveRejectLoading = (state) => ({
    ...state,
    updateOutstationExpenseLoader: true
});

export const approveRejectSuccess = (state) => ({
    ...state,
    outstationForm: {},
    updateOutstationExpenseLoader: false
});

export const approveRejectFailure = (state) => ({
    ...state,
    updateOutstationExpenseLoader: false
});

//submit expense item 

export const submitExpenseItemSuccess = (state) => ({
    ...state,
    submitExpenseItemLoader: false
});

export const submitExpenseItemFailure = (state) => ({
    ...state,
    submitExpenseItemLoader: false
});

export const submitExpenseItemLoading = (state) => ({
    ...state,
    submitExpenseItemLoader: true
});

// send for Approval

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

export const addRemarkLoading = (state) => ({
    ...state,
    updateOutstationExpenseLoader: true
});

export const addRemarkSuccess = (state) => ({
    ...state,
    outstationForm: {},
    updateOutstationExpenseLoader: false
});

export const addRemarkFailure = (state) => ({
    ...state,
    updateOutstationExpenseLoader: false
});

export const updateMonthNumber = (state, { payload }) => ({
    ...state,
    monthNumber: _.cloneDeep(payload)
});

export const updateMyOutstationExpenseList = (state, { payload }) => ({
    ...state,
    outstationExpenseList: _.cloneDeep(payload),
})

export const updateAddExpenseItemList = (state, { payload }) => {
    return {
        ...state,
        addExpenseItemList: [...state.addExpenseItemList, _.cloneDeep(payload)]
    }
};

export const selectMyOutstationExpense = (state, { payload }) => {
    return {
        ...state,
        selectMyOutstationExpense: _.cloneDeep(payload)
    }
}

export const selectExpense = (state, { payload }) => ({
    ...state,
    selectExpense: _.cloneDeep(payload)
});

export const selectTravelExpense = (state, { payload }) => ({
    ...state,
    selectTravelExpense: _.cloneDeep(payload)
});

export const selectFoodExpense = (state, { payload }) => ({
    ...state,
    selectFoodExpense: _.cloneDeep(payload)
});

export const selectHotelExpense = (state, { payload }) => ({
    ...state,
    selectHotelExpense: _.cloneDeep(payload)
});

export const selectIncidentalExpense = (state, { payload }) => ({
    ...state,
    selectIncidentalExpense: _.cloneDeep(payload)
});

export const selectOtherExpense = (state, { payload }) => ({
    ...state,
    selectOtherExpense: _.cloneDeep(payload)
});

export const selectLocalExpense = (state, { payload }) => ({
    ...state,
    selectLocalExpense: _.cloneDeep(payload)
});

export const selectConvenienceExpense = (state, { payload }) => ({
    ...state,
    selectConvenienceExpense: _.cloneDeep(payload)
});

export const selectTeamOutstationExpense = (state, { payload }) => ({
    ...state,
    selectTeamOutstationExpense: _.cloneDeep(payload)
});

export const selectMyOutstationItemExpense = (state, { payload }) => ({
    ...state,
    selectMyOutstationItemExpense: _.cloneDeep(payload)
});

export const selectTeamOutstationItemExpense = (state, { payload }) => ({
    ...state,
    selectTeamTeamOutstationExpense: _.cloneDeep(payload)
});

export const clearSelectMyOutstationExpense = (state) => ({
    ...state,
    selectMyOutstationExpense: {}
});

export const clearSelectTravelExpense = (state) => ({
    ...state,
    selectTravelExpense: {}
});

export const clearSelectExpense = (state) => ({
    ...state,
    selectExpense: {}
})

export const clearSelectTeamOutstationExpense = (state) => ({
    ...state,
    selectTeamOutstationExpense: {}
});

export const clearSelectMyOutstationItemExpense = (state) => ({
    ...state,
    selectMyOutstationItemExpense: {}
});

export const clearSelectTeamOutstationItemExpense = (state) => ({
    ...state,
    selectTeamOutstationItemExpense: {}
});

export const clearOutstationForm = (state) => ({
    ...state,
    outstationForm: {}
})

export const updateSearchFilters = (state, { payload }) => {
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


export const changeOutstationForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.outstationForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        outstationForm: {
            ...state.utstationForm,
            ...updated_form
        },
        outstationFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};

export const changeType = (state, { payload }) => {
    return {
        ...state,
        type: payload ? 'other' : 'self'
    }
};

export const outstationFormValidationFailed = (state, { payload }) => ({
    ...state,
    outstationFormValidation: {
        ...payload
    }
});

export const doNothing = (state) => ({
    ...state
});

export const clearAddExpenseItemList = (state) => ({
    ...state,
    addExpenseItemList: []
})

export const clearTravelList = (state) => ({
    ...state,
    travelExpenseList: []
})


export const clearConvenienceList = (state) => ({
    ...state,
    convenienceExpenseList: []
})

export const clearHotelList = (state) => ({
    ...state,
    hotelExpenseList: []
})

export const clearFoodList = (state) => ({
    ...state,
    foodExpenseList: []
})

export const clearIncidentalList = (state) => ({
    ...state,
    incidentalExpenseList: []
})

export const clearOtherList = (state) => ({
    ...state,
    otherExpenseList: []
})

export default clearLocalExpenseList = (state) => ({
    ...state,
    localExpenseList: []
})

export const reducer = createReducer(INITIAL_STATE, {

    [OutstationTypes.FETCH_EXPENSE_IMAGE_LOADING]: fetchExpenseImageLoading,
    [OutstationTypes.FETCH_EXPENSE_IMAGE_SUCCESS]: fetchExpenseImageSuccess,
    [OutstationTypes.FETCH_EXPENSE_IMAGE_FAILURE]: fetchExpenseImageFailure,

    [OutstationTypes.CLEAR_EXPENSE_IMAGE]: clearExpenseImage,

    [OutstationTypes.ADD_TRAVEL_LOADING]: addTravelExpenseLoading,
    [OutstationTypes.ADD_TRAVEL_SUCCESS]: addTravelExpenseSuccess,
    [OutstationTypes.ADD_TRAVEL_FAILURE]: addTravelExpenseFailure,

    [OutstationTypes.ADD_CONVENIENCE_LOADING]: addConvenienceExpenseLoading,
    [OutstationTypes.ADD_CONVENIENCE_SUCCESS]: addConvenienceExpenseSuccess,
    [OutstationTypes.ADD_CONVENIENCE_FAILURE]: addConvenienceExpenseFailure,

    [OutstationTypes.ADD_HOTEL_LOADING]: addHotelExpenseLoading,
    [OutstationTypes.ADD_HOTEL_SUCCESS]: addHotelExpenseSuccess,
    [OutstationTypes.ADD_HOTEL_FAILURE]: addHotelExpenseFailure,

    [OutstationTypes.ADD_FOOD_LOADING]: addFoodExpenseLoading,
    [OutstationTypes.ADD_FOOD_SUCCESS]: addFoodExpenseSuccess,
    [OutstationTypes.ADD_FOOD_FAILURE]: addFoodExpenseFailure,

    [OutstationTypes.ADD_INCIDENTAL_LOADING]: addIncidentalExpenseLoading,
    [OutstationTypes.ADD_INCIDENTAL_SUCCESS]: addIncidentalExpenseSuccess,
    [OutstationTypes.ADD_INCIDENTAL_FAILURE]: addIncidentalExpenseFailure,

    [OutstationTypes.ADD_LOCAL_LOADING]: addLocalExpenseLoading,
    [OutstationTypes.ADD_LOCAL_SUCCESS]: addLocalExpenseSuccess,
    [OutstationTypes.ADD_LOCAL_FAILURE]: addLocalExpenseFailure,

    [OutstationTypes.ADD_OTHER_LOADING]: addOtherExpenseLoading,
    [OutstationTypes.ADD_OTHER_SUCCESS]: addOtherExpenseSuccess,
    [OutstationTypes.ADD_OTHER_FAILURE]: addOtherExpenseFailure,

    [OutstationTypes.ADD_EXPENSE_LOADING]: addExpenseLoading,
    [OutstationTypes.ADD_EXPENSE_SUCCESS]: addExpenseSuccess,
    [OutstationTypes.ADD_EXPENSE_FAILURE]: addExpenseFailure,

    [OutstationTypes.SUBMIT_EXPENSE_ITEM_LOADING]: submitExpenseItemLoading,
    [OutstationTypes.SUBMIT_EXPENSE_ITEM_SUCCESS]: submitExpenseItemSuccess,
    [OutstationTypes.SUBMIT_EXPENSE_ITEM_FAILURE]: submitExpenseItemFailure,

    [OutstationTypes.UPDATE_ADD_EXPENSE_ITEM_LIST]: updateAddExpenseItemList,


    [OutstationTypes.FETCH_MY_OUTSTATION_EXPENSE_LOADING]: fetchMyOutstationExpenseLoading,
    [OutstationTypes.FETCH_MY_OUTSTATION_EXPENSE_SUCCESS]: fetchMyOutstationExpenseSuccess,
    [OutstationTypes.FETCH_MY_OUTSTATION_EXPENSE_FAILURE]: fetchMyOutstationExpenseFailure,


    [OutstationTypes.FETCH_MY_OUTSTATION_EXPENSE_ITEM_LOADING]: fetchMyOutstationExpenseItemLoading,
    [OutstationTypes.FETCH_MY_OUTSTATION_EXPENSE_ITEM_SUCCESS]: fetchMyOutstationExpenseItemSuccess,
    [OutstationTypes.FETCH_MY_OUTSTATION_EXPENSE_ITEM_FAILURE]: fetchMyOutstationExpenseItemFailure,


    [OutstationTypes.FETCH_TEAM_OUTSTATION_EXPENSE_LOADING]: fetchTeamOutstationExpenseLoading,
    [OutstationTypes.FETCH_TEAM_OUTSTATION_EXPENSE_SUCCESS]: fetchTeamOutstationExpenseSuccess,
    [OutstationTypes.FETCH_TEAM_OUTSTATION_EXPENSE_FAILURE]: fetchTeamOutstationExpenseFailure,

    [OutstationTypes.FETCH_TRAVEL_EXPENSE_LOADING]: fetchTravelExpenseLoading,
    [OutstationTypes.FETCH_TRAVEL_EXPENSE_SUCCESS]: fetchTravelExpenseSuccess,
    [OutstationTypes.FETCH_TRAVEL_EXPENSE_FAILURE]: fetchTravelExpenseFailure,

    [OutstationTypes.FETCH_CONVENIENCE_EXPENSE_LOADING]: fetchConvenienceExpenseLoading,
    [OutstationTypes.FETCH_CONVENIENCE_EXPENSE_SUCCESS]: fetchConvenienceExpenseSuccess,
    [OutstationTypes.FETCH_CONVENIENCE_EXPENSE_FAILURE]: fetchConvenienceExpenseFailure,


    [OutstationTypes.FETCH_FOOD_EXPENSE_LOADING]: fetchFoodExpenseLoading,
    [OutstationTypes.FETCH_FOOD_EXPENSE_SUCCESS]: fetchFoodExpenseSuccess,
    [OutstationTypes.FETCH_FOOD_EXPENSE_FAILURE]: fetchFoodExpenseFailure,

    [OutstationTypes.FETCH_HOTEL_EXPENSE_LOADING]: fetchHotelExpenseLoading,
    [OutstationTypes.FETCH_HOTEL_EXPENSE_SUCCESS]: fetchHotelExpenseSuccess,
    [OutstationTypes.FETCH_HOTEL_EXPENSE_FAILURE]: fetchHotelExpenseFailure,


    [OutstationTypes.FETCH_OTHER_EXPENSE_LOADING]: fetchOtherExpenseLoading,
    [OutstationTypes.FETCH_OTHER_EXPENSE_SUCCESS]: fetchOtherExpenseSuccess,
    [OutstationTypes.FETCH_OTHER_EXPENSE_FAILURE]: fetchOtherExpenseFailure,


    [OutstationTypes.FETCH_INCIDENTAL_EXPENSE_LOADING]: fetchIncidentalExpenseLoading,
    [OutstationTypes.FETCH_INCIDENTAL_EXPENSE_SUCCESS]: fetchIncidentalExpenseSuccess,
    [OutstationTypes.FETCH_INCIDENTAL_EXPENSE_FAILURE]: fetchIncidentalExpenseFailure,


    [OutstationTypes.FETCH_LOCAL_EXPENSE_LOADING]: fetchLocalExpenseLoading,
    [OutstationTypes.FETCH_LOCAL_EXPENSE_SUCCESS]: fetchLocalExpenseSuccess,
    [OutstationTypes.FETCH_LOCAL_EXPENSE_FAILURE]: fetchLocalExpenseFailure,

    [OutstationTypes.FETCH_APPROVED_TOUR_LOADING]: fetchApprovedTourLoading,
    [OutstationTypes.FETCH_APPROVED_TOUR_SUCCESS]: fetchApprovedTourSuccess,
    [OutstationTypes.FETCH_APPROVED_TOUR_FAILURE]: fetchApprovedTourFailure,

    [OutstationTypes.UPDATE_APPROVED_TOUR_LIST]: updateApprovedTourList,
    [OutstationTypes.UPDATE_VISIT_EXPENSE_LIST]: updateVisitExpenseList,

    [OutstationTypes.FETCH_VISIT_TOUR_LOADING]: fetchVisitTourLoading,
    [OutstationTypes.FETCH_VISIT_TOUR_SUCCESS]: fetchVisitTourSuccess,
    [OutstationTypes.FETCH_VISIT_TOUR_FAILURE]: fetchVisitTourFailure,

    [OutstationTypes.FETCH_VISIT_EXPENSE_ITEM_LOADING]: fetchVisitExpenseItemLoading,
    [OutstationTypes.FETCH_VISIT_EXPENSE_ITEM_SUCCESS]: fetchVisitExpenseItemSuccess,
    [OutstationTypes.FETCH_VISIT_EXPENSE_ITEM_FAILURE]: fetchVisitExpenseItemFailure,

    [OutstationTypes.UPDATE_VISIT_TOUR_LIST]: updateVisitTourList,


    [OutstationTypes.UPDATE_OUTSTATION_FORM]: updateOutstationForm,


    [OutstationTypes.UPDATE_OUTSTATION_EXPENSE_LOADING]: updateOutstationExpenseLoading,
    [OutstationTypes.UPDATE_OUTSTATION_EXPENSE_SUCCESS]: updateOutstationExpenseSuccess,
    [OutstationTypes.UPDATE_OUTSTATION_EXPENSE_FAILURE]: updateOutstationExpenseFailure,


    [OutstationTypes.UPDATE_EXPENSE_ITEM_LOADING]: updateExpenseItemLoading,
    [OutstationTypes.UPDATE_EXPENSE_ITEM_SUCCESS]: updateExpenseItemSuccess,
    [OutstationTypes.UPDATE_EXPENSE_ITEM_FAILURE]: updateExpenseItemFailure,


    [OutstationTypes.UPDATE_TRAVEL_EXPENSE_LOADING]: updateTravelExpenseLoading,
    [OutstationTypes.UPDATE_TRAVEL_EXPENSE_SUCCESS]: updateTravelExpenseSuccess,
    [OutstationTypes.UPDATE_TRAVEL_EXPENSE_FAILURE]: updateTravelExpenseFailure,

    [OutstationTypes.UPDATE_HOTEL_EXPENSE_LOADING]: updateHotelExpenseLoading,
    [OutstationTypes.UPDATE_HOTEL_EXPENSE_SUCCESS]: updateHotelExpenseSuccess,
    [OutstationTypes.UPDATE_HOTEL_EXPENSE_FAILURE]: updateHotelExpenseFailure,

    [OutstationTypes.UPDATE_FOOD_EXPENSE_LOADING]: updateFoodExpenseLoading,
    [OutstationTypes.UPDATE_FOOD_EXPENSE_SUCCESS]: updateFoodExpenseSuccess,
    [OutstationTypes.UPDATE_FOOD_EXPENSE_FAILURE]: updateFoodExpenseFailure,

    [OutstationTypes.UPDATE_INCIDENTAL_EXPENSE_LOADING]: updateIncidentalExpenseLoading,
    [OutstationTypes.UPDATE_INCIDENTAL_EXPENSE_SUCCESS]: updateIncidentalExpenseSuccess,
    [OutstationTypes.UPDATE_INCIDENTAL_EXPENSE_FAILURE]: updateIncidentalExpenseFailure,

    [OutstationTypes.UPDATE_OTHER_EXPENSE_LOADING]: updateOtherExpenseLoading,
    [OutstationTypes.UPDATE_OTHER_EXPENSE_SUCCESS]: updateOtherExpenseSuccess,
    [OutstationTypes.UPDATE_OTHER_EXPENSE_FAILURE]: updateOtherExpenseFailure,

    [OutstationTypes.UPDATE_CONVENIENCE_EXPENSE_LOADING]: updateConvenienceExpenseLoading,
    [OutstationTypes.UPDATE_CONVENIENCE_EXPENSE_SUCCESS]: updateConvenienceExpenseSuccess,
    [OutstationTypes.UPDATE_CONVENIENCE_EXPENSE_FAILURE]: updateConvenienceExpenseFailure,

    [OutstationTypes.UPDATE_LOCAL_EXPENSE_LOADING]: updateLocalExpenseLoading,
    [OutstationTypes.UPDATE_LOCAL_EXPENSE_SUCCESS]: updateLocalExpenseSuccess,
    [OutstationTypes.UPDATE_LOCAL_EXPENSE_FAILURE]: updateLocalExpenseFailure,


    [OutstationTypes.SEND_APPROVAL_OUTSTATION_LOADING]: sendApprovalLoading,
    [OutstationTypes.SEND_APPROVAL_OUTSTATION_SUCCESS]: sendApprovalSuccess,
    [OutstationTypes.SEND_APPROVAL_OUTSTATION_FAILURE]: sendApprovalFailure,

    [OutstationTypes.APPROVE_REJECT_OUTSTATION_LOADING]: approveRejectLoading,
    [OutstationTypes.APPROVE_REJECT_OUTSTATION_SUCCESS]: approveRejectSuccess,
    [OutstationTypes.APPROVE_REJECT_OUTSTATION_FAILURE]: approveRejectFailure,

    [OutstationTypes.ADD_OUTSTATION_REMARK_LOADING]: addRemarkLoading,
    [OutstationTypes.ADD_OUTSTATION_REMARK_SUCCESS]: addRemarkSuccess,
    [OutstationTypes.ADD_OUTSTATION_REMARK_FAILURE]: addRemarkFailure,

    [OutstationTypes.CHANGE_OUTSTATION_FORM]: changeOutstationForm,
    [OutstationTypes.OUTSTATION_FORM_VALIDATION_FAILED]: outstationFormValidationFailed,

    [OutstationTypes.UPDATE_MONTH_NUMBER]: updateMonthNumber,

    [OutstationTypes.CHANGE_TYPE]: changeType,

    [OutstationTypes.SELECT_MY_OUTSTATION_EXPENSE]: selectMyOutstationExpense,
    [OutstationTypes.CLEAR_SELECT_MY_OUTSTATION_EXPENSE]: clearSelectMyOutstationExpense,

    [OutstationTypes.SELECT_EXPENSE]: selectExpense,
    [OutstationTypes.CLEAR_SELECT_EXPENSE]: clearSelectExpense,

    [OutstationTypes.CLEAR_ADD_EXPENSE_ITEM_LIST]: clearAddExpenseItemList,

    [OutstationTypes.SELECT_TRAVEL_EXPENSE]: selectTravelExpense,
    [OutstationTypes.SELECT_FOOD_EXPENSE]: selectFoodExpense,
    [OutstationTypes.SELECT_INCIDENTAL_EXPENSE]: selectIncidentalExpense,
    [OutstationTypes.SELECT_HOTEL_EXPENSE]: selectHotelExpense,
    [OutstationTypes.SELECT_LOCAL_EXPENSE]: selectLocalExpense,
    [OutstationTypes.SELECT_OTHER_EXPENSE]: selectOtherExpense,
    [OutstationTypes.SELECT_CONVENIENCE_EXPENSE]: selectConvenienceExpense,
    [OutstationTypes.CLEAR_SELECT_TRAVEL_EXPENSE]: clearSelectTravelExpense,

    [OutstationTypes.SELECT_MY_OUTSTATION_ITEM_EXPENSE]: selectMyOutstationItemExpense,
    [OutstationTypes.CLEAR_SELECT_MY_OUTSTATION_ITEM_EXPENSE]: clearSelectMyOutstationItemExpense,

    [OutstationTypes.SELECT_TEAM_OUTSTATION_EXPENSE]: selectTeamOutstationExpense,
    [OutstationTypes.CLEAR_SELECT_TEAM_OUTSTATION_EXPENSE]: clearSelectTeamOutstationExpense,

    [OutstationTypes.SELECT_TEAM_OUTSTATION_ITEM_EXPENSE]: selectTeamOutstationItemExpense,
    [OutstationTypes.CLEAR_SELECT_TEAM_OUTSTATION_ITEM_EXPENSE]: clearSelectTeamOutstationItemExpense,

    [OutstationTypes.CLEAR_OUTSTATION_FORM]: clearOutstationForm,

    [OutstationTypes.UPDATE_MY_OUTSTATION_EXPENSE_LIST]: updateMyOutstationExpenseList,

    [OutstationTypes.UPDATE_SEARCH_FILTERS]: updateSearchFilters,

    [OutstationTypes.DO_NOTHING]: doNothing,

    [OutstationTypes.CLEAR_TRAVEL_LIST]: clearTravelList,
    [OutstationTypes.CLEAR_CONVENIENCE_LIST]: clearConvenienceList,
    [OutstationTypes.CLEAR_HOTEL_LIST]: clearHotelList,
    [OutstationTypes.CLEAR_INCIDENTAL_LIST]: clearIncidentalList,
    [OutstationTypes.CLEAR_FOOD_LIST]: clearFoodList,
    [OutstationTypes.CLEAR_OTHER_LIST]: clearOtherList,
    [OutstationTypes.CLEAR_LOCAL_EXPENSE_LIST]: clearLocalExpenseList,


});
