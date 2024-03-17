/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { VisitsTypes } from './Actions'
import _ from 'lodash';


export const openVisitsAction = (state) => ({
    ...state,
    visitsAction: true
});


export const closeVisitsAction = (state) => ({
    ...state,
    visitsAction: false
});


export const changeSearchFilters = (state, { payload }) => {
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

export const fetchVisitsStorageListSuccess = (state, { payload }) => {
    return {
        ...state,
        visitsStorageList: _.cloneDeep(payload)
    }
};

export const fetchVisitsStorageListFailure = (state, { payload }) => {
    return {
        ...state
    }
};

export const fetchVisitsDisplayListSuccess = (state, { payload }) => {
    let updatedDisplayList = _.cloneDeep(state.visitsDisplayList);
    updatedDisplayList = _.extend(updatedDisplayList, payload);

    // let updatedStorageList = _.cloneDeep(state.visitsStorageList);
    // updatedStorageList = _.extend(updatedStorageList, payload); 
    return {
        ...state,
        visitsDisplayList: payload,
        //visitsStorageList: updatedStorageList,
        fetchVisitsDisplayListLoader: false
    }
};

export const fetchVisitsDisplayListFailure = (state, { payload }) => {
    return {
        ...state,
        fetchVisitsDisplayListLoader: false
    }
};

export const fetchVisitsDisplayListLoading = (state) => {
    return {
        ...state,
        fetchVisitsDisplayListLoader: true
    }
};

export const fetchVisitsDisplayListLoadingStop = (state) => {
    return {
        ...state,
        fetchVisitsDisplayListLoader: false
    }
};

// export const fetchHistory = (state, { payload }) => {
//     return {
//         ...state,
//         History: payload,
        
//         fetchHistoryLoader: false
//     }
// };
export const fetchHistoryLoading = (state) => ({
    ...state,
    fetchHistoryLoader: true
});

export const fetchHistorySuccess = (state, { payload }) => {
    return {
        ...state,
        History: payload,
        
        fetchHistoryLoader: false
    }
};

export const fetchHistoryFailure = (state) => ({
    ...state,
    fetchHistoryLoader: false,
    History: []
});

export const fetchHistoryLoadingStop = (state) => {
    return {
        ...state,
        fetchHistoryLoader: false,
    }
};

export const doNothing = (state) => ({
    ...state
});

export const fetchFilteredVisitsDisplayListSuccess = (state, { payload }) => {
    return {
        ...state,
        filteredDisplayData: _.cloneDeep(payload)
    }
};


export const changeAddPlannedVisitsSearchFilters = (state, { payload }) => {
    let updated_planned_search_filters = _.cloneDeep(state.planVisit.searchFilters);
    updated_planned_search_filters[payload.edited_field] = payload.edited_value;
//console.log(payload.edited_field)
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            searchFilters: {
                ...state.planVisit.searchFilters,
                ...updated_planned_search_filters
            }
        }
    }
};

export const changePlannedSelectedDate = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            selectedVisitDate: payload
        }
    }
};

export const changePlannedStartDate = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            startDate: payload
        }
    }
};

export const changePlannedSelectedPSM = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            selectedVisitPSM: payload
        }
    }
};

export const addVisitToPlan = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            selectedPlannedVisits: state.planVisit.selectedPlannedVisits.concat(payload)
        }
    }
};


export const removeVisitFromPlan = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            selectedPlannedVisits: state.planVisit.selectedPlannedVisits.filter((obj) => (obj.local_id != payload.id))
        }
    }
};


export const editSelectedVisits = (state, { payload }) => {
    let updatedSelectedVisits = [];
    state.planVisit.selectedPlannedVisits.map((obj) => {
        if (obj.local_id == payload.id) {
            obj[payload.edited_field] = payload.edited_value;
        }
        updatedSelectedVisits.push(obj);
    });
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            selectedPlannedVisits: updatedSelectedVisits
        }
    }
};


export const submitSelectedPlannedVisitsSuccess = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            selectedPlannedVisits: [],
            submitPlannedVisitsLoader: false
        }
    }
};

export const submitSelectedPlannedVisitsFailure = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            submitPlannedVisitsLoader: false
        }
    }
};

export const submitSelectedPlannedVisitsLoading = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            submitPlannedVisitsLoader: true
        }
    }
};


export const submitSelectedPlannedVisitsLoadingStop = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            submitPlannedVisitsLoader: false
        }
    }
};

export const findNearMeLoading = (state) => {
    return {
        ...state,
        unplannedVisit: {
            ...state.unplannedVisit,
            findNearMeLoader: true
        }
    }
};

export const findNearMeLoadingStop = (state) => {
    return {
        ...state,
        unplannedVisit: {
            ...state.unplannedVisit,
            findNearMeLoader: false
        }
    }
};

export const setNearLocation = (state, { payload }) => {
    return {
        ...state,
        unplannedVisit: {
            ...state.unplannedVisit,
            nearLocation: payload
        }
    }
};

export const changeSearchByAreaFilters = (state, { payload }) => {
    let updated_unplanned_search_filters = _.cloneDeep(state.unplannedVisit.searchByAreaFilters);
    updated_unplanned_search_filters[payload.edited_field] = payload.edited_value;
    return {
        ...state,
        unplannedVisit: {
            ...state.unplannedVisit,
            searchByAreaFilters: {
                ...state.unplannedVisit.searchFilters,
                ...updated_unplanned_search_filters
            }
        }
    }
};


export const cancelVisitLoading = (state) => {
    return {
        ...state,
        editVisit: {
            ...state.editVisit,
            cancelVisitLoader: true
        }
    }
};

export const cancelVisitSuccess = (state, { payload }) => {
    return {
        ...state,
        editVisit: {
            ...INITIAL_STATE.editVisit
        }
    }
};


export const editVisitSuccess = (state, { payload }) => {
    return {
        ...state,
        editVisit: {
            ...INITIAL_STATE.editVisit
        }
    }
};

export const cancelVisitFailure = (state) => {
    return {
        ...state,
        editVisit: {
            ...state.editVisit,
            cancelVisitLoader: false
        }
    }
};


export const editVisitFailure = (state) => {
    return {
        ...state,
        editVisit: {
            ...state.editVisit,
            editVisitLoader: false
        }
    }
};


export const editVisitLoading = (state) => {
    return {
        ...state,
        editVisit: {
            ...state.editVisit,
            editVisitLoader: true
        }
    }
};

export const cancelVisitLoadingStop = (state) => {
    return {
        ...state,
        editVisit: {
            ...state.editVisit,
            cancelVisitLoader: false
        }
    }
};

export const editVisitLoadingStop = (state) => {
    return {
        ...state,
        editVisit: {
            ...state.editVisit,
            editVisitLoader: false
        }
    }
};

export const updateVisitFormChange = (state, { payload }) => {
    let updated_visit_form_change = _.cloneDeep(state.editVisit.formData);
    updated_visit_form_change[payload.edited_field] = payload.edited_value;
    return {
        ...state,
        editVisit: {
            ...state.editVisit,
            formData: {
                ...state.editVisit.formData,
                ...updated_visit_form_change
            },
            editVisitValidation: {
                invalid: false,
                invalid_field: ''
            }
        }
    }
};

export const editVisitValidationFailed = (state, { payload }) => {
    return {
        ...state,
        editVisit: {
            ...state.editVisit,
            editVisitValidation: {
                invalid: true,
                invalid_field: payload.invalid_field
            }
        }
    }
};


export const executeVisit = (state, { payload }) => {
    return {
        ...state,
        executeVisitData: payload
    }
};


export const clearVisitExecution = (state) => {
    return {
        ...state,
        executeVisitData: {}
    }
};

export const addItemToCartSuccess = (state, { payload }) => {
    //console.log('addItemToCartSuccess', payload)
    return {
        ...state,
        cart: _.cloneDeep(payload)
    }
};


export const removeItemFromCartSuccess = (state, { payload }) => {
    return {
        ...state,
        cart: _.cloneDeep(payload)
    }
};

export const editCartOrderSuccess = (state, { payload }) => {
    return {
        ...state,
        cart: _.cloneDeep(payload)
    }
};


export const placeOrderLoading = (state) => {
    return {
        ...state,
        placeOrderLoader: true
    }
};

export const placeOrderLoadingStop = (state) => {
    return {
        ...state,
        placeOrderLoader: false
    }
};


export const placeOrderSuccess = (state, { payload }) => {
    return {
        ...state,
        cart: {
            order: INITIAL_STATE.cart.order,
            items: []
        },
        placeOrderLoader: false
    }
};

export const placeOrderFailure = (state, { payload }) => {
    return {
        ...state,
        placeOrderLoader: false
    }
};

export const clearCart = (state, { payload }) => {
    return {
        ...state,
        cart: {
            order: INITIAL_STATE.cart.order,
            items: []
        },
        placeOrderLoader: false
    }
};


export const changeVisitInfoForm = (state, { payload }) => {
    let updated_add_visit_info_form = _.cloneDeep(state.visitInfoForm);
    updated_add_visit_info_form[payload.edited_field] = payload.edited_value;
    return {
        ...state,
        visitInfoForm: {
            ...state.visitInfoForm,
            ...updated_add_visit_info_form
        },
        visitInfoFormValidation: {
            invalid: false,
            invalid_field: '',
            error_message: ''
        }
    }
};

export const addVisitInfoSuccess = (state, { payload }) => {
    return {
        ...state,
       visitInfoForm: {
          ...INITIAL_STATE.visitInfoForm
       },
        addVisitInfoLoader: false
    }
};

export const addVisitInfoFailure = (state) => {
    return {
        ...state,
        addVisitInfoLoader: false
    }
};

export const addVisitInfoLoading = (state) => {
    return {
        ...state,
        addVisitInfoLoader: true
    }
};

export const addVisitInfoLoadingStop = (state) => {
    return {
        ...state,
        addVisitInfoLoader: false
    }
};

export const visitInfoValidationFailed = (state, { payload }) => {
    return {
        ...state,
        visitInfoFormValidation: {
            invalid: true,
            ...payload
        },
        addVisitInfoLoader: false
    }
};

export const clearAddInfoForm = (state, {payload}) => ({
    ...state,
    visitInfoForm: {},
    
  });


  export const setVisitInfoForm = (state, {payload}) => ({
    ...state,
    visitInfoForm : payload
  });



export const startVisitSuccess = (state, { payload }) => {
    return {
        ...state,
        startVisitLoader: false,
        executeVisitData: payload
    }
};

export const startVisitFailure = (state, { payload }) => {
    return {
        ...state,
        startVisitLoader: false,
        executeVisitData: {}
    }
};


export const startVisitLoading = (state, { payload }) => {
    return {
        ...state,
        startVisitLoader: true,
        startVisitLoadingId: payload.id
    }
};


export const startVisitLoadingStop = (state, { payload }) => {
    return {
        ...state,
        startVisitLoader: false,
        startVisitLoadingId: ''
    }
};




export const endVisitSuccess = (state, { payload }) => {
    return {
        ...state,
        endVisitLoader: false,
        executeVisitData: {},
        cart: INITIAL_STATE.cart,
        visitInfoForm: INITIAL_STATE.visitInfoForm
    }
};

export const endVisitFailure = (state, { payload }) => {
    return {
        ...state,
        endVisitLoader: false
    }
};


export const endVisitLoading = (state, { payload }) => {
    return {
        ...state,
        endVisitLoader: true,
        endVisitLoadingId: payload.id
    }
};


export const endVisitLoadingStop = (state, { payload }) => {
    return {
        ...state,
        endVisitLoader: false,
        endVisitLoadingId: ''
    }
};


export const pressStartVisitSuccess = (state, { payload }) => {
    return {
        ...state,
        executeVisitData: payload
    }
};

export const pressEndVisitSuccess = (state, { payload }) => {
    return {
        ...state
    }
};


export const pressEditVisitSuccess = (state, { payload }) => {
    return {
        ...state
    }
};


export const pressCancelVisitSuccess = (state, { payload }) => {
    return {
        ...state
    }
};



export const fetchVisitInfoLoading = (state, { payload }) => {
    return {
        ...state,
        fetchVisitInfoLoader: true
    }
};

export const fetchVisitInfoSuccess = (state, { payload }) => {
    let updatedVisitInfoMapping = _.cloneDeep(state.visitInfoMapping);
    updatedVisitInfoMapping[payload.id] = payload.data
    return {
        ...state,
        fetchVisitInfoLoader: false,
        visitInfoMapping: updatedVisitInfoMapping
    }
};

export const fetchVisitInfoFailure = (state, { payload }) => {
    return {
        ...state,
        fetchVisitInfoLoader: false
    }
};

export const fetchVisitImageLoading = (state, { payload }) => {
    return {
        ...state,
        visitImageLoader: true
    }
};

export const fetchVisitImageSuccess = (state, { payload }) => {
    return {
        ...state,
        visitImageLoader: false,
        visitInfoImage: payload
    }
};

export const fetchVisitImageFailure = (state, { payload }) => {
    return {
        ...state,
        visitImageLoader: false
    }
};

export const clearImageData = (state, { payload }) => {
    return {
        ...state,
        visitInfoImage: ''
    }
};

export const addVisitInfoEntity = (state, { payload }) => {
    let updatedVisitInfoFormMultiple = _.cloneDeep(state.visitInfoFormMultiple);
    updatedVisitInfoFormMultiple.push({...INITIAL_STATE.visitInfoForm, id: _.uniqueId()})
    return {
        ...state,
        visitInfoFormMultiple: updatedVisitInfoFormMultiple
    }
};

export const editVisitInfoEntity = (state, { payload }) => {
    let updatedVisitInfoFormMultiple = _.cloneDeep(state.visitInfoFormMultiple);
    updatedVisitInfoFormMultiple.map((obj) => {
        if (obj.id == payload.id) {
            obj[payload.edited_field] = payload.edited_value
        }
    })
    return {
        ...state,
        visitInfoFormMultiple: updatedVisitInfoFormMultiple
    }
};


export const removeVisitInfoEntity = (state, { payload }) => {
    let updatedVisitInfoFormMultiple = [];

    state.visitInfoFormMultiple.map((obj) => {
        if (payload != obj.id) {
            updatedVisitInfoFormMultiple.push(obj)
        }
    });

    return {
        ...state,
        visitInfoFormMultiple: updatedVisitInfoFormMultiple
    }
};

export const addCompetitorForm = (state, { payload }) => {
    let updatedAddCompetitorForm= _.cloneDeep(state.AddCompetitorForm);
    updatedAddCompetitorForm.push(payload);
    return {
      ...state,
      AddCompetitorForm: updatedAddCompetitorForm
    }
  }
  
  
  export const removeCompetitorForm = (state, { payload }) => {
    let updatedAddCompetitorForm= []
  
    state.AddCompetitorForm.map((obj) => {
      if (obj.id != payload.id) {
          updatedAddCompetitorForm.push(obj)
      }
    });
  
    return {
      ...state,
      AddCompetitorForm: updatedAddCompetitorForm
    }
  }


export const changeCompetitorForm= (state, { payload }) => {
    let updatedAddCompetitorForm= _.cloneDeep(state.AddCompetitorForm);
    updatedAddCompetitorForm.map((obj) => {
      if (obj.id == payload.id) {
        obj[payload.edited_field] = payload.edited_value
      }
    });
  
    return {
      ...state,
      AddCompetitorForm: updatedAddCompetitorForm
    }
  }

  export const submitCompetitorFormSuccess = (state, { payload }) => {
    return {
        ...state,
        CompetitorSubmitLoader: false,
        AddCompetitorForm: INITIAL_STATE.AddCompetitorForm
    }
  }
  
  export const submitCompetitorFormFailure = (state, { payload }) => {
    return {
        ...state,
        CompetitorSubmitLoader: false
    }
  }
  
  
  export const submitCompetitorFormLoading = (state, { payload }) => {
    return {
        ...state,
        CompetitorSubmitLoader: true 
    }
  }
  
  
  export const submitCompetitorFormLoadingStop = (state, { payload }) => {
    return {
        ...state,
        CompetitorSubmitLoader: false 
    }
  }

  export const CompetitorFormValidationFailed = (state, { payload }) => {
    return {
      ...state,
      CompetitorFormValidation: payload
    }
  }

  export const addStockForm = (state, { payload }) => {
    let updatedAddStockForm= _.cloneDeep(state.AddStockForm);
    updatedAddStockForm.push(payload);
    return {
      ...state,
      AddStockForm: updatedAddStockForm
    }
  }
  
  
  export const removeStockForm = (state, { payload }) => {
    let updatedAddStockForm= []
  
    state.AddStockForm.map((obj) => {
      if (obj.id != payload.id) {
          updatedAddStockForm.push(obj)
      }
    });
  
    return {
      ...state,
      AddStockForm: updatedAddStockForm
    }
  }


export const changeStockForm= (state, { payload }) => {
    let updatedAddStockForm= _.cloneDeep(state.AddStockForm);
    updatedAddStockForm.map((obj) => {
      if (obj.id == payload.id) {
        obj[payload.edited_field] = payload.edited_value
      }
    });
  
    return {
      ...state,
      AddStockForm: updatedAddStockForm
    }
  }
  export const changeUpdateStockForm= (state, { payload }) => {
    let updatedAddStockForm= _.cloneDeep(state.visitStock);
    updatedAddStockForm.map((obj) => {
      if (obj.id == payload.id) {
        obj[payload.edited_field] = payload.edited_value
      }
    });
  
    return {
      ...state,
      visitStock: updatedAddStockForm
    }
  } 

  export const changeUpdateCompetitorForm= (state, { payload }) => {
    let updatedAddCompetitorForm= _.cloneDeep(state.visitCompetitor);
    updatedAddCompetitorForm.map((obj) => {
      if (obj.id == payload.id) {
        obj[payload.edited_field] = payload.edited_value
      }
    });
  
    return {
      ...state,
      visitCompetitor: updatedAddCompetitorForm
    }
  } 

  export const submitStockFormSuccess = (state, { payload }) => {
    return {
        ...state,
        StockSubmitLoader: false,
       AddStockForm: INITIAL_STATE.AddStockForm
    }
  }
  
  export const submitStockFormFailure = (state, { payload }) => {
    return {
        ...state,
        StockSubmitLoader: false
    }
  }
  
  
  export const submitStockFormLoading = (state, { payload }) => {
    return {
        ...state,
        StockSubmitLoader: true 
    }
  }
  
  
  export const submitStockFormLoadingStop = (state, { payload }) => {
    return {
        ...state,
        StockSubmitLoader: false 
    }
  }

  

  export const StockFormValidationFailed = (state, { payload }) => {
    return {
      ...state,
      StockFormValidation: payload
    }
  }


  export const getCompetitorSuccess = (state, { payload }) => ({
    ...state,
   visitCompetitor: payload,
    getVisitCompetitorLoader: false
  });
  
  export const getCompetitorFailure = (state) => ({
    ...state,
    visitCompetitor: [],
  
      getVisitCompetitorLoader: false
  
  });
  
  
  export const getCompetitorLoading = (state) => ({
    ...state,
 
      getVisitCompetitorLoader: true
    
  });

  export const getStockSuccess = (state, { payload }) => ({
    ...state,
   visitStock: payload,
    getVisitStockLoader: false
  });
  
  export const getStockFailure = (state) => ({
    ...state,
    visitStock: [],
  
      getVisitStockLoader: false
  
  });
  
  
  export const getStockLoading = (state) => ({
    ...state,
 
      getVisitStockLoader: true
    
  });

  export const submitUpdateStockFormSuccess = (state, { payload }) => {
    return {
        ...state,
        UpdateStockSubmitLoader: false,
      // AddStockForm: INITIAL_STATE.AddStockForm
    }
  }
  
  export const submitUpdateStockFormFailure = (state, { payload }) => {
    return {
        ...state,
        UpdateStockSubmitLoader: false
    }
  }
  
  
  export const submitUpdateStockFormLoading = (state, { payload }) => {
    return {
        ...state,
        UpdateStockSubmitLoader: payload.id
    }
  }
  
  
  export const submitUpdateStockFormLoadingStop = (state, { payload }) => {
    return {
        ...state,
        UpdateStockSubmitLoader: false 
    }
  }


  export const submitUpdateCompetitorFormSuccess = (state, { payload }) => {
    return {
        ...state,
        UpdateCompetitorSubmitLoader: false,
      // AddStockForm: INITIAL_STATE.AddStockForm
    }
  }
  
  export const submitUpdateCompetitorFormFailure = (state, { payload }) => {
    return {
        ...state,
        UpdateCompetitorSubmitLoader: false
    }
  }
  
  
  export const submitUpdateCompetitorFormLoading = (state, { payload }) => {
    return {
        ...state,
        UpdateCompetitorSubmitLoader: payload.id
    }
  }
  
  
  export const submitUpdateCompetitorFormLoadingStop = (state, { payload }) => {
    return {
        ...state,
        UpdateCompetitorSubmitLoader: false 
    }
  }


  export const getParentAreasSuccess = (state, { payload }) => ({
    ...state,
    parentAreas: payload,
    getParentAreasLoader: false
  });
  
  export const getParentAreasFailure = (state) => ({
    ...state,
    parentAreas: {},
  
      getParentAreasLoader: false
  
  });
  
  
  export const getParentAreasLoading = (state) => ({
    ...state,
 
      getParentAreasLoader: true
    
  });


  export const changeOrderHeaderForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.orderHeaderForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        orderHeaderForm: {
            ...state.orderHeaderForm,
            ...updated_form
        },
        OrderFormValidation: {
            invalid: false,
            invalid_field: ''
        }
    }
};

export const orderHeaderFormValidationFailed = (state, { payload }) => ({
    ...state,
    OrderFormValidation: {
        ...payload
    }
});

export const clearOrderHeaderForm= (state) => ({
    ...state,
    orderHeaderForm: {}
});

export const addBulkVisitsToPlanSuccess = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            selectedPlannedVisits: payload
        }
    }
};


export const removeBulkVisitsToPlanSuccess = (state, { payload }) => {
    return {
        ...state,
        planVisit: {
            ...state.planVisit,
            selectedPlannedVisits: payload
        }
    }
};


export const setQuantity = (state, {payload}) => ({
    ...state,
    setQuantity: payload
  });


  export const clearSetQuantity = (state, {payload}) => ({
    ...state,
    setQuantity: INITIAL_STATE.setQuantity
  });
  


export const reducer = createReducer(INITIAL_STATE, {
    [VisitsTypes.FETCH_VISITS_STORAGE_LIST_SUCCESS]: fetchVisitsStorageListSuccess,
    [VisitsTypes.FETCH_VISITS_STORAGE_LIST_FAILURE]: fetchVisitsStorageListFailure,

    [VisitsTypes.FETCH_VISIT_IMAGE_SUCCESS]: fetchVisitImageSuccess,
    [VisitsTypes.FETCH_VISIT_IMAGE_FAILURE]: fetchVisitImageFailure,
    [VisitsTypes.FETCH_VISIT_IMAGE_LOADING]: fetchVisitImageLoading,

    [VisitsTypes.CLEAR_IMAGE_DATA]: clearImageData,

    [VisitsTypes.CLEAR_CART]: clearCart,

    [VisitsTypes.SET_QUANTITY]: setQuantity,
    [VisitsTypes.CLEAR_SET_QUANTITY]: clearSetQuantity,


    [VisitsTypes.FETCH_VISITS_DISPLAY_LIST_SUCCESS]: fetchVisitsDisplayListSuccess,
    [VisitsTypes.FETCH_VISITS_DISPLAY_LIST_FAILURE]: fetchVisitsDisplayListFailure,
    [VisitsTypes.FETCH_VISITS_DISPLAY_LIST_LOADING]: fetchVisitsDisplayListLoading,
    [VisitsTypes.FETCH_VISITS_DISPLAY_LIST_LOADING_STOP]: fetchVisitsDisplayListLoadingStop,
    [VisitsTypes.FETCH_FILTERED_VISITS_DISPLAY_LIST_SUCCESS]: fetchFilteredVisitsDisplayListSuccess,


    [VisitsTypes.CHANGE_SEARCH_FILTERS]: changeSearchFilters,
    [VisitsTypes.OPEN_VISITS_ACTION]: openVisitsAction,
    [VisitsTypes.CLOSE_VISITS_ACTION]: closeVisitsAction,
    [VisitsTypes.DO_NOTHING]: doNothing,



    [VisitsTypes.CHANGE_ADD_PLANNED_VISITS_SEARCH_FILTERS]: changeAddPlannedVisitsSearchFilters,
    [VisitsTypes.CHANGE_PLANNED_SELECTED_DATE]: changePlannedSelectedDate,
    [VisitsTypes.CHANGE_PLANNED_START_DATE]: changePlannedStartDate,
    [VisitsTypes.CHANGE_PLANNED_SELECTED_PSM]: changePlannedSelectedPSM,


    [VisitsTypes.ADD_VISIT_TO_PLAN]: addVisitToPlan,
    [VisitsTypes.REMOVE_VISIT_FROM_PLAN]: removeVisitFromPlan,
    [VisitsTypes.EDIT_SELECTED_VISITS]: editSelectedVisits,
    // //[VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS]   			    : submitSelectedPlannedVisits,
    [VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS_SUCCESS]: submitSelectedPlannedVisitsSuccess,
    [VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS_FAILURE]: submitSelectedPlannedVisitsFailure,
    [VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS_LOADING]: submitSelectedPlannedVisitsLoading,
    [VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS_LOADING_STOP]: submitSelectedPlannedVisitsLoadingStop,

    [VisitsTypes.FIND_NEAR_ME_LOADING]: findNearMeLoading,
    [VisitsTypes.FIND_NEAR_ME_LOADING_STOP]: findNearMeLoadingStop,
    [VisitsTypes.SET_NEAR_LOCATION]: setNearLocation,
    [VisitsTypes.CHANGE_SEARCH_BY_AREA_FILTERS]: changeSearchByAreaFilters,



    [VisitsTypes.CANCEL_VISIT_LOADING]: cancelVisitLoading,
    [VisitsTypes.EDIT_VISIT_LOADING]: editVisitLoading,
    [VisitsTypes.EDIT_VISIT_SUCCESS]: editVisitSuccess,
    [VisitsTypes.CANCEL_VISIT_SUCCESS]: cancelVisitSuccess,
    [VisitsTypes.EDIT_VISIT_FAILURE]: editVisitFailure,
    [VisitsTypes.CANCEL_VISIT_FAILURE]: cancelVisitFailure,
    [VisitsTypes.CANCEL_VISIT_LOADING_STOP]: cancelVisitLoadingStop,
    [VisitsTypes.EDIT_VISIT_LOADING_STOP]: editVisitLoadingStop,
    [VisitsTypes.UPDATE_VISIT_FORM_CHANGE]: updateVisitFormChange,
    [VisitsTypes.EDIT_VISIT_VALIDATION_FAILED]: editVisitValidationFailed,
    [VisitsTypes.EXECUTE_VISIT]: executeVisit,
    [VisitsTypes.CLEAR_VISIT_EXECUTION]: clearVisitExecution,


    [VisitsTypes.ADD_ITEM_TO_CART_SUCCESS]: addItemToCartSuccess,
    [VisitsTypes.REMOVE_ITEM_FROM_CART_SUCCESS]: removeItemFromCartSuccess,
    [VisitsTypes.EDIT_CART_ORDER_SUCCESS]: editCartOrderSuccess,


    [VisitsTypes.PLACE_ORDER_LOADING]: placeOrderLoading,
    [VisitsTypes.PLACE_ORDER_LOADING_STOP]: placeOrderLoadingStop,
    [VisitsTypes.PLACE_ORDER_SUCCESS]: placeOrderSuccess,
    [VisitsTypes.PLACE_ORDER_FAILURE]: placeOrderFailure,


    [VisitsTypes.CHANGE_VISIT_INFO_FORM]: changeVisitInfoForm,
    [VisitsTypes.ADD_VISIT_INFO_SUCCESS]: addVisitInfoSuccess,
    [VisitsTypes.ADD_VISIT_INFO_FAILURE]: addVisitInfoFailure,
    [VisitsTypes.ADD_VISIT_INFO_LOADING]: addVisitInfoLoading,
    [VisitsTypes.ADD_VISIT_INFO_LOADING_STOP]: addVisitInfoLoadingStop,
    [VisitsTypes.VISIT_INFO_VALIDATION_FAILED]: visitInfoValidationFailed,
    [VisitsTypes.CLEAR_ADD_INFO_FORM]    : clearAddInfoForm,
    [VisitsTypes.SET_VISIT_INFO_FORM]         : setVisitInfoForm,


    //[VisitsTypes.VISIT_INFO_VALIDATION_FAILED]                  : startVisit: ['payload'],
    [VisitsTypes.START_VISIT_SUCCESS]: startVisitSuccess,
    [VisitsTypes.START_VISIT_FAILURE]: startVisitFailure,
    [VisitsTypes.START_VISIT_LOADING]: startVisitLoading,
    [VisitsTypes.START_VISIT_LOADING_STOP]: startVisitLoadingStop,


    //[VisitsTypes.VISIT_INFO_VALIDATION_FAILED]                  : endVisit: ['payload'],
    [VisitsTypes.END_VISIT_SUCCESS]: endVisitSuccess,
    [VisitsTypes.END_VISIT_FAILURE]: endVisitFailure,
    [VisitsTypes.END_VISIT_LOADING]: endVisitLoading,
    [VisitsTypes.END_VISIT_LOADING_STOP]: endVisitLoadingStop,


    [VisitsTypes.PRESS_START_VISIT_SUCCESS]: pressStartVisitSuccess,
    [VisitsTypes.PRESS_END_VISIT_SUCCESS]: pressEndVisitSuccess,
    [VisitsTypes.PRESS_EDIT_VISIT_SUCCESS]: pressEditVisitSuccess,
    [VisitsTypes.PRESS_CANCEL_VISIT_SUCCESS]: pressCancelVisitSuccess,



    [VisitsTypes.FETCH_VISIT_INFO_LOADING]: fetchVisitInfoLoading,
    [VisitsTypes.FETCH_VISIT_INFO_SUCCESS]: fetchVisitInfoSuccess,
    [VisitsTypes.FETCH_VISIT_INFO_FAILURE]: fetchVisitInfoFailure,
    [VisitsTypes.ADD_VISIT_INFO_ENTITY]: addVisitInfoEntity,
    [VisitsTypes.REMOVE_VISIT_INFO_ENTITY]: removeVisitInfoEntity,

    [VisitsTypes.EDIT_VISIT_INFO_ENTITY]: editVisitInfoEntity,
    //[VisitsTypes.PRESS_CANCEL_VISIT_SUCCESS]: fetchVisitInfo
    
    [VisitsTypes.ADD_COMPETITOR_FORM]: addCompetitorForm,
    [VisitsTypes.REMOVE_COMPETITOR_FORM]: removeCompetitorForm,
    [VisitsTypes.CHANGE_COMPETITOR_FORM]: changeCompetitorForm,
    
    [VisitsTypes.COMPETITOR_FORM_VALIDATION_FAILED]: CompetitorFormValidationFailed,
    [VisitsTypes.SUBMIT_COMPETITOR_FORM_LOADING_STOP]: submitCompetitorFormLoadingStop,
    [VisitsTypes.SUBMIT_COMPETITOR_FORM_LOADING]: submitCompetitorFormLoading,
    [VisitsTypes.SUBMIT_COMPETITOR_FORM_FAILURE]: submitCompetitorFormFailure,
    [VisitsTypes.SUBMIT_COMPETITOR_FORM_SUCCESS]: submitCompetitorFormSuccess,


    [VisitsTypes.ADD_STOCK_FORM]: addStockForm,
    [VisitsTypes.REMOVE_STOCK_FORM]: removeStockForm,
    [VisitsTypes.CHANGE_STOCK_FORM]: changeStockForm,
    [VisitsTypes.CHANGE_UPDATE_STOCK_FORM]: changeUpdateStockForm,

    [VisitsTypes.CHANGE_UPDATE_COMPETITOR_FORM]: changeUpdateCompetitorForm,
    
    [VisitsTypes.STOCK_FORM_VALIDATION_FAILED]: StockFormValidationFailed,
    [VisitsTypes.SUBMIT_STOCK_FORM_LOADING_STOP]: submitStockFormLoadingStop,
    [VisitsTypes.SUBMIT_STOCK_FORM_LOADING]: submitStockFormLoading,
    [VisitsTypes.SUBMIT_STOCK_FORM_FAILURE]: submitStockFormFailure,
    [VisitsTypes.SUBMIT_STOCK_FORM_SUCCESS]: submitStockFormSuccess,

    [VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM_LOADING_STOP]: submitUpdateCompetitorFormLoadingStop,
    [VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM_LOADING]: submitUpdateCompetitorFormLoading,
    [VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM_FAILURE]: submitUpdateCompetitorFormFailure,
    [VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM_SUCCESS]: submitUpdateCompetitorFormSuccess,

    [VisitsTypes.FETCH_HISTORY_LOADING]: fetchHistoryLoading,
    [VisitsTypes.FETCH_HISTORY_SUCCESS]: fetchHistorySuccess,
    [VisitsTypes.FETCH_HISTORY_FAILURE]: fetchHistoryFailure,
    [VisitsTypes.FETCH_HISTORY_LOADING_STOP]: fetchHistoryLoadingStop,


    [VisitsTypes.GET_COMPETITOR_LOADING]: getCompetitorLoading,
    [VisitsTypes.GET_COMPETITOR_FAILURE]: getCompetitorFailure,
    [VisitsTypes.GET_COMPETITOR_SUCCESS]: getCompetitorSuccess,

    [VisitsTypes.GET_STOCK_LOADING]: getStockLoading,
    [VisitsTypes.GET_STOCK_FAILURE]: getStockFailure,
    [VisitsTypes.GET_STOCK_SUCCESS]: getStockSuccess,


    [VisitsTypes.GET_PARENT_AREAS_LOADING]: getParentAreasLoading,
    [VisitsTypes.GET_PARENT_AREAS_FAILURE]: getParentAreasFailure,
    [VisitsTypes.GET_PARENT_AREAS_SUCCESS]: getParentAreasSuccess,

    [VisitsTypes.CHANGE_ORDER_HEADER_FORM]:  changeOrderHeaderForm,
    [VisitsTypes.ORDER_HEADER_FORM_VALIDATION_FAILED]: orderHeaderFormValidationFailed ,
    [VisitsTypes.CLEAR_ORDER_HEADER_FORM]:  clearOrderHeaderForm,

    [VisitsTypes.ADD_BULK_VISITS_TO_PLAN_SUCCESS]: addBulkVisitsToPlanSuccess,
    [VisitsTypes.REMOVE_BULK_VISITS_TO_PLAN_SUCCESS]: removeBulkVisitsToPlanSuccess,
});
