import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({
    getMyExpenses:['payload'],
    getMyExpensesLoading: null,
    getMyExpensesSuccess:['payload'],
    getMyExpensesFailure:null,
    
    getMyExpenseLines:['payload'],
    getMyExpenseLinesLoading: null,
    getMyExpenseLinesSuccess:['payload'],
    getMyExpenseLinesFailure:null,

    doNothing: null,
    
    getTeamExpenses:['payload'],
    getTeamExpensesLoading: null,
    getTeamExpensesSuccess:['payload'],
    getTeamExpensesFailure:null,

    updateMonthNumber: ['payload'],
    updateSearchFilters: ['payload'],

   
    
    // updateTravelExpense:['payload'],
    // updateTravelExpenseSuccess:['payload'],
    // updateTravelExpenseFailure:null,
    // updateTravelExpenseLoading:null,
    
    // changeTravelExpense:['payload'],
    // updateTravelFormValidationFailed: ['payload'],
    // changeTravelExpenseForm: ['payload'],
    // clearExpense: null,

    updateTravelExpense:['payload'],
    updateTravelExpenseLoading:null,
    updateTravelExpenseSuccess:['payload'],
    updateTravelExpenseFailure:null,

})

export const ExpensesTypes = Types
export default Creators