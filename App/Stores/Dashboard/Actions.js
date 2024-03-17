import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    changeDashboardSearchFilters: ['payload'],

    getOrderValue: ['payload'],
    getVisitCount: ['payload'],
    getSiteCount: ['payload'],
    getCounters: ['payload'],
    getEventCount: ['payload'],
    getDashboardSummary: ['payload'],

    getTargetTeam: ['payload'],
    getTargetTeamSuccess: ['payload'],
    getTargetTeamFailure: null,
    getTargetTeamLoading: null,

    updateSearchFilters: ['payload'],


    getOrderValueSuccess: ['payload'],
    getVisitCountSuccess: ['payload'],
    getSiteCountSuccess: ['payload'],
    getCountersSuccess: ['payload'],
    getEventCountSuccess: ['payload'],
    getDashboardSummarySuccess: ['payload'],

    getOrderValueFailure: null,
    getVisitCountFailure: null,
    getSiteCountFailure: null,
    getCountersFailure: null,
    getEventCountFailure: null,
    getDashboardSummaryFailure: null,


    getOrderValueLoading: null,
    getVisitCountLoading: null,
    getSiteCountLoading: null,
    getCountersLoading: null,
    getEventCountLoading: null,
    getDashboardSummaryLoading: null,



    getOrderValueLoadingStop: null,
    getVisitCountLoadingStop: null,
    getSiteCountLoadingStop: null,
    getCountersLoadingStop: null,
    getEventCountLoadingStop: null,
    getDashboardSummaryLoadingStop: null,

    doNothing: null
});

export const DashboardTypes = Types
export default Creators
