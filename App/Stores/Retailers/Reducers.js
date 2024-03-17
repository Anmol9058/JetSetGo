/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { RetailersTypes } from './Actions'
import _ from 'lodash';

export const createRetailerLoading = (state) => ({
    ...state,
    createRetailerLoader: true
});


export const createRetailerLoadingStop = (state) => ({
    ...state,
    createRetailerLoader: false
});



export const changeRetailerForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.retailerForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        retailerForm: {
            ...state.retailerForm,
            ...updated_form
        },
        retailerFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};


export const changeUpdateRetailerForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.retailerUpdateForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        retailerUpdateForm: {
            ...state.retailerUpdateForm,
            ...updated_form
        }
    }
};


export const createRetailerFailure = (state, { payload }) => ({
    ...state,
    createRetailerLoader: false
});


export const retailerFormValidationFailed = (state, { payload }) => ({
    ...state,
    retailerFormValidation: {
        ...payload
    }
});

export const createRetailerSuccess = (state, { payload }) => ({
    ...state,
    retailerForm: {},
    createRetailerLoader: false

});



export const updateRetailerSuccess = (state, { payload }) => ({
    ...state,
    retailerUpdateForm: {},
    updateRetailerLoader: false

});

export const updateRetailerLoading = (state) => ({
    ...state,
    updateRetailerLoader: true
});


export const updateRetailerLoadingStop = (state) => ({
    ...state,
    updateRetailerLoader: false
});



export const updateRetailerFailure = (state, { payload }) => ({
    ...state,
    updateRetailerLoader: false
});

export const createComplaintSuccess = (state, { payload }) => ({
    ...state,
    ComplaintForm: {},
    createComplaintLoading: false
});

export const createComplaintLoading = (state) => ({
    ...state,
    createComplaintLoading: true
});


export const createComplaintLoadingStop = (state) => ({
    ...state,
    createComplaintLoading: false
});



export const createComplaintFailure = (state, { payload }) => ({
    ...state,
    createComplaintLoading: false
});

export const clearComplaintForm = (state) => ({
    ...state,
    ComplaintForm: {},
    agentfetchOrderComplaints:[],
});

export const changeComplaintForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.ComplaintForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        ComplaintForm: {
            ...state.ComplaintForm,
            ...updated_form
        },
        createComplaintValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};
export const changeUpdateComplaintForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.ComplaintUpdateForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        ComplaintUpdateForm: {
            ...state.ComplaintUpdateForm,
            ...updated_form
        }
    }
};

export const ComplaintFormValidationFailed = (state, { payload }) => ({
    ...state,
    createComplaintValidation: {
        ...payload
    }
});






export const updateRetailerLocationLoading = (state) => ({
    ...state,
    updateRetailerLocationLoader: true
});

export const updateRetailerLocationLoadingStop = (state) => ({
    ...state,
    updateRetailerLocationLoader: false
});
export const extractFormDataUpdate = (state, { payload }) => ({
    ...state,
    retailerUpdateForm: payload
});

export const updateRetailerLocationSuccess = (state, { payload }) => ({
    ...state,
    updateRetailerLocationLoader: false
});

export const updateRetailerLocationFailure = (state, { payload }) => ({
    ...state,
    updateRetailerLocationLoader: false
});


export const fetchRetailersLoading = (state) => ({
    ...state,
    fetchRetailersLoader: true
});


export const fetchCreditLimitLoading = (state) => ({
    ...state,
    fetchCreditLimitLoading: true
});

export const fetchCreditLimitSuccess = (state, { payload }) => ({
    ...state,
    fetchCreditLimitList:_.cloneDeep(payload),
    fetchCreditLimitLoading: false,
});


export const fetchCreditLimitFailure = (state) => ({
    ...state,
    fetchCreditLimitLoading: false
});


export const fetchRetailersSuccess = (state, { payload }) => ({
    ...state,
    retailersList: _.cloneDeep(payload),
    countMapping: payload.count,
    partiesMapping: payload.parties,
    fetchRetailersLoader: false
});

export const fetchRetailersFailure = (state, { payload }) => ({
    ...state,
    fetchRetailersLoader: false,
   // retailersList: [],
   // countMapping: [],
   // partiesMapping: [],
});


export const fetchDealersLoading = (state) => ({
    ...state,
    fetchDealersLoader: true
});

export const fetchDealersSuccess = (state, { payload }) => ({
    ...state,
    dealersList: _.cloneDeep(payload),
    fetchDealersLoader: false
});

export const fetchDealersFailure = (state, { payload }) => ({
    ...state,
    fetchDealersLoader: false,
    dealersList: []
});

export const fetchRetailerOrdersLoading = (state) => ({
    ...state,
    fetchRetailerOrdersLoader: true
});

export const fetchRetailerOrdersSuccess = (state, { payload }) => {
    let updatedretailerOrders = _.cloneDeep(state.retailerOrders);
    updatedretailerOrders = _.extend(updatedretailerOrders, payload);

    return {
        ...state,
        retailerOrders: {
            ...updatedretailerOrders
        },
        fetchRetailerOrdersLoader: false
    }
};

export const fetchRetailerOrdersFailure = (state) => ({
    ...state,
    fetchRetailerOrdersLoader: false
});


export const openMoreFilters = (state) => ({
    ...state,
    openMoreFilters: true
});


export const closeMoreFilters = (state) => ({
    ...state,
    openMoreFilters: false
});


export const updateSearchFilters = (state, { payload }) => {
    let updated_search_filters = _.cloneDeep(state.retailerSearchFilters);
    updated_search_filters[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        retailerSearchFilters: {
            ...state.retailerSearchFilters,
            ...updated_search_filters
        },
        openMoreFilters: false
    }
};

export const selectRetailer = (state, { payload }) => ({
    ...state,
    selectedRetailer: payload
});

export const selectRetailerSuccess = (state, { payload }) => ({
    ...state,
    selectedRetailer: _.cloneDeep(payload)
});

export const clearSelectRetailer = (state) => ({
    ...state,
    selectedRetailer: {}
});

export const clearRetailerForm = (state) => ({
    ...state,
    retailerForm: {}
});

export const fetchRetailerCompetitorsLoading = (state) => ({
    ...state,
    fetchRetailerCompetitorsLoader: true
});

export const fetchRetailerCompetitorsSuccess = (state, { payload }) => ({
    ...state,
    retailerCompetitors: payload,
    fetchRetailerCompetitorsLoader: false
});

export const fetchRetailerCompetitorsFailure = (state) => ({
    ...state,
    fetchRetailerCompetitorsLoader: false
});

export const doNothing = (state) => ({
    ...state
});

export const makeDealerSearchList = (state, { payload }) => ({
    ...state,
    dealersSearchList: payload
});

export const makeRetailerSearchList = (state, { payload }) => ({
    ...state,
    retailersSearchList: payload
});


export const makeRetailerBeatSearchList = (state, { payload }) => ({
    ...state,
    retailersBeatSearchList: payload
});

export const extractFormData = (state, { payload }) => ({
    ...state,
    retailerForm: payload
});



export const fetchRetailerDealerSearchByLocationLoading = (state, { payload }) => ({
    ...state,
    retailerDealerSearchByLocationLoader: true
});

export const fetchRetailerDealerSearchByLocationLoadingStop = (state, { payload }) => ({
    ...state,
    retailerDealerSearchByLocationLoader: false
});

export const fetchRetailerDealerSearchByLocationSuccess = (state, { payload }) => ({
    ...state,
    retailerDealerSearchByLocationList: _.cloneDeep(payload),
    retailerDealerSearchByLocationLoader: false
});

export const fetchRetailerDealerSearchByLocationFailure = (state, { payload }) => ({
    ...state,
    retailerDealerSearchByLocationList: [],
    retailerDealerSearchByLocationLoader: false
});




export const fetchDealerOrdersLoading = (state) => ({
    ...state,
    fetchDealerOrdersLoader: true
});

export const fetchDealerOrdersSuccess = (state, { payload }) => {
    let updateddealerOrders = _.cloneDeep(state.dealerOrders);
    updateddealerOrders = _.extend(updateddealerOrders, payload);

    return {
        ...state,
        dealerOrders: {
            ...updateddealerOrders
        },
        fetchDealerOrdersLoader: false
    }
};

export const fetchDealerOrdersFailure = (state) => ({
    ...state,
    fetchDealerOrdersLoader: false,
    dealerOrders: INITIAL_STATE.dealerOrders
});

export const fetchDealerOrdersLoadingStop = (state) => ({
    ...state,
    fetchDealerOrdersLoader: false
});


export const fetchDealerInvoiceLoading = (state) => ({
    ...state,
    fetchDealerInvoiceLoader: true
});


export const fetchDealerInvoiceSuccess = (state, { payload }) => {
    let updateddealerInvoice = _.cloneDeep(state.dealerInvoice);
    updateddealerInvoice = _.extend(updateddealerInvoice, payload);

    return {
        ...state,
        dealerInvoice: {
            ...updateddealerInvoice
        },
        fetchDealerInvoiceLoader: false
    }
};

export const fetchDealerInvoiceFailure = (state) => ({
    ...state,
    fetchDealerInvoiceLoader: false
});




export const fetchDealerOutstandingLoading = (state) => ({
    ...state,
    fetchDealerOutstandingLoader: true
});

export const fetchDealerOutstandingSuccess = (state, { payload }) => {
    let updateddealerOutstanding = _.cloneDeep(state.dealerOutstanding);
    updateddealerOutstanding = _.extend(updateddealerOutstanding, payload);

    return {
        ...state,
        dealerOutstanding: {
            ...updateddealerOutstanding
        },
        fetchDealerOutstandingLoader: false
    }
};

export const fetchDealerOutstandingFailure = (state) => ({
    ...state,
    fetchDealerOutstandingLoader: false
});



export const fetchDealerPaymentsLoading = (state) => ({
    ...state,
    fetchDealerPaymentsLoader: true
});

export const fetchDealerPaymentsSuccess = (state, { payload }) => {
    let updateddealerPayments = _.cloneDeep(state.dealerPayments);
    updateddealerPayments = _.extend(updateddealerPayments, payload);

    return {
        ...state,
        dealerPayments: {
            ...updateddealerPayments
        },
        fetchDealerPaymentsLoader: false
    }
};

export const fetchDealerPaymentsFailure = (state) => ({
    ...state,
    fetchDealerPaymentsLoader: false
});





export const fetchInvoiceDetailLoading = (state) => ({
    ...state,
    fetchInvoiceDetailLoader: true
});


export const fetchInvoiceDetailSuccess = (state, { payload }) => {
    let updatedInvoiceDetailsMapping = _.cloneDeep(state.allInvoiceDetailsMapping);
    updatedInvoiceDetailsMapping[payload.id] = payload.data
    return {
        ...state,
        fetchInvoiceDetailLoader: false,
        allInvoiceDetailsMapping: updatedInvoiceDetailsMapping
    }
};


export const fetchInvoiceDetailFailure = (state) => ({
    ...state,
    fetchInvoiceDetailLoader: false
});


export const editPaymentsForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.paymentForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        paymentForm: {
            ...state.paymentForm,
            ...updated_form
        }
    }
};

export const submitPaymentsFormSuccess = (state, { payload }) => ({
    ...state,
    paymentFormLoader: false,
    paymentForm: INITIAL_STATE.paymentForm
});


export const submitPaymentsFormFailure = (state, { payload }) => ({
    ...state,
    paymentFormLoader: false
});

export const submitPaymentsFormLoading = (state, { payload }) => ({
    ...state,
    paymentFormLoader: true
});

export const submitPaymentsFormLoadingStop = (state, { payload }) => ({
    ...state,
    paymentFormLoader: false
});

export const clearPaymentsForm = (state, { payload }) => ({
    ...state,
    paymentForm: INITIAL_STATE.paymentForm
});




export const fetchComplaintTypeLoading = (state) => ({
    ...state,
    fetchComplaintTypeLoading: true
  });
  
  
  export const fetchComplaintTypeSuccess = (state, { payload }) => ({
    ...state,
    agentComplaintType: payload,
    fetchComplaintTypeLoading: false
  });
  
  
  export const fetchComplaintTypeFailure = (state, { payload }) => ({
    ...state,
    fetchComplaintTypeLoading: false
  });
  
  export const fetchComplaintTypeLoadingStop = (state, {payload}) => ({
    ...state,
    fetchComplaintTypeLoading: false
});

export const fetchSubComplaintTypeLoading = (state) => ({
    ...state,
    fetchSubComplaintTypeLoading: true
  });
  
  
  export const fetchSubComplaintTypeSuccess = (state, { payload }) => ({
    ...state,
    agentSubComplaintType: payload,
    fetchSubComplaintTypeLoading: false
  });
  
  
  export const fetchSubComplaintTypeFailure = (state, { payload }) => ({
    ...state,
    fetchSubComplaintTypeLoading: false
  });
  
  export const fetchSubComplaintTypeLoadingStop = (state, {payload}) => ({
    ...state,
    fetchSubComplaintTypeLoading: false
});

//fetchorder for complaint

export const fetchOrderComplaintLoading = (state) => ({
    ...state,
    fetchOrderComplaintLoading: true
  });
  
  
  export const fetchOrderComplaintSuccess = (state, { payload }) => ({
    ...state,
    agentfetchOrderComplaints: payload,
    fetchOrderComplaintLoading: false
  });
  
  
  export const fetchOrderComplaintFailure = (state, { payload }) => ({
    ...state,
    fetchOrderComplaintLoading: false
  });
  
  export const fetchOrderComplaintLoadingStop = (state, {payload}) => ({
    ...state,
    fetchOrderComplaintLoading: false
});
//invoice
export const fetchInvoiceComplaintLoading = (state) => ({
    ...state,
    fetchInvoiceComplaintLoading: true
  });
  
  
  export const fetchInvoiceComplaintSuccess = (state, { payload }) => ({
    ...state,
    agentfetchInvoice:payload,
    fetchInvoiceComplaintLoading: false
  });
  
  
  export const fetchInvoiceComplaintFailure = (state, { payload }) => ({
    ...state,
    fetchInvoiceComplaintLoading: false
  });
  
  export const fetchInvoiceComplaintLoadingStop = (state, {payload}) => ({
    ...state,
    fetchInvoiceComplaintLoading: false
});

    // [RetailersTypes.CREATE_COMPETITOR_SUCCESS]: createCompetitorSuccess,
    // [RetailersTypes.CREATE_COMPETITOR_FAILURE]: createCompetitorFailure,
    // [RetailersTypes.CREATE_COMPETITOR_LOADING]: createCompetitorLoading,
    // [RetailersTypes.CREATE_COMPETITOR_LOADING_STOP]: createCompetitorLoadingStop


export const createCompetitorSuccess = (state, {payload}) => ({
    ...state,
    createCompetitorLoader: false
});


export const createCompetitorFailure = (state, {payload}) => ({
    ...state,
    createCompetitorLoader: false
});

export const createCompetitorLoading = (state, {payload}) => ({
    ...state,
    createCompetitorLoader: true
});

export const createCompetitorLoadingStop = (state, {payload}) => ({
    ...state,
    createCompetitorLoader: false
});

export const editNewCompetitorForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.newCompetitorForm);
    updated_form[payload.edited_field] = payload.edited_value;
    return {
        ...state,
        newCompetitorForm: {
            ...state.newCompetitorForm,
            ...updated_form
        }
    }
};

export const clearNewCompetitorForm = (state, { payload }) => {
    return {
        ...state,
        newCompetitorForm: {}
    }
};





  export const fetchComplaintsLoading = (state) => ({
    ...state,
    fetchComplaintsLoading: true
  });
  
  
  export const fetchComplaintsSuccess = (state, { payload }) => ({
    ...state,
    agentComplaints: payload,
    fetchComplaintsLoading: false
  });
  
  
  export const fetchComplaintsFailure = (state, { payload }) => ({
    ...state,
   
    fetchComplaintsLoading: false
  });

  export const fetchComplaintsLoadingStop = (state, {payload}) => ({
    ...state,
    fetchComplaintsLoading: false
});
  
  export const fetchDsrLoading = (state) => ({
    ...state,
    fetchDsrLoader: true
  });

 export const fetchDsrSuccess = (state, { payload }) => ({
    ...state,
    dsrList: _.cloneDeep(payload),
  
    fetchDsrLoader: false
 });

 export const fetchDsrFailure = (state, { payload }) => ({
    ...state,
    fetchDsrLoader: false,
    dsrList: [],
    
  });

  export const fetchDsrAreaLoading = (state) => ({
    ...state,
    fetchDsrAreaLoader: true
  });

 export const fetchDsrAreaSuccess = (state, { payload }) => ({
    ...state,
    dsrArea: _.cloneDeep(payload),
  
    fetchDsrAreaLoader: false
 });

 export const fetchDsrAreaFailure = (state, { payload }) => ({
    ...state,
    fetchDsrAreaLoader: false,
    dsrArea: [],
    
  });


  export const fetchDsrAreaListLoading = (state) => ({
    ...state,
    fetchDsrAreaListLoader: true
  });

 export const fetchDsrAreaListSuccess = (state, { payload }) => ({
    ...state,
    dsrAreaList: _.cloneDeep(payload),
  
    fetchDsrAreaListLoader: false
 });

 export const fetchDsrAreaListFailure = (state, { payload }) => ({
    ...state,
    fetchDsrAreaListLoader: false,
    dsrAreaList: [],
    
  });


  export const createDsrLoading = (state) => ({
    ...state,
    createDsrLoader: true
});


export const createDsrLoadingStop = (state) => ({
    ...state,
    createDsrLoader: false
});



export const changeDsrForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.dsrForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        dsrForm: {
            ...state.dsrForm,
            ...updated_form
        },
        dsrFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};


export const createDsrFailure = (state, { payload }) => ({
    ...state,
    createDsrLoader: false
});


export const dsrFormValidationFailed = (state, { payload }) => ({
    ...state,
    dsrFormValidation: {
        ...payload
    }
});

export const createDsrSuccess = (state, { payload }) => ({
    ...state,
    dsrForm: {},
    createDsrLoader: false

});

export const createDsrAreaLoading = (state) => ({
    ...state,
    createDsrAreaLoader: true
});


export const createDsrAreaLoadingStop = (state) => ({
    ...state,
    createDsrAreaLoader: false
});



export const changeDsrAreaForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.dsrAreaForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        dsrAreaForm: {
            ...state.dsrAreaForm,
            ...updated_form
        },
     
    }
};


export const createDsrAreaFailure = (state, { payload }) => ({
    ...state,
    createDsrAreaLoader: false
});


export const clearDsrAreaForm = (state, { payload }) => {
    return {
        ...state,
        dsrAreaForm: {}
    }
};

export const createDsrAreaSuccess = (state, { payload }) => ({
    ...state,
    dsrAreaForm: {},
    createDsrAreaLoader: false

});


export const updateOrderSearchFilters = (state, { payload }) => {
    let updated_search_filters = _.cloneDeep(state.OrderSearchFilters);
    updated_search_filters[payload.edited_field] = payload.edited_value;
    return {
      ...state,
      OrderSearchFilters: updated_search_filters
    }
  };

  export const deleteOrderLineLoading = (state, { payload }) => ({
    ...state,
    deleteOrderLineLoader: payload.id
  });

 export const deleteOrderLineSuccess = (state, { payload }) => ({
    ...state,
   
    deleteOrderLineLoader: false
 });

 export const deleteOrderLineFailure = (state, { payload }) => ({
    ...state,
    deleteOrderLineLoader: false,
   
    
  });

  export const editOrderQuantityLoading = (state, { payload }) => ({
    ...state,
    editOrderQuantityLoader: payload.id
  });

 export const editOrderQuantitySuccess = (state, { payload }) => ({
    ...state,
   
    editOrderQuantityLoader: false
 });

 export const editOrderQuantityFailure = (state, { payload }) => ({
    ...state,
    editOrderQuantityLoader: false,
   
    
  });


  export const addOrderLineLoading = (state) => ({
    ...state,
    addOrderLineLoader: true
  });

 export const addOrderLineSuccess = (state, { payload }) => ({
    ...state,
   
    addOrderLineLoader: false
 });

 export const addOrderLineFailure = (state, { payload }) => ({
    ...state,
    addOrderLineLoader: false,
   
    
  });

  export const setAddOrderLineData = (state, {payload}) => ({
    ...state,
    addOrderForm: payload
  });

  export const clearAddOrderLineData = (state) => ({
    ...state,
    addOrderForm : INITIAL_STATE.addOrderForm
});

export const setEditOrderLineData = (state, {payload}) => ({
    ...state,
    editOrderForm: payload
  });

  
  export const clearEditOrderLineData = (state) => ({
      
    ...state,
    
    editOrderForm : INITIAL_STATE.editOrderForm,
   
    
});




export const getRetailerTargetSuccess=(state,{payload}) =>({

    ...state,
    agentTarget: payload,
    getRetailerTargetLoading: false
});



export const getRetailerTargetLoading = (state) => ({
    ...state,
    getRetailerTargetLoading: true
  });
export const getRetailerTargetFailure = (state) => ({
    ...state,
    agentTarget:[],
    getRetailerTargetLoading: false
  });
export const getRetailerTargetLoadingStop = (state) => ({
    ...state,
    getRetailerTargetLoading: false
  });
  
  export const updateTargetSearchFilters = (state, { payload }) => {
    let updated_search_filters = _.cloneDeep(state.targetSearchFilters);
    updated_search_filters[payload.edited_field] = payload.edited_value;
    return {
      ...state,
      targetSearchFilters: updated_search_filters
    }
  };








  


export const reducer = createReducer(INITIAL_STATE, {

    [RetailersTypes.CREATE_RETAILER_LOADING]: createRetailerLoading,
    [RetailersTypes.CREATE_RETAILER_LOADING_STOP]: createRetailerLoadingStop,
    [RetailersTypes.CREATE_RETAILER_SUCCESS]: createRetailerSuccess,
    [RetailersTypes.CREATE_RETAILER_FAILURE]: createRetailerFailure,

  [RetailersTypes.CREATE_COMPLAINT_LOADING]: createComplaintLoading,
    [RetailersTypes.CREATE_COMPLAINT_LOADING_STOP]: createComplaintLoadingStop,
    [RetailersTypes.CREATE_COMPLAINT_SUCCESS]: createComplaintSuccess,
    [RetailersTypes.CREATE_COMPLAINT_FAILURE]: createComplaintFailure,
  
    [RetailersTypes.CHANGE_COMPLAINT_FORM]: changeComplaintForm,
    [RetailersTypes.CHANGE_UPDATE_COMPLAINT_FORM]: changeUpdateComplaintForm,
    [RetailersTypes.COMPLAINT_FORM_VALIDATION_FAILED]: ComplaintFormValidationFailed ,
    [RetailersTypes.CLEAR_COMPLAINT_FORM]: clearComplaintForm,




    [RetailersTypes.UPDATE_RETAILER_LOADING]: updateRetailerLoading,
    [RetailersTypes.UPDATE_RETAILER_LOADING_STOP]: updateRetailerLoadingStop,
    [RetailersTypes.UPDATE_RETAILER_SUCCESS]: updateRetailerSuccess,
    [RetailersTypes.UPDATE_RETAILER_FAILURE]: updateRetailerFailure,

    [RetailersTypes.UPDATE_ORDER_SEARCH_FILTERS]:updateOrderSearchFilters ,
    [RetailersTypes.CHANGE_RETAILER_FORM]: changeRetailerForm,
    [RetailersTypes.RETAILER_FORM_VALIDATION_FAILED]: retailerFormValidationFailed,


    [RetailersTypes.UPDATE_RETAILER_LOCATION_LOADING]: updateRetailerLocationLoading,
    [RetailersTypes.UPDATE_RETAILER_LOCATION_LOADING_STOP]: updateRetailerLocationLoadingStop,
    [RetailersTypes.UPDATE_RETAILER_LOCATION_SUCCESS]: updateRetailerLocationSuccess,
    [RetailersTypes.UPDATE_RETAILER_LOCATION_FAILURE]: updateRetailerLocationFailure,


    [RetailersTypes.OPEN_MORE_FILTERS_OPTION]: openMoreFilters,
    [RetailersTypes.CLOSE_MORE_FILTERS_OPTION]: closeMoreFilters,


    [RetailersTypes.FETCH_RETAILERS_LOADING]: fetchRetailersLoading,
    [RetailersTypes.FETCH_RETAILERS_SUCCESS]: fetchRetailersSuccess,
    [RetailersTypes.FETCH_RETAILERS_FAILURE]: fetchRetailersFailure,

    [RetailersTypes.DELETE_ORDER_LINE_LOADING]: deleteOrderLineLoading,
    [RetailersTypes.DELETE_ORDER_LINE_SUCCESS]: deleteOrderLineSuccess,
    [RetailersTypes.DELETE_ORDER_LINE_FAILURE]: deleteOrderLineFailure,

    [RetailersTypes.EDIT_ORDER_QUANTITY_LOADING]: editOrderQuantityLoading,
    [RetailersTypes.EDIT_ORDER_QUANTITY_SUCCESS]: editOrderQuantitySuccess,
    [RetailersTypes.EDIT_ORDER_QUANTITY_FAILURE]: editOrderQuantityFailure,

    [RetailersTypes.ADD_ORDER_LINE_LOADING]: addOrderLineLoading,
    [RetailersTypes.ADD_ORDER_LINE_SUCCESS]: addOrderLineSuccess,
    [RetailersTypes.ADD_ORDER_LINE_FAILURE]: addOrderLineFailure,

    [RetailersTypes.SET_ADD_ORDER_LINE_DATA]: setAddOrderLineData,
    [RetailersTypes.CLEAR_ADD_ORDER_LINE_DATA]: clearAddOrderLineData,

    [RetailersTypes.SET_EDIT_ORDER_LINE_DATA]: setEditOrderLineData,
    [RetailersTypes.CLEAR_EDIT_ORDER_LINE_DATA]: clearEditOrderLineData,



    //fetchDealerOrders: ['payload'],
    [RetailersTypes.FETCH_DEALER_ORDERS_LOADING]: fetchDealerOrdersLoading,
    [RetailersTypes.FETCH_DEALER_ORDERS_SUCCESS]: fetchDealerOrdersSuccess,
    [RetailersTypes.FETCH_DEALER_ORDERS_FAILURE]: fetchDealerOrdersFailure,
    [RetailersTypes.FETCH_DEALER_ORDERS_LOADING_STOP]: fetchDealerOrdersLoadingStop,
  

    //fetchDealerInvoice: ['payload'],
    [RetailersTypes.FETCH_DEALER_INVOICE_LOADING]: fetchDealerInvoiceLoading,
    [RetailersTypes.FETCH_DEALER_INVOICE_SUCCESS]: fetchDealerInvoiceSuccess,
    [RetailersTypes.FETCH_DEALER_INVOICE_FAILURE]: fetchDealerInvoiceFailure,


    // fetchDealerOutstanding: ['payload'],
    [RetailersTypes.FETCH_DEALER_OUTSTANDING_LOADING]: fetchDealerOutstandingLoading,
    [RetailersTypes.FETCH_DEALER_OUTSTANDING_SUCCESS]: fetchDealerOutstandingSuccess,
    [RetailersTypes.FETCH_DEALER_OUTSTANDING_FAILURE]: fetchDealerOutstandingFailure,


    [RetailersTypes.FETCH_DEALER_PAYMENTS_LOADING]: fetchDealerPaymentsLoading,
    [RetailersTypes.FETCH_DEALER_PAYMENTS_SUCCESS]: fetchDealerPaymentsSuccess,
    [RetailersTypes.FETCH_DEALER_PAYMENTS_FAILURE]: fetchDealerPaymentsFailure,




    [RetailersTypes.FETCH_DEALERS_LOADING]: fetchDealersLoading,
    [RetailersTypes.FETCH_DEALERS_SUCCESS]: fetchDealersSuccess,
    [RetailersTypes.FETCH_DEALERS_FAILURE]: fetchDealersFailure,


    [RetailersTypes.FETCH_RETAILER_ORDERS_LOADING]: fetchRetailerOrdersLoading,
    [RetailersTypes.FETCH_RETAILER_ORDERS_SUCCESS]: fetchRetailerOrdersSuccess,
    [RetailersTypes.FETCH_RETAILER_ORDERS_FAILURE]: fetchRetailerOrdersFailure,


    [RetailersTypes.FETCH_RETAILER_COMPETITORS_LOADING]: fetchRetailerCompetitorsLoading,
    [RetailersTypes.FETCH_RETAILER_COMPETITORS_SUCCESS]: fetchRetailerCompetitorsSuccess,
    [RetailersTypes.FETCH_RETAILER_COMPETITORS_FAILURE]: fetchRetailerCompetitorsFailure,



    [RetailersTypes.UPDATE_SEARCH_FILTERS]: updateSearchFilters,


    [RetailersTypes.MAKE_DEALER_SEARCH_LIST]: makeDealerSearchList,
    [RetailersTypes.MAKE_RETAILER_SEARCH_LIST]: makeRetailerSearchList,
    [RetailersTypes.MAKE_RETAILER_BEAT_SEARCH_LIST]: makeRetailerBeatSearchList,



    [RetailersTypes.EXTRACT_FORM_DATA]: extractFormData,
    [RetailersTypes.EXTRACT_FORM_DATA_UPDATE]: extractFormDataUpdate,

    [RetailersTypes.DO_NOTHING]: doNothing,


    [RetailersTypes.SELECT_RETAILER]: selectRetailer,
    [RetailersTypes.SELECT_RETAILER_SUCCESS]: selectRetailerSuccess,
    [RetailersTypes.CLEAR_SELECT_RETAILER]: clearSelectRetailer,
    [RetailersTypes.CLEAR_RETAILER_FORM]: clearRetailerForm,

    //fetchInvoiceDetail: ['payload'],
    [RetailersTypes.FETCH_INVOICE_DETAIL_SUCCESS]: fetchInvoiceDetailSuccess,
    [RetailersTypes.FETCH_INVOICE_DETAIL_LOADING]: fetchInvoiceDetailLoading,
    [RetailersTypes.FETCH_INVOICE_DETAIL_FAILURE]: fetchInvoiceDetailFailure,


    [RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION_LOADING]: fetchRetailerDealerSearchByLocationLoading,
    [RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION_LOADING_STOP]: fetchRetailerDealerSearchByLocationLoadingStop,
    [RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION_SUCCESS]: fetchRetailerDealerSearchByLocationSuccess,
    [RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION_FAILURE]: fetchRetailerDealerSearchByLocationFailure,



    [RetailersTypes.EDIT_PAYMENTS_FORM]: editPaymentsForm,

    [RetailersTypes.CLEAR_PAYMENTS_FORM]: clearPaymentsForm,
    [RetailersTypes.SUBMIT_PAYMENTS_FORM_SUCCESS]: submitPaymentsFormSuccess,
    [RetailersTypes.SUBMIT_PAYMENTS_FORM_FAILURE]: submitPaymentsFormFailure,
    [RetailersTypes.SUBMIT_PAYMENTS_FORM_LOADING]: submitPaymentsFormLoading,
    [RetailersTypes.SUBMIT_PAYMENTS_FORM_LOADING_STOP]: submitPaymentsFormLoadingStop,
    
    [RetailersTypes.FETCH_COMPLAINT_TYPE_LOADING]: fetchComplaintTypeLoading,
    [RetailersTypes.FETCH_COMPLAINT_TYPE_SUCCESS]: fetchComplaintTypeSuccess,
    [RetailersTypes.FETCH_COMPLAINT_TYPE_FAILURE]: fetchComplaintTypeFailure,
    [RetailersTypes.FETCH_COMPLAINT_TYPE_LOADING_STOP]: fetchComplaintTypeLoadingStop,
   

     [RetailersTypes.FETCH_ORDER_COMPLAINT_LOADING]: fetchOrderComplaintLoading,
     [RetailersTypes.FETCH_ORDER_COMPLAINT_SUCCESS]: fetchOrderComplaintSuccess,
     [RetailersTypes.FETCH_ORDER_COMPLAINT_FAILURE]: fetchOrderComplaintFailure,
     [RetailersTypes.FETCH_ORDER_COMPLAINT_LOADING_STOP]: fetchOrderComplaintLoadingStop,
    

     [RetailersTypes.FETCH_INVOICE_COMPLAINT_LOADING]:  fetchInvoiceComplaintLoading,
     [RetailersTypes.FETCH_INVOICE_COMPLAINT_SUCCESS]:  fetchInvoiceComplaintSuccess,
     [RetailersTypes.FETCH_INVOICE_COMPLAINT_FAILURE]:  fetchInvoiceComplaintFailure,
     [RetailersTypes.FETCH_INVOICE_COMPLAINT_LOADING_STOP]:  fetchInvoiceComplaintLoadingStop,
    

    [RetailersTypes.FETCH_SUB_COMPLAINT_TYPE_LOADING]: fetchSubComplaintTypeLoading,
    [RetailersTypes.FETCH_SUB_COMPLAINT_TYPE_SUCCESS]: fetchSubComplaintTypeSuccess,
    [RetailersTypes.FETCH_SUB_COMPLAINT_TYPE_FAILURE]: fetchSubComplaintTypeFailure,
    [RetailersTypes.FETCH_SUB_COMPLAINT_TYPE_LOADING_STOP]: fetchSubComplaintTypeLoadingStop,

    [RetailersTypes.FETCH_COMPLAINTS_LOADING]: fetchComplaintsLoading,
    [RetailersTypes.FETCH_COMPLAINTS_SUCCESS]: fetchComplaintsSuccess,
    [RetailersTypes.FETCH_COMPLAINTS_FAILURE]: fetchComplaintsFailure,
    [RetailersTypes.FETCH_COMPLAINTS_LOADING_STOP]:  fetchComplaintsLoadingStop,

    [RetailersTypes.CHANGE_UPDATE_RETAILER_FORM]: changeUpdateRetailerForm,


    [RetailersTypes.CREATE_COMPETITOR_SUCCESS]: createCompetitorSuccess,
    [RetailersTypes.CREATE_COMPETITOR_FAILURE]: createCompetitorFailure,
    [RetailersTypes.CREATE_COMPETITOR_LOADING]: createCompetitorLoading,
    [RetailersTypes.CREATE_COMPETITOR_LOADING_STOP]: createCompetitorLoadingStop,
    [RetailersTypes.EDIT_NEW_COMPETITOR_FORM]:  editNewCompetitorForm,
    [RetailersTypes.CLEAR_NEW_COMPETITOR_FORM]:  clearNewCompetitorForm,

    [RetailersTypes.FETCH_DSR_LOADING]: fetchDsrLoading,
    [RetailersTypes.FETCH_DSR_SUCCESS]: fetchDsrSuccess,
    [RetailersTypes.FETCH_DSR_FAILURE]: fetchDsrFailure,

    [RetailersTypes.FETCH_DSR_AREA_LOADING]: fetchDsrAreaLoading,
    [RetailersTypes.FETCH_DSR_AREA_SUCCESS]: fetchDsrAreaSuccess,
    [RetailersTypes.FETCH_DSR_AREA_FAILURE]: fetchDsrAreaFailure,

    [RetailersTypes.FETCH_CREDIT_LIMIT_LOADING]: fetchCreditLimitLoading,
    [RetailersTypes.FETCH_CREDIT_LIMIT_SUCCESS]: fetchCreditLimitSuccess,
    [RetailersTypes.FETCH_CREDIT_LIMIT_FAILURE]: fetchCreditLimitFailure,

    [RetailersTypes.FETCH_DSR_AREA_LIST_LOADING]: fetchDsrAreaListLoading,
    [RetailersTypes.FETCH_DSR_AREA_LIST_SUCCESS]: fetchDsrAreaListSuccess,
    [RetailersTypes.FETCH_DSR_AREA_LIST_FAILURE]: fetchDsrAreaListFailure,

    [RetailersTypes.CREATE_DSR_LOADING]: createDsrLoading,
    [RetailersTypes.CREATE_DSR_LOADING_STOP]: createDsrLoadingStop,
    [RetailersTypes.CREATE_DSR_SUCCESS]: createDsrSuccess,
    [RetailersTypes.CREATE_DSR_FAILURE]: createDsrFailure,

    [RetailersTypes.CHANGE_DSR_FORM]: changeDsrForm,
    [RetailersTypes.DSR_FORM_VALIDATION_FAILED]: dsrFormValidationFailed,

    [RetailersTypes.CREATE_DSR_AREA_LOADING]: createDsrAreaLoading,
    [RetailersTypes.CREATE_DSR_AREA_LOADING_STOP]: createDsrAreaLoadingStop,
    [RetailersTypes.CREATE_DSR_AREA_SUCCESS]: createDsrAreaSuccess,
    [RetailersTypes.CREATE_DSR_AREA_FAILURE]: createDsrAreaFailure,

    [RetailersTypes.CHANGE_DSR_AREA_FORM]: changeDsrAreaForm,
    [RetailersTypes.CLEAR_DSR_AREA_FORM]: clearDsrAreaForm,


  

    [RetailersTypes.GET_RETAILER_TARGET_LOADING]: getRetailerTargetLoading,
    [RetailersTypes.GET_RETAILER_TARGET_LOADING_STOP]: getRetailerTargetLoadingStop,
    [RetailersTypes.GET_RETAILER_TARGET_SUCCESS]: getRetailerTargetSuccess,
    [RetailersTypes.GET_RETAILER_TARGET_FAILURE]: getRetailerTargetFailure,
    [RetailersTypes.UPDATE_TARGET_SEARCH_FILTERS]:updateTargetSearchFilters,






});