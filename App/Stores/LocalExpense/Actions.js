import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({

    fetchLocalExpenseData: ['payload'],
    fetchLocalItemExpenses: ['payload'],
    fetchTeamExpenses: ['payload'],
    fetchTeamItemExpenses: ['payload'],

    uploadLocalImage: ['payload'],
    uploadLocalImageLoading: null,
    uploadLocalImageSuccess: null,
    uploadLocalImageFailure: null,

    fetchLocalImage: ['payload'],
    fetchLocalImageLoading: null,
    fetchLocalImageSuccess: ['payload'],
    fetchLocalImageFailure: null,

    fetchRetailerList: ['payload'],
    fetchDealerList: ['payload'],

    fetchLocalExpenseLoading: null,
    fetchLocalExpenseSuccess: ['payload'],
    fetchLocalExpenseFailure: null,

    fetchTeamExpenseLoading: null,
    fetchTeamExpenseSuccess: ['payload'],
    fetchTeamExpenseFailure: null,

    fetchLocalExpenseItemLoading: null,
    fetchLocalExpenseItemSuccess: ['payload'],
    fetchLocalExpenseItemFailure: null,

    fetchTeamExpenseItemLoading: null,
    fetchTeamExpenseItemSuccess: ['payload'],
    fetchTeamExpenseItemFailure: null,

    updateExpense: ['payload'],
    updateExpenseLoading: null,
    updateExpenseSuccess: ['payload'],
    updateExpenseFailure: null,

    sendApprovalLocalExpense: ['payload'],
    sendApprovalLoading: null,
    sendApprovalSuccess: ['payload'],
    sendApprovalFailure: null,

    approveRejectLocalExpense: ['payload'],
    approveRejectLoading: null,
    approveRejectSuccess: ['payload'],
    approveRejectFailure: null,

    addRemark: ['payload'],
    addRemarkLoading: null,
    addRemarkSuccess: ['payload'],
    addRemarkFailure: null,

    changeType: ['payload'],

    clearLocalExpense: null,
    clearTeamExpense: null,

    changeExpenseForm: ['payload'],
    expenseFormValidationFailed: ['payload'],

    updateMonthNumber: ['payload'],

    updateLocalExpenseList: ['payload'],

    selectLocalExpense: ['payload'],
    selectLocalItemExpense: ['payload'],
    selectTeamExpense: ['payload'],
    selectTeamItemExpense: ['payload'],

    updateExpenseForm: ['payload'],


    clearSelectLocalExpense: null,
    clearSelectLocalItemExpense: null,
    clearSelectTeamExpense: null,
    clearSelectTeamItemExpense: null,
    clearLocalExpenseItemList: null,
    clearTeamExpenseItemList: null,

    clearExpenseForm: null,

    updateSearchFilters: ['payload'],

    doNothing: null

});

export const LocalTypes = Types
export default Creators