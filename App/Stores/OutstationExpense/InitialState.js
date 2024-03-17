import { HelperService } from '../../Services/Utils/HelperService';


export const INITIAL_STATE = {

    outstationExpenseList: [],
    outstationTeamExpenseList: [],
    outstationExpenseItemList: [],
    travelExpenseList: [],
    convenienceExpenseList: [],
    hotelExpenseList: [],
    foodExpenseList: [],
    incidentalExpenseList: [],
    otherExpenseList: [],
    localExpenseList: [],
    approvedTourList: [],
    visitList: [],
    visitExpenseItem: [],
    addExpenseItemList: [],

    type: '',

    fetchMyOutstationExpenseLoader: false,
    fetchOutstationTeamExpenseLoader: false,
    fetchMyOutstationExpenseItemLoader: false,
    fetchOutstationTeamExpenseItemLoader: false,
    fetchTravelExpenseLoader: false,
    fetchConvenienceExpenseLoader: false,
    fetchHotelExpenseLoader: false,
    fetchFoodExpenseLoader: false,
    fetchIncidentalExpenseLoader: false,
    fetchOtherExpenseLoader: false,
    fetchLocalExpenseLoader: false,
    fetchApprovedTourLoader: false,
    fetchVisitTourLoader: false,
    fetchVisitExpenseItemLoader: false,
    addExpenseLoader: false,
    submitExpenseItemLoader: false,
    sendApprovalLoader: false,
    fetchExpenseImageLoader: false,

    addTravelExpenseLoader: false,
    addConvenienceExpenseLoader: false,
    addHotelExpenseLoader: false,
    addIncidentalExpenseLoader: false,
    addFoodExpenseLoader: false,
    addLocalExpenseLoader: false,
    addOtherExpenseLoader: false,

    updateTravelExpenseLoader: false,
    updateHotelExpenseLoader: false,
    updateIncidentalExpenseLoader: false,
    updateFoodExpenseLoader: false,
    updateOtherExpenseLoader: false,
    updateLocalExpenseLoader: false,
    updateConvenienceExpenseLoader: false,

    updateOutstationExpenseLoader: false,
    sendApprovalLoader: false,

    monthNumber: '',

    searchFilters: {
        selectedMonth: (new Date(HelperService.getCurrentTimestamp())).getMonth(),
    },

    selectMyOutstationExpense: {},
    selectTeamOutstationExpense: {},
    selectMyOutstationExpenseItem: {},
    selectTeamOutstationExpenseItem: {},
    selectTravelExpense: {},
    selecFoodExpense: {},
    selectIncidentalExpense: {},
    selectHotelExpense: {},
    selectOtherExpense: {},
    selectConvenienceExpense: {},
    selectLocalExpense: {},

    outstationForm: {},
    outstationFormValidation: {
        invalid: false,
        invalid_field: ''
    },

    outstationOffset: 0,
    outstationLimit: 1000,

    expenseImage: [],

    modeOfTravelList: [
        {
            'label': 'Railway',
            'value': 'Railway'
        }, {
            'label': 'Airways',
            'value': 'Airways'
        },
        {
            'label': 'Bus Tickets',
            'value': 'Bus Tickets'
        },
        {
            'label': 'Taxi',
            'value': 'Taxi'
        },
        {
            'label': 'Own Vehicle',
            'value': 'Own Vehicle'
        }
    ],

    companyPaidList: [
        {
            'label': 'Yes',
            'value': true
        }, {
            'label': 'No',
            'value': false
        }
    ],

    haveBillsList: [
        {
            'label': 'Yes',
            'value': true
        }, {
            'label': 'No',
            'value': false
        }
    ],
    stayTypeList: [
        {
            'label': 'Hotel',
            'value': 'Hotel'
        },
        {
            'label': 'Own Arrangement',
            'value': 'Own Arrangement'
        },
        {
            'label': 'Daily Allowance',
            'value': 'Daily Allowance'
        }
    ]


}
