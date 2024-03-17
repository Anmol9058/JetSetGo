import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({


    fetchMyTour: ['payload'],
    fetchTeamTour: ['payload'],

    fetchMyTour: ['payload'],
    fetchMyTourLoading: null,
    fetchMyTourSuccess: ['payload'],
    fetchMyTourFailure: null,

    fetchTeamTour: ['payload'],
    fetchTeamTourLoading: null,
    fetchTeamTourSuccess: ['payload'],
    fetchTeamTourFailure: null,

    updateTour: ['payload'],
    updateTourLoading: null,
    updateTourSuccess: ['payload'],
    updateTourFailure: null,

    sendApprovalTour: ['payload'],
    sendApprovalLoading: null,
    sendApprovalSuccess: ['payload'],
    sendApprovalFailure: null,

    approveRejectTour: ['payload'],
    approveRejectLoading: null,
    approveRejectSuccess: ['payload'],
    approveRejectFailure: null,

    changeType: ['payload'],

    updateMonthNumber: ['payload'],

    fetchCities: ['payload'],
    fetchCitiesSuccess: ['payload'],
    fetchCitiesFailure: null,

    createTour: ['payload'],
    createTourLoading: null,
    createTourSuccess: ['payload'],
    createTourFailure: null,

    updateTourSearchFilters: ['payload'],

    clearTourForm: null,


    selectMyTour: ['payload'],

    selectTeamTour: ['payload'],


    clearSelectMyTour: null,
    clearSelectTeamTour: null,

    doNothing: null,
    clearTourForm: null,

    changeTourForm: ['payload'],
    tourFormValidationFailed: ['payload'],

    openMoreFiltersOption: null,
    closeMoreFiltersOption: null,

});

export const TourTypes = Types
export default Creators
