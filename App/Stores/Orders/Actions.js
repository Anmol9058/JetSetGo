import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
	fetchOrderDetails: ['payload'],
	fetchDealerOrderDetails: ['payload'],
	fetchOrderDetailsLoading: null,
	fetchOrderDetailsSuccess: ['payload'],
	fetchOrderDetailsFailure: null,

	fetchAllOrders:['payload'],
	fetchAllOrdersLoading: null,
	fetchAllOrdersSuccess: ['payload'],
	fetchAllOrdersFailure: null,

	selectOrder: ['payload'],
	doNothing: null,	


	repeatOrder: ['payload'],
	repeatOrderLoading: ['payload'],
	repeatOrderSuccess: ['payload'],
	repeatOrderFailure: null
});

export const OrdersTypes = Types
export default Creators
