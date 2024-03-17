import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { OrdersTypes } from './Actions'
import _ from 'lodash';

export const fetchOrderDetailsLoading = (state) => ({
    ...state,
    fetchOrderDetailsLoading: true
}); 


export const fetchOrderDetailsSuccess = (state, {payload}) => {
	let updatedOrderDetailMapping = _.cloneDeep(state.allOrdersDetailsMapping);
	updatedOrderDetailMapping[payload.id] = payload.data
	return {
	    ...state,
	    fetchOrderDetailsLoading: false,
	    allOrdersDetailsMapping: updatedOrderDetailMapping
	}
}; 


export const fetchOrderDetailsFailure = (state) => ({
    ...state,
    fetchOrderDetailsLoading: false,
    allOrdersDetailsMapping:INITIAL_STATE. allOrdersDetailsMapping
}); 


export const fetchAllOrdersLoading = (state) => ({
    ...state,
    fetchAllOrdersLoader: true
}); 


export const fetchAllOrdersSuccess = (state, {payload}) => ({
    ...state,
    fetchAllOrdersLoader: false,
    allOrders: _.cloneDeep(payload)
}); 


export const fetchAllOrdersFailure = (state) => ({
    ...state,
    fetchAllOrdersLoader: false
}); 


export const selectOrder = (state, {payload}) => ({
    ...state,
    selectedOrder: payload
}); 


export const doNothing = (state) => ({
    ...state
});


export const repeatOrderLoading = (state,{payload}) => ({
    ...state,
    repeatOrderLoader: payload
}); 


export const repeatOrderSuccess = (state, {payload}) => ({
    ...state,
    repeatOrderLoader: false
}); 


export const repeatOrderFailure = (state) => ({
    ...state,
    repeatOrderLoader: false
}); 


export const reducer = createReducer(INITIAL_STATE, {
	[OrdersTypes.FETCH_ORDER_DETAILS_LOADING]           : fetchOrderDetailsLoading,
	[OrdersTypes.FETCH_ORDER_DETAILS_SUCCESS]           : fetchOrderDetailsSuccess,
	[OrdersTypes.FETCH_ORDER_DETAILS_FAILURE]           : fetchOrderDetailsFailure,
	[OrdersTypes.FETCH_ALL_ORDERS_LOADING]              : fetchAllOrdersLoading,
	[OrdersTypes.FETCH_ALL_ORDERS_SUCCESS]              : fetchAllOrdersSuccess,
	[OrdersTypes.FETCH_ALL_ORDERS_FAILURE]              : fetchAllOrdersFailure,
	[OrdersTypes.DO_NOTHING]               				: doNothing,
	[OrdersTypes.SELECT_ORDER]               			: selectOrder,


	//[OrdersTypes.REPEAT_ORDER]               			: repeatOrder,
	[OrdersTypes.REPEAT_ORDER_LOADING]               	: repeatOrderLoading,
	[OrdersTypes.REPEAT_ORDER_SUCCESS]               	: repeatOrderSuccess,
	[OrdersTypes.REPEAT_ORDER_FAILURE]      			: repeatOrderFailure
});
