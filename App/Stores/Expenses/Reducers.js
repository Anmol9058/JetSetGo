import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ExpensesTypes } from './Actions'
import _ from 'lodash';



export const getMyExpensesLoading = (state) => ({
    ...state,
    myExpenseLoader: true
});

export const getMyExpensesSuccess = (state, { payload }) => ({
    ...state,
    myExpenseList:payload,
    myExpenseLoader: false
});

export const getmyExpensesFailure = (state) => ({
    ...state,
    myExpenseList: [],
    myExpenseLoader: false,
});

export const getMyExpenseLinesLoading = (state) => ({
    ...state,
    myExpenseLinesLoader: true
});

export const getMyExpenseLinesSuccess = (state, { payload }) => ({
    ...state,
    myExpenseLinesList:payload,
    myExpenseLinesLoader: false
});

export const getMyExpenseLinesFailure = (state) => ({
    ...state,
    myExpenseLinesList: [],
    myExpenseLinesLoader: false,
});

export const doNothing = (state) => ({
    ...state
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

export const updateTravelExpenseLoading = (state) => ({
    ...state,
    updateExpenseLoader: true
});

export const updateTravelExpenseSuccess = (state,{payload}) => ({
    ...state,
    updateTravelExpense: {},
    updateExpenseLoader: false
});

export const updateTravelExpenseFailure = (state) => ({
    ...state,
    updateExpenseLoader: false
});

export const reducer = createReducer(INITIAL_STATE, {
    [ExpensesTypes.GET_MY_EXPENSES_LOADING] :getMyExpensesLoading,
    [ExpensesTypes.GET_MY_EXPENSES_SUCCESS] :getMyExpensesSuccess,
    [ExpensesTypes.GET_MY_EXPENSES_FAILURE] :getmyExpensesFailure,
    [ExpensesTypes.GET_MY_EXPENSE_LINES_LOADING]:getMyExpenseLinesLoading,
    [ExpensesTypes.GET_MY_EXPENSE_LINES_SUCCESS]:getMyExpenseLinesSuccess,
    [ExpensesTypes.GET_MY_EXPENSE_LINES_FAILURE]:getMyExpenseLinesFailure,
    [ExpensesTypes.DO_NOTHING]              :doNothing,
    
    [ExpensesTypes.UPDATE_MONTH_NUMBER]     :updateMonthNumber,
    [ExpensesTypes.UPDATE_SEARCH_FILTERS]   :updateSearchFilters,
    [ExpensesTypes.UPDATE_TRAVEL_EXPENSE_LOADING]   :updateTravelExpenseLoading,
    [ExpensesTypes.UPDATE_TRAVEL_EXPENSE_SUCCESS]   :updateTravelExpenseSuccess,
    [ExpensesTypes.UPDATE_TRAVEL_EXPENSE_FAILURE]   :updateTravelExpenseFailure,
})