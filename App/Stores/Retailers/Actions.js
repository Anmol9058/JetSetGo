import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({


  fetchRetailers: ['payload'],
  fetchRetailersLoading: null,
  fetchRetailersSuccess: ['payload'],
  fetchRetailersFailure: null,

  fetchCreditLimit:['payload'],
  fetchCreditLimitLoading: null,
  fetchCreditLimitSuccess: ['payload'],
  fetchCreditLimitFailure: null,


  fetchDealers: ['payload'],
  fetchDealersLoading: null,
  fetchDealersSuccess: ['payload'],
  fetchDealersFailure: null,


  updateSearchFilters: ['payload'],


  createRetailer: ['payload'],
  createRetailerLoading: null,
  createRetailerSuccess: ['payload'],
  createRetailerFailure: null,
  createRetailerLoadingStop: null,
  
  createComplaint: ['payload'],
  createComplaintLoading: null,
  createComplaintSuccess: ['payload'],
  createComplaintFailure: null,
  createComplaintLoadingStop: null,

  changeComplaintForm: ['payload'],
  ComplaintFormValidationFailed: ['payload'],
  changeUpdateComplaintForm: ['payload'],
  clearComplaintForm: null,

  updateRetailer: ['payload'],
  updateRetailerLoading: null,
  updateRetailerSuccess: ['payload'],
  updateRetailerFailure: null,
  updateRetailerLoadingStop: null,
  extractFormDataUpdate: ['payload'],

  fetchComplaintType: ['payload'],
	fetchComplaintTypeLoading: [null],
	fetchComplaintTypeLoadingStop: [null],
	fetchComplaintTypeSuccess: ['payload'],
	fetchComplaintTypeFailure: [null],
  
  fetchSubComplaintType: ['payload'],
	fetchSubComplaintTypeLoading: [null],
	fetchSubComplaintTypeLoadingStop: [null],
	fetchSubComplaintTypeSuccess: ['payload'],
	fetchSubComplaintTypeFailure: [null],

  fetchOrderComplaint: ['payload'],
	fetchOrderComplaintLoading: null,
	fetchOrderComplaintSuccess: ['payload'],
	fetchOrderComplaintFailure: null,
  fetchOrderComplaintLoadingStop:null,

  fetchInvoiceComplaint:['payload'],
  fetchInvoiceComplaintLoading:null,
  fetchInvoiceComplaintSuccess:['payload'],
  fetchInvoiceComplaintFailure:null,
  fetchInvoiceComplaintLoadingStop:null,



  fetchComplaints: ['payload'],
	fetchComplaintsLoading: null,
	fetchComplaintsSuccess: ['payload'],
	fetchComplaintsFailure: null,
  fetchComplaintsLoadingStop:null,

  changeRetailerForm: ['payload'],
  retailerFormValidationFailed: ['payload'],
  changeUpdateRetailerForm: ['payload'],

  fetchRetailerOrders: ['payload'],
  fetchRetailerOrdersLoading: null,
  fetchRetailerOrdersSuccess: ['payload'],
  fetchRetailerOrdersFailure: null,

  fetchDealerOrders: ['payload'],
  fetchDealerOrdersLoading: null,
  fetchDealerOrdersLoadingStop: null,
  fetchDealerOrdersSuccess: ['payload'],
  fetchDealerOrdersFailure: null,


  fetchDealerInvoice: ['payload'],
  fetchDealerInvoiceLoading: null,
  fetchDealerInvoiceSuccess: ['payload'],
  fetchDealerInvoiceFailure: null,


  fetchDealerOutstanding: ['payload'],
  fetchDealerOutstandingLoading: null,
  fetchDealerOutstandingSuccess: ['payload'],
  fetchDealerOutstandingFailure: null,


  fetchDealerPayments: ['payload'],
  fetchDealerPaymentsLoading: null,
  fetchDealerPaymentsSuccess: ['payload'],
  fetchDealerPaymentsFailure: null,





  fetchRetailerCompetitors: ['payload'],
  fetchRetailerCompetitorsLoading: null,
  fetchRetailerCompetitorsSuccess: ['payload'],
  fetchRetailerCompetitorsFailure: null,


  updateRetailerLocation: ['payload'],
  updateRetailerLocationLoading: null,
  updateRetailerLocationLoadingStop: null,
  updateRetailerLocationSuccess: ['payload'],
  updateRetailerLocationFailure: null,


  openMoreFiltersOption: null,
  closeMoreFiltersOption: null,

  makeDealerSearchList: ['payload'],
  makeRetailerSearchList: ['payload'],
  makeRetailerBeatSearchList:['payload'],

  extractFormData: ['payload'],

  extractRetailerInfoData: ['payload'],
  selectRetailer: ['payload'],
  selectRetailerSuccess: ['payload'],
  selectDealer: ['payload'],
  doNothing: null,
  clearSelectRetailer: null,
  clearRetailerForm: null,


  fetchRetailerDealerSearchByLocation: ['payload'],
  fetchRetailerDealerSearchByLocationLoading: null,
  fetchRetailerDealerSearchByLocationLoadingStop: null,
  fetchRetailerDealerSearchByLocationSuccess: ['payload'],
  fetchRetailerDealerSearchByLocationFailure: null,


  fetchInvoiceDetail: ['payload'],
  fetchInvoiceDetailSuccess: ['payload'],
  fetchInvoiceDetailLoading: null,
  fetchInvoiceDetailFailure: null,

  editPaymentsForm: ['payload'],
  submitPaymentsForm: ['payload'],
  clearPaymentsForm: ['payload'],
  submitPaymentsFormSuccess: ['payload'],
  submitPaymentsFormFailure: null,
  submitPaymentsFormLoading: null,
  submitPaymentsFormLoadingStop: null,


  createCompetitor: ['payload'],
  createCompetitorSuccess: ['payload'],
  createCompetitorFailure: null,
  createCompetitorLoading: null,
  createCompetitorLoadingStop: null,
  editNewCompetitorForm: ['payload'],
  clearNewCompetitorForm: null,


  fetchDsr: ['payload'],
  fetchDsrLoading: null,
  fetchDsrSuccess: ['payload'],
  fetchDsrFailure: null,

  fetchDsrArea: ['payload'],
  fetchDsrAreaLoading: null,
  fetchDsrAreaSuccess: ['payload'],
  fetchDsrAreaFailure: null,

  fetchDsrAreaList: ['payload'],
  fetchDsrAreaListLoading: null,
  fetchDsrAreaListSuccess: ['payload'],
  fetchDsrAreaListFailure: null,


  createDsr: ['payload'],
  createDsrLoading: null,
  createDsrSuccess: ['payload'],
  createDsrFailure: null,
  createDsrLoadingStop: null,

  changeDsrForm: ['payload'],
  dsrFormValidationFailed: ['payload'],

  createDsrArea: ['payload'],
  createDsrAreaLoading: null,
  createDsrAreaSuccess: ['payload'],
  createDsrAreaFailure: null,
  createDsrAreaLoadingStop: null,

  changeDsrAreaForm: ['payload'],
  clearDsrAreaForm: null,

  updateOrderSearchFilters: ['payload'],


  deleteOrderLine:['payload'],
  deleteOrderLineLoading: ['payload'],
  deleteOrderLineSuccess: ['payload'],
  deleteOrderLineFailure: null,


  editOrderQuantity: ['payload'],
  editOrderQuantityLoading: ['payload'],
	editOrderQuantitySuccess: ['payload'],
  editOrderQuantityFailure: null,


  addOrderLine: ['payload'],
  addOrderLineLoading: null,
	addOrderLineSuccess: ['payload'],
  addOrderLineFailure: null,

  setAddOrderLineData: ['payload'],
  clearAddOrderLineData: null,

  setEditOrderLineData: ['payload'],
  clearEditOrderLineData: null,
  
  
  getRetailerTarget:['payload'],
  getRetailerTargetSuccess:['payload'],
  getRetailerTargetLoading:null,
  getRetailerTargetFailure:null,
  getRetailerTargetLoadingStop:null,

  updateTargetSearchFilters: ['payload'],


});

export const RetailersTypes = Types
export default Creators