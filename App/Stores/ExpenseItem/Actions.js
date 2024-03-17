import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({

    fetchLocalItem: ['payload'],
    fetchLocalItemLoading: null,
    fetchLocalItemSuccess: ['payload'],
    fetchLocalItemFailure: null,


    fetchOutstationItem: ['payload'],
    fetchOutstationItemLoading: null,
    fetchOutstationItemSuccess: ['payload'],
    fetchOutstationItemFailure: null,

    moveLocalToOutstationExpense: ['payload'],
    moveOutstationToLocalExpense: ['payload'],

    updateMonthNumber: ['payload'],

    updateSearchFilters: ['payload'],

    doNothing: null

});

export const ExpenseTypes = Types
export default Creators