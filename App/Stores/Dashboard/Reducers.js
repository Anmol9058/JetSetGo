import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { DashboardTypes } from './Actions'
import _ from 'lodash'



export const changeDashboardSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.searchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    searchFilters: updated_search_filters
  }
};



export const getOrderValueSuccess = (state, { payload }) => {
  return {
    ...state,
    data: _.cloneDeep({
      ...state.data,
      orderValue: payload
    }),
    loaders: {
      ...state.loaders,
      orderValueLoader: false
    }
  }
};


export const getVisitCountSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      visitCount: payload
    },
    loaders: {
      ...state.loaders,
      visitCountLoader: false
    }
  }
};


export const getSiteCountSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      siteCount: payload
    },
    loaders: {
      ...state.loaders,
      siteCountLoader: false
    }
  }
};


export const getCountersSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      counters: payload
    },
    loaders: {
      ...state.loaders,
      countersLoader: false
    }
  }
};


export const getEventCountSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      eventsCount: payload
    },
    loaders: {
      ...state.loaders,
      eventsCountLoader: false
    }
  }
};


export const getTargetTeamSuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      TargetTeam: payload
    },
    loaders: {
      ...state.loaders,
      TargetTeamLoader: false
    }
  }
};

export const getTargetTeamFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      TargetTeam: []
    },
    loaders: {
      ...state.loaders,
      TargetTeamLoader: false
    }
  }
};

export const getTargetTeamLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      TargetTeamLoader: true
    }
  }
};




export const getDashboardSummarySuccess = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      dashboardSummary: payload
    },
    loaders: {
      ...state.loaders,
      dashboardSummaryLoader: false
    }
  }
}
export const getDashboardSummaryFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      dashboardSummary: []
    },
    loaders: {
      ...state.loaders,
      dashboardSummaryLoader: false
    }
  }
};
export const getDashboardSummaryLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      dashboardSummaryLoader: true
    }
  }
};

export const getDashboardSummaryLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      dashboardSummaryLoader: false
    }
  }
};

export const getOrderValueFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      orderValue: []
    },
    loaders: {
      ...state.loaders,
      orderValueLoader: false
    }
  }
};



export const getVisitCountFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      visitCount: []
    },
    loaders: {
      ...state.loaders,
      visitCountLoader: false
    }
  }
};


export const getSiteCountFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      siteCount: []
    },
    loaders: {
      ...state.loaders,
      siteCountLoader: false
    }
  }
};


export const getCountersFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      counters: []
    },
    loaders: {
      ...state.loaders,
      countersLoader: false
    }
  }
};


export const getEventCountFailure = (state, { payload }) => {
  return {
    ...state,
    data: {
      ...state.data,
      eventsCount: []
    },
    loaders: {
      ...state.loaders,
      eventsCountLoader: false
    }
  }
};



export const getOrderValueLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      orderValueLoader: true
    }
  }
};



export const getVisitCountLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      visitCountLoader: true
    }
  }
};


export const getSiteCountLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      siteCountLoader: true
    }
  }
};


export const getCountersLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      countersLoader: true
    }
  }
};


export const getEventCountLoading = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      eventsCountLoader: true
    }
  }
};



export const getOrderValueLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      orderValueLoader: false
    }
  }
};



export const getVisitCountLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      visitCountLoader: false
    }
  }
};


export const getSiteCountLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      siteCountLoader: false
    }
  }
};


export const getCountersLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      countersLoader: false
    }
  }
};


export const getEventCountLoadingStop = (state, { payload }) => {
  return {
    ...state,
    loaders: {
      ...state.loaders,
      eventsCountLoader: false
    }
  }
};


export const doNothing = (state) => ({
  ...state
});

 
export const updateSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.searchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  
  return {
    ...state,
    searchFilters: updated_search_filters
   
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [DashboardTypes.CHANGE_DASHBOARD_SEARCH_FILTERS]: changeDashboardSearchFilters,

  [DashboardTypes.GET_ORDER_VALUE_SUCCESS]: getOrderValueSuccess,
  [DashboardTypes.GET_VISIT_COUNT_SUCCESS]: getVisitCountSuccess,
  [DashboardTypes.GET_SITE_COUNT_SUCCESS]: getSiteCountSuccess,
  [DashboardTypes.GET_COUNTERS_SUCCESS]: getCountersSuccess,
  [DashboardTypes.GET_EVENT_COUNT_SUCCESS]: getEventCountSuccess,
  [DashboardTypes.GET_DASHBOARD_SUMMARY_SUCCESS]: getDashboardSummarySuccess,

  [DashboardTypes.GET_ORDER_VALUE_FAILURE]: getOrderValueFailure,
  [DashboardTypes.GET_VISIT_COUNT_FAILURE]: getVisitCountFailure,
  [DashboardTypes.GET_SITE_COUNT_FAILURE]: getSiteCountFailure,
  [DashboardTypes.GET_COUNTERS_FAILURE]: getCountersFailure,
  [DashboardTypes.GET_EVENT_COUNT_FAILURE]: getEventCountFailure,
  [DashboardTypes.GET_DASHBOARD_SUMMARY_FAILURE]: getDashboardSummaryFailure,



  [DashboardTypes.GET_ORDER_VALUE_LOADING]: getOrderValueLoading,
  [DashboardTypes.GET_VISIT_COUNT_LOADING]: getVisitCountLoading,
  [DashboardTypes.GET_SITE_COUNT_LOADING]: getSiteCountLoading,
  [DashboardTypes.GET_COUNTERS_LOADING]: getCountersLoading,
  [DashboardTypes.GET_EVENT_COUNT_LOADING]: getEventCountLoading,
  [DashboardTypes.GET_DASHBOARD_SUMMARY_LOADING]: getDashboardSummaryLoading,

  [DashboardTypes.GET_TARGET_TEAM_LOADING]: getTargetTeamLoading,
  [DashboardTypes.GET_TARGET_TEAM_SUCCESS]: getTargetTeamSuccess,
  [DashboardTypes.GET_TARGET_TEAM_FAILURE]: getTargetTeamFailure,
  [DashboardTypes.UPDATE_SEARCH_FILTERS]:updateSearchFilters,



  [DashboardTypes.GET_ORDER_VALUE_LOADING_STOP]: getOrderValueLoadingStop,
  [DashboardTypes.GET_VISIT_COUNT_LOADING_STOP]: getVisitCountLoadingStop,
  [DashboardTypes.GET_SITE_COUNT_LOADING_STOP]: getSiteCountLoadingStop,
  [DashboardTypes.GET_COUNTERS_LOADING_STOP]: getCountersLoadingStop,
  [DashboardTypes.GET_EVENT_COUNT_LOADING_STOP]: getEventCountLoadingStop,
  [DashboardTypes.GET_DASHBOARD_SUMMARY_LOADING_STOP]: getDashboardSummaryLoadingStop,



  [DashboardTypes.DO_NOTHING]: doNothing

});
