import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({

    fetchMyOutstationExpenses: ['payload'],
    fetchMyOutstationItemExpenses: ['payload'],
    fetchTeamOutstationExpenses: ['payload'],
    fetchTeamOutstationItemExpenses: ['payload'],


    addTravelExpense: ['payload'],
    addTravelLoading: null,
    addTravelSuccess: null,
    addTravelFailure: null,

    addConvenienceExpense: ['payload'],
    addConvenienceLoading: null,
    addConvenienceSuccess: null,
    addConvenienceFailure: null,

    addHotelExpense: ['payload'],
    addHotelLoading: null,
    addHotelSuccess: null,
    addHotelFailure: null,

    addFoodExpense: ['payload'],
    addFoodLoading: null,
    addFoodSuccess: null,
    addFoodFailure: null,

    addIncidentalExpense: ['payload'],
    addIncidentalLoading: null,
    addIncidentalSuccess: null,
    addIncidentalFailure: null,

    addOtherExpense: ['payload'],
    addOtherLoading: null,
    addOtherSuccess: null,
    addOtherFailure: null,

    addLocalExpense: ['payload'],
    addLocalLoading: null,
    addLocalSuccess: null,
    addLocalFailure: null,

    addExpense: ['payload'],
    addExpenseLoading: null,
    addExpenseSuccess: null,
    addExpenseFailure: null,

    fetchExpenseImage: ['payload'],
    fetchExpenseImageLoading: null,
    fetchExpenseImageSuccess: ['payload'],
    fetchExpenseImageFailure: null,

    clearExpenseImage: null,

    fetchMyOutstationExpenseLoading: null,
    fetchMyOutstationExpenseSuccess: ['payload'],
    fetchMyOutstationExpenseFailure: null,


    fetchTeamOutstationExpenseLoading: null,
    fetchTeamOutstationExpenseSuccess: ['payload'],
    fetchTeamOutstationExpenseFailure: null,

    fetchMyOutstationExpenseItemLoading: null,
    fetchMyOutstationExpenseItemSuccess: ['payload'],
    fetchMyOutstationExpenseItemFailure: null,

    fetchTravelExpenses: ['payload'],
    fetchTravelExpenseLoading: null,
    fetchTravelExpenseSuccess: ['payload'],
    fetchTravelExpenseFailure: null,

    fetchConvenienceExpenses: ['payload'],
    fetchConvenienceExpenseLoading: null,
    fetchConvenienceExpenseSuccess: ['payload'],
    fetchConvenienceExpenseFailure: null,

    fetchHotelExpenses: ['payload'],
    fetchHotelExpenseLoading: null,
    fetchHotelExpenseSuccess: ['payload'],
    fetchHotelExpenseFailure: null,

    fetchFoodExpenses: ['payload'],
    fetchFoodExpenseLoading: null,
    fetchFoodExpenseSuccess: ['payload'],
    fetchFoodExpenseFailure: null,

    fetchIncidentalExpenses: ['payload'],
    fetchIncidentalExpenseLoading: null,
    fetchIncidentalExpenseSuccess: ['payload'],
    fetchIncidentalExpenseFailure: null,

    fetchOtherExpenses: ['payload'],
    fetchOtherExpenseLoading: null,
    fetchOtherExpenseSuccess: ['payload'],
    fetchOtherExpenseFailure: null,

    fetchLocalExpenses: ['payload'],
    fetchLocalExpenseLoading: null,
    fetchLocalExpenseSuccess: ['payload'],
    fetchLocalExpenseFailure: null,

    fetchApprovedTour: ['payload'],
    fetchApprovedTourLoading: null,
    fetchApprovedTourSuccess: ['payload'],
    fetchApprovedTourFailure: null,

    fetchVisitByTour: ['payload'],
    fetchVisitTourLoading: null,
    fetchVisitTourSuccess: ['payload'],
    fetchVisitTourFailure: null,

    fetchVisitExpenseItem: ['payload'],
    fetchVisitExpenseItemLoading: null,
    fetchVisitExpenseItemSuccess: ['payload'],
    fetchVisitExpenseItemFailure: null,

    submitExpenseItem: ['payload'],
    submitExpenseItemLoading: null,
    submitExpenseItemSuccess: null,
    submitExpenseItemFailure: null,

    updateFormData: ['payload'],

    // fetchTeamOutstationExpenseItemLoading: null,
    // fetchTeamOutstationExpenseItemSuccess: ['payload'],
    // fetchTeamOutstationExpenseItemFailure: null,

    updateOutstationExpense: ['payload'],

    updateTravelExpense: ['payload'],
    updateTravelExpenseLoading: null,
    updateTravelExpenseSuccess: ['payload'],
    updateTravelExpenseFailure: null,


    updateConvenienceExpense: ['payload'],
    updateConvenienceExpenseLoading: null,
    updateConvenienceExpenseSuccess: ['payload'],
    updateConvenienceExpenseFailure: null,


    updateHotelExpense: ['payload'],
    updateHotelExpenseLoading: null,
    updateHotelExpenseSuccess: ['payload'],
    updateHotelExpenseFailure: null,

    updateIncidentalExpense: ['payload'],
    updateIncidentalExpenseLoading: null,
    updateIncidentalExpenseSuccess: ['payload'],
    updateIncidentalExpenseFailure: null,


    updateFoodExpense: ['payload'],
    updateFoodExpenseLoading: null,
    updateFoodExpenseSuccess: ['payload'],
    updateFoodExpenseFailure: null,


    updateOtherExpense: ['payload'],
    updateOtherExpenseLoading: null,
    updateOtherExpenseSuccess: ['payload'],
    updateOtherExpenseFailure: null,

    updateLocalExpense: ['payload'],
    updateLocalExpenseLoading: null,
    updateLocalExpenseSuccess: ['payload'],
    updateLocalExpenseFailure: null,

    updateOutstationExpenseLoading: null,
    updateOutstationExpenseSuccess: ['payload'],
    updateOutstationExpenseFailure: null,

    updateApprovedTourList: ['payload'],
    updateVisitTourList: ['payload'],
    updateVisitExpenseList: ['payload'],
    updateAddExpenseItemList: ['payload'],

    updateExpenseItem: ['payload'],
    updateExpenseItemLoading: null,
    updateExpenseItemSuccess: ['payload'],
    updateExpenseItemFailure: null,

    sendApproval: ['payload'],
    sendApprovalLoading: null,
    sendApprovalSuccess: ['payload'],
    sendApprovalFailure: null,

    approveRejectExpense: ['payload'],
    approveRejectLoading: null,
    approveRejectSuccess: ['payload'],
    approveRejectFailure: null,

    changeType: ['payload'],

    changeOutstationForm: ['payload'],
    updateOutstationForm: ['payload'],
    outstationFormValidationFailed: ['payload'],

    updateMonthNumber: ['payload'],
    updateLocalExpenseStatus: ['payload'],
    updateEmailStatus: ['payload'],

    updateMyOutstationExpenseList: ['payload'],

    selectMyOutstationExpense: ['payload'],
    selectMyOutstationItemExpense: ['payload'],
    selectTeamOutstationExpense: ['payload'],
    selectTeamOutstationItemExpense: ['payload'],
    selectExpense: ['payload'],

    selectTravelExpense: ['payload'],
    selectFoodExpense: ['payload'],
    selectIncidentalExpense: ['payload'],
    selectHotelExpense: ['payload'],
    selectConvenienceExpense: ['payload'],
    selectLocalExpense: ['payload'],
    selectOtherExpense: ['payload'],

    sendApprovalOutstationExpense: ['payload'],
    sendApprovalOutstationLoading: null,
    sendApprovalOutstationSuccess: ['payload'],
    sendApprovalOutstationFailure: null,

    approveRejectOutstationExpense: ['payload'],
    approveRejectOutstationLoading: null,
    approveRejectOutstationSuccess: ['payload'],
    approveRejectOutstationFailure: null,

    addOutstationRemark: ['payload'],
    addOutstationRemarkLoading: null,
    addOutstationRemarkSuccess: ['payload'],
    addOutstationRemarkFailure: null,


    clearSelectMyOutstationExpense: null,
    clearSelectMyOutstationItemExpense: null,
    clearSelectTeamOutstationExpense: null,
    clearSelectTeamOutstationItemExpense: null,
    clearSelectExpense: null,
    clearSelectTravelExpense: null,
    clearAddExpenseItemList: null,


    clearTravelList: null,
    clearHotelList: null,
    clearFoodList: null,
    clearIncidentalList: null,
    clearOtherList: null,
    clearConvenienceList: null,
    clearLocalExpenseList: null,

    clearOutstationForm: null,

    updateSearchFilters: ['payload'],

    doNothing: null

});

export const OutstationTypes = Types
export default Creators