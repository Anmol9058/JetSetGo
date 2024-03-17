/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { InfluencersTypes } from './Actions'
import _ from 'lodash';

export const fetchInfluencersLoading = (state) => ({
    ...state,
    fetchInfluencersLoader: true
});

export const fetchInfluencersLoadingStop = (state) => ({
    ...state,
    fetchInfluencersLoader: false
});

export const fetchInfluencersSuccess = (state, { payload }) => {
    return {
        ...state,
        fetchInfluencersLoader: false,
        influencersList: _.cloneDeep(payload),
    }
};

export const fetchInfluencersFailure = (state) => ({
    ...state,
    fetchInfluencersLoader: false,
    influencersList: []
});

// fetch Influencer Site

export const fetchInfluencerSiteLoading = (state) => ({
    ...state,
    fetchInfluencerSiteLoader: true
});


export const fetchInfluencerSiteSuccess = (state, { payload }) => {
    return {
        ...state,
        fetchInfluencerSiteLoader: false,
        influencerSiteList: _.cloneDeep(payload),
    }
};

export const fetchInfluencerSiteFailure = (state) => ({
    ...state,
    fetchInfluencerSiteLoader: false,
    influencerSiteList: []
});

export const openMoreFilters = (state) => ({
    ...state,
    openMoreFilters: true
});


export const closeMoreFilters = (state) => ({
    ...state,
    openMoreFilters: false
});


export const updateSearchFilters = (state, { payload }) => {
   
    let updated_search_filters = _.cloneDeep(state.influencerSearchFilters);
    updated_search_filters[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        influencerSearchFilters: {
            ...state.influencerSearchFilters,
            ...updated_search_filters
        },
        openMoreFilters: false
    }
};

export const createContactLoading = (state) => ({
    ...state,
    createContactLoader: true
});


export const createContactLoadingStop = (state) => ({
    ...state,
    createContactLoader: false
});

export const createContactSuccess = (state, { payload }) => ({
    ...state,
    contactForm: {},
    createContactLoader: false

});

export const createContactFailure = (state, { payload }) => ({
    ...state,
    createContactLoader: false
});

export const updateContactLoading = (state) => ({
    ...state,
    updateInfluencerLoader: true
});

export const updateContactLoadingStop = (state) => ({
    ...state,
    updateInfluencerLoader: false
});

export const updateContactSuccess = (state, { payload }) => ({
    ...state,
    influencerForm: {},
    updateInfluencerLoader: false
});

export const updateContactFailure = (state, { payload }) => ({
    ...state,
    updateInfluencerLoader: false
});

export const changeInfluencerForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.influencerForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        influencerForm: {
            ...state.influencerForm,
            ...updated_form
        },
        influencerFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};

export const influencerFormValidationFailed = (state, { payload }) => ({
    ...state,
    influencerFormValidation: {
        ...payload
    }
});

export const makeDealerSearchableList = (state, { payload }) => ({
    ...state,
    dealerSearchableList: payload
});

export const makeRetailerSearchableList = (state, { payload }) => ({
    ...state,
    retailerSearchableList: payload
});

export const extractFormData = (state, { payload }) => ({
    ...state,
    influencerForm: payload
});


export const doNothing = (state) => ({
    ...state
});

export const selectInfluencer = (state, { payload }) => ({
    ...state,
    selectedInfluencer: payload
});

export const selectInfluencerSuccess = (state, { payload }) => ({
    ...state,
    selectedInfluencer: _.cloneDeep(payload)
});

export const clearSelectInfluencer = (state) => ({
    ...state,
    selectedInfluencer: {}
});

export const clearInfluencerForm = (state) => ({
    ...state,
    influencerForm: {}
});

export const makePsmSearchableList = (state, { payload }) => ({
    ...state,
    psmList: payload
});

export const reducer = createReducer(INITIAL_STATE, {

    [InfluencersTypes.FETCH_INFLUENCERS_LOADING]: fetchInfluencersLoading,
    [InfluencersTypes.FETCH_INFLUENCERS_LOADING_STOP]: fetchInfluencersLoadingStop,
    [InfluencersTypes.FETCH_INFLUENCERS_SUCCESS]: fetchInfluencersSuccess,
    [InfluencersTypes.FETCH_INFLUENCERS_FAILURE]: fetchInfluencersFailure,

    [InfluencersTypes.FETCH_INFLUENCER_SITE_LOADING]: fetchInfluencerSiteLoading,
    [InfluencersTypes.FETCH_INFLUENCER_SITE_SUCCESS]: fetchInfluencerSiteSuccess,
    [InfluencersTypes.FETCH_INFLUENCER_SITE_FAILURE]: fetchInfluencerSiteFailure,


    [InfluencersTypes.UPDATE_SEARCH_FILTERS]: updateSearchFilters,

    [InfluencersTypes.OPEN_MORE_FILTER_OPTION]: openMoreFilters,
    [InfluencersTypes.CLOSE_MORE_FILTER_OPTION]: closeMoreFilters,

    [InfluencersTypes.CREATE_INFLUENCER_LOADING]: createContactLoading,
    [InfluencersTypes.CREATE_INFLUENCER_LOADING_STOP]: createContactLoadingStop,
    [InfluencersTypes.CREATE_INFLUENCER_SUCCESS]: createContactSuccess,
    [InfluencersTypes.CREATE_INFLUENCER_FAILURE]: createContactFailure,

    [InfluencersTypes.UPDATE_INFLUENCER_LOADING]: updateContactLoading,
    [InfluencersTypes.UPDATE_INFLUENCER_LOADING_STOP]: updateContactLoadingStop,
    [InfluencersTypes.UPDATE_INFLUENCER_SUCCESS]: updateContactSuccess,
    [InfluencersTypes.UPDATE_INFLUENCER_FAILURE]: updateContactFailure,

    [InfluencersTypes.CHANGE_INFLUENCER_FORM]: changeInfluencerForm,
    [InfluencersTypes.INFLUENCER_FORM_VALIDATION_FAILED]: influencerFormValidationFailed,

    [InfluencersTypes.EXTRACT_FORM_DATA]: extractFormData,

    [InfluencersTypes.SELECT_INFLUENCER]: selectInfluencer,
    [InfluencersTypes.SELECT_INFLUENCER_SUCCESS]: selectInfluencerSuccess,
    [InfluencersTypes.CLEAR_SELECT_INFLUENCER]: clearSelectInfluencer,
    [InfluencersTypes.CLEAR_INFLUENCER_FORM]: clearInfluencerForm,

    [InfluencersTypes.MAKE_RETAILER_SEARCHABLE_LIST]: makeRetailerSearchableList,
    [InfluencersTypes.MAKE_DEALER_SEARCHABLE_LIST]: makeDealerSearchableList,
    [InfluencersTypes.MAKE_PSM_SEARCHABLE_LIST]: makePsmSearchableList,

    [InfluencersTypes.DO_NOTHING]: doNothing
});
