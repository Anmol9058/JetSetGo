/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ExpenseTypes } from './Actions'
import _ from 'lodash';

export const fetchLocalItemLoading = (state) => ({
    ...state,
    fetchLocalItemLoader: true
});

export const fetchLocalItemSuccess = (state, { payload }) => ({
    ...state,
    localItemList: _.cloneDeep(payload),
    fetchLocalItemLoader: false
});

export const fetchLocalItemFailure = (state) => ({
    ...state,
    fetchLocalItemLoader: false,
    localItemList: []
});

// fetch team  item reducer

export const fetchOutstationItemLoading = (state) => ({
    ...state,
    fetchOutstationItemLoader: true
});

export const fetchOutstationItemSuccess = (state, { payload }) => ({
    ...state,
    outstationItemList: _.cloneDeep(payload),
    fetchOutstationItemLoader: false
});

export const fetchOutstationItemFailure = (state) => ({
    ...state,
    fetchOutstationItemLoader: false,
    outstationItemList: []
});


export const updateMonthNumber = (state, { payload }) => ({
    ...state,
    monthNumber: _.cloneDeep(payload)
});

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

export const doNothing = (state) => ({
    ...state
});


export const reducer = createReducer(INITIAL_STATE, {

    [ExpenseTypes.FETCH_LOCAL_ITEM_LOADING]: fetchLocalItemLoading,
    [ExpenseTypes.FETCH_LOCAL_ITEM_SUCCESS]: fetchLocalItemSuccess,
    [ExpenseTypes.FETCH_LOCAL_ITEM_FAILURE]: fetchLocalItemFailure,


    [ExpenseTypes.FETCH_OUTSTATION_ITEM_LOADING]: fetchOutstationItemLoading,
    [ExpenseTypes.FETCH_OUTSTATION_ITEM_SUCCESS]: fetchOutstationItemSuccess,
    [ExpenseTypes.FETCH_OUTSTATION_ITEM_FAILURE]: fetchOutstationItemFailure,


    [ExpenseTypes.UPDATE_MONTH_NUMBER]: updateMonthNumber,

    [ExpenseTypes.UPDATE_SEARCH_FILTERS]: updateSearchFilters,

    [ExpenseTypes.DO_NOTHING]: doNothing,

});
