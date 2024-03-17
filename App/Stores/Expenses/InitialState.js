import { HelperService } from '../../Services/Utils/HelperService';
export const INITIAL_STATE={
    myExpenseList:[],
    myExpenseLoader:false,
    myExpenseLinesList:[],
    myExpenseLinesLoader:false,
    teamExpenseList:[],
    teamExpenseLoader:false,
    updateTravelExpense:{},
    updateTravelLoader:false,
    monthNumber: '',
    searchFilters: {
        selectedMonth: (new Date(HelperService.getCurrentTimestamp())).getMonth(),
    },
    
    Travell:{},
    updateTravellform:{},
    updateValidation: {
        invalid: false,
        invalid_field: ''
    },
    updateTravelExpenseLoader:false,
}