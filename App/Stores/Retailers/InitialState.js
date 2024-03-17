import { HelperService } from '../../Services/Utils/HelperService';
/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
    retailersList: [],
    dealersList: [],
    fetchRetailersLoader: false,
    fetchDealersLoader: false,

    fetchCreditLimitLoading:false,
    fetchCreditLimitList:[],
    
    fetchRetailerCompetitorsLoader: false,
    retailerSearchFilters: {
        area: '',
        distributor: '',
        type: 'Retailers',
        sortType: 'ASC',
        sortBy: '',
        searchBy: 'name',
        searchValue: '',
        selectedTab: 0,
        selectedMonth: (new Date(HelperService.getCurrentTimestamp())).getMonth(),
        editOrder:''
    },
    openMoreFilters: false,
    retailerForm: {},
    retailerUpdateForm: {},


    ComplaintForm: {},
    ComplaintUpdateForm:{},
    createComplaintLoading:false,
    createComplaintLoadingStop:false,
    createComplaintValidation: {
        invalid: false,
        invalid_field: ''
    },


    retailerFormValidation: {
        invalid: false,
        invalid_field: ''
    },
    createRetailerLoader: false,
    updateRetailerLoader: false,
    fetchRetailerOrdersLoader: false,
    retailerOrders: {}, // {key: value}, key is retailer/dealer id, values is array of orders
    updateRetailerLocationLoader: false,
    selectedRetailer: {},
    selectedDealer: {},
    retailerCompetitors: [],
    retailersOffset: 0,
    retailersLimit: 1000,
    retailerOrdersOffset: 0,
    retailerOrdersLimit: 1000,
    categories: [
        {
            id: 'A',
            name: 'A'
        },
        {
            id: 'B',
            name: 'B'
        },
        {
            id: 'C',
            name: 'C'
        }
    ],
    dealersSearchList: [],
    retailersSearchList: [],
    retailersBeatSearchList:[],
    retailerDealerSearchByLocationList: [],
    retailerDealerSearchByLocationLoader: [],
    findNearMeLoader: false,
    fetchDealerOrdersLoader: false,
    dealerOrders: {},
    fetchDealerInvoiceLoader: false,
    dealerInvoice: {},
    fetchDealerOutstandingLoader: false,
    dealerOutstanding: {},
    deleteOrderLineLoader: false,
    fetchDealerPaymentsLoader: false,
    dealerPayments: {},
    fetchInvoiceDetailLoader: false,
    allInvoiceDetailsMapping: {}, //id mapping for order details,
    paymentForm: {},
    paymentFormLoader: false,
    paymentModes: [
        {
            id: 'Digital',
            name: 'Digital',
        },
        {
            id: 'Cash',
            name: 'Cash',
        },
        {
            id: 'Cheque',
            name: 'Cheque',
        },

    ],

    countMapping: {},

 
    agentComplaintType: [],
    fetchComplaintTypeLoading: false,
    fetchComplaintTypeFailure: false,

    agentSubComplaintType: [],
    fetchSubComplaintTypeLoading: false,
    fetchSubComplaintTypeFailure: false,

    agentfetchOrderComplaints:[],
    fetchOrderComplaintLoading: false,
	fetchOrderComplaintFailure: false,

    agentfetchInvoice:[],
    fetch:[],
    fetchInvoiceComplaintLoading:false,
    fetchInvoiceComplaintFailure:false,

    agentComplaints: [],
    fetchComplaintsLoading: false,
    fetchComplaintsFailure: false,


partiesMapping:{},
createCompetitorLoader: false,
newCompetitorForm: {

},

fetchDsrLoader: false,
dsrList: [],

fetchDsrAreaLoader: false,
dsrAreaList: [],
dsrArea: [],

createDsrLoader: false,

dsrForm: {},
dsrFormValidation: {
    invalid: false,
    invalid_field: ''
},

dsrAreaForm: {},
createDsrAreaLoader: false,

fetchDsrAreaListLoader: false,


OrderSearchFilters: {

    
     selectedDateType: 'Date', //or Month,
     selectedMonth: (new Date(HelperService.getCurrentTimestamp())).getMonth(),
     selectedYear: (new Date(HelperService.getCurrentTimestamp())).getFullYear(),
    
 },

 targetSearchFilters:{
    selectedYear: (new Date(HelperService.getCurrentTimestamp())).getFullYear(),


 },
 cartQuantity: {
  
},
editOrderQuantityLoader: false,
addOrderLineLoader: false,

addOrderForm:{
    status:false
},

editOrderForm:{
    
},

agentTarget:[],
getRetailerTargetLoading:false,

}