import { HelperService } from "../../Services/Utils/HelperService";

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {

    cityList: [],
    myTourList: [],
    teamTourList: [],

    type: '',

    createTourLoader: false,
    fetchMyTourLoader: false,
    fetchTeamTourLoader: false,
    updateTourLoader: false,
    sendApprovalLoader: false,

    tourForm: {},
    tourFormValidation: {
        invalid: false,
        invalid_field: ''
    },

    monthNumber: '',

    searchFilters: {
        selectedMonth: (new Date(HelperService.getCurrentTimestamp())).getMonth(),
    },


    selectMyTour: {},
    selectTeamTour: {},


    expenseForm: {},
    expenseFormValidation: {
        invalid: false,
        invalid_field: ''
    },


    tourSearchFilters: {
        area: '',
        type: 'Tours',
        sortType: 'ASC',
        sortBy: '',
        searchBy: 'name',
        searchValue: ''
    },

    modeOfTravelList: [
        {
            'label': 'Two Wheeler',
            'value': 'Two Wheeler'
        }, {
            'label': 'Car',
            'value': 'Car'
        }],

    openMoreFilters: false
}
