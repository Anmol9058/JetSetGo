/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SitesTypes } from './Actions'
import _ from 'lodash';


// create site reducer
export const createSiteLoading = (state) => ({
    ...state,
    createSiteLoader: true
});

export const createSiteSuccess = (state) => ({
    ...state,
    siteForm: {},
    createSiteLoader: false

});


export const createSiteFailure = (state) => ({
    ...state,
    createSiteLoader: false
});

// update site reducer
export const updateSiteLoading = (state) => ({
    ...state,
    updateSiteLoader: true
});

export const updateSiteSuccess = (state) => ({
    ...state,
    siteForm: {},
    updateSiteLoader: false
});

export const updateSiteFailure = (state) => ({
    ...state,
    updateSiteLoader: false
});

// create site reducer

export const createSiteProductLoading = (state) => ({
    ...state,
    createSiteProductLoader: true
});

export const createSiteProductSuccess = (state) => ({
    ...state,
    siteProductForm: {},
    createSiteProductLoader: false

});


export const createSiteProductFailure = (state) => ({
    ...state,
    createSiteProductLoader: false
});

// update site reducer
export const updateSiteProductLoading = (state) => ({
    ...state,
    updateSiteProductLoader: true
});

export const updateSiteProductSuccess = (state) => ({
    ...state,
    siteProductForm: {},
    updateSiteProductLoader: false
});

export const updateSiteProductFailure = (state) => ({
    ...state,
    updateSiteProductLoader: false
});


// fetch sites reducer

export const fetchSitesLoading = (state) => ({
    ...state,
    fetchSitesLoader: true
});

export const fetchSitesSuccess = (state, { payload }) => ({
    ...state,
    sitesList: _.cloneDeep(payload),
    fetchSitesLoader: false
});

export const fetchSitesFailure = (state) => ({
    ...state,
    fetchSitesLoader: false,
    sitesList: []
});

// fetch sites  product reducer

export const fetchSiteProductsLoading = (state) => ({
    ...state,
    fetchSiteProductLoader: true
});

export const fetchSiteProductsSuccess = (state, { payload }) => ({
    ...state,
    siteProductList: _.cloneDeep(payload),
    fetchSiteProductLoader: false
});

export const fetchSiteProductsFailure = (state) => ({
    ...state,
    fetchSiteProductLoader: false,
    siteProductList: []
});

// site form reducer

export const changeSiteForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.siteForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        siteForm: {
            ...state.siteForm,
            ...updated_form
        },
        siteFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};

export const siteFormValidationFailed = (state, { payload }) => ({
    ...state,
    siteFormValidation: {
        ...payload
    }
});

// site Product form
export const changeSiteProductForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.siteProductForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        siteProductForm: {
            ...state.siteProductForm,
            ...updated_form
        },
        siteProductFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};

export const siteProductFormValidationFailed = (state, { payload }) => ({
    ...state,
    siteProductFormValidation: {
        ...payload
    }
});

export const extractSiteProductFormData = (state, { payload }) => ({
    ...state,
    siteProductForm: payload
});

export const clearSiteProductForm = (state) => ({
    ...state,
    siteProductForm: {}
});

// site extract form data

export const extractFormData = (state, { payload }) => ({
    ...state,
    siteForm: payload
});

export const clearSiteForm = (state) => ({
    ...state,
    siteForm: {}
});

// select site reducer

export const selectSite = (state, { payload }) => ({
    ...state,
    selectedSite: payload
});

export const selectSiteSuccess = (state, { payload }) => ({
    ...state,
    selectedSite: _.cloneDeep(payload)
});

export const clearSelectSite = (state) => ({
    ...state,
    selectedSite: {}
});

//select site product reducer

export const selectSiteProduct = (state, { payload }) => ({
    ...state,
    selectedSiteProduct: payload
});

export const selectSiteProductSuccess = (state, { payload }) => ({
    ...state,
    selectedSiteProduct: _.cloneDeep(payload)
});

export const clearSelectSiteProduct = (state) => ({
    ...state,
    selectedSiteProduct: {}
});

// site filter reducer

export const openMoreFilters = (state) => ({
    ...state,
    openMoreFilters: true
});


export const closeMoreFilters = (state) => ({
    ...state,
    openMoreFilters: false
});

export const updateSearchFilters = (state, { payload }) => {
    let updated_search_filters = _.cloneDeep(state.siteSearchFilters);
    updated_search_filters[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        siteSearchFilters: {
            ...state.siteSearchFilters,
            ...updated_search_filters
        },
        openMoreFilters: false
    }
};

//fill searchableList

export const makeRetailerSearchableList = (state, { payload }) => ({
    ...state,
    retailerSearchableList: _.cloneDeep(payload)
})

export const makeInfluencerSearchableList = (state, { payload }) => ({
    ...state,
    influencerSearchableList: _.cloneDeep(payload)
});

export const makeDealerSearchableList = (state, { payload }) => ({
    ...state,
    dealerSearchableList: _.cloneDeep(payload)
});


export const makeProductSubSubCategorySearchableList = (state, { payload }) => ({
    ...state,
    productSubSubCategoryList: _.cloneDeep(payload)
});

export const makeProductSubCategorySearchableList = (state, { payload }) => ({
    ...state,
    productSubCategoryList: _.cloneDeep(payload)
});

export const makeProductCategorySearchableList = (state, { payload }) => ({
    ...state,
    productCategoryList: _.cloneDeep(payload)
});

export const makeProductSearchableList = (state, { payload }) => ({
    ...state,
    productList: _.cloneDeep(payload)
});

export const makePsmSearchableList = (state, { payload }) => ({
    ...state,
    psmList: _.cloneDeep(payload)
});

// utils reducer

export const doNothing = (state) => ({
    ...state
});

export const reducer = createReducer(INITIAL_STATE, {

    [SitesTypes.CREATE_SITE_LOADING]: createSiteLoading,
    [SitesTypes.CREATE_SITE_SUCCESS]: createSiteSuccess,
    [SitesTypes.CREATE_SITE_FAILURE]: createSiteFailure,

    [SitesTypes.UPDATE_SITE_LOADING]: updateSiteLoading,
    [SitesTypes.UPDATE_SITE_SUCCESS]: updateSiteSuccess,
    [SitesTypes.UPDATE_SITE_FAILURE]: updateSiteFailure,

    [SitesTypes.CREATE_SITE_PRODUCT_LOADING]: createSiteProductLoading,
    [SitesTypes.CREATE_SITE_PRODUCT_SUCCESS]: createSiteProductSuccess,
    [SitesTypes.CREATE_SITE_PRODUCT_FAILURE]: createSiteProductFailure,

    [SitesTypes.UPDATE_SITE_PRODUCT_LOADING]: updateSiteProductLoading,
    [SitesTypes.UPDATE_SITE_PRODUCT_SUCCESS]: updateSiteProductSuccess,
    [SitesTypes.UPDATE_SITE_PRODUCT_FAILURE]: updateSiteProductFailure,

    [SitesTypes.MAKE_RETAILER_SEARCHABLE_LIST]: makeRetailerSearchableList,
    [SitesTypes.MAKE_INFLUENCER_SEARCHABLE_LIST]: makeInfluencerSearchableList,
    [SitesTypes.MAKE_DEALER_SEARCHABLE_LIST]: makeDealerSearchableList,

    [SitesTypes.MAKE_PSM_SEARCHABLE_LIST]: makePsmSearchableList,
    [SitesTypes.MAKE_PRODUCT_SEARCHABLE_LIST]: makeProductSearchableList,
    [SitesTypes.MAKE_PRODUCT_CATEGORY_SEARCHABLE_LIST]: makeProductCategorySearchableList,
    [SitesTypes.MAKE_PRODUCT_SUB_CATEGORY_SEARCHABLE_LIST]: makeProductSubCategorySearchableList,
    [SitesTypes.MAKE_PRODUCT_SUB_SUB_CATEGORY_SEARCHABLE_LIST]: makeProductSubSubCategorySearchableList,

    [SitesTypes.CHANGE_SITE_FORM]: changeSiteForm,
    [SitesTypes.SITE_FORM_VALIDATION_FAILED]: siteFormValidationFailed,
    [SitesTypes.CLEAR_SITE_FORM]: clearSiteForm,
    [SitesTypes.EXTRACT_FORM_DATA]: extractFormData,

    [SitesTypes.CHANGE_SITE_PRODUCT_FORM]: changeSiteProductForm,
    [SitesTypes.SITE_PRODUCT_FORM_VALIDATION_FAILED]: siteProductFormValidationFailed,
    [SitesTypes.CLEAR_SITE_PRODUCT_FORM]: clearSiteProductForm,
    [SitesTypes.EXTRACT_SITE_PRODUCT_FORM_DATA]: extractSiteProductFormData,

    [SitesTypes.OPEN_MORE_FILTERS_OPTION]: openMoreFilters,
    [SitesTypes.CLOSE_MORE_FILTERS_OPTION]: closeMoreFilters,

    [SitesTypes.FETCH_SITES_LOADING]: fetchSitesLoading,
    [SitesTypes.FETCH_SITES_SUCCESS]: fetchSitesSuccess,
    [SitesTypes.FETCH_SITES_FAILURE]: fetchSitesFailure,

    [SitesTypes.FETCH_SITE_PRODUCTS_LOADING]: fetchSiteProductsLoading,
    [SitesTypes.FETCH_SITE_PRODUCTS_SUCCESS]: fetchSiteProductsSuccess,
    [SitesTypes.FETCH_SITE_PRODUCTS_FAILURE]: fetchSiteProductsFailure,

    [SitesTypes.UPDATE_SEARCH_FILTERS]: updateSearchFilters,

    [SitesTypes.SELECT_SITE]: selectSite,
    [SitesTypes.SELECT_SITE_SUCCESS]: selectSiteSuccess,
    [SitesTypes.CLEAR_SELECT_SITE]: clearSelectSite,

    [SitesTypes.SELECT_SITE_PRODUCT]: selectSiteProduct,
    [SitesTypes.SELECT_SITE_PRODUCT_SUCCESS]: selectSiteProductSuccess,
    [SitesTypes.CLEAR_SELECT_SITE_PRODUCT]: clearSelectSiteProduct,

    [SitesTypes.DO_NOTHING]: doNothing,

});
